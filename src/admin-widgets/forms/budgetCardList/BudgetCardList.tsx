import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import { UseFormSetValue } from "react-hook-form";

import type {
  IWorkDirection,
  Section,
} from "@/admin-shared/model/interfaces/workDirectionInterfaces";
import BudgetListCard from "@/admin-widgets/forms/budgetListCard/budgetListCard";

import css from "../forms.module.css";
import * as Yup from "yup";
import { editFormSchema } from "@/admin-shared/model/schemas/workDirectionYupSchemas";

const BudgetCardsList = ({
  data,
  setValue,
  index: sectionIndex,
  lang
}: {
  data: Section;
  setValue: UseFormSetValue<Yup.InferType<typeof editFormSchema>>;
  index: number;
  lang: string;
}) => {
  return (
    <>
      <Divider>
        <label className={css.label}>Картки бюджету</label>
      </Divider>
      <List>
        {data.type === "budgetCards" &&
          Array.isArray(data.content) &&
          data.content.map((item, index) => {
            if (
              typeof item === "object" &&
              "title" in item &&
              "amount" in item &&
              "_id" in item
            ) {
              return index + 1 === data.content.length ? (
                <BudgetListCard
                  key={item._id}
                  primaryText={item.title}
                  secondaryText={item.amount}
                  id={item._id}
                  addCard
                  setValue={setValue}
                  sectionIndex={sectionIndex}
                  index={index}
                  lang={lang}
                />
              ) : (
                <BudgetListCard
                  key={item._id}
                  primaryText={item.title}
                  secondaryText={item.amount}
                  id={item._id}
                  setValue={setValue}
                  sectionIndex={sectionIndex}
                  index={index}
                  lang={lang}
                />
              );
            }
          })}
      </List>
      <Divider />
    </>
  );
};

export default BudgetCardsList;
