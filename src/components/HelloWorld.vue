<template>
  <v-container>
      <h2>Your pages</h2>
    <v-col>
        <router-link to="/rss" v-if="settings.RssEnabled">
            <div class="route-btn">
                RSS
            </div>
        </router-link>
        <router-link to="/vk" v-if="settings.VkNewsEnabled">
            <div class="route-btn">
                Vk
            </div>
        </router-link>
        <router-link to="/twitter" v-if="settings.TwitterEnabled">
            <div class="route-btn">
                Twitter
            </div>
        </router-link>
    </v-col>
  </v-container>
</template>

<script>
import {mapGetters} from "vuex";

export default {
    name: 'HelloWorld',
    computed: {
        ...mapGetters('user', {
            settings: 'settings',
        }),
    }
}
</script>

<style>
.route-btn {
    background: lightgrey;
    text-align: center;
    border-radius: 5px;
    margin: 10px;
    padding: 20px;
    text-decoration: none;
    font-size: 20px;
    font-weight: bold;
    color: black;
}
.route-btn:hover {
    background: grey;
}
</style>