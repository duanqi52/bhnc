
/*
const key = 'username'
const store = new Vuex.Store({
    state () {
        return {
            user: null
        }
    },
    getters: {
        getStorage: function (state) {
            if (!state.user) {
            state.user = JSON.parse(localStorage.getItem(key))
            }
            return state.user
        }
        },
        mutations: {
        $_setStorage (state, value) {
            state.user = value
            localStorage.setItem(key, JSON.stringify(value))
        },
        $_removeStorage (state) {
            state.user = null
            localStorage.removeItem(key)
        }
    }
})


export default store


*/



import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
 
const store = new Vuex.Store({
 
  state: {
    // 存储token
    Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : ''
  },
 
  mutations: {
    // 修改token，并将token存入localStorage
    changeLogin (state, user) {
      state.Authorization = user.Authorization;
      localStorage.setItem('Authorization', user.Authorization);
    }
  }
});
 
export default store;
