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

const ImageUploader = ({ setValue }: ImageUploaderProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [projectId, setProjectId] = useState<string>("");

  const { mutate: createImage, isLoading: isCreating } = useCreateMainImage();
  const { mutate: deleteImage, isLoading: isDeleting } = useDeleteMainImage();

  useEffect(() => {
    const pathParts = window.location.pathname.split("/");
    const id = pathParts[pathParts.length - 1];
    setProjectId(id);
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append("file", file);
    createImage({ _id: projectId, formData });
    setValue("data.mainImg", file);
  };

  const handleDeleteImage = () => {
    if (selectedFile) {
      deleteImage(selectedFile.name);
    }

    setSelectedFile(null);
    setPreviewUrl(null);
    setValue("data.mainImg", "");
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        hidden
        id="upload-image"
      />
      <label htmlFor="upload-image">
        <Button component="span" variant="contained" startIcon={<ImageIcon />}>
          Обрати файл
        </Button>
      </label>

      {previewUrl && (
        <Box sx={{ mt: 2, display: "flex", alignItems: "center", gap: 2 }}>
          <img src={previewUrl} alt="Прев’ю" width={100} height={100} />
          <IconButton
            onClick={handleDeleteImage}
            color="error"
            disabled={isDeleting}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      )}
    </div>
  );
};

export default ImageUploader;
