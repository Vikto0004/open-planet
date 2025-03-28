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
}) => {
  // ✅ Переконуємося, що `amount` - це рядок
  const fixedSection = {
    ...section,
    content: section.content.map((item: any) => ({
      ...item,
      amount: String(item.amount), // 🔥 Гарантовано рядок
    })),
  };

  return (
    <div key={section.id}>
      <BudgetCardsList
        projectId={projectId}
        data={fixedSection} // Використовуємо оновлені дані
        setValue={setValue}
        index={index}
        lang={lang}
      />
    </div>
  );
};

export default BudgetCardsSection;
