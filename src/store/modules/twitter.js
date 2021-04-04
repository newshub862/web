import HttpService from '../../util/http'


export default {
    namespaced: true,
    state: {
        news: [],
        sources: [],
        sourceMap: {},
    },
    getters: {
        news(state) {
            return state.news
        },
        sources(state) {
            return state.sources
        },
        sourceMap(state) {
            return state.sourceMap
        },
    },
    mutations: {
        setNews(state, news) {
            state.news = news
        },
        setSources(state, sources) {
            state.sources = sources
            sources.forEach((item) => {
                state.sourceMap[item.Id] = {
                    image: item.Image,
                    name: item.Name,
                    link: item.Url,
                    screenName: item.ScreenName
                }
            })
        },
    },
    actions: {
        async getPage(store) {
            await HttpService.httpGet('/twitter', (page) => {
                store.commit('setNews', page.News)
                store.commit('setSources', page.Sources)
            })
        },
        async getNews(store, data) {
            const url = `/twitter/news?ssource_id=${data.sourceId}`
            await HttpService.httpGet(url, (news) => {
                store.commit('setNews', news)
            })
        },
        async getSources(store) {
            await HttpService.httpGet('/twitter/sources', (sources) => {
                store.commit('setSources', sources)
            })
        },
        async search(store, data) {
            const url = `/twitter/search?search_string=${data.searchString}&source_id=${data.sourceId}`
            await HttpService.httpGet(url, (page) => {
                store.commit('setNews', page.News)
            })
        },
    }
};