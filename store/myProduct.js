import http , {serializeQuery} from '~/repositories/Http.js';


export const state = () => ({
  products: [],
  product: {},
  loading: false,
});

export const mutations = {
  setProducts(state, payload) {
      state.products = payload;
  },
  setProduct(state, payload) {
    state.product = payload;
},
  setLoading(state, payload) {
    state.loading = payload;
  }
};
export const getters = {
  products: state => {
      return state.products
  },
  product: state => {
    return state.product
  },
  loading: state => {
      return state.loading
  }
}
export const actions = {
    getProducts({commit}, payload) {
        return new Promise((resolve, reject) => {
            commit('setLoading' , true)
            http
            .get(`product?${serializeQuery(payload)}`)
            .then( async (data) => {
              commit('setProducts' , data.data)
              commit('setLoading' , false)
              resolve(data.data);
            })
            .catch(e => {
              commit('setLoading' , false)
              reject(e.response.data);
            })
          })
    },
    getProduct({commit}, payload) {
      return new Promise((resolve, reject) => {
          commit('setLoading' , true)
          http
          .get(`product/find/${payload}`)
          .then( async (data) => {
            commit('setProduct' , data.data)
            commit('setLoading' , false)
            resolve(data.data);
          })
          .catch(e => {
            commit('setLoading' , false)
            reject(e.response.data);
          })
        })
  },
  searchProducts({}, payload) {
    return new Promise((resolve, reject) => {
        http
        .get(`product/search?${serializeQuery(payload)}`)
        .then( async (data) => {
            resolve(data.data);
        })
        .catch(e => {
          reject(e.response.data);
        })
      })
  },
};
