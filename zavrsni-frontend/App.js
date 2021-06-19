import React from 'react';
import { UserProvider } from './components/UserContex';
import Index from './Index'

export default function App() {

  return (
    // Wrap everything with user provider so every component can rach it
    <UserProvider>
      <Index />
    </UserProvider>
  );
}

