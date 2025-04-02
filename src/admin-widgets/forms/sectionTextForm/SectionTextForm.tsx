import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import {
  FieldValues,
  SubmitHandler,
  useForm,
  type UseFormSetValue,
} from "react-hook-form";

import { checkFormIsValid } from "@/admin-shared/lib/checkFormIsValid";
import { ITexts } from "@/admin-shared/model/interfaces/workDirectionInterfaces";
import CustomDivider from "@/admin-widgets/divider/CustomDivider";

import css from "../forms.module.css";

const SectionTextForm = <T extends FieldValues>({
  sectionData,
  cardId,
  lastElement,
  setIsValid,
  // setValue,
  id,
}: {
  sectionData: ITexts;
  cardId: string;
  lastElement: boolean;
  setIsValid: Dispatch<SetStateAction<{ id: string; status: boolean }[]>>;
  setValue: UseFormSetValue<T>;
  id: string;
}) => {
  const [isValidSection, setIsValidSection] = useState<{
    id: string;
    status: boolean;
  }>({
    id: `${id}`,
    status: false,
  });
  const {
    register,
    handleSubmit,

    watch,
  } = useForm({
    defaultValues: { title: sectionData.title, text: sectionData.text },
  });

  const formValues = watch(["title", "text"]);

  useEffect(() => {
    const valid = checkFormIsValid(formValues);
    if (isValidSection.status !== valid) {
      setIsValidSection((prevState) => {
        return { ...prevState, status: valid };
      });
    }

    setIsValid((prevState) => {
      const sectionExist = prevState.find((value) => value.id === id);

      if (!sectionExist) {
        return [...prevState, { id, status: valid }];
      }

      if (sectionExist.status !== valid) {
        return prevState.map((obj) =>
          obj.id === id ? { ...obj, status: valid } : obj,
        );
      }

      return prevState;
    });
  }, [id, setIsValid, isValidSection, formValues]);

  const onSubmit: SubmitHandler<Omit<ITexts, "_id">> = (data) =>
    console.log(data);

  return (
    <>
      <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={css.elementsWrapper}>
          <TextField
            type="text"
            {...register("title")}
            label="Заголовок поля"
          />
          <TextField type="text" {...register("text")} label="Опис поля" />
        </div>
        <Button
          type="submit"
          variant="contained"
          sx={{
            textTransform: "none",
            marginTop: "20px",
          }}
        >
          Зберегти
        </Button>
      </form>
      {lastElement ? (
        <CustomDivider
          action="both"
          cardId={cardId}
          sectionId={sectionData._id}
          text={sectionData.text || ""}
        />
      ) : (
        <CustomDivider
          action="delete"
          cardId={cardId}
          sectionId={sectionData._id}
          text={sectionData.text || ""}
        />
      )}
    </>
  );
};

export default SectionTextForm;
