/**
 * Created by perandre on 6/1/16.
 */


const alerts = (state = ['heyy'], action) => {
    switch (action.type) {
        case 'ADD_ALERT':
            return [
               action.text,
                ...state
            ];
        default:
            return state
    }
};

export default alerts