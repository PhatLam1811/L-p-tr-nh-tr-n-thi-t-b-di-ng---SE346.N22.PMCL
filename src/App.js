import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import Homework_4_App from "./components/Homework_4_App.js";
import counterReducer from "./redux/counterReducer.js";

const store = createStore(counterReducer);

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Homework_4_App />
            </Provider>
        )
    }
}

export default App;
