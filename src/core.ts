import useSWR from "swr";

/** A user record. */
export interface User {
  /** Unique identifier for the user. */
  id: number;
  /** User's full name. */
  name: string;
  /** User's email address. */
  email: string;
}

/** Reusable hook for fetching user search results. */
export const useUserSearch = (query: string = "") => {
  // Hit the user list endpoint with the given query.
  const { data, error } = useSWR<User[], Error>(
    `http://localhost:8080/?search=${query}`
  );
  // Return the list of users, loading state, and error. (if applicable)
  return { data, loading: !error && !data, error };
};
