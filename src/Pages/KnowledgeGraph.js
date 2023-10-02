import React, { useContext } from "react";
import RelationalKnowledgeGraph from "../Components/KnowledgeGraph/RelationalKnowledgeGraph";
import Header from "../Components/Layout/Header";
import AuthContext from "../store/auth-context";
import Stack from "@mui/material/Stack";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import HierarchicalKnowledgeGraph from "../Components/KnowledgeGraph/HierarchicalKnowledgeGraph";
import Box from "@mui/material/Box";
import Container from "react-bootstrap/Container";

const KnowledgeGraph = () => {
  const authCtx = useContext(AuthContext);
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Stack className={"vh-100 pb-5"}>
      <Header />
      {authCtx.isStudent ? (
        <Box width={"100%"} height={"100%"}>
          <TabContext value={value}>
            <Box className={"bg-light border-bottom"}>
              <Container className={"px-3"}>
                <TabList onChange={handleChange} variant="fullWidth">
                  <Tab label="Hierarchical" value="1" />
                  <Tab label="Relational" value="2" />
                </TabList>
              </Container>
            </Box>

            <TabPanel value="1" sx={{ p: 0, m: 0 }}>
              <HierarchicalKnowledgeGraph />
            </TabPanel>
            <TabPanel value="2" sx={{ p: 0, m: 0 }}>
              <RelationalKnowledgeGraph />
            </TabPanel>
          </TabContext>
        </Box>
      ) : (
        <div>Currently Knowledge Graphs are only supported for students</div>
      )}
    </Stack>
  );
};
export default KnowledgeGraph;
