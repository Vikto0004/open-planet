import { InboxOutlined } from "@ant-design/icons";
import { TextField, Button } from "@mui/material";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useTheme } from "@mui/material/styles";
import type { UploadProps } from "antd";
import { message, Upload } from "antd";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import yup from "yup";

import { Notification } from "@/admin-components/ui/notification";
import { useCreateMainImage, useUpdateDirection } from "@/admin-shared/hooks";
import { useDeleteMainImage } from "@/admin-shared/hooks/work-direction/useDeleteMainImage";
import { firstFormSchema } from "@/admin-shared/model/schemas/workDirectionYupSchemas";
import { emptyObject } from "@/admin-widgets/forms/firstForm/emptyObject";

const { Dragger } = Upload;

import css from "../forms.module.css";

import { yupResolver } from "@hookform/resolvers/yup";

const FirstForm = ({
                     id,
                     closeModal,
                   }: {
  id: string | undefined;
  closeModal: () => void;
}) => {
  const { mutate, isPending, isError } = useCreateMainImage();
  const { mutate: updateMutate, isPending: isLoading } = useUpdateDirection();
  const { mutate: mutateDelete } = useDeleteMainImage();
  const { palette } = useTheme();

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<yup.InferType<typeof firstFormSchema>>({
    resolver: yupResolver(firstFormSchema),
    defaultValues: { cardTitle: "", mainImg: "", workDirectionsType: "" },
  });

  useEffect(() => {
    if (errors.workDirectionsType && errors.workDirectionsType.message) {
      Notification({ message: errors.workDirectionsType.message });
    }
  }, [errors]);
  const onSubmit: SubmitHandler<yup.InferType<typeof firstFormSchema>> = (
    data,
  ) => {
    if (id) {
      updateMutate(
        {
          id: id,
          data: {
            ...emptyObject,
            ...data,
            workDirectionsType: [data.workDirectionsType],
          },
        },
        {
          onSuccess: () => {
            closeModal();
          },
        },
      );
    }
  };

  const props: UploadProps = {
    name: "file",
    accept: ".jpg, .jpeg",
    maxCount: 1,
    customRequest: (options) => {
      const { file, onProgress, onSuccess } = options;
      const formData = new FormData();

      formData.append("file", file);
      if (id) {
        mutate(
          { id, formData },
          {
            onSuccess: (data) => {
              if (onProgress) {
                onProgress({ percent: 100 });
                onSuccess?.("ok");
                clearErrors("mainImg");
              }
              setValue("mainImg", data.result.mainImg);
            },
            onError: (error) => {
              message.error(`File upload failed: ${error.message}`);
            },
          },
        );
      }
    },
    onRemove: () => {
      if (id) {
        mutateDelete(id);
        setValue("mainImg", "");
      } else {
        return;
      }
    },
    showUploadList: { showRemoveIcon: !isPending },
  };
  console.log(id);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
      <div className={css.elementsWrapper}>
        <Box className={css.titleError}>{errors.cardTitle?.message}</Box>
        <TextField
          type="text"
          id="mainTitle"
          {...register("cardTitle")}
          size="small"
          label="Головний заголовок"
        />
        <Box className={css.imgError}>{errors.mainImg?.message}</Box>
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p
            className={
              palette.mode === "dark"
                ? css.dropboxLightText
                : css.dropboxDarkText
            }
          >
            Завантажити головне зображення
          </p>
        </Dragger>
        <FormControl
          fullWidth
          sx={{ position: "absolute", top: "300px", width: "400px" }}
        >
          <InputLabel id="label-type">Type</InputLabel>
          <Select
            labelId="label-type"
            id="type"
            label="Type"
            {...register("workDirectionsType")}
          >
            <MenuItem value="medicine">Медицина</MenuItem>
            <MenuItem value="electric">Електрика</MenuItem>
            <MenuItem value="education">Освіта</MenuItem>
            <MenuItem value="restoration">Реставрація</MenuItem>
            <MenuItem value="culture">Культура</MenuItem>
          </Select>
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          sx={{
            textTransform: "none",
            position: "absolute",
            bottom: "32px",
            right: "32px",
            width: "80px",
          }}
          disabled={isLoading}
        >
          Зберегти
        </Button>
      </div>
    </form>
  );
};
export default FirstForm;
