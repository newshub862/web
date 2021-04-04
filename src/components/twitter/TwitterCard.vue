<template>
    <v-card outlined elevation="2" class="mx-auto card-body" max-width="550">
        <a :href="mainLink" target="_blank" class="no-decor-link">
            <v-img v-if="news.Image !== ''" :src="news.Image" height="200px" />

            <v-card-subtitle>
                {{ news.Text }}
            </v-card-subtitle>
        </a>

        <v-card-actions>
            <a :href="sourceLink" class="main-link" target="_blank">
                    <v-avatar>
                        <img :src="source.image" alt="avatar" >
                    </v-avatar>
                    <span class="subtitle-1 source-name">{{ source.name }}</span>
            </a>

            <v-spacer></v-spacer>

            <a :href="source.link" target="_blank" class="no-decor-link" v-if="source.link !== ''">
                <v-btn icon color="primary">
                    <v-icon>mdi-link</v-icon>
                </v-btn>
            </a>

            <a :href="mainLink" target="_blank" class="no-decor-link">
                <v-btn icon color="primary">
                    <v-icon>mdi-twitter</v-icon>
                </v-btn>
            </a>
        </v-card-actions>
    </v-card>
</template>

<script>

export default {
    name: "TwitterCard",
    props: {
        news: Object,
        source: Object,
    },
    data: () => {
        return {
            mainLink: '',
            sourceLink: '',
        }
    },
    beforeMount() {
        this.mainLink = `https://twitter.com/${this.source.screenName}/status/${this.news.TweetId}`
        this.sourceLink = `https://twitter.com/` + this.source.screenName
    },
    computed: {
        // ...mapGetters('twitter', {
        //     sourceMap: 'sourceMap',
        // })
    }
}
</script>

<style scoped>
.no-decor-link {
    text-decoration: none;
}
.main-link {
    text-decoration: none;
    color: #000;
}
.card-body {
    width: 500px;
}
.source-name {
    display: inline-block;
    margin-left: 10px;
}
</style>