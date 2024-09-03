import Footer from "./footer/Footer";
import Header from "./header/Header";
type Props = {
  children: React.ReactNode;
  dict: unknown;
  lang: string;
};

const AppLayout = ({ children, dict, lang }: Props) => {
  return (
    <>
      <header>
        <Header lang={lang} dict={dict} />
      </header>
      <main>{children}</main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default AppLayout;
