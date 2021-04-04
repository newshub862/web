import HttpService from '../../util/http'


export default {
    namespaced: true,
    state: {
        settings: null,
        isLogined: false
    },
    getters: {
        settings(state) {
            if (state.settings === null && state.isLogined) {
                HttpService.httpGet('/users/settings',(response) => {
                    state.settings  = response
                })
            }
            return state.settings
        },
        isLogined(state) {
            return state.isLogined
        },
    },
    mutations: {
        setSettings(state, settings) {
            state.settings = settings
        },
        setIsLogined(state, data) {
            state.isLogined = data
        },
        logout(state) {
            state.isLogined = false
            localStorage.clear()
        },
    },
    actions: {
        async setSettings(store, data) {
            await HttpService.httpPut('/users/settings', data,(response) => {
                store.commit('setSettings', response)
            })
        },
        getSettings(store) {
            return HttpService.httpGet('/users/settings',(response) => {
                store.commit('setSettings', response)
            })
        },
        async updateSettings(store, data) {
            await HttpService.httpPut('/users/settings', data, (response)=> {
                store.commit('setSettings', response)
            })
        },
         auth(store, data) {
             return HttpService.httpPost('/auth', data, (response) =>  {
                 localStorage.setItem('rtoken', response.refresh_token)
                 localStorage.setItem('token', response.token)

                 store.commit('setIsLogined', true)
            })
        },
        registration(store, data) {
            return HttpService.httpPost('/registration', data, (response) =>  {
                localStorage.setItem('rtoken', response.refresh_token)
                localStorage.setItem('token', response.token)

                store.commit('setIsLogined', true)
            })
        },
        setIsLogined(store, data) {
            store.commit('setIsLogined', data)
        },
        logout(store) {
            store.commit('logout')
        }
    }
};