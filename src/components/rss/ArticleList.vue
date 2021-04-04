<template>
    <v-main>
        <v-list rounded>
            <v-list-item-group color="primary">
                <v-list-item v-for="article in articleList" :key="article.Id">

                    <!-- bookmark icon -->
                    <span v-if="settings.ShowBookmarkButton">
                        <v-list-item-icon v-if="article.IsBookmark" @click="markAsBookmark(article, false)">
                            <v-icon color="grey lighten-1">
                                mdi-bookmark
                            </v-icon>
                        </v-list-item-icon>
                        <v-list-item-icon v-if="!article.IsBookmark" @click="markAsBookmark(article, true)">
                            <v-icon color="grey lighten-1">
                                mdi-bookmark-outline
                            </v-icon>
                        </v-list-item-icon>
                    </span>

                    <!-- is read icon -->
                    <span v-if="settings.ShowReadButton">
                        <v-list-item-icon v-if="!article.IsRead" @click="setAsRead(article, true)">
                            <v-icon color="grey lighten-1">
                                mdi-check-bold
                            </v-icon>
                        </v-list-item-icon>
                        <v-list-item-icon v-if="article.IsRead" @click="setAsRead(article, false)">
                            <v-icon color="grey lighten-1">
                                mdi-check
                            </v-icon>
                        </v-list-item-icon>
                    </span>

                    <!-- title -->
                    <v-list-item-content @click="openArticle(article)">
                        <v-list-item-title
                                v-text="article.Title"
                                :class="{ unread: !article.IsRead }"
                        >
                        </v-list-item-title>
                    </v-list-item-content>

                    <!-- link action -->
                    <v-list-item-action v-if="settings.ShowLinkButton">
                        <v-btn icon>
                            <a :href="article.Link" target="_blank" class="link-action">
                                <v-icon color="grey lighten-1">mdi-link</v-icon>
                            </a>
                        </v-btn>
                    </v-list-item-action>

                </v-list-item>
            </v-list-item-group>
        </v-list>

        <div class="text-center" v-if="articleList.length > 0">
            <v-pagination
                    v-model="page"
                    :length="articleCount / 20"
                    circle
                    @input="getArticlesByPage"
            ></v-pagination>
        </div>
        <br>
        <br>
    </v-main>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
    data: () => {
        return {
            page: 1
        }
    },
    computed: {
        ...mapGetters('article', {
            articleList: 'articleList',
            articleCount: 'articleCount',
            feedId: 'feedId',
        }),
        ...mapGetters('user', {
            settings: 'settings',
        }),
    },
    methods: {
        ...mapActions('rss', {
            decrementArticlesCount: 'decrementArticlesCount',
            incrementArticlesCount: 'incrementArticlesCount',
        }),
        ...mapActions('article', {
            getArticleById: 'getArticleById',
            updateArticle: 'updateArticle',
            getArticles: 'getArticles',
            setUpdatedArticle: 'setUpdatedArticle',
        }),
        async getPost(post) {
            if (!post.IsRead) {
                this.decrementArticlesCount(post.FeedId)
            }

            await this.getArticleById(post)
        },
        async markAsBookmark(article, isBookmark) {
            const updData = {
                articleId: article.Id,
                isRead: article.IsRead,
                isBookmark: isBookmark,
                feedId: this.feedId,
            }
            await this.updateArticle(updData)
        },
        async setAsRead(article, isRead) {
            const updData = {
                articleId: article.Id,
                isRead: isRead,
                isBookmark: article.IsBookmark,
                feedId: this.feedId,
            }

            if (isRead) {
                this.decrementArticlesCount(this.feedId)
            } else {
                this.incrementArticlesCount(this.feedId)
            }

            await this.updateArticle(updData)
        },
        async getArticlesByPage() {
            const data = {
                page: this.page,
                rssId: this.feedId
            }
            await this.getArticles(data)
        },
        async openArticle(article) {
            await this.getArticleById(article)
            this.decrementArticlesCount(this.feedId)

            article.IsRead = true
            this.setUpdatedArticle(article)
        }
    }
};
</script>

<style>
.unread {
    font-weight: bold;
}
.link-action {
    text-decoration: none;
}
</style>