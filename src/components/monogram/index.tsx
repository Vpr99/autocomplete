import React, { useMemo } from "react";
import { Center, Text } from "@chakra-ui/react";

/**
 * Pretty color schemes at our disposal.
 * @see https://chakra-ui.com/docs/theming/theme#colors
 */
const avilableColorSchemes = [
  "pink",
  "purple",
  "cyan",
  "blue",
  "teal",
  "green",
  "red",
  "gray",
];

/**
 * Deterministically pick a gradient color based on the initials.
 * @param initials initials to use for gradient selection.
 */
const colorPicker = (initials: string): string => {
  // Add the character codes of the initials.
  const charCodes = initials.charCodeAt(0) + initials.charCodeAt(1);
  // Mod the charCode sum to get an in-bounds index of the available schemes.
  const scheme = avilableColorSchemes[charCodes % avilableColorSchemes.length];
  return `linear(to-bl, ${scheme}.700, ${scheme}.800)`;
};

/**
 * Returns the initials for a name.
 * Assumes that the name is a combined first + last name.
 * Eg: "Benjamin Banana"
 * @param name name to get initials for.
 */
const getInitials = (name: string): string => {
  // Split on space.
  const nameArray = name.split(" ");
  // Glue together the first character from the first 2 words.
  return `${nameArray[0][0]}${nameArray[1][0]}`;
};

export const Monogram = ({ name }: { name: string }) => {
  const initials = getInitials(name);
  return (
    <Center
      role="img"
      aria-label={initials}
      as="figure"
      color="white"
      bgGradient={colorPicker(initials)}
      borderRadius="full"
      boxSize="12"
    >
      <Text>{initials}</Text>
    </Center>
  );
};
