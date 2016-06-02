/**
 * Created by perandre on 6/1/16.
 */


const services = (state = [{service: "ay", downtime: "dklfa;", availability: "932.23%"}], action) => {
    switch (action.type) {
        case 'UPDATE_SERVICE':
            var found = false;
            var newstate = [];
            for (var i = 0; i < state.length; i++) {
                if (state[i].service == action.service.service) {
                    newstate = newstate.concat([action.service]);
                    found = true;
                }
                else {
                    newstate = newstate.concat([state[i]]);
                }
            }
            if (found == false) {
                newstate = newstate.concat([action.service]);
            }
            return newstate;
        default:
            return state;
    }
};

export default services