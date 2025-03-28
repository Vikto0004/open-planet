import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { UseFormSetValue } from "react-hook-form";
import * as Yup from "yup";

import { useDeleteSection } from "@/admin-shared/hooks/work-direction/useDeleteSection";
import {
  editFormSchema,
  sectionSchema,
} from "@/admin-shared/model/schemas/workDirectionYupSchemas";
import css from "@/admin-widgets/forms/forms.module.css";
import { LangType } from "@/i18n/routing";

const ParagraphTitleInput = ({
  section,
  setValue,
  index,
  lang,
  projectId,
}: {
  section: Yup.InferType<typeof sectionSchema>;
  setValue: UseFormSetValue<Yup.InferType<typeof editFormSchema>>;
  index: number;
  lang: string;
  projectId: string;
}) => {
  console.log("✅ section:", section);

  const contentValue: string = Array.isArray(section.content)
    ? section.content[0] || ""
    : section.content || "";

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(`${lang as LangType}.sections.${index}.content`, e.target.value);
  };

  const { mutate } = useDeleteSection();

  return (
    <>
      <label className={css.label} htmlFor={section.id}>
        Заголовок параграфа
      </label>
      <div className={css.inputAndButtonsWrapper}>
        <TextField
          id={section.id}
          defaultValue={contentValue}
          variant="filled"
          label="Придумайте заголовок параграфа"
          sx={{
            width: "calc(100% / 4)",
          }}
          onChange={onChange}
        />
        <Button
          variant="contained"
          sx={{
            textTransform: "none",
            backgroundColor: "#8A939B",
            minWidth: "30px",
            height: "25px",
          }}
          onClick={() => {
            mutate({ projectId: projectId, sectionId: section.id });
          }}
        >
          Видалити
        </Button>
      </div>
    </>
  );
};

export default ParagraphTitleInput;
