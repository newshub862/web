<template>
    <div>
        <span id="header-row">
            <v-btn id="back-btn" icon color="grey" @click="clearArticle">
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
            <span id="article-title">
                {{ article.Title }}
            </span>
        </span>
        <article v-html="article.Body" />
    </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";


export default {
    computed: {
        ...mapGetters('article', {
            article:'article',
        }),
    },
    methods: {
        ...mapActions('article', {
            clearArticle: 'clearArticle',
        }),
    }
};
</script>

<style>
h1 {
    margin-top: 20px;
    margin-bottom: 40px;
}
#header-row {
    display: inline-block;
    margin-top: 20px;
    margin-bottom: 40px;
}
#back-btn {
    margin-right: 10px;
    margin-bottom: 5px;
}
#article-title {
    font-weight: bold;
    font-size: 20px;
}
</style>
