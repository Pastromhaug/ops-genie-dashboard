/**
 * Created by perandre on 6/1/16.
 */

const createAlert = (state, action) => {
    switch (action.type) {
        case 'ADD_ALERT':
            return action.text;
        default:
            return state;
    }
};


const alerts = (state = [], action) => {
    switch (action.type) {
        case 'ADD_ALERT':
            return [
                createAlert(state, action),
                ...state.alerts
            ];
        default:
            return state
    }
};

export default alerts