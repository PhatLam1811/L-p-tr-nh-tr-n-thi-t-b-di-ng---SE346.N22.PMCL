import React, { Component } from "react";
import { View, Text, Button } from "react-native";
import { connect } from "react-redux";

class Homework_4_App extends Component {
    render() {
        return (
            <View style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
                <Text style={{ fontSize: 30 }}>Number: {this.props.counter}</Text>
                <Button title="Increase" onPress={() => this.props.increaseCounter()}></Button>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        counter: state.counter
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        increaseCounter: () => dispatch({ type: "counter/increment" })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Homework_4_App);