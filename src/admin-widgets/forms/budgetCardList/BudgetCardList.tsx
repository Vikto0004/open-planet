import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import { UseFormSetValue } from "react-hook-form";
import * as Yup from "yup";
import {
  editFormSchema,
  sectionSchema,
} from "@/admin-shared/model/schemas/workDirectionYupSchemas";
import BudgetListCard from "@/admin-widgets/forms/budgetListCard/budgetListCard";

import css from "../forms.module.css";

const BudgetCardsList = ({
  data,
  setValue,
  index: sectionIndex,
  lang,
}: {
  data: Yup.InferType<typeof sectionSchema>;
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
              return Array.isArray(data.content) ? (
                index + 1 === data.content.length ? (
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
                )
              ) : null;
            }
          })}
      </List>
      <Divider />
    </>
  );
};

export default BudgetCardsList;
