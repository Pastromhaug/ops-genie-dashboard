/**
 * Created by perandre on 6/1/16.
 */


const alerts = (state = [{ integrationType: 'Webhook',
                                alert:
                                { createdAt: 1465130442930,
                                    tinyId: '6557',
                                    alias: 'b72c733d-e885-418b-9ac1-43fcb55043fd',
                                    alertId: 'b72c733d-e885-418b-9ac1-43fcb55043fd',
                                    source: 'per.stromhaug@cxense.com',
                                    message: 'test8',
                                    userId: 'd1ad5eed-a2c4-49c9-b590-aa8845986247',
                                    entity: '',
                                    tags: [],
                                    updatedAt: 1465130442930000100,
                                    username: 'per.stromhaug@cxense.com' },
                                integrationName: 'Webhook for webapp',
                                action: 'Create',
                                integrationId: 'a42bf6ed-2059-4a70-a1e4-c14b14091ca6',
                                source: { name: 'web', type: 'API' }
                        }]
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