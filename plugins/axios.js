export default ({store, app: { $axios }}) => {
    $axios.onError(e => {
        console.log(e.response.data)
        store.commit('ui/setErrCode' , e.response.status)
        store.commit('ui/setErrMsg' , e.response.data)
    });
  }