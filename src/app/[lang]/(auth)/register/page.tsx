import Register from "@/core/auth/Register";
import Container from "@/core/Container";

// import { getDictionary } from "../../dictionaries";

// const RegisterPage = async ({
//   params: { lang },
// }: {
//   params: { lang: string };
// })
const RegisterPage = async () => {
  // const { authNav } = await getDictionary(lang);

  return (
    <Container>
      {/* <h1 className="">{authNav.registration}</h1> */}

      {/* <Register lang={lang} labels={authNav} /> */}
      <Register />
    </Container>
  );
};

export default RegisterPage;
