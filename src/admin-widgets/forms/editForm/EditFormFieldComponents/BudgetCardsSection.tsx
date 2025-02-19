import React from "react";

import BudgetCardsList from "@/admin-widgets/forms/budgetCardList/BudgetCardList";

const BudgetCardsSection = ({
  projectId,
  section,
  setValue,
  index,
  lang,
}: {
  projectId: string;
  section: any;
  setValue: any;
  index: number;
  lang: string;
}) => (
  <div key={section.id}>
    <BudgetCardsList
      projectId={projectId}
      data={section}
      setValue={setValue}
      index={index}
      lang={lang}
    />
  </div>
);

export default BudgetCardsSection;
