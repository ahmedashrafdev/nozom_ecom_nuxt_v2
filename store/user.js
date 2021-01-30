import http from "../repositories/Repository.js";

export const state = () => ({
    
});

export const mutations = {
    
};

export const getters = {
    
}
export const actions = {
    register(payload) 
    {
        console.log(payload)

        return new Promise((resolve, reject) => {
            http
            .post("register" , payload)
            .then( async (data) => {
               
                resolve(data);
            })
            .catch(e => {
                
                reject(e.response.data);
            })
          })
    },
    
};
