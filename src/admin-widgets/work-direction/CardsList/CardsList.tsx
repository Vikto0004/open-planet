import List from "@mui/material/List";

import {
  IWorkDirectionCard,
  IWorkDirectionCards,
} from "@/admin-shared/model/interfaces/workDirectionInterfaces";
import CardsListItem from "@/admin-widgets/work-direction/cardsListItem/CardsListItem";

const CardsList = ({ data }: { data: IWorkDirectionCards }) => {
  return (
    <List>
      {data.workDirections.map((item: IWorkDirectionCard) => (
        <CardsListItem
          key={item._id}
          primaryText={item.cardTitle}
          secondaryText={new Date(item.updatedAt).toLocaleString()}
          id={item._id}
        />
      ))}
    </List>
  );
};

export default CardsList;
