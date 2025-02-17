import { yupResolver } from "@hookform/resolvers/yup";
import { TextField, Button } from "@mui/material";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import yup from "yup";

import { useCreateDirection } from "@/admin-shared/hooks";
import { allowedTypes } from "@/admin-shared/model/interfaces/workDirectionInterfaces";
import { firstFormSchema } from "@/admin-shared/model/schemas/workDirectionYupSchemas";
import FormError from "@/admin-widgets/forms/formError/FormError";

import css from "../forms.module.css";

const FirstForm = ({ closeModal }: { closeModal: () => void }) => {
  const { mutate } = useCreateDirection();
  const [selectedType, setSelectedType] = useState<allowedTypes[]>([
    "medicine",
  ]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<yup.InferType<typeof firstFormSchema>>({
    resolver: yupResolver(firstFormSchema),
    defaultValues: {
      ua: { cardTitle: "" },
      en: { cardTitle: "" },
      workDirectionsType: ["medicine"],
    },
  });

  const handleTypeChange = (event: SelectChangeEvent<allowedTypes>) => {
    const value = event.target.value as allowedTypes;
    setSelectedType([value]);
    setValue("workDirectionsType", [value]);
  };

  const onSubmit: SubmitHandler<yup.InferType<typeof firstFormSchema>> = (
    data,
  ) => {
    mutate(data);
    closeModal();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
      <div className={css.elementsWrapper}>
        <label htmlFor="mainTitle" className={css.firstFormLabel}>
          Заповніть поля
        </label>
        <div className={css.elementWrapper}>
          <label htmlFor="mainTitle" className={css.label}>
            Заголовок на українській мові
          </label>
          <TextField
            type="text"
            id="mainTitle"
            {...register("ua.cardTitle")}
            size="small"
            label="Головний заголовок"
          />
        </div>
        <div className={css.elementWrapper}>
          <label htmlFor="mainTitle" className={css.label}>
            Заголовок на англійській мові
          </label>
          <TextField
            type="text"
            id="mainTitle"
            {...register("en.cardTitle")}
            size="small"
            label="Головний заголовок"
          />
        </div>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <div className={css.elementWrapper}>
            <label htmlFor="mainTitle" className={css.label}>
              Тип проекту
            </label>
            <FormControl fullWidth>
              <InputLabel id="label-type">Тип</InputLabel>
              <Select
                labelId="label-type"
                id="type"
                label="Тип"
                value={selectedType[0]}
                onChange={handleTypeChange}
              >
                <MenuItem value="medicine">Медицина</MenuItem>
                <MenuItem value="electric">Електрика</MenuItem>
                <MenuItem value="education">Освіта</MenuItem>
                <MenuItem value="restoration">Реставрація</MenuItem>
                <MenuItem value="culture">Культура</MenuItem>
              </Select>
            </FormControl>
          </div>
          {errors.ua?.cardTitle?.message && (
            <FormError>{errors.ua?.cardTitle.message}</FormError>
          )}
          {errors.en?.cardTitle?.message && (
            <FormError>{errors.en?.cardTitle.message}</FormError>
          )}
          {errors.workDirectionsType?.message && (
            <FormError>{errors.workDirectionsType.message}</FormError>
          )}
        </Box>
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
        >
          Створити
        </Button>
      </div>
    </form>
  );
};

export default FirstForm;
