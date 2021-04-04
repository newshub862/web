<template>
    <!--<v-container>-->
        <div id="rss-container">
            <aside  id="rss-list">
                <RssList />
            </aside>
            <aside id="article-list" v-if="article === null">
                <ArticleList />
            </aside>
            <aside id="article-view" v-if="article !== null">
                <Article />
            </aside>
        </div>

    <!--</v-container>-->
</template>

<script>
import RssList from "@/components/rss/RssList";
import ArticleList from "@/components/rss/ArticleList";
import Article from "@/components/rss/Article";
import {mapGetters} from "vuex";


export default {
    computed: {
        ...mapGetters('article', {
            article:'article',
        }),
    },
    components: {
        Article,
        ArticleList,
        RssList,
    }
};
</script>

<style>
#rss-container {
    display: flex;
    flex-direction: row;
    padding-left: 0;
}
#rss-list {
    width: 30%;
}
#article-list {
    width: 70%;
}
#article-view {
    width: 70%;
}
</style>