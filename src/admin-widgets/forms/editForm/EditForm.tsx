import { SelectChangeEvent, TextField } from "@mui/material";
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
  SubmitHandler,
} from "react-hook-form";
import * as Yup from "yup";

import { useUpdateDirection } from "@/admin-shared/hooks";
import { allowedTypes } from "@/admin-shared/model/interfaces/workDirectionInterfaces";
import { editFormSchema } from "@/admin-shared/model/schemas/workDirectionYupSchemas";
import BudgetCardsList from "@/admin-widgets/forms/budgetCardList/BudgetCardList";
import ImageListPlug from "@/admin-widgets/forms/imageListPlug/ImageListPlug";
import ParagraphInput from "@/admin-widgets/forms/paragraphInput/ParagraphInput";
import ParagraphTitleInput from "@/admin-widgets/forms/paragraphTitleInput/ParagraphTitleInput";
import SubtitleInput from "@/admin-widgets/subtitleInput/SubtitleInput";
import { LangType } from "@/i18n/routing";

import css from "../forms.module.css";

const EditForm = ({
  data: editData,
  handleSubmit,
  setValue,
  lang,
  projectId,
}: {
  data: Yup.InferType<typeof editFormSchema>["en" | "ua"] & {
    workDirectionsType: allowedTypes[];
  };
  handleSubmit: UseFormHandleSubmit<Yup.InferType<typeof editFormSchema>>;
  setValue: UseFormSetValue<Yup.InferType<typeof editFormSchema>>;
  lang: string;
  projectId: string;
}) => {
  const { mutate } = useUpdateDirection();

  const onSubmit: SubmitHandler<Yup.InferType<typeof editFormSchema>> = (
    data: Yup.InferType<typeof editFormSchema>,
  ) => {
    console.log(data);
  };
  const onChangeTypes = (
    event: SelectChangeEvent<typeof editData.workDirectionsType>,
  ) => {
    const {
      target: { value },
    } = event;
    setValue(
      "workDirectionsType",
      typeof value === "string" ? value.split(",") : value,
    );
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
                  value={editData.cardTitle}
                  variant="filled"
                  label="Придумайте заголовок"
                  onChange={(e) =>
                    setValue(`${lang as LangType}.cardTitle`, e.target.value)
                  }
                  sx={{ width: "calc(100vw / 4)" }}
                />
              </div>
              <div className={css.elementWrapper}>
                <ImageListPlug text="Тут буде головне зображення яке ви додали у вкладці зображень" />
              </div>
            </Box>

            <div className={css.elementWrapper}>
              <label className={css.label}>Тип проекту</label>
              <FormControl sx={{ width: "calc(100vw / 4)" }}>
                <InputLabel id="label-type">Тип</InputLabel>
                <Select
                  labelId="label-type"
                  id="type"
                  label="Тип"
                  multiple
                  value={editData.workDirectionsType}
                  onChange={onChangeTypes}
                  renderValue={(selected: allowedTypes[]) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value: allowedTypes) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
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

          {editData?.sections?.map((section, index) => {
            switch (section.sectionType) {
              case "title":
                return (
                  <div className={css.elementWrapper} key={section.id}>
                    <ParagraphTitleInput
                      projectId={projectId}
                      section={section}
                      setValue={setValue}
                      index={index}
                      lang={lang}
                    />
                  </div>
                );
              case "subtitle":
                return (
                  <div className={css.elementWrapper} key={section.id}>
                    <SubtitleInput
                      projectId={projectId}
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
                      projectId={projectId}
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
                      projectId={projectId}
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
                      projectId={projectId}
                      id={section.id}
                      text="Тут будуть зображення які ви додали у вкладці зображень"
                      deletable
                    />
                  </div>
                );
              default:
                return null;
            }
          })}

          {/* Save Button */}
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
};

export default EditForm;
