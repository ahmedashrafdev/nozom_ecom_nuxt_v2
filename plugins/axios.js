import store from "vuex"

export default function({ $axios }) {
    $axios.onError(e => {
        store.commit('ui/setErrCode' , e.response.status)
        store.commit('ui/setErrMsg' , e.response.data)
    });
}
