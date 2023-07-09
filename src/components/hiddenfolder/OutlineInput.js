import React from "react";
import { TextInput } from "@react-native-material/core";

const App = (props) => <TextInput label={props.lable} value={props.value} style={{ margin: 16 }} />;

export default App;