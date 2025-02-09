import React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Pending from "./muiGrid/pendingGrid";
import Rejected from "./muiGrid/acceptedGrid";
import Accepted from "./muiGrid/deliveredGrid";
import AllOrders from "./muiGrid/AllOrders";

export default function NewOrders() {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="All Orders" value="1" />
            <Tab label="Pending" value="2" />
            <Tab label="Accepted" value="3" />
            <Tab
              label="Rejected"
              value="4"
              sx={{
                background: "darkred",
                color: "#fff",
                "&.Mui-selected": {
                  background: "black",
                  transition: "0.7s ease-in-out",
                  color: "#fff",
                },
              }}
            />
          </TabList>
        </Box>
        <TabPanel value="1">
          <AllOrders />
        </TabPanel>
        <TabPanel value="2">
          <Pending />
        </TabPanel>
        <TabPanel value="3">
          <Accepted />
        </TabPanel>
        <TabPanel value="4">
          <Rejected />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
