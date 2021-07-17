import React, { useState, useContext, createContext } from 'react';

const PageContext = createContext();
const PageUpdateContext = createContext();

export function usePage() {
    return useContext(PageContext);
}

export function usePageUpdate() {
    return useContext(PageUpdateContext);
}

export function PageProvider({ children }) {
    const [page, setPage] = useState(null);

    function changePage(newPage) {
        setPage(newPage);
    }

    return (
        <PageContext.Provider value={page}>
            <PageUpdateContext.Provider value={changePage}>
                {children}
            </PageUpdateContext.Provider>
        </PageContext.Provider>
    )
}