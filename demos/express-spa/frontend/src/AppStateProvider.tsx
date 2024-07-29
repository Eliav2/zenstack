import React, { useState } from 'react';

const AppStateDefaultValues = {
    currentUser: 'testUser',
    setCurrentUser: (user: string) => {},
};
const AppState = React.createContext(AppStateDefaultValues);
export const AppStateProvider = ({ children }: { children: React.ReactNode }) => {
    const [currentUser, setCurrentUser] = useState('testUser');
    console.log('AppStateProvider', 'currentUser', currentUser);
    return <AppState.Provider value={{ currentUser, setCurrentUser }}>{children}</AppState.Provider>;
};
export const useAppState = () => {
    const context = React.useContext(AppState);
    return context;
};
