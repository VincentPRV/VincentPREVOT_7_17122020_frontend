<template>
  <div v-if="userConnected" class="actu">
    <Header />
    <h1>Fil d'actualité</h1>
    <div v-if="userConnected">
      <Posts />
    </div>
  </div>
  <div v-else class="notConnected">
    <NotConnected />
  </div>
</template>

<script>
import Header from "@/components/header.vue";
import Posts from "@/components/posts.vue";
import NotConnected from "@/components/notConnected.vue";

export default {
  name: "Actu",
  components: {
    Header,
    Posts,
    NotConnected,
  },
  props: {},

  data: () => {
    return {
      userConnected: sessionStorage.getItem("userInfo"),
    };
  },

  methods: {},

  mounted: () => {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

  @media all and (max-width: 900px) {
    .actu {
      font-size: 12px;
      max-width: 700px;
    }
  }

@media all and (max-device-width: 480px){
    .actu {      
        max-width: 320px;
    }
}
</style>
