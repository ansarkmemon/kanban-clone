import { Grid } from "@chakra-ui/react";
import { Main } from "./components/Main";
import { Sidebar } from "./components/Sidebar";
import styled from "styled-components";
import { WorkspaceProvider } from "./contexts/WorkspaceContext";
import { useEffect } from "react";
import { initializeAppData } from "./helpers/request";

const App = () => {
  useEffect(() => {
    initializeAppData();
  }, []);

  return (
    <Layout>
      <Grid templateColumns="300px 1fr">
        <WorkspaceProvider>
          <Sidebar />
          <Main />
        </WorkspaceProvider>
      </Grid>
    </Layout>
  );
};

const Layout = styled.div`
  min-height: 100vh;
`;

export default App;
