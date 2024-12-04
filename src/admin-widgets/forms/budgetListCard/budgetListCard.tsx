import { TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ListItem from "@mui/material/ListItem";
import { Dispatch, SetStateAction, useEffect } from "react";
import { UseFormSetValue } from "react-hook-form";
import * as Yup from "yup";

import { useAddBudgetCard } from "@/admin-shared/hooks/work-direction/useAddBudgetCard";
import { useDeleteBudgetCard } from "@/admin-shared/hooks/work-direction/useDeleteBudgetCard";
import { editFormSchema } from "@/admin-shared/model/schemas/workDirectionYupSchemas";
import { LangType } from "@/i18n/routing";

import css from "../forms.module.css";
interface IListItemProps {
  primaryText?: string;
  secondaryText?: number;
  id: string;
  addCard?: boolean;
  setValue: UseFormSetValue<Yup.InferType<typeof editFormSchema>>;
  sectionIndex: number;
  index: number;
  lang: string;
  projectId: string;
  sectionId: string;
  deletable?: boolean;
  setIsPending?: Dispatch<SetStateAction<boolean>>;
  isGlobalPending?: boolean;
}

const BudgetListCard = ({
  primaryText,
  secondaryText,
  id,
  setIsPending,
  projectId,
  sectionId,
  addCard,
  deletable,
  setValue,
  isGlobalPending,
  sectionIndex,
  index,
  lang,
}: IListItemProps) => {
  const { mutate } = useAddBudgetCard();
  const { mutate: deleteBudgetCard, isPending } = useDeleteBudgetCard();

  useEffect(() => {
    if (setIsPending) setIsPending(isPending);

    return () => {
      if (setIsPending) setIsPending(false);
    };
  }, [setIsPending, isPending]);
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
            {deletable && (
              <Button
                variant="contained"
                sx={{
                  textTransform: "none",
                  backgroundColor: "#8A939B",
                  minWidth: "30px",
                  height: "25px",
                  borderRadius: "",
                }}
                onClick={() => {
                  deleteBudgetCard({
                    projectId: projectId,
                    sectionId: sectionId,
                    budgetCardId: id,
                  });
                }}
                disabled={isGlobalPending ?? !isGlobalPending}
              >
                Видалити
              </Button>
            )}
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
                onClick={() => {
                  mutate({ projectId: projectId, sectionId: sectionId });
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
