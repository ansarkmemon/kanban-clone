import { Spinner, Container } from "@chakra-ui/react";

export const Loader = () => {
  return (
    <Container
      minH="500px"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="purple.500"
        size="xl"
      />
    </Container>
  );
};
