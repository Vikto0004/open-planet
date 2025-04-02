import { Box, SelectChangeEvent } from "@mui/material";
import { UseFormSetValue } from "react-hook-form";

import { allowedTypes } from "@/admin-shared/model/interfaces/workDirectionInterfaces";
import { LangType } from "@/i18n/routing";

import css from "../forms.module.css";

import ImageUploader from "./EditFormFieldComponents/ImageUploader";
import ProjectTypeSelector from "./EditFormFieldComponents/ProjectTypeSelector";

interface AddFieldFormProps {
  _id: string;
  editData?: {
    cardTitle: string;
    workDirectionsType: allowedTypes[];
    mainImg: string;
  };
  setValue: UseFormSetValue<any>;
  lang: LangType;
  onChangeTypes: (event: SelectChangeEvent<allowedTypes[]>) => void;
}

const AddFieldForm = ({
  _id,
  editData,
  setValue,
  lang,
  onChangeTypes,
}: AddFieldFormProps) => {
  if (!editData) {
    return <p>Завантаження...</p>;
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "30px" }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: "30px" }}>
        <div className={css.elementWrapper}>
          <label className={css.label}>Головний заголовок</label>
          <input
            type="text"
            value={editData.cardTitle ?? ""}
            onChange={(e) => setValue(`${lang}.cardTitle`, e.target.value)}
            placeholder="Придумайте заголовок"
            style={{
              width: "calc(100vw / 4)",
              height: "40px",
              padding: "8px",
              borderRadius: "4px",
            }}
          />
        </div>
      </Box>

      <ImageUploader _id={_id} mainImg={editData.mainImg} setValue={setValue} />

      <ProjectTypeSelector
        selectedTypes={editData.workDirectionsType}
        onChangeTypes={onChangeTypes}
      />
    </Box>
  );
};

export default AddFieldForm;
