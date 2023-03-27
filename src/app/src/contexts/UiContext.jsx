import { createContext, useState } from "react";

const UiContext = createContext();

const UiProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    
    return (
        <UiContext.Provider value={{ isLoading, setIsLoading }}>
            {children}
        </UiContext.Provider>
    );
}

export { UiProvider, UiContext };