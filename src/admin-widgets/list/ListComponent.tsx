import List from "@mui/material/List";

import {
  IWorkDirectionCard,
  IWorkDirectionCards,
} from "@/admin-shared/model/interfaces/workDirectionInterfaces";
import ListItemComponent from "@/admin-widgets/listItem/ListItemComponent";

const ListComponent = ({ data }: { data: IWorkDirectionCards }) => {
  return (
    <List>
      {data.workDirections.map((item: IWorkDirectionCard) => (
        <ListItemComponent
          key={item._id}
          primaryText={item.cardTitle}
          secondaryText={new Date(item.updatedAt).toLocaleString()}
          id={item._id}
        />
      ))}
    </List>
  );
};

export default ListComponent;
