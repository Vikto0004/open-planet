import Link from "next/link";

import Container from "../Container";
import LanguageSwitcher from "../LanguageSwitcher";

import Auth from "./Auth";
import MobileNav from "./MobileNav";
import { NavBar } from "./NavBar";

const Header = ({ lang }: { dict: unknown; lang: string }) => {
  return (
    <Container>
      <div className="">
        <Link href={"/"}>
          <p className="">Logo</p>
        </Link>
        <div className="">
          <NavBar lang={lang} />

          <Auth lang={lang} />
          <LanguageSwitcher />
        </div>

        <div className="">
          <LanguageSwitcher />
          <MobileNav lang={lang} />
        </div>
      </div>
    </Container>
  );
};

// export default Header;
