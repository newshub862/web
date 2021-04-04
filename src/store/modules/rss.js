import HttpService from '../../util/http'


export default {
    namespaced: true,
    state: {
        rssList: [],
        currentFeed: null,
    },
    getters: {
        rssList(state) {
            return state.rssList
        },
        currentFeed(state) {
            return state.currentFeed
        },
    },
    mutations: {
        loadRss(state, rssList) {
            state.rssList = rssList
        },
        clearFeeds(state) {
            state.rss = [];
        },
        setCurrentFeed(state, feed) {
            state.currentFeed = feed
        },
        decrementArticlesCount(state, feedId) {
            let updatedFeeds = []

            for (let i = 0; i < state.rssList.length; ++i) {
                if (state.rssList[i].Feed.Id !== feedId) {
                    updatedFeeds.push(state.rssList[i])
                    continue
                }

                if (state.rssList[i].ArticlesCount > 0) {
                    state.rssList[i].ArticlesCount -= 1
                }
                
                updatedFeeds.push(state.rssList[i])
            }

            state.rssList = updatedFeeds
        },
        incrementArticlesCount(state, feedId) {
            let updatedFeeds = []

            for (let i = 0; i < state.rssList.length; ++i) {
                if (state.rssList[i].Feed.Id !== feedId) {
                    updatedFeeds.push(state.rssList[i])
                    continue
                }

                state.rssList[i].ArticlesCount += 1
                updatedFeeds.push(state.rssList[i])
            }

            state.rssList = updatedFeeds
        },
        updateRss(state, data) {
            for (let i = 0; i < state.rssList.length; ++i) {
                if (state.rssList[i].Feed.Id !== data.id) {
                    continue
                }

                state.rssList[i].Feed.Name = data.name
                break
            }
        }
    },
    actions: {
        async loadRss(store) {
            await HttpService.httpGet('/rss', (rssList) => {
                store.commit('loadRss', rssList)
            })
        },
        async addRss(store, link) {
            await HttpService.httpPost('/rss', { url: link }, (rssList) => {
                // store.commit('clearFeeds')
                store.commit('loadRss', rssList)
            })
        },
        async updateRss(store, data) {
            const updateData = {
                name: data.name,
            }
            await HttpService.httpPut(`/rss/${data.id}`, updateData, () => {
                store.commit('updateRss', data)
            })
        },
        async removeRss(store, feedId) {
            await HttpService.httpDelete(`/rss/${feedId}`, (rssList) => {
                store.commit('loadRss', rssList)
            })
        },
        async uploadOPML(store, data) {
            await HttpService.httpPost('/rss', data, (rssList) => {
                // store.commit('clearFeeds')
                store.commit('loadRss', rssList)
            })
        },
        downloadOPML() {
            fetch("/rss/opml", {
                method: 'GET',
                headers: {
                    "Authorization": "Bearer " + HttpService.getToken(),
                }
            })
            .then(response => response.blob())
            .then(blob => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = "rss_list_newshub.opml";
                document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
                a.click();
                a.remove();  //afterwards we remove the element again
            });
        },
        setCurrentFeed(store, feed) {
            store.commit('setCurrentFeed', feed)
        },
        decrementArticlesCount(store, feedId) {
            store.commit('decrementArticlesCount', feedId)
        },
        incrementArticlesCount(store, feedId) {
            store.commit('incrementArticlesCount', feedId)
        },
    }
};