<template>
  <div v-if="userConnected" class="profil">
    <Header />
    <div class="ctn">
      <div class="ctn__header">
        <div class="ctn__header__image">
          <img
            class="ctn__header__img"
            src="../images/avatar.png"
            alt="Photo de profil"
          />
        </div>
        <h1 class="ctn__header__username">
          {{ userConnected.username }}
        </h1>
        <p class="ctn__header__email">email</p>
      </div>
      <div class="ctn__footer">
        <button v-if="wantModify == false"
          type="button"
          v-on:click="wantModify = true"
          class="ctn__footer__btn"
        >
          Modifier son profil
        </button>
        <p v-if="wantModify == false" class="ctn__footer__delete">Supprimer son profil</p>
        <div v-if="wantModify === true" class="ctn__footer__form">
          <input
            type="text"
            name="username"
            required="required"
            v-model="user.username"
            placeholder="Nouveau nom d'utilisateur"
          />
          <input
            type="email"
            name="email"
            v-model="user.email"
            unique="true"
            required="required"
            placeholder="Nouvelle e-mail"
            pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,15}$"
          />
          <input
            type="password"
            name="password"
            required="required"
            v-model="user.password"
            placeholder="Nouveau mot de passe"
            pattern="(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})$"
          />
          <button class="ctn__footer__btn" type="submit">
            Modifier son compte
          </button>
        </div>
      </div>
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
//import axios from "axios";

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
      wantModify: false,
    };
  },

  methods: {
    /*deleteUser() {
      let id = JSON.parse(sessionStorage.getItem("userInfo")).UserId;
      axios
        .destroy("http://localhost:3000/api/user/" + id, {
          headers: {
            "Content-type": "application/json",
          },
        })
        .then((res) => res.json());
    },*/
  },

  mounted: () => {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.ctn {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  margin-top: 30px;
  flex-direction: column;
  flex-wrap: wrap;
  width: 800px;
  color: white;
  &__header {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 80%;
    width: 100%;
    border-radius: 15px 15px 0px 0px;
    background: rgb(255, 23, 68);
    background-image: linear-gradient(to bottom, #cb356b, #bd3f32);
    &__img {
      width: 50px;
    }
    &__image {
      margin-top: 50px;
      border-radius: 50px;
      background-color: white;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 80px;
      height: 80px;
    }
    &__username {
      font-weight: bold;
      font-size: 40px;
      width: 100%;
    }
    &__email {
      width: 100%;
      margin-bottom: 50px;
    }
  }
  &__footer {
    color: black;
    background-color: white;
    width: 100%;
    min-height: 150px;
    border-radius: 0px 0px 15px 15px;
    -webkit-box-shadow: 0px 10px 13px -7px #000000,
      5px 5px 15px 5px rgba(0, 0, 0, 0);
    box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0, 0, 0, 0);
    &__btn {
      height: 40px;
      width: 150px;
      border-radius: 20px;
      border: none;
      background-color: white;
      -webkit-box-shadow: 0px 10px 13px -7px #000000,
        5px 5px 15px 5px rgba(0, 0, 0, 0);
      box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0, 0, 0, 0);
      position: relative;
      top: -20px;
    }
    &__delete {
      margin-top: 70px;
      font-style: italic;
    }
    &__form {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      margin: auto;
      padding: 20px;
    }
    &__btn {
      width: 150px;
      height: 30px;
      font-weight: bold;
      margin-top: 50px;
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
  }
}
input {
  width: 300px;
  padding: 10px;
  margin: 10px;
}
</style>
