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
          {{ user.username }}
        </h1>
        <p class="ctn__header__email">{{ user.email }}</p>
      </div>
      <div class="ctn__footer">
        <button
          v-if="whatToShow !== 4"
          type="button"
          @click="whatToShow = 4"
          class="ctn__footer__btn"
        >
          Modifier son profil
        </button>
        <div class="whatToShow">
          | <button @click="whatToShow = 3">Modération</button> |
          <button @click="whatToShow = 1">Posts</button> |
          <button @click="whatToShow = 2">Commentaires</button> |
        </div>
        <div v-if="whatToShow === 1" class="lastPost">
          <UserPost />
        </div>
        <div v-if="whatToShow === 2" class="lastPost">
          <UserComment />
        </div>
        <div v-if="whatToShow === 3" class="lastPost">
          <div v-if="userConnected.isAdmin === true">
            <IsSignaled />
          </div>
          <p v-else>Statut de modérateur requis.</p>
        </div>
        <p
          v-if="whatToShow !== 4"
          class="ctn__footer__delete"
          @click="deleteUser()"
        >
          Supprimer son profil
        </p>
        <div v-if="whatToShow === 4" class="ctn__footer__form">
          <input
            type="text"
            name="username"
            required="required"
            v-model="user.username"
            placeholder="Nouveau nom d'utilisateur"
          />
          <p v-if="errors.username">Nom d'utilisateur non valide</p>
          <input
            type="email"
            name="email"
            v-model="user.email"
            unique="true"
            required="required"
            placeholder="Nouvelle e-mail"
            pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,15}$"
          />
          <p v-if="errors.email">Email non valide</p>
          <input
            type="password"
            name="password"
            required="required"
            v-model="user.password"
            placeholder="Nouveau mot de passe - non obligatoire"
            pattern="(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})$"
          />
          <p v-if="errors.password">
            Mot de passe non valide - 6 caractères minimun
          </p>
          <button
            class="ctn__footer__form__btn"
            type="submit"
            @click="updateProfil"
          >
            Modifier mon compte
          </button>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="notConnected">
    <NotConnected />
  </div>
</template>

<script>
import Header from "@/components/header.vue";
import IsSignaled from "@/components/isSignaled.vue";
import UserPost from "@/components/userPost.vue";
import UserComment from "@/components/userComment.vue";
import axios from "axios";
import NotConnected from "@/components/notConnected.vue";

