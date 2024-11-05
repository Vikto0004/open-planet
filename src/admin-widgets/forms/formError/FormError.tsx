import Box from "@mui/material/Box";
import { ReactNode } from "react";
import { CiWarning } from "react-icons/ci";

import css from "./formError.module.css";
const FormError = ({ children }: { children: ReactNode }) => {
  return (
    <Box className={css.error}>
      <CiWarning />
      {children}
    </Box>
  );
};

export default FormError;
