// This context is used to track whether the first page has been loaded or not.
"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { usePathname } from "next/navigation";

// Create the context
const FirstPageContext = createContext(null);

// Create a provider
export const FirstPageProvider = ({ children }) => {
    const [firstPageLoaded, setFirstPageLoaded] = useState(false);
    // Create pathname state to track the current pathname
    const pathname = usePathname();

    useEffect(() => {
        // If the pathname changes and reset firstPageLoaded to false
        setFirstPageLoaded(false);
    }, [pathname]);

    return (
        <FirstPageContext.Provider value={{ firstPageLoaded, setFirstPageLoaded }}>
            {children}
        </FirstPageContext.Provider>
    );
}

export const useFirstPage = () => useContext(FirstPageContext);