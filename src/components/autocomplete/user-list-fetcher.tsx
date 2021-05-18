import { Text } from "@chakra-ui/react";
import React, { Fragment } from "react";
import type { User } from "../../core";
import { useUserSearch } from "../../core";
import { refineSearchResults } from "./refine-search-results";

/** Render prop function returned from `UserListFetcher`. */
interface UserListFetcherRenderProp {
  /** Array index of the result. Used by Downshift. */
  index: number;
  /** The User record. */
  user: User;
}

interface UserListFetcherProps {
  /** Render prop for displaying relevant user search results. */
  children({ index, user }: UserListFetcherRenderProp): JSX.Element;
  /** Current search query from the search input. */
  query?: string;
}

/**
 * Retrieves a list of users from the API, performs a second
 * pass of refinement on the results, and returns all matching
 * users as a render prop.
 */
export const UserListFetcher = ({ children, query }: UserListFetcherProps) => {
  // Fetch user data from the endpoint based on the search query.
  const { data, loading, error } = useUserSearch(query);

  if (!query) {
    return <Text color="gray.400">Start typing to see results.</Text>;
  }

  // Show the loading state.
  if (loading) {
    return <Text color="gray.400">Fetching users...</Text>;
  }

  // If an error occurred, or data is absent, return an error state.
  if (error || !data) {
    return <Text color="gray.400">An error occurred!.</Text>;
  }

  // Further refine the search results.
  const refinedUsers = refineSearchResults(data, query);

  // Return the matching users as a render prop.
  return (
    <>
      {refinedUsers.map((user, index) => (
        <Fragment key={user.item.id}>
          {children({ user: user.item, index })}
        </Fragment>
      ))}
    </>
  );
};
