import React, { useState } from "react";

const AppContext = React.createContext({
    snackBarMessage: null,
    callSnackBar: ({ type, message }) => { }
});

export const AppContextProvider = (props) => {
    const [snackBarMessage, setSnackbarMessage] = useState({ type: null, message: null });

    const CallSnackBar = ({ type, message }) => {
        setSnackbarMessage({
            type: type,
            message: message,
        })
    }

    return (
        <AppContext.Provider
            value={{
                snackBarMessage: snackBarMessage,
                callSnackBar: CallSnackBar,
            }}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContext;