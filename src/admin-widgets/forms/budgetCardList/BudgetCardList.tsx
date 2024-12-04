import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import { UseFormSetValue } from "react-hook-form";
import * as Yup from "yup";

import { useDeleteSection } from "@/admin-shared/hooks/work-direction/useDeleteSection";
import {
  editFormSchema,
  sectionSchema,
} from "@/admin-shared/model/schemas/workDirectionYupSchemas";
import BudgetListCard from "@/admin-widgets/forms/budgetListCard/budgetListCard";

import css from "../forms.module.css";
import { useState } from "react";

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
  return (
    <>
      <Divider>
        <label className={css.label}>Картки бюджету</label>
      </Divider>
      <List>
        {data.sectionType === "budgetCards" &&
          Array.isArray(data.content) &&
          data.content.map((item, index) => {
            if (
              typeof item === "object" &&
              "title" in item &&
              "amount" in item &&
              "id" in item
            ) {
              return Array.isArray(data.content) ? (
                index + 1 === data.content.length && data.content.length > 1 ? (
                  <BudgetListCard
                    key={item.id}
                    primaryText={item.title}
                    secondaryText={item.amount}
                    id={item.id}
                    sectionId={data.id}
                    addCard
                    deletable
                    isGlobalPending={isPending}
                    setIsPending={setIsPending}
                    setValue={setValue}
                    sectionIndex={sectionIndex}
                    index={index}
                    lang={lang}
                    projectId={projectId}
                  />
                ) : data.content.length === 1 ? (
                  <BudgetListCard
                    projectId={projectId}
                    sectionId={data.id}
                    key={item.id}
                    primaryText={item.title}
                    secondaryText={item.amount}
                    id={item.id}
                    addCard
                    setIsPending={setIsPending}
                    setValue={setValue}
                    sectionIndex={sectionIndex}
                    index={index}
                    lang={lang}
                  />
                ) : (
                  <BudgetListCard
                    projectId={projectId}
                    sectionId={data.id}
                    key={item.id}
                    deletable
                    isGlobalPending={isPending}
                    setIsPending={setIsPending}
                    primaryText={item.title}
                    secondaryText={item.amount}
                    id={item.id}
                    setValue={setValue}
                    sectionIndex={sectionIndex}
                    index={index}
                    lang={lang}
                  />
                )
              ) : null;
            }
          })}
      </List>
      <Button
        variant="contained"
        sx={{ textTransform: "none", width: 150 }}
        type="submit"
        onClick={() => {
          mutate({ projectId: projectId, sectionId: data.id });
        }}
      >
        Видалити секцію
      </Button>
      <Divider />
    </>
  );
};

export default BudgetCardsList;
