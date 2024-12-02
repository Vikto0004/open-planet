import { TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import {
  UseFormHandleSubmit,
  UseFormSetValue,
  UseFormRegister,
  SubmitHandler,
} from "react-hook-form";
import * as Yup from "yup";

import { useUpdateDirection } from "@/admin-shared/hooks";
import {
  IWorkDirection,
  Section,
  allowedTypes,
} from "@/admin-shared/model/interfaces/workDirectionInterfaces";
import {
  editFormSchema,
  sectionSchema,
} from "@/admin-shared/model/schemas/workDirectionYupSchemas";
import BudgetCardsList from "@/admin-widgets/forms/budgetCardList/BudgetCardList";
import ImageListPlug from "@/admin-widgets/forms/imageListPlug/ImageListPlug";
import ParagraphInput from "@/admin-widgets/forms/paragraphInput/ParagraphInput";
import ParagraphTitleInput from "@/admin-widgets/forms/paragraphTitleInput/ParagraphTitleInput";
import { LangType } from "@/i18n/routing";

import css from "../forms.module.css";

const EditForm = ({
  data: editData,
  handleSubmit,
  setValue,
  register,
  lang,
}: {
  data: Yup.InferType<typeof editFormSchema>["en" | "ua"] & {
    workDirectionsType: allowedTypes[];
  };
  handleSubmit: UseFormHandleSubmit<Yup.InferType<typeof editFormSchema>>;
  setValue: UseFormSetValue<Yup.InferType<typeof editFormSchema>>;
  register: UseFormRegister<Yup.InferType<typeof editFormSchema>>;
  lang: string;
}) => {
  const { mutate } = useUpdateDirection();
  const onSubmit: SubmitHandler<Yup.InferType<typeof editFormSchema>> = (
    data: Yup.InferType<typeof editFormSchema>,
  ) => {
    console.log(data);
  };

  return (
    <Box sx={{ padding: "10px", width: "100%" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={css.editFormWrapper}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "30px" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: "30px" }}>
              <div className={css.elementWrapper}>
                <label className={css.label}>Головний заголовок</label>
                <TextField
                  key={editData.cardTitle}
                  defaultValue={editData.cardTitle}
                  variant="filled"
                  label="Придумайте заголовок"
                  onChange={(e) =>
                    setValue(`${lang as LangType}.cardTitle`, e.target.value)
                  }
                  sx={{
                    width: "calc(100vw / 4)",
                  }}
                />
              </div>
              <div className={css.elementWrapper}>
                <ImageListPlug text="Тут буде головне зображення яке ви додали у вкладці зображень" />
              </div>
            </Box>
            <div className={css.elementWrapper}>
              <label className={css.label}> Тип проекту</label>
              <FormControl fullWidth>
                <InputLabel id="label-type">Тип</InputLabel>
                <Select
                  labelId="label-type"
                  id="type"
                  label="Тип"
                  multiple
                  defaultValue={["medicine"]}
                  renderValue={(selected: allowedTypes[]) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value: allowedTypes) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                  {...register("workDirectionsType")}
                >
                  <MenuItem value="medicine">Медицина</MenuItem>
                  <MenuItem value="electric">Електрика</MenuItem>
                  <MenuItem value="education">Освіта</MenuItem>
                  <MenuItem value="restoration">Реставрація</MenuItem>
                  <MenuItem value="culture">Культура</MenuItem>
                </Select>
              </FormControl>
            </div>
          </Box>
          <Divider className={css.label} textAlign="center">
            Секції
          </Divider>
          {editData?.sections?.map(
            (section: Yup.InferType<typeof sectionSchema>, index) => {
              switch (section.type) {
                case "title":
                  return (
                    <div className={css.elementWrapper} key={section.id}>
                      <ParagraphTitleInput
                        section={section}
                        setValue={setValue}
                        index={index}
                        lang={lang}
                      />
                    </div>
                  );
                case "paragraph":
                  return (
                    <div className={css.elementWrapper} key={section.id}>
                      <ParagraphInput
                        section={section}
                        setValue={setValue}
                        index={index}
                        lang={lang}
                      />
                    </div>
                  );
                case "budgetCards":
                  return (
                    <div className={css.elementWrapper} key={section.id}>
                      <BudgetCardsList
                        data={section}
                        setValue={setValue}
                        index={index}
                        lang={lang}
                      />
                    </div>
                  );
                case "imageList":
                  return (
                    <div className={css.elementWrapper} key={section.id}>
                      <ImageListPlug
                        id={section.id}
                        text="Тут будуть зображення які ви додали у вкладці зображень"
                        deletable
                      />
                    </div>
                  );
              }
            },
          )}
          <Button
            variant="contained"
            sx={{ textTransform: "none", width: 100 }}
            type="submit"
          >
            Зберегти
          </Button>
        </div>
      </form>
    </Box>
  );
  // const { mutate, isPending } = useCreateMainImage();
  // const { mutate: mutateDelete, isPending: deleteMainImagePending } =
  //   useDeleteMainImage();
  // const { mutate: createImages, isPending: isCreating } = useCreateImages();
  // const { mutate: deleteImages, isPending: deleteImagesPending } =
  //   useDeleteImages();
  // const [allValid, setIsValid] = useState<{ id: string; status: boolean }[]>(
  //   [],
  // );
  //
  // const {
  //   register,
  //   handleSubmit,
  //   setValue,
  //   clearErrors,
  //   watch,
  //   formState: { errors },
  // } = useForm<Yup.InferType<typeof editFormSchema>>({
  //   defaultValues: {
  //     cardTitle: "",
  //     mainImg: editData?.mainImg,
  //     workDirectionsType: "",
  //     images: editData?.images,
  //   },
  //   resolver: yupResolver(editFormSchema),
  // });
  // const formValues = watch();
  //
  // useEffect(() => {
  //   const valid = checkFormIsValid(Object.values(formValues));
  //
  //   if (editData && editData._id) {
  //     setIsValid((prevState) => {
  //       if (prevState.length === 0) {
  //         return [
  //           ...prevState,
  //           {
  //             id: editData._id,
  //             status: valid,
  //           },
  //         ];
  //       } else if (
  //         prevState[0].id === editData._id &&
  //         prevState[0].status !== valid
  //       ) {
  //         return [{ ...prevState[0], status: valid }, ...prevState.slice(1)];
  //       }
  //       return prevState;
  //     });
  //   }
  // }, [editData, setValue, formValues]);
  //
  // const onSubmit: SubmitHandler<Yup.InferType<typeof editFormSchema>> = () =>
  //   console.log(!!errors);
  //
  // const postDirection = () => {
  //   console.log(allValid);
  // };
  //
  // if (editData) {
  //   const sectionCount = editData.sectionText.length;
  //   return (
  //     <>
  //       <form onSubmit={handleSubmit(onSubmit)} className={css.editForm}>
  //         <div className={css.editFormWrapper}>
  //           {/*Main Title*/}
  //           <TextField
  //             variant="outlined"
  //             label="Головний заголовок"
  //             onChange={(e) =>
  //               onChangeDebounced({
  //                 e,
  //                 name: "cardTitle",
  //                 setValue: setValue,
  //               })
  //             }
  //             className={css.firstTitle}
  //           />
  //           <div className={css.firstDragger}>
  //             <DraggerComponent
  //               config={{
  //                 id: editData._id,
  //                 fileName: "file",
  //                 defaultFiles: editData.mainImg
  //                   ? makeDefaultFilesArray(editData.mainImg)
  //                   : null,
  //                 clearErrors: clearErrors,
  //                 setValue: setValue,
  //                 name: "mainImg",
  //                 deleting: deleteMainImagePending,
  //                 title: "Завантажити головне зображення",
  //                 isPending: isPending,
  //                 mutateDelete: mutateDelete,
  //                 mutate: mutate as UseMutateFunction<
  //                   IWorkDirectionImages,
  //                   Error,
  //                   IMutateProps,
  //                   unknown
  //                 >,
  //               }}
  //             />
  //           </div>
  //           <Divider className={css.divider} orientation="vertical"></Divider>
  //           <div className={css.secondDragger}>
  //             <DraggerComponent
  //               config={{
  //                 id: editData._id,
  //                 fileName: "files",
  //                 defaultFiles: editData.images
  //                   ? makeDefaultFilesArray(editData.images)
  //                   : null,
  //                 clearErrors: clearErrors,
  //                 setValue: setValue,
  //                 name: "images",
  //                 multiple: true,
  //                 minCount: 5,
  //                 maxCount: 11,
  //                 deleting: deleteImagesPending,
  //                 title: "Додати зображення",
  //                 isPending: isCreating,
  //                 mutateDelete: deleteImages,
  //                 mutate: createImages as UseMutateFunction<
  //                   IWorkDirectionImages,
  //                   Error,
  //                   IMutateProps,
  //                   unknown
  //                 >,
  //               }}
  //             />
  //           </div>
  //           <FormControl fullWidth className={css.type}>
  //             <InputLabel id="label-type">Тип</InputLabel>
  //             <Select
  //               labelId="label-type"
  //               id="type"
  //               label="Тип"
  //               value={formValues.workDirectionsType}
  //               {...register("workDirectionsType")}
  //             >
  //               <MenuItem value="medicine">Медицина</MenuItem>
  //               <MenuItem value="electric">Електрика</MenuItem>
  //               <MenuItem value="education">Освіта</MenuItem>
  //               <MenuItem value="restoration">Реставрація</MenuItem>
  //               <MenuItem value="culture">Культура</MenuItem>
  //             </Select>
  //           </FormControl>
  //           <Divider
  //             className={css.horizontalDivider}
  //             orientation="horizontal"
  //           ></Divider>
  //           <div className={css.budgetCards}>
  //             <BudgetCardsCreator budgetCards={editData.budgetsCards} />
  //           </div>
  //           <Button
  //             className={css.saveButton}
  //             type="submit"
  //             variant="contained"
  //             sx={{
  //               textTransform: "none",
  //             }}
  //           >
  //             Зберегти
  //           </Button>
  //         </div>
  //       </form>
  //       {sectionCount === 0 ? (
  //         <CustomDivider action="add" cardId={editData._id} />
  //       ) : (
  //         <Divider
  //           textAlign="center"
  //           sx={{ marginTop: "10px", marginBottom: "10px", color: "#8A939B" }}
  //         >
  //           {`Кількість полів: ${sectionCount}`}
  //         </Divider>
  //       )}
  //       {sectionCount > 0 &&
  //         editData.sectionText.map((sectionData, index) => {
  //           const lastElement = sectionCount === index + 1;
  //           return (
  //             <SectionTextForm
  //               key={sectionData._id}
  //               sectionData={sectionData}
  //               cardId={editData._id}
  //               lastElement={lastElement}
  //               setIsValid={setIsValid}
  //               setValue={setValue}
  //               id={sectionData._id}
  //             />
  //           );
  //         })}
  //       <Button
  //         type="button"
  //         variant="contained"
  //         sx={{
  //           textTransform: "none",
  //           marginTop: "20px",
  //         }}
  //         onClick={postDirection}
  //         disabled={!allValid.every((obj) => obj.status)}
  //       >
  //         Опублікувати
  //       </Button>
  //     </>
  //   );
  // }
};

export default EditForm;
