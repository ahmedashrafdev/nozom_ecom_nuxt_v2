import Repository, {
    serializeQuery,
    baseUrl
} from '~/repositories/Repository.js';

import http from '~/repositories/Http.js';

export const state = () => ({
    collections: null,
    categories: null,
    featuredGroups :[],
    twoLayersLoading:false,
    threeLayersLoading:false,
    queries: null,
    shopGroups:[],
    loading:false
});

export const mutations = {
    setCollections(state, payload) {
        state.collections = payload;
    },

    setTwoLayersLoading(state,payload){
        state.twoLayersLoading = payload
    },
    setCategories(state, payload) {
        state.categories = payload;
    },
    setQueries(state, payload) {
        state.queries = payload;
    },
    setFeaturedGroups(state, payload) {
        state.featuredGroups = payload;
    },
    setLoading(state, payload) {
        state.loading = payload;
    },
    setThreeLayersLoading(state, payload) {
        state.loading = payload;
    },
    setShopGroups(state, payload) {
        state.shopGroups = payload
    }
};

export const getters = {
    twoLayersLoading: state => {
        return state.twoLayersLoading
    },
    threeLayersLoading: state => {
        return state.threeLayersLoading
    },
    featuredGroups: state => {
        return state.featuredGroups
    },
    shopGroups: state => {
        return state.shopGroups
    },
    

    loading: state => {
        return state.loading
    }

}

export const actions = {
    async getCollectionsBySlugs({ commit }, payload) {
        let query = '';
        payload.forEach(item => {
            if (query === '') {
                query = `slug_in=${item}`;
            } else {
                query = query + `&slug_in=${item}`;
            }
        });
        const reponse = await Repository.get(`${baseUrl}/collections?${query}`)
            .then(response => {
                commit('setCollections', response.data);
                return response.data;
            })
            .catch(error => ({ error: JSON.stringify(error) }));
        return reponse;
    },
    async getCategoriesBySlugs({ commit }, payload) {
        let query = '';
        payload.forEach(item => {
            if (query === '') {
                query = `slug_in=${item}`;
            } else {
                query = query + `&slug_in=${item}`;
            }
        });
        const reponse = await Repository.get(
            `${baseUrl}/product-categories?${query}`
        )
            .then(response => {
                commit('setCategories', response.data);
                return response.data;
            })
            .catch(error => ({ error: JSON.stringify(error) }));
        return reponse;
    },

    getGroups({commit} , payload) {
        return new Promise((resolve, reject) => {
            commit('setLoading', true);
            http
            .get(`group/list?${serializeQuery(payload)}`)
            .then( async (data) => {
                commit('setLoading', false);
                if(payload.featured == 1){
                    commit('setFeaturedGroups', data.data);
                }
                resolve(data.data);
                
            })
            .catch(e => {
              console.log(e.response.data)
              commit('setLoading', false);

              reject(e.response.data);
            })
          })
    },
    getShopGroups({commit} , payload) {
        return new Promise((resolve, reject) => {
            commit('setLoading', true);
            http
            .get(`group/list?${serializeQuery(payload)}`)
            .then( async (data) => {
                commit('setLoading', false);
                console.log(data.data)
                commit('setShopGroups', data.data);
                resolve(data.data);
                
            })
            .catch(e => {
              console.log(e.response.data)
              commit('setLoading', false);

              reject(e.response.data);
            })
          })
    },
    getGroupsTwoLayers({commit}) {
        return new Promise((resolve, reject) => {
            commit('setTwoLayersLoading', true);
            http
            .get("group/two-layers")
            .then( async (data) => {
                commit('setTwoLayersLoading', false);
                resolve(data.data);
            })
            .catch(e => {
              commit('setTwoLayersLoading', false);
              reject(e.response.data);
            })
          })
    },
    getGroupsThreeLayers({commit}) {
        return new Promise((resolve, reject) => {
            commit('setThreeLayersLoading', true);
            http
            .get("group/three-layers")
            .then( async (data) => {
                commit('setThreeLayersLoading', false);
                resolve(data.data);
            })
            .catch(e => {
              commit('setThreeLayersLoading', false);
              reject(e.response.data);
            })
          })
    }
};
