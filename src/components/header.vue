<template>
  <div v-if="userConnected" class="header">
    <img
      class="img-header"
      src="../images/icon-left-font-monochrome-black.png"
      alt="Logo de Groupomania"
    />
    <div id="nav">
      <router-link to="/actu">Actualités</router-link> |
      <router-link to="/newPost">Créer un post</router-link> |
      <router-link to="/profil"
        ><i class="far fa-user-circle"></i> Profil
      </router-link>
      |
      <a href="http://localhost:8080/#/" v-on:click="logout()"
        ><i class="fas fa-sign-out-alt"></i
      ></a>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  props: {},

  data: () => {
    return {
      userConnected: sessionStorage.getItem("userInfo"),
    };
  },

  methods: {
    logout() {
      window.location.href = "http://localhost:8080";
      sessionStorage.removeItem("userConnected");
      sessionStorage.removeItem("userInfo");
      this.$store.commit("CLEAR_USER");
    },
  },

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
      color: #ff1744;
    }
  }
}

.logout {
  margin-left: 50px;
  font-size: 30px;
}
</style>
