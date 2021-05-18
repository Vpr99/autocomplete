import React, { useState } from "react";
import type { User } from "../../core";
import { Autocomplete } from "../autocomplete";
import { UserCard } from "../user-card";

export const Picker = () => {
  // Store the selected user as local state.
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  return (
    <>
      {selectedUser && <UserCard user={selectedUser} />}
      <Autocomplete
        onChange={(user) => {
          setSelectedUser(user);
        }}
      />
    </>
  );
};
