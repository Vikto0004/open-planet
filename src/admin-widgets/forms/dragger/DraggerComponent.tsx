import { InboxOutlined } from "@ant-design/icons";
import { useTheme } from "@mui/material/styles";
import { UseMutateFunction } from "@tanstack/react-query";
import { message, Upload } from "antd";
import type { UploadProps } from "antd";
import { UploadFile } from "antd/lib";
import { useState } from "react";
import type {
  UseFormClearErrors,
  FieldValues,
  UseFormSetValue,
  Path,
  PathValue,
} from "react-hook-form";
import { BeatLoader } from "react-spinners";

import { makeDefaultFilesArray } from "@/admin-shared/lib/makeDefaultFilesArray";
import { IWorkDirectionImages } from "@/admin-shared/model/interfaces/workDirectionInterfaces";
import css from "@/admin-widgets/forms/forms.module.css";

const { Dragger } = Upload;

interface IDraggerComponentProps<
  T extends FieldValues,
  TDelete extends IWorkDirectionImages,
  TDeleteProps,
  TData extends IWorkDirectionImages,
  TProps,
> {
  fileName: string;
  id: string;
  name: Path<T>;
  maxCount?: number;
  minCount?: number;
  isPending: boolean;
  multiple?: boolean;
  title: string;
  deleting: boolean;
  defaultFiles?: UploadFile[] | null;
  clearErrors: UseFormClearErrors<T>;
  setValue: UseFormSetValue<T>;
  mutateDelete: UseMutateFunction<TDelete, Error, TDeleteProps, unknown>;
  mutate: UseMutateFunction<TData, Error, TProps, unknown>;
}

const DraggerComponent = <
  T extends FieldValues,
  TDelete extends IWorkDirectionImages,
  TDeleteProps,
  TData extends IWorkDirectionImages,
  TProps,
>({
  config,
}: {
  config: IDraggerComponentProps<T, TDelete, TDeleteProps, TData, TProps>;
}) => {
  const { palette } = useTheme();

  const [fileList, setFileList] = useState<UploadFile[]>(() => {
    if (config.defaultFiles) {
      return config.defaultFiles;
    }

    return [];
  });

  const minCount = config.minCount ? config.minCount : 1;

  const props: UploadProps = {
    name: config.fileName,
    accept: ".jpg, .jpeg",
    multiple: config.multiple,
    maxCount: config.maxCount ? config.maxCount : 1,
    fileList: fileList,
    customRequest: (options) => {
      const { file, onProgress, onSuccess } = options;
      const formData = new FormData();

      formData.append(config.fileName, file);
      if (config.id) {
        minCount > 1
          ? setFileList((prevState) => [
              ...prevState,
              {
                uid: `${prevState.length + 1}`,
                name: "http://res.cloudinary.com/",
                status: "uploading",
              },
            ])
          : setFileList([
              {
                uid: `1`,
                name: `Головне зображення`,
                status: "uploading",
              },
            ]);
        config.mutate({ id: config.id, formData } as TProps, {
          onSuccess: (data) => {
            if (onProgress) {
              onProgress({ percent: 100 });
            }

            setFileList(
              makeDefaultFilesArray(
                data.result[config.name as PathValue<T, Path<T>>],
              ),
            );
            config.setValue(
              config.name,
              data.result[config.name as PathValue<T, Path<T>>],
            );
            config.clearErrors(config.name);
            onSuccess?.("ok");
          },
          onError: (error) => {
            message.error(`File upload failed: ${error.message}`);
          },
        });
      }
    },
    onRemove: (file) => {
      if (config.id) {
        const req =
          minCount > 1 ? { id: config.id, imageUrl: file.url } : config.id;
        config.mutateDelete(req as TDeleteProps, {
          onSuccess: (data) => {
            setFileList(
              makeDefaultFilesArray(
                data.result[config.name as PathValue<T, Path<T>>],
              ),
            );
            config.setValue(
              config.name,
              data.result[config.name as PathValue<T, Path<T>>],
            );
          },
        });
        config.setValue(config.name, "" as PathValue<T, Path<T>>);
      } else {
        return;
      }
    },
    beforeUpload: () => {
      if (config.maxCount) {
        if (fileList.length >= config.maxCount) {
          return false;
        }
      }
    },
    showUploadList: {
      showRemoveIcon: !config.isPending,
    },
  };

  return (
    <Dragger {...props}>
      {config.deleting ? (
        <p className={css.deleteLoader}>
          <BeatLoader color="#1677ff" />
        </p>
      ) : (
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
      )}
      <p
        className={
          palette.mode === "dark" ? css.dropboxLightText : css.dropboxDarkText
        }
      >
        {config.title}
      </p>
    </Dragger>
  );
};
export default DraggerComponent;
