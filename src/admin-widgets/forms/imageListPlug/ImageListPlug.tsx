import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone"; // Для drag-and-drop завантаження файлів

import { useDeleteSection } from "@/admin-shared/hooks/work-direction/useDeleteSection";

import css from "../forms.module.css";

const ImageListPlug = ({
  projectId,
  id,
  deletable = false,
  defaultImageUrls = [], // Новий пропс для дефолтних URL
}: {
  projectId?: string;
  id?: string;
  deletable?: boolean;
  defaultImageUrls?: string[]; // Масив дефолтних URL зображень
}) => {
  const { mutate } = useDeleteSection();
  const [images, setImages] = useState<string[]>(defaultImageUrls); // Стан для зображень

  // Обробка завантаження зображень через drag-and-drop
  const onDrop = (acceptedFiles: File[]) => {
    const imageUrls = acceptedFiles.map(
      (file) => URL.createObjectURL(file), // створюємо тимчасову URL для відображення зображення
    );
    setImages((prevImages) => [...prevImages, ...imageUrls]); // Додаємо нові зображення до стану
  };

  // Ініціалізація drag-and-drop
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*", // дозволяємо завантаження тільки зображень
  });

  // Оновлення зображень на сервері або в локальному сховищі
  const handleUploadImage = (index: number, file: File) => {
    // Для кожного зображення можна додати логіку завантаження на сервер
    const updatedImages = [...images];
    updatedImages[index] = URL.createObjectURL(file); // Заміщаємо старе зображення на нове
    setImages(updatedImages);
  };

  return (
    <>
      <label className={css.label}>Зображення</label>
      <Box sx={{ display: "flex", gap: "20px", alignItems: "flex-end" }}>
        {/* Завантаження зображень через drag-and-drop */}
        <Box
          sx={{
            border: "2px dashed #8A939B",
            padding: "20px",
            borderRadius: "8px",
            width: "300px",
            height: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
          {...getRootProps()}
          я
        >
          <input {...getInputProps()} />
          <p>Перетягніть зображення або натисніть для вибору</p>
        </Box>

        {/* Попередній перегляд завантажених зображень */}
        {images.length > 0 && (
          <Box sx={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {images.map((image, index) => (
              <Box key={index} sx={{ position: "relative" }}>
                <img
                  src={image}
                  alt={`Uploaded image ${index}`}
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                  }}
                />
                <Button
                  variant="contained"
                  sx={{
                    position: "absolute",
                    top: "5px",
                    right: "5px",
                    backgroundColor: "red",
                    padding: "5px",
                  }}
                  onClick={() => handleUploadImage(index, image)} // Логіка для заміни зображення
                >
                  Замість
                </Button>
              </Box>
            ))}
          </Box>
        )}

        {deletable && (
          <Button
            variant="contained"
            sx={{
              textTransform: "none",
              backgroundColor: "#8A939B",
              minWidth: "30px",
              height: "25px",
            }}
            onClick={() => {
              if (projectId && id) {
                mutate({ projectId: projectId, sectionId: id });
              }
            }}
          >
            Видалити
          </Button>
        )}
      </Box>
    </>
  );
};

export default ImageListPlug;
