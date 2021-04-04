<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import {mapActions, mapGetters} from "vuex";

export default {
  name: 'Home',
    beforeMount() {
      if (this.isLogined) {
          this.getSettings()
      }
    },
    computed: {
        ...mapGetters('user', {
            isLogined: 'isLogined',
        }),
    },
    methods: {
        ...mapActions('user', {
            getSettings: 'getSettings',
        }),
    },
  components: {
    HelloWorld
  }
}
</script>
