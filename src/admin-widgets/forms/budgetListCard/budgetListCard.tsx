import { TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ListItem from "@mui/material/ListItem";
import { UseFormSetValue } from "react-hook-form";

import { LangType } from "@/i18n/routing";

import css from "../forms.module.css";
import * as Yup from "yup";
import { editFormSchema } from "@/admin-shared/model/schemas/workDirectionYupSchemas";

interface IListItemProps {
  primaryText?: string;
  secondaryText?: number;
  id: string;
  addCard?: boolean;
  setValue: UseFormSetValue<Yup.InferType<typeof editFormSchema>>;
  sectionIndex: number;
  index: number;
  lang: string;
}

const BudgetListCard = ({
  primaryText,
  secondaryText,
  id,
  addCard,
  setValue,
  sectionIndex,
  index,
  lang,
}: IListItemProps) => {
  return (
    <>
      <ListItem sx={{ paddingLeft: "0" }}>
        <Box sx={{ display: "flex", gap: "20px", alignItems: "flex-end" }}>
          <TextField
            sx={{ width: "calc(100vw / 5)" }}
            defaultValue={primaryText ? primaryText : ""}
            variant="filled"
            label="Заголовок"
            onChange={(e) =>
              setValue(
                `${lang as LangType}.sections.${sectionIndex}.content.${index}.title`,
                e.target.value,
              )
            }
          ></TextField>
          <TextField
            sx={{ width: "calc(100vw / 7)" }}
            defaultValue={secondaryText ? secondaryText : ""}
            variant="filled"
            label="Сума"
            onChange={(e) =>
              setValue(
                `${lang as LangType}.sections.${sectionIndex}.content.${index}.amount`,
                Number(e.target.value),
              )
            }
          ></TextField>
          <div className={css.buttonsWrapper}>
            <Button
              variant="contained"
              sx={{
                textTransform: "none",
                backgroundColor: "#8A939B",
                minWidth: "30px",
                height: "25px",
                borderRadius: "",
              }}
            >
              Видалити
            </Button>
            {addCard && (
              <Button
                variant="contained"
                sx={{
                  textTransform: "none",
                  backgroundColor: "#8A939B",
                  minWidth: "30px",
                  height: "25px",
                  borderRadius: "",
                }}
              >
                Додати картку
              </Button>
            )}
          </div>
        </Box>
      </ListItem>
    </>
  );
};

export default BudgetListCard;
