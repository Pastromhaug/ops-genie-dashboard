/**
 * Created by perandre on 6/1/16.
 */


const alerts = (state = []
    , action) => {

    switch (action.type) {
        case 'ADD_ALERT':
            const type = action.alert.action;
            const id = action.alert.alert.alias;
            if (type === 'Create') {
                return [
                    action.alert,
                    ...state
                ];
            }
            else if (type === 'Close') {
                for (var i = 0; i < state.length; i++) {
                    const curr = state[i];
                    if (curr.alert.alias === id) {
                        return state.slice(0,i).concat(state.slice(i+1,state.length));
                    }
                }
            }
            else {
                return [...state];
            }
        default:
            return state
    }
};

export default alerts