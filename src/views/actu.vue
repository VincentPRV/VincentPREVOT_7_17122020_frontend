<template>
  <div v-if="userConnected" class="actu">
    <Header />
    <h1>fil d'actualité</h1>
    <div v-if="userConnected">
      <Comments />
    </div>
  </div>
  <div v-else>
    <router-link to="/"
      >Merci de vous connecter pour naviguer sur Groupomania
    </router-link>
  </div>
</template>

<script>
import Header from "@/components/header.vue";
import Comments from "@/components/comments.vue";


export default {
  name: "Actu",
  components: {
    Header,
    Comments,
  },
  props: {},

  data: () => {
    return {
      userConnected: sessionStorage.getItem("userInfo"),
    };
  },

  methods: {},

  mounted: () => {
    
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
