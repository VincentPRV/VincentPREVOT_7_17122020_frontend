<template>
  <div id="inscription">
    <h1>Créer son compte</h1>
    <input
      type="text"
      name="username"
      required="required"
      v-model="user.username"
      placeholder="Nom d'utilisateur"
    />
    <p v-if="errors.username">Nom d'utilisateur non valide</p>
    <input
      type="email"
      name="email"
      v-model="user.email"
      unique="true"
      required="required"
      placeholder="e-mail"
      pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,15}$"
    />
    <p v-if="errors.email">Email non valide</p>
    <input
      type="password"
      name="password"
      required="required"
      v-model="user.password"
      placeholder="Mot de passe"
      pattern="(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})$"
    />
    <p v-if="errors.password">Mot de passe non valide - 6 caractères minimun</p>
    <button type="submit" @click="signup">Créer son compte</button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Signup",
  data() {
    return {
      user: {
        username: "",
        password: "",
        email: "",
      },
      errors: {
        username: false,
        password: false,
        email: false,
      },
    };
  },
  methods: {
    signup() {
      if (this.verifFields()) {
        axios
          .post("http://localhost:3000/api/auth/signup", this.user, {
            headers: {
              "Content-type": "application/json",
            },
          })
          .then((response) => {
            console.log(response);
            alert(
              "Compte utilisateur créé ! Vous pouvez maintenant vous connecter avec succès."
            );
            this.$router.go("/");
          })
          .catch((error) => {
            alert(error);
          });
      }
    },

    verifFields() {
      this.errors.username = false;
      this.errors.email = false;
      this.errors.password = false;
      let errors = 0;
      if (this.user.username.trim().length < 1) {
        this.errors.username = true;
        errors++;
      }
      if (this.user.email.trim().length < 4) {
        this.errors.email = true;
        errors++;
      }
      if (this.user.password.trim().length < 6) {
        this.errors.password = true;
        errors++;
      }
      if (errors > 0) {
        return false;
      } else {
        return true;
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#inscription {
  width: 500px;
  border: 1px solid #cccccc;
  border-radius: 50px;
  margin: auto;
  margin-top: 200px;
  padding: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  button {
    width: 150px;
    height: 30px;
    font-weight: bold;
    margin: 10px;
    border-radius: 15px;
    outline: none;
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
  input {
    width: 300px;
    padding: 10px;
    margin: 10px;
  }
}
</style>
