/**
 * Created by perandre on 6/1/16.
 */


const services = (state = [{service: "ay", downtime: "dklfa;", availability: "932.23%"}], action) => {
    switch (action.type) {
        case 'UPDATE_SERVICE':
            var found = false;
            var newstate = [];
            for (var i = 1; i < state.length; i++) {
                if (newstate[i].service == action.service.service) {
                    newstate.append(action.service);
                    found = true;
                }
                else {
                    newstate.append(state[i]);
                }
            }
            if (found == false) {
                newstate.append(action.service);
            }
            return newstate;
        default:
            return state;
    }
};

export default services