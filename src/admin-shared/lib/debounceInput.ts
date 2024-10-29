import debounce from "debounce";
import { ChangeEvent } from "react";
import type {
  FieldValues,
  UseFormSetValue,
  Path,
  PathValue,
} from "react-hook-form";

interface IFormValues {
  isPosted?: boolean;
  cardTitle: string;
  mainImg: string;
  workDirectionsType: string;
  images: (string | undefined)[];
}

interface IConfig<T extends FieldValues> {
  e: ChangeEvent;
  name: Path<T>;
  setValue: UseFormSetValue<T>;
}

export const onChangeDebounced = debounce(
  <T extends IFormValues>({ e, name, setValue }: IConfig<T>) => {
    const target = e.target as HTMLInputElement;
    setValue(name, target.value as PathValue<T, Path<T>>);
  },
  500,
);
