<template>
    <v-main>
        <div class="card-container" v-for="item in news" :key="item.Id">
            <TwitterCard :news="item" :source="sourceMap[item.SourceId]" />
        </div>
    </v-main>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import TwitterCard from "@/components/twitter/TwitterCard";

export default {
    name: "Twitter",
    beforeMount() {
        if (this.news.length === 0) {
            this.getPage()
        }
    },
    computed: {
        ...mapGetters('twitter', {
            news: 'news',
            sources: 'sources',
            sourceMap: 'sourceMap',
        })
    },
    methods: {
        ...mapActions('twitter', {
            getPage: 'getPage',
            getNews: 'getNews',
            getSources: 'getSources',
            search: 'search',
        })
    },
    components: {
        TwitterCard

    }
}
</script>

<style scoped>
.card-container {
    margin: 20px;
}
</style>