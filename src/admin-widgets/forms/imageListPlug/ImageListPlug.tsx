import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

import { useCreateImages, useDeleteImages } from "@/admin-shared/hooks";
import { useDeleteSection } from "@/admin-shared/hooks/work-direction/useDeleteSection";

import css from "../forms.module.css";

const ImageListPlug = ({
  id,
  deletable = false,
  defaultImageUrls = [],
}: {
  id?: string;
  deletable?: boolean;
  defaultImageUrls?: string[];
}) => {
  const [projectId, setProjectId] = useState<string | null>(null);
  const [images, setImages] = useState<string[]>(defaultImageUrls);

  useEffect(() => {
    const pathParts = window.location.pathname.split("/");
    const projectIdFromUrl = pathParts[pathParts.length - 1];
    setProjectId(projectIdFromUrl);
  }, []);

  const { mutate: deleteSection } = useDeleteSection();
  const { mutate: createImages } = useCreateImages();
  const { mutate: deleteImages } = useDeleteImages();

  const onDrop = (acceptedFiles: File[]) => {
    if (!projectId || !id) return;

    const formData = new FormData();
    acceptedFiles.forEach((file) => formData.append("files", file));

    createImages(
      { _id: projectId, id, formData },
      {
        onSuccess: (data) => {
          console.log("Отримані дані після завантаження:", data);
          const newImages = data?.ua?.sections?.find(
            (section) => section.id === id,
          )?.content;

          if (Array.isArray(newImages)) {
            setImages((prevImages) => [...prevImages, ...newImages]);
          }
        },
      },
    );
  };

  const handleDeleteImage = (imageUrl: string) => {
    if (!projectId) return;

    deleteImages(
      { id: projectId, imageUrl },
      {
        onSuccess: () => {
          setImages((prevImages) =>
            prevImages.filter((img) => img !== imageUrl),
          );
        },
      },
    );
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
  });

  return (
    <>
      <label className={css.label}>Зображення</label>
      <Box sx={{ display: "flex", gap: "20px", alignItems: "flex-end" }}>
        <Box
          sx={{
            border: "2px dashed #8A939B",
            padding: "20px",
            borderRadius: "8px",
            width: "300px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          <p>Перетягніть зображення або натисніть для вибору</p>
        </Box>

        {images.length > 0 && (
          <Box sx={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {images.map((image, index) => (
              <Box key={index} sx={{ position: "relative" }}>
                <img
                  src={image}
                  alt={`Uploaded ${index}`}
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                  }}
                />
                <Button
                  variant="contained"
                  color="error"
                  sx={{ position: "absolute", top: "5px", right: "5px" }}
                  onClick={() => handleDeleteImage(image)}
                >
                  Видалити
                </Button>
              </Box>
            ))}
          </Box>
        )}

        {deletable && projectId && id && (
          <Button
            variant="contained"
            sx={{ textTransform: "none", backgroundColor: "#8A939B" }}
            onClick={() =>
              deleteSection({ projectId: projectId, sectionId: id })
            }
          >
            Видалити секцію
          </Button>
        )}
      </Box>
    </>
  );
};

export default ImageListPlug;
