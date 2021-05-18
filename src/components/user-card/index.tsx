import { Box, Heading, Text, Stack } from "@chakra-ui/react";
import type { ReactNode } from "react";
import React from "react";
import type { User } from "../../core";
import { Monogram } from "../monogram";

/**
 * Renders a pretty card with user information.
 * @param args.user user details to render.
 */
export const UserCard = React.memo(({ user }: { user: User }) => (
  <Box
    bg="white"
    borderRadius="md"
    boxShadow="sm"
    px="5"
    py="4"
    minInlineSize="72"
  >
    <Stack direction="row" align="center" spacing="4">
      <Monogram name={user.name} />
      <Stack spacing="1">
        <Heading size="sm">{user.name}</Heading>
        <Text color="gray.800" fontSize="xs">
          {user.email}
        </Text>
      </Stack>
    </Stack>
  </Box>
));
