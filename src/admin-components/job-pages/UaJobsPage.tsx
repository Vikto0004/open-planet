"use client";

import {
  FormControl,
  InputLabel,
  MenuItem,
  SelectChangeEvent,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";

import { useGetCards } from "@/admin-shared/hooks";
import {
  allowedTypes,
  IWorkDirectionCards,
} from "@/admin-shared/model/interfaces/workDirectionInterfaces";
import CardsList from "@/admin-widgets/work-direction/CardsList/CardsList";
import CreateDirection from "@/admin-widgets/work-direction/createDirection/CreateDirection";

const typeLabels: Record<allowedTypes, string> = {
  medicine: "Медицина",
  electric: "Електрика",
  education: "Освіта",
  restoration: "Реставрація",
  culture: "Культура",
};

const UaJobsPage = () => {
  const [selectedType, setSelectedType] = useState<allowedTypes | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const { data, refetch } = useGetCards(
    { lang: "ua", page: 1, limit: 5000, type: selectedType },
    true,
  );

  const handleTypeChange = (event: SelectChangeEvent<allowedTypes | "all">) => {
    setSelectedType(event.target.value as allowedTypes | "all");
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    refetch();
  }, [refetch, selectedType]);

  const workDirections = (data as IWorkDirectionCards)?.workDirections ?? [];

  const filteredData = workDirections.filter((item) =>
    item.ua.cardTitle.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <Box sx={{ padding: "20px", position: "relative" }}>
      <Typography
        variant="h6"
        sx={{ position: "absolute", top: 10, right: 20, fontWeight: "bold" }}
      >
        OPEN-PLANET
      </Typography>

      <CreateDirection />

      <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <InputLabel
          id="direction-type-label"
          sx={{ transform: "translateY(-20px)" }}
        >
          Тип Напрямку
        </InputLabel>
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

      <TextField
        fullWidth
        label="Пошук за назвою"
        variant="outlined"
        value={searchQuery}
        onChange={handleSearchChange}
        sx={{ marginBottom: 2 }}
      />

      {filteredData.length > 0 ? (
        <CardsList
          data={{
            workDirections: filteredData,
            totalWorkDirections: filteredData.length,
          }}
        />
      ) : (
        <p>Нічого не знайдено</p>
      )}
    </Box>
  );
};

export default UaJobsPage;
