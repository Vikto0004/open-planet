"use client";

const Login = () => {
  // const router = useRouter();

  // const onLogin = async (
  //   values: IFormLogin,
  //   actions: FormikHelpers<IFormLogin>,
  // ) => {
  //   try {
  //     const res = await axios.post("/api/auth/login", values);

  //     if (res.status === 200) {
  //       actions.resetForm();
  //       router.push("/"); // Перенаправлення на головну сторінку
  //       Notification({ type: "success", message: res.statusText });
  //     }
  //   } catch (error: unknown) {
  //     const axiosError = error as AxiosErrorWithResponse;
  //     console.log(axiosError.response?.data);

  //     const notifyError: INotify = {
  //       type: "error",
  //       message:
  //         typeof axiosError.response?.data === "string"
  //           ? axiosError.response?.data
  //           : "Unknown error",
  //     };

  //     Notification(notifyError);
  //   }
  // };

  return (
    <div className="">
      <div className="">
        <div className="mt-4 flex flex-col items-center">
          <div className="flex gap-2">
            <p>Don't have an account?</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
