import List from "@mui/material/List";
import { useEffect, useState } from "react";

import { ICard } from "@/admin-shared/model/interfaces/workDirectionInterfaces";

import BudgetListCard from "@/admin-widgets/work-direction/budgetListCard/budgetListCard";

const BudgetCardsList = ({ data }: { data: ICard[] }) => {
  const [isEdit, setEdit] = useState<{
    id: string;
    isEdit: boolean;
  }>({ id: "", isEdit: false });

  useEffect(() => {
    localStorage.setItem("budgetCards", JSON.stringify(data));
  }, [data]);
  return (
    <List>
      {data.map((item: ICard) => (
        <BudgetListCard
          key={item._id}
          primaryText={item.title}
          secondaryText={item.amount}
          id={item._id}
          setEdit={setEdit}
          isEdit={isEdit}
        />
      ))}
    </List>
  );
};

export default BudgetCardsList;
