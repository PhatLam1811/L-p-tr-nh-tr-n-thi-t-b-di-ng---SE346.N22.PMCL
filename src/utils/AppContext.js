import React, { useState, useEffect } from "react";

import AppController from "../controllers/AppController";

const AppContext = React.createContext({
    appLayout: null,
    snackBarMessage: null,
    callSnackBar: ({ type, message }) => { },
    changeAppLayout: () => { }
});

export const AppContextProvider = (props) => {
    const [appLayout, setAppLayout] = useState(null);
    const [snackBarMessage, setSnackbarMessage] = useState({ type: null, message: null });

    const CallSnackBar = ({ type, message }) => {
        setSnackbarMessage({
            type: type,
            message: message,
        })
    }

    const ChangeAppLayout = () => {
        setAppLayout(prev => prev !== "grid" ? "grid" : "column");
    }

    useEffect(() => {
        const SaveAppLayout = async () => {
            await AppController.SaveAppLayout(appLayout);
        }

        const GetAppLayout = async () => {
            const saveLayout = await AppController.GetAppLayout();
            setAppLayout(saveLayout != null ? saveLayout : "grid");
        }

        if (appLayout == null) {
            GetAppLayout();
        } else {
            SaveAppLayout();
        }
    }, [appLayout]);

    return (
        <AppContext.Provider
            value={{
                appLayout: appLayout,
                snackBarMessage: snackBarMessage,
                callSnackBar: CallSnackBar,
                changeAppLayout: ChangeAppLayout,
            }}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContext;