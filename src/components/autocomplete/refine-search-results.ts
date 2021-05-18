import type { User } from "../../core";

/**
 * A weighted user result according to
 * its relevance to a given query.
 */
interface WeightedUserResult {
  /** The user record */
  item: User;
  /** Relevance to the query, from 0 - 1. */
  weight: number;
}

/**
 * Normalizes a string by lowercasing it and removing all spaces.
 * @param input string to be normalized.
 */
const normalizeString = (input: string): string =>
  input.toLowerCase().replace(/ /g, "");

/**
 * The endpoint is provides flaky results. Let's improve that by:
 *  1. Remove non-matching users.
 *  2. Sorting results by relevance based on:
 *    a) Whole name matches are prioritized.
 *    b) ...then email address matches.
 *    c) ...then everything else.
 *
 * @param users the list of users returned by the API endpoint.
 * @param query current search query.
 */
export const refineSearchResults = (users: User[], query: string) => {
  /** Normalize the query for more case-resilient matching. */
  const normalizedQuery = normalizeString(query);

  /**
   * First, filter out absolute non-matches.
   * In this case, let's do a simple substring match for whether or not
   * a user matches. This isn't _at all_ typo-resilient, but for a quick
   * exercise it works well enough.
   */
  const matchingUsers = users.filter(
    (u) =>
      normalizeString(u.name).includes(normalizedQuery) ||
      normalizeString(u.email).includes(normalizedQuery)
  );

  /**
   * Next, prioritize our matches according to the rules above.
   * Each user will be given a weighted value from 0 - 1 where
   * a higher weight will indicate a "better" match.
   */
  const weightedMatches = matchingUsers.map((u): WeightedUserResult => {
    // Prioritize an exact name match. Eg: "Mary Smith" -> "Mary Smith"
    if (normalizeString(u.name) === normalizedQuery) {
      return { item: u, weight: 1 };
    }

    // Then, a word-by-word match. Eg: "Mary" -> "Mary Smith"
    if (
      u.name
        .split(" ")
        .some((token) => normalizeString(token) === normalizedQuery)
    ) {
      return { item: u, weight: 0.9 };
    }

    // Match against the local part of the user's email.
    if (normalizeString(u.email.split("@")[0]) === normalizedQuery) {
      return { item: u, weight: 0.8 };
    }

    // Then just return all the results in the order from the API.
    // TODO: This would be a great place to further compare the
    // quality of the matches. Based on Levenshtein distance maybe?
    return { item: u, weight: 0.5 };
  });

  // Sort and return the matches by weight.
  return weightedMatches.sort((a, b) => b.weight - a.weight);
};
