import React, { useState, useContext, createContext } from 'react';

const UserContext = createContext();
const UserUpdateContext = createContext();

export function useUser() {
    return useContext(UserContext);
}

export function useUserUpdate() {
    return useContext(UserUpdateContext);
}

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);

    function changeUser(newUser) {
        setUser(newUser);
    }

    return (
        <UserContext.Provider value={user}>
            <UserUpdateContext.Provider value={changeUser}>
                {children}
            </UserUpdateContext.Provider>
        </UserContext.Provider>
    )
}