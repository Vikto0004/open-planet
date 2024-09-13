"use client";

import Link from "next/link";
import css from "./Sidebar.module.css";
import { useState } from "react";

import { TbSitemap } from "react-icons/tb";
import { RiAlignItemVerticalCenterLine } from "react-icons/ri";
import { BsNewspaper } from "react-icons/bs";
import { RiUserSearchLine } from "react-icons/ri";
import { IoDocumentsOutline } from "react-icons/io5";
import { MdAdminPanelSettings } from "react-icons/md";

const Sidebar = () => {
  const [isPagesOpen, setIsPagesOpen] = useState<boolean>(false);

  const togglePagesMenu = () => {
    setIsPagesOpen(!isPagesOpen);
  };
  return (
    <aside className={css.sidebar}>
      <nav>
        <ul>
          <li>
            <button className={css.link} onClick={togglePagesMenu}>
              <TbSitemap className={css.icon} size={20} />
              Сторінки
            </button>
            {isPagesOpen && (
              <ul className={css.list}>
                <li>
                  <Link href="" className={css.sublink}>
                    <RiAlignItemVerticalCenterLine
                      className={css.icon}
                      size={20}
                    />
                    Головна
                  </Link>
                </li>
                <li>
                  <Link href="" className={css.sublink}>
                    <RiAlignItemVerticalCenterLine
                      className={css.icon}
                      size={20}
                    />
                    Про наш фонд
                  </Link>
                </li>
                <li>
                  <Link href="" className={css.sublink}>
                    <RiAlignItemVerticalCenterLine
                      className={css.icon}
                      size={20}
                    />
                    Напрямки роботи
                  </Link>
                </li>
                <li>
                  <Link href="" className={css.sublink}>
                    <RiAlignItemVerticalCenterLine
                      className={css.icon}
                      size={20}
                    />
                    Долучитися до команди
                  </Link>
                </li>
                <li>
                  <Link href="" className={css.sublink}>
                    <RiAlignItemVerticalCenterLine
                      className={css.icon}
                      size={20}
                    />
                    Підтримати фонд
                  </Link>
                </li>
                <li>
                  <Link href="" className={css.sublink}>
                    <RiAlignItemVerticalCenterLine
                      className={css.icon}
                      size={20}
                    />
                    Публічна оферта
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            <Link href="/admin/news" className={css.link}>
              <BsNewspaper className={css.icon} size={20} />
              Новини фонду
            </Link>
          </li>
          <li>
            <Link href="" className={css.link}>
              <RiUserSearchLine className={css.icon} size={20} />
              Вакансії
            </Link>
          </li>
          <li>
            <Link href="" className={css.link}>
              <IoDocumentsOutline className={css.icon} size={20} />
              Документи
            </Link>
          </li>
        </ul>
        <ul className={css.bottomList}>
          <li>
            <Link href="" className={css.link}>
              <MdAdminPanelSettings className={css.icon} size={20} />
              Список модераторів
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
