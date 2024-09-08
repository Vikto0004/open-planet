// import Header from "./Header/Header";
type Props = {
  children: React.ReactNode;
};

const AppLayout = ({ children }: Props) => {
  return (
    <>
      {/* <Header /> */}
      <main>{children}</main>
    </>
  );
};

export default AppLayout;
