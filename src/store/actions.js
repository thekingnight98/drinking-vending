import * as types from "./mutation_type";
const actions = {
    setUserProfile({ commit }, data) {
        commit(types.SET_USER_PROFILE, data);
    },
    setMachineData({ commit }, data) {
        commit(types.SET_MACHINE_DATA, data);
    },
    setUserPay({commit} , data ){
        commit(types.SET_USER_PAY , data)
    }
};

export default actions;