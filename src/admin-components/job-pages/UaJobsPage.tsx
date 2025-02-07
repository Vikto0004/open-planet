"use client";

import {
  FormControl,
  InputLabel,
  MenuItem,
  SelectChangeEvent,
  Select,
} from "@mui/material";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";

import { useGetCards } from "@/admin-shared/hooks";
import { allowedTypes } from "@/admin-shared/model/interfaces/workDirectionInterfaces";
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

  const { data, refetch } = useGetCards(
    { lang: "ua", page: 1, limit: 10, type: selectedType },
    true,
  );

  const handleTypeChange = (event: SelectChangeEvent<allowedTypes | "all">) => {
    setSelectedType(event.target.value as allowedTypes | "all");
  };

  useEffect(() => {
    refetch();
  }, [refetch, selectedType]);
  return (
    <Box sx={{ padding: "20px" }}>
      <CreateDirection />

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

      {data && <CardsList data={data} />}
    </Box>
  );
};

export default UaJobsPage;
