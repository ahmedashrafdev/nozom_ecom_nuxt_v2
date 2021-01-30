
export const state = () => ({
    errMsg: null,
    errCode: null,
});

export const mutations = {
    setErrMsg(state, payload) {
        state.errMsg = payload;
    },
    setErrCode(state, payload) {
        state.errCode = payload;
    }
};

export const getters = {
    errMsg: state => {
        return state.errMsg
    },
    errCode: state => {
        return state.errCode
    }
}