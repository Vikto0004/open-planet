import Header from "./Header/Header";
type Props = {
  children: React.ReactNode;
  lang: string;
};

const AppLayout = ({ children, lang }: Props) => {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
};

export default AppLayout;
