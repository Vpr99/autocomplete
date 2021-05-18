import { Box, Input, Divider, Stack, Text } from "@chakra-ui/react";
import Downshift from "downshift";
import React from "react";
import type { User } from "../../core";
import { UserListFetcher } from "./user-list-fetcher";

interface AutocompleteProps {
  /** Event that fires when a user is selected. */
  onChange: (selectedUser: User | null) => void;
}

/**
 * Typeahead input to filter and select users from the API.
 */
export const Autocomplete = ({ onChange }: AutocompleteProps) => {
  return (
    <Downshift<User>
      onChange={onChange}
      itemToString={(item) => (item ? item.name : "")}
    >
      {({
        getRootProps,
        getInputProps,
        getItemProps,
        getMenuProps,
        isOpen,
        inputValue,
      }) => (
        <Box {...getRootProps()}>
          <Box display="inline-block">
            <Input
              {...getInputProps()}
              placeholder="Search by name or email..."
              bg="white"
              flex="0 0 auto"
              width={500}
              mt={3}
            />
          </Box>
          <Box pos="relative">
            <Box pos="absolute" top="2" {...getMenuProps()}>
              {isOpen ? (
                <Stack
                  as="ul"
                  divider={<Divider />}
                  spacing={2}
                  sx={{
                    bg: "white",
                    borderRadius: "md",
                    boxShadow: "sm",
                    listStyleType: "none",
                    m: 0,
                    maxBlockSize: 56,
                    overflowY: "scroll",
                    px: 5,
                    py: 4,
                  }}
                >
                  <UserListFetcher query={inputValue ?? undefined}>
                    {({ index, user }) => (
                      <Box
                        cursor="pointer"
                        as="li"
                        {...getItemProps({ key: user.id, index, item: user })}
                      >
                        <Text>{user.name}</Text>
                        <Text color="gray.600" fontSize="xs">
                          {user.email}
                        </Text>
                      </Box>
                    )}
                  </UserListFetcher>
                </Stack>
              ) : null}
            </Box>
          </Box>
        </Box>
      )}
    </Downshift>
  );
};
