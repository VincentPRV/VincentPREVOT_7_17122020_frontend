<template>
  <div class="header">
    <img
        class="img-header"
        src="../images/icon-left-font-monochrome-black.png"
        alt="Logo de Groupomania"
      />
    <div id="nav">
      <router-link to="/">Connexion</router-link> |
      <router-link to="/actu">Actualités</router-link> |
      <router-link to="/profil"><i class="far fa-user-circle"></i> Profil de {{ user.username }} </router-link>
    </div>
  </div>
</template>

<script>

export default {
  name: "Header",
  props: {},

  data: () => {
    return {};
  },

  methods: {},

  mounted: () => {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.header {
  border: black 3px solid;
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
}

.img-header {
  width: 350px;
  margin-left: 60px;
}

#nav {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  a {
    font-weight: bold;
    color: #2c3e50;
    padding: 30px;
    &.router-link-exact-active {
      /*color: #42b983;*/
      color: #ff1744;
    }
  }
}

</style>