export default {
  name: "Profil",
  components: {
    Header,
    UserPost,
    IsSignaled,
    UserComment,
    NotConnected,
  },
  props: {},

  data: () => {
    return {
      userConnected: null,
      user: {
        username: "",
        password: "",
        email: "",
      },
      whatToShow: 1,
      errors: {
        username: false,
        password: false,
        email: false,
      },
      currentPassword: null,
    };
  },

  methods: {// création de la methods pour récupérer effacer le compte de l'utilisateur connecté.
    deleteUser() {
      let id = JSON.parse(sessionStorage.getItem("userInfo")).UserId;

      if (confirm("Êtes-vous sûr de vouloir supprimer ce compte ?")) {
        axios
          .delete("http://localhost:3000/api/auth/" + id, {
            headers: {
              "Content-type": "application/json",
            },
          })
          .then((res) => res.data);
        sessionStorage.removeItem("userInfo");
        alert("votre compte a été effacé avec succès");
        window.location.href = "http://localhost:8080";
      }
    },
// création de la methods pour vérifier les données rentré dans les inputs.
    verifFields() {
      this.errors.username = false;
      this.errors.email = false;
      this.errors.password = false;
      let errors = 0;
      if (this.user.username.trim().length < 1) {
        this.errors.username = true;
        errors++;
      }
      if (this.user.email.trim().length < 1) {
        this.errors.email = true;
        errors++;
      }
      if (
        this.user.password.trim().length < 6 &&
        this.user.password.trim().length > 0
      ) {
        this.errors.password = true;
        errors++;
      }
      if (errors > 0) {
        return false;
      } else {
        return true;
      }
    },
// création de la methods pour récupérer modifier les données de l'utilisateur connecté.
    updateProfil() {
      if (this.verifFields()) {
        let modifyUser = { ...this.user };
        if (!modifyUser.password) {
          modifyUser.password = this.currentPassword;
        }

        let storeData = JSON.parse(sessionStorage.getItem("userInfo"));
        console.log(storeData.UserId);
        let token = this.userConnected.token;
        axios
          .put(
            "http://localhost:3000/api/auth/" + storeData.UserId,
            this.user,
            {
              headers: {
                "Content-type": "application/json",
                Authorization: "Bearer " + token,
              },
            }
          )
          .then((res) => {
            console.log(res.data);
            storeData.username = this.user.username;
            sessionStorage.setItem("userInfo", JSON.stringify(storeData));
            alert("votre compte a été modifié avec succès");
            this.$router.go("/profil");
          })
          .catch((error) => {
            alert(error);
          });
      }
    },
// création de la methods pour récupérer l'ensemble des données de l'utilisateur connecté.
    getOneUser() {
      let token = this.userConnected.token;
      axios
        .get("http://localhost:3000/api/auth/" + this.userConnected.UserId, {
          headers: {
            "Content-type": "application/json",
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          this.user.email = res.data.user.email;
          this.user.username = res.data.user.username;
          this.currentPassword = res.data.user.password;
          console.log(this.user);
        })
        .catch((error) => {
          alert(error);
        });
    },
  },

  mounted: function () {
    this.userConnected = JSON.parse(sessionStorage.getItem("userInfo"));
    this.getOneUser();
  },
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
  margin-bottom: 40px;
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
      outline: none;
      border-radius: 20px;
      border: none;
      background-color: white;
      -webkit-box-shadow: 0px 10px 13px -7px #000000,
        5px 5px 15px 5px rgba(0, 0, 0, 0);
      box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0, 0, 0, 0);
      position: relative;
      top: -20px;
      font-weight: bold;
      &:hover {
        cursor: pointer;
      }
    }
    &__delete {
      margin-top: 70px;
      font-style: italic;
      &:hover {
        cursor: pointer;
        text-decoration: underline;
      }
    }
    &__form {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      margin: auto;
      padding: 20px;
      &__btn {
        width: 150px;
        height: 30px;
        font-weight: bold;
        border-radius: 15px;
        border-style: none;
        outline: none;
        color: white;
        -webkit-box-shadow: 0px 10px 13px -7px #000000,
          5px 5px 15px 5px rgba(0, 0, 0, 0);
        box-shadow: 0px 10px 13px -7px #000000,
          5px 5px 15px 5px rgba(0, 0, 0, 0);
        background: rgb(255, 23, 68);
        background: linear-gradient(
          90deg,
          rgba(255, 23, 68, 1) 35%,
          rgba(183, 28, 28, 1) 100%
        );
        &:hover {
          cursor: pointer;
        }
      }
    }
  }
}
input {
  width: 300px;
  padding: 10px;
  margin: 10px;
  color: #757575;
}

.whatToShow {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  button {
    font-weight: bold;
    color: #2c3e50;
    border: none;
    outline: none;
    background-color: white;
    padding: 10px;
    &:focus {
      color: #ff1744;
    }
    &:hover {
      cursor: pointer;
      color: #ff1744;
    }
  }
}

@media all and (max-width: 900px) {
  .profil {
    width: 700px;
  }
  .ctn {
    width: 600px;
  }
}

@media all and (max-device-width: 480px) {
  .profil {
    width: 300px;
  }
  .ctn {
    width: 100%;
    &__footer {
      &__form {
        input {
          width: 95%;
          font-size: 11px;
        }
      }
    }
  }
}
</style>