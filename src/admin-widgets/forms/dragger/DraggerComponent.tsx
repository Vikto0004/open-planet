import { InboxOutlined } from "@ant-design/icons";
import { useTheme } from "@mui/material/styles";
import { UseMutateFunction } from "@tanstack/react-query";
import { message, Upload } from "antd";
import type { UploadProps } from "antd";
import type {
  UseFormClearErrors,
  FieldValues,
  UseFormSetValue,
  Path,
  PathValue,
} from "react-hook-form";

import { IWorkDirectionImages } from "@/admin-shared/model/interfaces/workDirectionInterfaces";
import css from "@/admin-widgets/forms/forms.module.css";

const { Dragger } = Upload;

interface IDraggerComponentProps<
  T extends FieldValues,
  TDelete,
  TDeleteProps,
  TData extends IWorkDirectionImages,
  TProps,
> {
  fileName: string;
  id: string;
  name: Path<T>;
  maxCount?: number;
  isPending: boolean;
  clearErrors: UseFormClearErrors<T>;
  setValue: UseFormSetValue<T>;
  mutateDelete: UseMutateFunction<TDelete, Error, TDeleteProps, unknown>;
  mutate: UseMutateFunction<TData, Error, TProps, unknown>;
}

const DraggerComponent = <
  T extends FieldValues,
  TDelete,
  TDeleteProps,
  TData extends IWorkDirectionImages,
  TProps,
>({
  config,
}: {
  config: IDraggerComponentProps<T, TDelete, TDeleteProps, TData, TProps>;
}) => {
  const { palette } = useTheme();

  const props: UploadProps = {
    name: config.fileName,
    accept: ".jpg, .jpeg",
    maxCount: config.maxCount ? config.maxCount : 1,
    customRequest: (options) => {
      const { file, onProgress, onSuccess } = options;
      const formData = new FormData();

      formData.append(config.fileName, file);
      if (config.id) {
        config.mutate({ id: config.id, formData } as TProps, {
          onSuccess: (data) => {
            if (onProgress) {
              onProgress({ percent: 100 });
              onSuccess?.("ok");
              config.clearErrors(config.name);
            }

            config.setValue(
              config.name,
              data.result[config.name as PathValue<T, Path<T>>],
            );
          },
          onError: (error) => {
            message.error(`File upload failed: ${error.message}`);
          },
        });
      }
    },
    onRemove: () => {
      if (config.id) {
        config.mutateDelete(config.id as TDeleteProps);
        config.setValue(config.name, "" as PathValue<T, Path<T>>);
      } else {
        return;
      }
    },
    showUploadList: {
      showRemoveIcon: config.isPending,
    },
  };

  return (
    <Dragger {...props}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p
        className={
          palette.mode === "dark" ? css.dropboxLightText : css.dropboxDarkText
        }
      >
        Завантажити головне зображення
      </p>
    </Dragger>
  );
};

export default DraggerComponent;
