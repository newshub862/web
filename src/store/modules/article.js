import HttpService from "@/util/http";


export default {
    namespaced: true,
    state: {
        articles: [],
        article: null,
        articleCount: 0,
        feedId: 0,
    },
    getters: {
        articleList(state) {
            return state.articles
        },
        article(state) {
            return state.article
        },
        articleCount(state) {
            return state.articleCount
        },
        feedId(state) {
            return state.feedId
        }
    },
    mutations: {
        setArticles(state, articles) {
            state.articles = articles
        },
        setArticle(state, article) {
            state.article = article
        },
        setArticleCount(state, count) {
            state.articleCount = count
        },
        clearArticles(state) {
            state.articles = [];
        },
        clearArticle(state) {
            state.article = null;
        },
        setUpdatedArticle(state, data) {
            let updatedArticles = []

            for (let i = 0; i < state.articles.length; ++i) {
                if (state.articles[i].Id !== data.Id) {
                    updatedArticles.push(state.articles[i])
                    continue
                }

                updatedArticles.push(data)
            }

            state.articles = updatedArticles
        },
        setFeedId(state, id) {
            state.feedId = id
        },
    },
    actions: {
        async getArticles(store, data) {
            await HttpService.httpGet(`/rss/${data.rssId}/articles?page=${data.page}`, (articles) => {
                store.commit('setArticles', articles.Articles)
                store.commit('setArticleCount', articles.Count)
                store.commit('setFeedId', data.rssId)
            })
        },
        async getArticleById(store, data) {
            store.commit('clearArticle')

            await HttpService.httpGet(`/rss/${data.FeedId}/articles/${data.Id}`, (article) => {
                store.commit('setArticle', article)
            })
        },
        async updateArticle(store, data) {
            const updData = {
                article_id: data.articleId,
                is_read: data.isRead,
                is_bookmark: data.isBookmark,
            }
            await HttpService.httpPut(`/rss/${data.feedId}/articles/${data.articleId}`, updData,    (article) => {
                store.commit('setUpdatedArticle', article)
            })
        },
        clearArticle(store) {
            store.commit('clearArticle')
        },
        setUpdatedArticle(store, article) {
            store.commit('setUpdatedArticle', article)
        }
    }
};