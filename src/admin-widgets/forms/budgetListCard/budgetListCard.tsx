import { TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ListItem from "@mui/material/ListItem";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import * as Yup from "yup";

import { useDeleteBudgetCard } from "@/admin-shared/hooks/work-direction/useDeleteBudgetCard";
import { useUpdateBudgetCard } from "@/admin-shared/hooks/work-direction/useUpdateBudgetCard";
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
  deletable,
  setValue,
  isGlobalPending,
  sectionIndex,
  index,
  lang,
}: IListItemProps) => {
  const { mutate: deleteBudgetCard, isPending } = useDeleteBudgetCard();
  const { mutate: updateBudgetCard } = useUpdateBudgetCard();

  const [title, setTitle] = useState(primaryText || "");
  const [amount, setAmount] = useState(secondaryText || "");

  useEffect(() => {
    if (setIsPending) setIsPending(isPending);
    return () => {
      if (setIsPending) setIsPending(false);
    };
  }, [setIsPending, isPending]);

  const handleSave = () => {
    updateBudgetCard({ projectId, sectionId, budgetCardId: id, title, amount });
  };

  return (
    <ListItem sx={{ paddingLeft: "0" }}>
      <Box sx={{ display: "flex", gap: "20px", alignItems: "flex-end" }}>
        <TextField
          sx={{ width: "calc(100vw / 5)" }}
          value={title}
          variant="filled"
          label="Заголовок"
          onChange={(e) => {
            setTitle(e.target.value);
            setValue(
              `${lang as LangType}.sections.${sectionIndex}.content.${index}.title`,
              e.target.value,
            );
          }}
        />
        <TextField
          sx={{ width: "calc(100vw / 7)" }}
          value={amount}
          variant="filled"
          label="Сума"
          type="number"
          onChange={(e) => {
            const value = Number(e.target.value);
            setAmount(value);
            setValue(
              `${lang as LangType}.sections.${sectionIndex}.content.${index}.amount`,
              value,
            );
          }}
        />
        <div className={css.buttonsWrapper}>
          <Button
            variant="contained"
            sx={{
              textTransform: "none",
              backgroundColor: "#4CAF50",
              minWidth: "30px",
              height: "25px",
            }}
            onClick={handleSave}
          >
            Зберегти
          </Button>
          {deletable && (
            <Button
              variant="contained"
              sx={{
                textTransform: "none",
                backgroundColor: "#8A939B",
                minWidth: "30px",
                height: "25px",
              }}
              onClick={() => {
                deleteBudgetCard({
                  budgetCardId: id,
                });
              }}
              disabled={isGlobalPending ?? !isGlobalPending}
            >
              Видалити
            </Button>
          )}
        </div>
      </Box>
    </ListItem>
  );
};

export default BudgetListCard;
