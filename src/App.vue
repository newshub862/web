<template>
    <v-app>
        <v-app-bar app color="primary" dark>
            <div class="d-flex align-center">
                <!--<v-img
                    alt="Vuetify Logo"
                    class="shrink mr-2"
                    contain
                    src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
                    transition="scale-transition"
                    width="40"
                />

                <v-img
                    alt="Vuetify Name"
                    class="shrink mt-1 hidden-sm-and-down"
                    contain
                    min-width="100"
                    src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
                    width="100"
                />-->
                <h2>NewsHub</h2>
            </div>

            <v-toolbar-items v-if="isLogined">
                <v-btn text @click="push('/rss')" v-if="settings.RssEnabled">
                    RSS
                </v-btn>
                <v-btn text @click="push('/vk')" v-if="settings.VkNewsEnabled">
                    Vk
                </v-btn>
                <v-btn text @click="push('/twitter')" v-if="settings.TwitterEnabled">
                    Twitter
                </v-btn>
            </v-toolbar-items>

            <v-spacer></v-spacer>

            <v-btn icon @click="push('/settings')" v-if="isLogined">
                <v-icon>mdi-cog</v-icon>
            </v-btn>
            <v-btn icon @click="userLogout" v-if="isLogined">
                <v-icon>mdi-logout</v-icon>
            </v-btn>

        </v-app-bar>

        <v-main>
            <router-view></router-view>
        </v-main>
    </v-app>
</template>

<script>
import {mapActions, mapGetters} from "vuex";


export default {
    name: "App",
    data: () => {
        return {}
    },
    beforeMount() {
        const token = localStorage.getItem('token')
        this.setIsLogined(token !== null)

        if (token === null) {
            this.$router.replace('/login')
        }
    },
    computed: {
        ...mapGetters('user', {
            isLogined: 'isLogined',
            settings: 'settings',
        }),
    },
    methods: {
        ...mapActions('user', {
            setIsLogined: 'setIsLogined',
            logout: 'logout',
        }),
        push(url) {
            this.$router.replace(url)
        },
        async userLogout() {
            await this.logout()

            if (!this.isLogined) {
                await this.$router.replace('/login')
            }
        }
    },
};
</script>
