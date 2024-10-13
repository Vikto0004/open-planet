import { TextField, Divider } from "@mui/material";
import Button from "@mui/material/Button";
import { SubmitHandler, useForm } from "react-hook-form";

import { IGetWorkDirection } from "@/admin-shared/model/interfaces/workDirectionInterfaces";

import css from "../forms.module.css";

const EditForm = ({ data }: { data: IGetWorkDirection["workDirection"] }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IGetWorkDirection["workDirection"]>({
    defaultValues: { ...data },
  });

  const onSubmit: SubmitHandler<IGetWorkDirection["workDirection"]> = (data) =>
    console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={css.elementsWrapper}>
        {/*Main Title*/}
        <TextField
          variant="outlined"
          label="Головний заголовок"
          sx={{ width: "400px" }}
          {...register("cardTitle")}
        />
        {/*Space for main Image dragger*/}
        {/*----------------------------*/}
        <TextField
          variant="outlined"
          label="Перший заголовок"
          sx={{ width: "400px" }}
          {...register("firstTitle")}
        />
        <TextField
          variant="outlined"
          label="Перший опис"
          multiline
          rows={10}
          sx={{ width: "600px" }}
          {...register("firstDescription")}
        />
        <Divider></Divider>
        <TextField
          variant="outlined"
          label="Другий заголовок"
          sx={{ width: "400px" }}
          {...register("secondTitle")}
        />
        <TextField
          variant="outlined"
          label="Другий опис"
          multiline
          rows={10}
          sx={{ width: "600px" }}
          {...register("secondDescription")}
        />
      </div>
      <Button
        type="submit"
        variant="contained"
        sx={{
          textTransform: "none",
        }}
      >
        Зберегти
      </Button>
    </form>
  );
};

export default EditForm;
