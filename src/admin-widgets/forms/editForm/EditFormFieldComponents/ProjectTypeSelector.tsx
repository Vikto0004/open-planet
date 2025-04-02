import {
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

import { allowedTypes } from "@/admin-shared/model/interfaces/workDirectionInterfaces";

interface ProjectTypeSelectorProps {
  selectedTypes: allowedTypes[];
  onChangeTypes: (event: SelectChangeEvent<allowedTypes[]>) => void;
}

const ProjectTypeSelector = ({
  selectedTypes,
  onChangeTypes,
}: ProjectTypeSelectorProps) => {
  return (
    <div>
      <FormControl sx={{ width: "calc(100vw / 4)" }}>
        <InputLabel id="label-type">Тип</InputLabel>
        <Select
          labelId="label-type"
          id="type"
          multiple
          value={selectedTypes}
          onChange={onChangeTypes}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.length > 0 ? (
                selected.map((value) => <Chip key={value} label={value} />)
              ) : (
                <span style={{ color: "#999" }}>Оберіть тип</span>
              )}
            </Box>
          )}
        >
          <MenuItem value="medicine">Медицина</MenuItem>
          <MenuItem value="electric">Електрика</MenuItem>
          <MenuItem value="education">Освіта</MenuItem>
          <MenuItem value="restoration">Реставрація</MenuItem>
          <MenuItem value="culture">Культура</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default ProjectTypeSelector;
