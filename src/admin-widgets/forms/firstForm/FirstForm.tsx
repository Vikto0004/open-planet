import { yupResolver } from "@hookform/resolvers/yup";
import { TextField, Button } from "@mui/material";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { UseMutateFunction } from "@tanstack/react-query";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import yup from "yup";

import { Notification } from "@/admin-widgets/Notification/notification";
import { useCreateMainImage, useUpdateDirection } from "@/admin-shared/hooks";
import { useDeleteMainImage } from "@/admin-shared/hooks/work-direction/useDeleteMainImage";
import {
  IWorkDirectionImages,
  IMutateProps,
} from "@/admin-shared/model/interfaces/workDirectionInterfaces";
import { firstFormSchema } from "@/admin-shared/model/schemas/workDirectionYupSchemas";
import DraggerComponent from "@/admin-widgets/forms/dragger/DraggerComponent";
import { emptyObject } from "@/admin-widgets/forms/emptyObject";

import css from "../forms.module.css";

const FirstForm = ({
  id,
  closeModal,
}: {
  id: string | undefined;
  closeModal: () => void;
}) => {
  const { mutate: updateMutate, isPending: isLoading } = useUpdateDirection();
  const { mutate, isPending } = useCreateMainImage();
  const { mutate: mutateDelete, isPending: deletingImage } =
    useDeleteMainImage();

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<yup.InferType<typeof firstFormSchema>>({
    resolver: yupResolver(firstFormSchema),
    defaultValues: { cardTitle: "", mainImg: "", workDirectionsType: "" },
  });

  useEffect(() => {
    if (errors.workDirectionsType && errors.workDirectionsType.message) {
      Notification({ message: errors.workDirectionsType.message });
    }
  }, [errors]);
  const onSubmit: SubmitHandler<yup.InferType<typeof firstFormSchema>> = (
    data,
  ) => {
    if (id) {
      updateMutate(
        {
          id: id,
          data: {
            ...emptyObject,
            ...data,
            workDirectionsType: [data.workDirectionsType],
          },
        },
        {
          onSuccess: () => {
            closeModal();
          },
        },
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
      <div className={css.elementsWrapper}>
        <Box className={css.titleError}>{errors.cardTitle?.message}</Box>
        <TextField
          type="text"
          id="mainTitle"
          {...register("cardTitle")}
          size="small"
          label="Головний заголовок"
        />
        <Box className={css.imgError}>{errors.mainImg?.message}</Box>
        {id && (
          <DraggerComponent
            config={{
              id: id,
              fileName: "file",
              clearErrors: clearErrors,
              setValue: setValue,
              name: "mainImg",
              deleting: deletingImage,
              title: "Завантажити головне зображення",
              isPending: isPending,
              mutateDelete: mutateDelete,
              mutate: mutate as UseMutateFunction<
                IWorkDirectionImages,
                Error,
                IMutateProps,
                unknown
              >,
            }}
          />
        )}
        <FormControl
          fullWidth
          sx={{ position: "absolute", top: "300px", width: "400px" }}
        >
          <InputLabel id="label-type">Type</InputLabel>
          <Select
            labelId="label-type"
            id="type"
            label="Type"
            {...register("workDirectionsType")}
          >
            <MenuItem value="medicine">Медицина</MenuItem>
            <MenuItem value="electric">Електрика</MenuItem>
            <MenuItem value="education">Освіта</MenuItem>
            <MenuItem value="restoration">Реставрація</MenuItem>
            <MenuItem value="culture">Культура</MenuItem>
          </Select>
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          sx={{
            textTransform: "none",
            position: "absolute",
            bottom: "32px",
            right: "32px",
            width: "80px",
          }}
          disabled={isLoading}
        >
          Зберегти
        </Button>
      </div>
    </form>
  );
};
export default FirstForm;
