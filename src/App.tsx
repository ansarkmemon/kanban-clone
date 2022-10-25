import { Grid } from "@chakra-ui/react";
import { Main } from "./components/Main";
import { Sidebar } from "./components/Sidebar";
import styled from "styled-components";
import { WorkspaceProvider } from "./contexts/WorkspaceContext";
import { useEffect } from "react";
import { initializeAppData } from "./helpers/request";
import CustomErrorBoundary from "./components/ErrorBoundary";

const App = () => {
  useEffect(() => {
    initializeAppData();
  }, []);

  return (
    <Layout>
      <CustomErrorBoundary>
        <Grid templateColumns="300px 1fr">
          <WorkspaceProvider>
            <Sidebar />
            <Main />
          </WorkspaceProvider>
        </Grid>
      </CustomErrorBoundary>
    </Layout>
  );
};

const Layout = styled.div`
  min-height: 100vh;
`;

export default App;
