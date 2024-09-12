"use client";

const Register = () => {
  // const router = useRouter();

  // const onSubmit = async (
  //   values: IFormRegistration,
  //   actions: FormikHelpers<IFormRegistration>,
  // ) => {
  //   try {
  //     const res = await axios.post("/api/auth/register", values);

  //     if (res.status === 201) {
  //       router.push("/login"); // Перенаправлення на сторінку логіну
  //       actions.resetForm();
  //       Notification({ type: "success", message: res.statusText });
  //     }
  //   } catch (error: unknown) {
  //     const axiosError = error as AxiosErrorWithResponse;

  //     const notifyError: INotify = {
  //       type: "error",
  //       message:
  //         typeof axiosError.response?.data?.message === "string"
  //           ? axiosError.response?.data.message
  //           : "Unknown error",
  //     };

  //     Notification(notifyError);
  //   }
  // };

  return (
    <div className="">
      <div className="mt-4 flex flex-col items-center">
        <div className="flex gap-2">
          <p>Already have an account?</p>
        </div>
      </div>
    </div>
  );
};

export default Register;
