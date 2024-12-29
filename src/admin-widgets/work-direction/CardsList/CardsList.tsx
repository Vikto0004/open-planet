import {
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from "@mui/material";
import List from "@mui/material/List";
import { useState } from "react";

import {
  IWorkDirectionCard,
  IWorkDirectionCards,
  allowedTypes,
} from "@/admin-shared/model/interfaces/workDirectionInterfaces";
import CardsListItem from "@/admin-widgets/work-direction/cardsListItem/CardsListItem";

import styles from "./list.module.css";

const typeLabels: Record<allowedTypes, string> = {
  medicine: "Медицина",
  electric: "Електрика",
  education: "Освіта",
  restoration: "Реставрація",
  culture: "Культура",
};

const CardsList = ({ data }: { data: IWorkDirectionCards }) => {
  const [selectedType, setSelectedType] = useState<allowedTypes | "all">("all");

  const filteredData =
    selectedType === "all"
      ? data.workDirections
      : data.workDirections.filter((item) => {
          return (
            Array.isArray(item.workDirectionsType) &&
            item.workDirectionsType.includes(selectedType)
          );
        });

  const handleTypeChange = (event: SelectChangeEvent<allowedTypes | "all">) => {
    setSelectedType(event.target.value as allowedTypes | "all");
  };

  const groupedByType = filteredData.reduce(
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
    <div className={styles.typeNavigation}>
      <FormControl fullWidth>
        <InputLabel id="direction-type-label">Тип Напрямку</InputLabel>
        <Select
          labelId="direction-type-label"
          value={selectedType}
          onChange={handleTypeChange}
        >
          <MenuItem value="all">Всі напрямки</MenuItem>
          {Object.entries(typeLabels).map(([type, label]) => (
            <MenuItem key={type} value={type}>
              {label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <List>
        {Object.entries(groupedByType).map(([type, workDirections]) => {
          const typeText = typeLabels[type as allowedTypes] || "Невідомий тип";

          return (
            <div key={type}>
              <h3>{typeText}</h3>
              {workDirections.map((item) => (
                <CardsListItem
                  key={item._id}
                  primaryText={`${item.ua.cardTitle} | ${typeText}`}
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
      </List>
    </div>
  );
};

export default CardsList;
