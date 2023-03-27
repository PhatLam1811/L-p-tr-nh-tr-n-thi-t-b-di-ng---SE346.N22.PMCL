const counterInitState = {
    counter: 0
}

const counterReducer = (state = counterInitState, action) => {
    console.log(state.counter);

    // user dispatched an action => update app's state
    if (action.type === "counter/increment") {
        return {
            // update state's counter
            counter: state.counter + 1
        }
    }

    // no action is dispatched => return current state
    return state;
}

export default counterReducer;