import { createContext, useContext, useState, useEffect } from "react";

const GlobalContext = createContext();
export const useGlovalContext = () => useContext(GlobalContext);

const GlobalProvider = ({children}) => {
    return(
        <GlobalContext.Provider>
            {children}
        </GlobalContext.Provider>
    )
}