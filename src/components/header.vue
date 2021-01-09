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
      sessionStorage.removeItem("userInfo");
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

@media all and (max-width: 900px) {
  .header {
    font-size: 13px;
    max-width: 700px;
  }
  .img-header {
    width: 100px;
  }
}

@media all and (max-device-width: 480px) {
  .header {
    max-width: 320px;
    flex-direction: column;
  }
  #nav {
    width: 100%;
    height: 100%;
    a {
      padding: 5px;
    }
  }
  
  .img-header {
    width: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
  }
}
</style>
