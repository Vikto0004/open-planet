import React from "react";

import Login from "@/core/auth/Login";
// import Container from "@/core/Container";

import { getDictionary } from "../../dictionaries";

const LoginPage = async ({
  params: { lang },
}: {
  params: { lang: string };
}) => {
  const { authNav } = await getDictionary(lang);

  return (
    // <Container>
    <>
      <h1 className=" mt-4 text-center text-xl font-bold">{authNav.login}</h1>

      <Login lang={lang} labels={authNav} />
    </>
    // </Container>
  );
};

export default LoginPage;
