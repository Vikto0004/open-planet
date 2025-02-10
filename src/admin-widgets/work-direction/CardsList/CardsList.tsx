import {
  IWorkDirectionCard,
  IWorkDirectionCards,
  allowedTypes,
} from "@/admin-shared/model/interfaces/workDirectionInterfaces";
import CardsListItem from "@/admin-widgets/work-direction/cardsListItem/CardsListItem";

const typeLabels: Record<allowedTypes, string> = {
  medicine: "Медицина",
  electric: "Електрика",
  education: "Освіта",
  restoration: "Реставрація",
  culture: "Культура",
};

const CardsList = ({ data }: { data: IWorkDirectionCards }) => {
  const workDirections = data?.workDirections ?? [];

  const groupedByType = workDirections.reduce(
    (acc, item) => {
      if (Array.isArray(item.workDirectionsType)) {
        item.workDirectionsType.forEach((type) => {
          if (!acc[type]) acc[type] = [];
          acc[type].push(item);
        });
      }
      return acc;
    },
    {} as Record<allowedTypes, IWorkDirectionCard[]>,
  );
  return (
    <div>
      {Object.entries(groupedByType).map(([type, workDirections]) => {
        const typeText = typeLabels[type as allowedTypes] || "Невідомий тип";

        return (
          <div key={type} style={{ marginTop: "30px" }}>
            <h3>{typeText}</h3>
            {workDirections.map((item) => (
              <CardsListItem
                key={item._id}
                primaryText={`${item.ua.cardTitle}`}
                secondaryText={
                  `Оновлено: ${new Date(item.updatedAt).toLocaleString()} ` +
                  (item.createdAt
                    ? `| Створено: ${new Date(item.createdAt).toLocaleString()}`
                    : "")
                }
                id={item._id}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default CardsList;
