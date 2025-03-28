import DeleteIcon from "@mui/icons-material/Delete";
import ImageIcon from "@mui/icons-material/Image";
import { SelectChangeEvent } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { debounce } from "lodash";
import React, { useState, useEffect } from "react";
import { UseFormSetValue } from "react-hook-form";

import { useDeleteMainImage } from "@/admin-shared/hooks/work-direction/useDeleteMainImage";
import { allowedTypes } from "@/admin-shared/model/interfaces/workDirectionInterfaces";
import { LangType } from "@/i18n/routing";

import css from "../forms.module.css";

interface AddFieldFormProps {
  editData?: {
    cardTitle: string;
    workDirectionsType: allowedTypes[];
    mainImg: string;
  };
  setValue: UseFormSetValue<any>;
  lang: string;
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectedFile: File | null;
  onChangeTypes: (event: SelectChangeEvent<allowedTypes[]>) => void;
  setSelectedFile: (file: File | null) => void;
}

const AddFieldForm = ({
  editData,
  setValue,
  lang,
  onFileChange,
  selectedFile,
  onChangeTypes,
  setSelectedFile,
}: AddFieldFormProps) => {
  const { mutate: deleteImage, isLoading: isDeleting } = useDeleteMainImage();

  // Стан для заголовка з debounce
  const [title, setTitle] = useState(editData?.cardTitle ?? "");

  useEffect(() => {
    const debouncedUpdate = debounce((value) => {
      setValue(`${lang as LangType}.cardTitle`, value);
    }, 300);

    debouncedUpdate(title);

    return () => debouncedUpdate.cancel();
  }, [title, setValue, lang]);

  const handleDeleteImage = () => {
    if (editData?.mainImg) {
      deleteImage(editData.mainImg, {
        onSuccess: () => {
          setValue("editData.mainImg", ""); // Очищаємо форму
          setSelectedFile(null);
        },
      });
    } else {
      setSelectedFile(null);
    }
  };

  if (!editData) {
    return <p>Завантаження...</p>;
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "30px" }}>
      {/* Заголовок */}
      <Box sx={{ display: "flex", alignItems: "center", gap: "30px" }}>
        <div className={css.elementWrapper}>
          <label className={css.label}>Головний заголовок</label>
          <TextField
            value={title}
            variant="filled"
            label="Придумайте заголовок"
            onChange={(e) => setTitle(e.target.value)}
            sx={{ width: "calc(100vw / 4)" }}
          />
        </div>
      </Box>

      {/* Завантаження зображення */}
      <div className={css.elementWrapper}>
        <label className={css.label}>Завантажити зображення</label>
        <input
          type="file"
          accept="image/*"
          onChange={onFileChange}
          hidden
          id="upload-image"
        />
        <label htmlFor="upload-image">
          <Button
            component="span"
            variant="contained"
            startIcon={<ImageIcon />}
          >
            Обрати файл
          </Button>
        </label>

        {/* Попередній перегляд або поточне зображення */}
        {(selectedFile || editData.mainImg) && (
          <Box sx={{ mt: 2, display: "flex", alignItems: "center", gap: 2 }}>
            <img
              src={
                selectedFile
                  ? URL.createObjectURL(selectedFile)
                  : editData.mainImg
              }
              alt="Прев’ю"
              width={100}
              height={100}
            />
            <p>{selectedFile ? selectedFile.name : "Поточне зображення"}</p>
            <IconButton
              onClick={handleDeleteImage}
              color="error"
              disabled={isDeleting}
            >
              {isDeleting ? <CircularProgress size={20} /> : <DeleteIcon />}
            </IconButton>
          </Box>
        )}
      </div>

      {/* Тип проекту */}
      <div className={css.elementWrapper}>
        <label className={css.label}>Тип проекту</label>
        <FormControl sx={{ width: "calc(100vw / 4)" }}>
          <InputLabel id="label-type">Тип</InputLabel>
          <Select
            labelId="label-type"
            id="type"
            multiple
            value={editData.workDirectionsType ?? []}
            onChange={onChangeTypes}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.length > 0 ? (
                  selected.map((value) => <Chip key={value} label={value} />)
                ) : (
                  <span style={{ color: "#999" }}>Оберіть тип</span>
                )}
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
