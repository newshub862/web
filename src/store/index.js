import Vue from 'vue'
import Vuex from 'vuex'

// import rss from "src/store/modules/rss";
// import article from "src/store/modules/article";

import rss from '@/store/modules/rss'
import article from "@/store/modules/article";
import user from "@/store/modules/user";
import twitter from "@/store/modules/twitter";

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    rss,
    article,
    user,
    twitter,
  }
})
