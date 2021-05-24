import * as types from "./mutation_type";

const mutations = {
    [types.SET_USER_PROFILE](state, data) {
        state.userProfile = data;
    },
    [types.SET_MACHINE_DATA](state, data) {
        state.machineData = data;
    },
};

export default mutations;