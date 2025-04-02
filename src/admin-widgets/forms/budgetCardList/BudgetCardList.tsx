import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import { useState, useMemo } from "react";
import { UseFormSetValue } from "react-hook-form";
import * as Yup from "yup";

import { useDeleteSection } from "@/admin-shared/hooks/work-direction/useDeleteSection";
import {
  editFormSchema,
  sectionSchema,
} from "@/admin-shared/model/schemas/workDirectionYupSchemas";
import BudgetListCard from "@/admin-widgets/forms/budgetListCard/budgetListCard";

import css from "../forms.module.css";

const BudgetCardsList = ({
  projectId,
  data,
  setValue,
  index: sectionIndex,
  lang,
}: {
  projectId: string;
  data: Yup.InferType<typeof sectionSchema>;
  setValue: UseFormSetValue<Yup.InferType<typeof editFormSchema>>;
  index: number;
  lang: string;
}) => {
  const [isPending, setIsPending] = useState(true);
  const { mutate } = useDeleteSection();

  // Використовуємо useMemo для того, щоб перетворити 'amount' у рядок
  const fixedData = useMemo(() => {
    return {
      ...data,
      content: Array.isArray(data.content)
        ? data.content.map((item) => ({
            ...item,
            amount: String(item.amount), // Перетворюємо amount на рядок
          }))
        : [],
    };
  }, [data]);

  return (
    <>
      <Divider>
        <label className={css.label}>Картки бюджету</label>
      </Divider>
      <List>
        {fixedData.sectionType === "budgetCards" &&
          fixedData.content.map((item, index) => {
            return (
              <BudgetListCard
                key={item.id}
                primaryText={item.title}
                secondaryText={item.amount} // Тепер завжди рядок
                id={item.id}
                sectionId={fixedData.id}
                projectId={projectId}
                deletable={fixedData.content.length > 1}
                isGlobalPending={isPending}
                setIsPending={setIsPending}
                setValue={setValue}
                sectionIndex={sectionIndex}
                index={index}
                lang={lang}
              />
            );
          })}
      </List>
      <Button
        variant="contained"
        sx={{ textTransform: "none", width: 70,  height: 50 }}
        type="button"
        onClick={() => {
          mutate({ projectId: projectId, sectionId: fixedData.id });
        }}
      >
        Видалити секцію
      </Button>
      <Divider />
    </>
  );
};

export default BudgetCardsList;
