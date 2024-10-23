import { UploadFile } from "antd/lib";

export const makeDefaultFilesArray = (files: string[] | string | null) => {
  if (!files || !files.length) {
    return [];
  }

  if (typeof files === "string") {
    return [
      {
        uid: files,
        name: `Головне зображення`,
        status: "done",
        url: files,
      },
    ] as UploadFile[];
  }

  return [
    ...files.map((file, index) => ({
      uid: file,
      name: `${file.slice(0, 26)}...`,
      status: "done",
      url: file,
    })),
  ] as UploadFile[];
};
