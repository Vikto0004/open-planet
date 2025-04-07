import DeleteIcon from "@mui/icons-material/Delete";
import ImageIcon from "@mui/icons-material/Image";
import { Box, Button, IconButton } from "@mui/material";
import { useState, useEffect } from "react";
import { UseFormSetValue } from "react-hook-form";

import { useCreateMainImage } from "@/admin-shared/hooks";
import { useDeleteMainImage } from "@/admin-shared/hooks/work-direction/useDeleteMainImage";

interface ImageUploaderProps {
  id: string;
  mainImg: string;
  setValue: UseFormSetValue<any>;
}

const ImageUploader = ({ id, mainImg, setValue }: ImageUploaderProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [currentImgUrl, setCurrentImgUrl] = useState<string>(mainImg || "");

  const { mutate: createImage, isLoading: isCreating } = useCreateMainImage();
  const { mutate: deleteImage, isLoading: isDeleting } = useDeleteMainImage();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append("file", file);
    createImage({ _id: id, formData });

    setValue("data.mainImg", file);
  };

  const handleDeleteImage = () => {
    if (currentImgUrl) {
      deleteImage(currentImgUrl);
    }

    setSelectedFile(null);
    setPreviewUrl(null);
    setCurrentImgUrl("");
    setValue("data.mainImg", "");
  };

  return (
    <div>
      {currentImgUrl && !previewUrl && (
        <Box sx={{ mt: 2, display: "flex", alignItems: "center", gap: 2 }}>
          <img src={currentImgUrl} alt="Main Image" width={100} height={100} />
          <IconButton
            onClick={handleDeleteImage}
            color="error"
            disabled={isDeleting}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      )}

      {previewUrl && (
        <Box sx={{ mt: 2, display: "flex", alignItems: "center", gap: 2 }}>
          <img src={previewUrl} alt="Preview" width={100} height={100} />
          <IconButton
            onClick={handleDeleteImage}
            color="error"
            disabled={isDeleting}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      )}

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        hidden
        id="upload-image"
      />
      <label htmlFor="upload-image">
        <Button
          component="span"
          variant="contained"
          startIcon={<ImageIcon />}
          disabled={isCreating}
        >
          Обрати файл
        </Button>
      </label>
    </div>
  );
};

export default ImageUploader;
