"use client";

import { Button } from "@mui/material";
import type { Navigation } from "@toolpad/core";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { AppProvider } from "@toolpad/core/nextjs";
import { ReactNode, useEffect, useState } from "react";
import ContentLoader from "react-content-loader";
import { MdAdminPanelSettings } from "react-icons/md";
import { RiAlignItemVerticalCenterLine } from "react-icons/ri";
import { TbSitemap } from "react-icons/tb";
import { RemoveScroll } from "react-remove-scroll";
import { BeatLoader } from "react-spinners";

import { useGetUser, useLogout } from "@/admin-shared/hooks";

import css from "./rootDashboardLayout.module.css";

const RootDashboardLayout = ({ children }: { children: ReactNode }) => {
  const [active, setActive] = useState<boolean>(true);
  const [mounted, setMounted] = useState(false);
  const { mutate, isPending } = useLogout();
  const { data, isLoading } = useGetUser(active);

  useEffect(() => {
    setMounted(true);
  }, []);

  const NAVIGATION: Navigation = [
    {
      kind: "header",
      title: `Ваша роль: ${data?.role ?? ""}`,
    },
    {
      segment: "admin",
      title: "Сторінки",
      icon: <TbSitemap className={css.icon} />,
      children: [
        {
          segment: "news",
          title: "Новини",
          icon: <RiAlignItemVerticalCenterLine className={css.icon} />,
        },
        {
          segment: "questions",
          title: "Часті запитання та відповіді",
          icon: <RiAlignItemVerticalCenterLine className={css.icon} />,
        },
        {
          segment: "projects",
          title: "Проекти",
          icon: <RiAlignItemVerticalCenterLine className={css.icon} />,
        },
        {
          segment: "details",
          title: "Реквізити для допомоги",
          icon: <RiAlignItemVerticalCenterLine className={css.icon} />,
        },
        {
          segment: "support",
          title: "Благодійна допомога",
          icon: <RiAlignItemVerticalCenterLine className={css.icon} />,
        },
        {
          segment: "public-offer",
          title: "Публічна оферта",
          icon: <RiAlignItemVerticalCenterLine className={css.icon} />,
        },
        {
          segment: "policy",
          title: "Політика конфіденційності",
          icon: <RiAlignItemVerticalCenterLine className={css.icon} />,
        },
      ],
    },
    {
      kind: "divider",
    },
    {
      kind: "header",
      title: "Модератори",
    },
    {
      segment: "admin/moderators",
      title: "Список модераторів",
      icon: <MdAdminPanelSettings className={css.icon} size={20} />,
    },
  ];

  const logoutButton = () => {
    return (
      <>
        <Button
          variant="contained"
          size="medium"
          onClick={() => {
            setActive(false);
            mutate();
          }}
          disabled={isPending}
        >
          Вийти
        </Button>
      </>
    );
  };

  if (!mounted) return null;
  if (isLoading) {
    return (
      <RemoveScroll>
        <ContentLoader
          speed={2}
          width={1540}
          height={1000}
          viewBox="0 0 1540 1000"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="0" y="0" rx="0" ry="0" width="1540" height="64" />
          <rect x="-1" y="64" rx="0" ry="0" width="320" height="700" />
        </ContentLoader>
      </RemoveScroll>
    );
  }

  if (!active) {
    return (
      <div className={css.center}>
        <BeatLoader color="#1677ff" />
      </div>
    );
  }
  if (active) {
    return (
      <AppProvider
        navigation={NAVIGATION}
        branding={{
          logo: <div className={css.logo}>OPEN-PLANET</div>,
          title: "",
        }}
      >
        <DashboardLayout slots={{ toolbarAccount: logoutButton }}>
          <div>{children}</div>
        </DashboardLayout>
      </AppProvider>
    );
  }
};

export default RootDashboardLayout;
