"use client";

import Link from "next/link";
import css from "./Sidebar.module.css";
import { useState } from "react";

import { TbSitemap } from "react-icons/tb";
import { RiAlignItemVerticalCenterLine } from "react-icons/ri";
import { BsNewspaper } from "react-icons/bs";
import { RiUserSearchLine } from "react-icons/ri";
import { IoDocumentsOutline } from "react-icons/io5";

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
              <TbSitemap size={20} />
              Сторінки
            </button>
            {isPagesOpen && (
              <ul className={css.list}>
                <li>
                  <Link href="" className={css.sublink}>
                    <RiAlignItemVerticalCenterLine size={20} />
                    Головна
                  </Link>
                </li>
                <li>
                  <Link href="" className={css.sublink}>
                    <RiAlignItemVerticalCenterLine size={20} />
                    Про фонд
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            <Link href="" className={css.link}>
              <BsNewspaper size={20} />
              Новини фонду
            </Link>
          </li>
          <li>
            <Link href="" className={css.link}>
              <RiUserSearchLine size={20} />
              Вакансії
            </Link>
          </li>
          <li>
            <Link href="" className={css.link}>
              <IoDocumentsOutline size={20} />
              Документи
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
