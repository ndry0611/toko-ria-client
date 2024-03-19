'use client'
import { useState } from 'react';
import { TextInput, PasswordInput, Tooltip, Center, Text, rem } from '@mantine/core';

function InsertUsername() {
  return (
    <TextInput
      required
      label="Username"
      placeholder="Username"
      style={{ width: "40%", display: "block", alignContent: "center" }}
    />
  );
}

function InsertPassword() {
  const [opened, setOpened] = useState(false);
  const [value, setValue] = useState('');
  return (

    <PasswordInput
      label="Password"
      placeholder="Your password"
      onFocus={() => setOpened(true)}
      onBlur={() => setOpened(false)}
      mt="md"
      style={{ width: "40%", alignItems: "center" }}
      value={value}
      onChange={(event) => setValue(event.currentTarget.value)}
    />

  );
}

export function InputTooltip() {
  return (
    <>
      <InsertUsername />
      <InsertPassword />
    </>
  );
}