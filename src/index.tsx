import { ChakraProvider, Box, Heading, Center, Stack } from "@chakra-ui/react";
import React, { StrictMode } from "react";
import { render } from "react-dom";
import { Picker } from "./components/picker";

const App = () => {
  return (
    <StrictMode>
      <ChakraProvider>
        <Center
          bgGradient="linear(to-br, yellow.300, yellow.200)"
          blockSize="100vh"
          inlineSize="100%"
        >
          <Stack>
            <Heading>User Picker</Heading>
            <Picker />
          </Stack>
        </Center>
      </ChakraProvider>
    </StrictMode>
  );
};

render(<App />, document.getElementById("root"));
