import { ErrorBoundary } from "react-error-boundary";
import { Button, Container } from "@chakra-ui/react";
import { PropsWithChildren, useState, useCallback } from "react";

// import styles from './ErrorBoundary.module.css';

export const useAsyncError = () => {
  const [, setError] = useState();
  return useCallback(
    (err: Error) => {
      setError(() => {
        throw err;
      });
    },
    [setError]
  );
};

interface IErrorBoundaryProps extends PropsWithChildren {}

const CustomErrorBoundary: React.FC<IErrorBoundaryProps> = ({ children }) => {
  return (
    <ErrorBoundary
      fallbackRender={({ resetErrorBoundary, error }) => (
        <Container
          minH="100vh"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <pre>Oh no! There was an error!</pre>
          <pre>{error.message}</pre>
          <Button
            marginTop={2}
            color="red"
            onClick={() => resetErrorBoundary()}
          >
            Try again
          </Button>
        </Container>
      )}
    >
      {children}
    </ErrorBoundary>
  );
};

export default CustomErrorBoundary;
