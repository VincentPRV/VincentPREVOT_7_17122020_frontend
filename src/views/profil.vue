<template>
  <div v-if="userConnected" class="profil">
    <Header />
    <div class="ctn">
      <img
        class="ctn__image"
        src="../images/icon-above-font.png"
        alt="Photo de profil"
      />
      <ul class="ctn__detail">
        <li class="ctn__detail__username">
          <h1>username</h1>
        </li>
        <li class="ctn__detail__email">email</li>
        <button type="button" v-on:click="deleteUser()">
          Supprimer son profil
        </button>
      </ul>
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
import axios from "axios";

export default {
  name: "Profil",
  components: {
    Header,
  },
  props: {},

  data: () => {
    return {
      userConnected: JSON.parse(sessionStorage.getItem("userInfo")),
      user: {},
    };
  },

  methods: {
    deleteUser() {
      let id = JSON.parse(sessionStorage.getItem("userInfo")).UserId;
      axios
        .destroy("http://localhost:3000/api/user/" + id, {
          headers: {
            "Content-type": "application/json",
          },
        })
        .then((res) => res.json());
    },
  },

  mounted: () => {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.profil {
  display: flex;
  flex-direction: column;
  margin: auto;
  align-items: center;
}

.ctn {
  display: flex;
  padding: 80px;
  width: 70%;
  &__image {
    width: 40%;
  }
  &__detail {
    background-image: url("../images/cyber-3400789_640.jpg");
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: auto;
    width: 60%;
    height: 400px;
    padding: 20px;
  }
}

ul {
  list-style-type: none;
}

li {
  height: 70px;
  width: 60%;
  margin: 10px 0px 10px 0px;
  background-color: white;
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  -webkit-box-shadow: 0px 10px 13px -7px #000000,
    5px 5px 15px 5px rgba(0, 0, 0, 0);
  box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0, 0, 0, 0);
}

button {
  width: 150px;
  height: 30px;
  font-weight: bold;
  margin-top: 120px;
  border-radius: 15px;
  border-style: none;
  color: white;
  -webkit-box-shadow: 0px 10px 13px -7px #000000,
    5px 5px 15px 5px rgba(0, 0, 0, 0);
  box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0, 0, 0, 0);
  background: rgb(255, 23, 68);
  background: linear-gradient(
    90deg,
    rgba(255, 23, 68, 1) 35%,
    rgba(183, 28, 28, 1) 100%
  );
}
</style>
