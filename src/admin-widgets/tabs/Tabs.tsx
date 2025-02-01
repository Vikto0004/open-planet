import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tooltip from "@mui/material/Tooltip";
import * as React from "react";
import { Dispatch } from "react";

import { langs, LangType } from "@/i18n/routing";

const Tabs = ({
  lang: currentLang,
  setLang,
  shouldSave,
}: {
  lang: string;
  setLang: Dispatch<LangType>;
  shouldSave: boolean;
}) => {
  const handleChange = (event: React.SyntheticEvent, newValue: unknown) => {
    if (newValue === "en" || newValue === "ua") {
      setLang(newValue);
    }
  };

  console.log(currentLang);
  return (
    <Box
      sx={{
        width: "100%",
        typography: "body1",
        position: "fixed",
        zIndex: "999",
        backgroundColor: "var(--mui-palette-background-paper)",
      }}
    >
      <TabContext value={currentLang}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            {langs.map((lang) =>
              shouldSave && currentLang !== lang ? (
                <Tooltip title="Збережіть дані" placement="top" key={lang}>
                  <span>
                    <Tab label={lang} value={lang} disabled></Tab>
                  </span>
                </Tooltip>
              ) : (
                <Tab label={lang} value={lang} key={lang}></Tab>
              ),
            )}
          </TabList>
        </Box>
      </TabContext>
    </Box>
  );
};

export default Tabs;
