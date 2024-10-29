import Box from "@mui/material/Box";
import { useEffect } from "react";

import BudgetCardsList from "@/admin-widgets/work-direction/budgetCardList/BudgetCardList";

interface IBudgetCards {
  _id: string;
  title: string;
  amount: number;
}

interface IBudgetCardsCreatorProps {
  budgetCards: IBudgetCards[];
}

const BudgetCardsCreator = ({ budgetCards }: IBudgetCardsCreatorProps) => {
  useEffect(() => {
    console.log(budgetCards);
  }, [budgetCards]);
  return (
    <>
      <Box
        component="span"
        sx={{ fontSize: "12px", color: "rgba(0, 0, 0, 0.6)" }}
      >
        Бюджетні картки
      </Box>
      <BudgetCardsList data={budgetCards} />
    </>
  );
};

export default BudgetCardsCreator;
