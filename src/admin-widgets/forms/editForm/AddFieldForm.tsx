import { SelectChangeEvent } from "@mui/material";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { UseFormSetValue } from "react-hook-form";

import { allowedTypes } from "@/admin-shared/model/interfaces/workDirectionInterfaces";
import { LangType } from "@/i18n/routing";

import css from "../forms.module.css";

interface AddFieldFormProps {
  editData: {
    cardTitle: string;
    workDirectionsType: allowedTypes[];
  };
  setValue: UseFormSetValue<any>;
  lang: string;
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectedFile: File | null;
  onChangeTypes: (
    event: SelectChangeEvent<typeof editData.workDirectionsType>,
  ) => void;
}

const AddFieldForm = ({
  editData,
  setValue,
  lang,
  onFileChange,
  selectedFile,
  onChangeTypes,
}: AddFieldFormProps) => {
  return (
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
      </Box>

      <div className={css.elementWrapper}>
        <label className={css.label}>Завантажити зображення</label>
        <input type="file" accept="image/*" onChange={onFileChange} />
        {selectedFile && <p>Вибрано: {selectedFile.name}</p>}
      </div>

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
  );
};

export default AddFieldForm;
