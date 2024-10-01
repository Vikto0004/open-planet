import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const useCheckAuth = () => {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [redirecting, setRedirecting] = useState(false);
  const pathname = usePathname();
  // check availability token in localStorage in useEffect because of ssr, we need to make sure that localstorage checked only in browser

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");

      const check = async () => {
        if (token) {
          if (pathname !== "/admin") {
            setRedirecting(true);
            await router.push("/admin");
          }
        } else {
          if (pathname !== "/admin/login") {
            setRedirecting(true);
            await router.push("/admin/login");
          }
        }


        setRedirecting(false);
        setChecking(false);
      };
      check();
    }
  }, [router]);

  return { checking, redirecting };
};

const useCheckAuthRegister = () => {
  const router = useRouter();
  const pathname = usePathname();

  // check availability token in localStorage in useEffect because of ssr, we need to make sure that localstorage checked only in browser

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");

      token && pathname === "/admin/register" ? router.push("/admin") : null;
    }
  }, [router, pathname]);
};

export { useCheckAuth, useCheckAuthRegister };
