import { yupResolver } from "@hookform/resolvers/yup";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { UseMutateFunction } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as Yup from "yup";

import {
  useCreateImages,
  useCreateMainImage,
  useDeleteImages,
} from "@/admin-shared/hooks";
import { useDeleteMainImage } from "@/admin-shared/hooks/work-direction/useDeleteMainImage";
import { checkFormIsValid } from "@/admin-shared/lib/checkFormIsValid";
import { onChangeDebounced } from "@/admin-shared/lib/debounceInput";
import { makeDefaultFilesArray } from "@/admin-shared/lib/makeDefaultFilesArray";
import {
  IWorkDirection,
  IWorkDirectionImages,
  IMutateProps,
} from "@/admin-shared/model/interfaces/workDirectionInterfaces";
import { editFormSchema } from "@/admin-shared/model/schemas/workDirectionYupSchemas";
import CustomDivider from "@/admin-widgets/divider/CustomDivider";
import DraggerComponent from "@/admin-widgets/forms/dragger/DraggerComponent";
import SectionTextForm from "@/admin-widgets/forms/sectionTextForm/SectionTextForm";
import BudgetCardsCreator from "@/admin-widgets/work-direction/budgetCardsCreator/BudgetCardsCreator";

import css from "../forms.module.css";

const EditForm = ({ data: editData }: { data: IWorkDirection["response"] }) => {
  const { mutate, isPending } = useCreateMainImage();
  const { mutate: mutateDelete, isPending: deleteMainImagePending } =
    useDeleteMainImage();
  const { mutate: createImages, isPending: isCreating } = useCreateImages();
  const { mutate: deleteImages, isPending: deleteImagesPending } =
    useDeleteImages();
  const [allValid, setIsValid] = useState<{ id: string; status: boolean }[]>(
    [],
  );

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    watch,
    formState: { errors },
  } = useForm<Yup.InferType<typeof editFormSchema>>({
    defaultValues: {
      cardTitle: "",
      mainImg: editData?.mainImg,
      workDirectionsType: "",
      images: editData?.images,
    },
    resolver: yupResolver(editFormSchema),
  });
  const formValues = watch();

  useEffect(() => {
    const valid = checkFormIsValid(Object.values(formValues));

    if (editData && editData._id) {
      setIsValid((prevState) => {
        if (prevState.length === 0) {
          return [
            ...prevState,
            {
              id: editData._id,
              status: valid,
            },
          ];
        } else if (
          prevState[0].id === editData._id &&
          prevState[0].status !== valid
        ) {
          return [{ ...prevState[0], status: valid }, ...prevState.slice(1)];
        }
        return prevState;
      });
    }
  }, [editData, setValue, formValues]);

  const onSubmit: SubmitHandler<Yup.InferType<typeof editFormSchema>> = () =>
    console.log(!!errors);

  const postDirection = () => {
    console.log(allValid);
  };

  if (editData) {
    const sectionCount = editData.sectionText.length;
    return (
      <>
        <form onSubmit={handleSubmit(onSubmit)} className={css.editForm}>
          <div className={css.editFormWrapper}>
            {/*Main Title*/}
            <TextField
              variant="outlined"
              label="Головний заголовок"
              onChange={(e) =>
                onChangeDebounced({
                  e,
                  name: "cardTitle",
                  setValue: setValue,
                })
              }
              className={css.firstTitle}
            />
            <div className={css.firstDragger}>
              <DraggerComponent
                config={{
                  id: editData._id,
                  fileName: "file",
                  defaultFiles: editData.mainImg
                    ? makeDefaultFilesArray(editData.mainImg)
                    : null,
                  clearErrors: clearErrors,
                  setValue: setValue,
                  name: "mainImg",
                  deleting: deleteMainImagePending,
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
            </div>
            <Divider className={css.divider} orientation="vertical"></Divider>
            <div className={css.secondDragger}>
              <DraggerComponent
                config={{
                  id: editData._id,
                  fileName: "files",
                  defaultFiles: editData.images
                    ? makeDefaultFilesArray(editData.images)
                    : null,
                  clearErrors: clearErrors,
                  setValue: setValue,
                  name: "images",
                  multiple: true,
                  minCount: 5,
                  maxCount: 11,
                  deleting: deleteImagesPending,
                  title: "Додати зображення",
                  isPending: isCreating,
                  mutateDelete: deleteImages,
                  mutate: createImages as UseMutateFunction<
                    IWorkDirectionImages,
                    Error,
                    IMutateProps,
                    unknown
                  >,
                }}
              />
            </div>
            <FormControl fullWidth className={css.type}>
              <InputLabel id="label-type">Тип</InputLabel>
              <Select
                labelId="label-type"
                id="type"
                label="Тип"
                value={formValues.workDirectionsType}
                {...register("workDirectionsType")}
              >
                <MenuItem value="medicine">Медицина</MenuItem>
                <MenuItem value="electric">Електрика</MenuItem>
                <MenuItem value="education">Освіта</MenuItem>
                <MenuItem value="restoration">Реставрація</MenuItem>
                <MenuItem value="culture">Культура</MenuItem>
              </Select>
            </FormControl>
            <Divider
              className={css.horizontalDivider}
              orientation="horizontal"
            ></Divider>
            <div className={css.budgetCards}>
              <BudgetCardsCreator budgetCards={editData.budgetsCards} />
            </div>
            <Button
              className={css.saveButton}
              type="submit"
              variant="contained"
              sx={{
                textTransform: "none",
              }}
            >
              Зберегти
            </Button>
          </div>
        </form>
        {sectionCount === 0 ? (
          <CustomDivider action="add" cardId={editData._id} />
        ) : (
          <Divider
            textAlign="center"
            sx={{ marginTop: "10px", marginBottom: "10px", color: "#8A939B" }}
          >
            {`Кількість полів: ${sectionCount}`}
          </Divider>
        )}
        {sectionCount > 0 &&
          editData.sectionText.map((sectionData, index) => {
            const lastElement = sectionCount === index + 1;
            return (
              <SectionTextForm
                key={sectionData._id}
                sectionData={sectionData}
                cardId={editData._id}
                lastElement={lastElement}
                setIsValid={setIsValid}
                setValue={setValue}
                id={sectionData._id}
              />
            );
          })}
        <Button
          type="button"
          variant="contained"
          sx={{
            textTransform: "none",
            marginTop: "20px",
          }}
          onClick={postDirection}
          disabled={!allValid.every((obj) => obj.status)}
        >
          Опублікувати
        </Button>
      </>
    );
  }
};

export default EditForm;
