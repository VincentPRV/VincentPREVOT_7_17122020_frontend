<template>
  <div id="login">
    <h1>S'identifier</h1>
    <input
      type="text"
      name="username"
      v-model="input.username"
      placeholder="Nom d'utilisateur"
    />
    <input
      type="password"
      name="password"
      v-model="input.password"
      placeholder="Mot de passe"
    />
    <button type="button" v-on:click="login()">Connexion</button>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      input: {
        username: "",
        password: "",
      },
    };
  },
  methods: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#login {
  width: 500px;
  border: 1px solid #cccccc;
  border-radius: 50px;
  margin: auto;
  margin-top: 200px;
  padding: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  input {
    width: 300px;
    padding: 10px;
    margin: 10px;
  }
  button {
    width: 150px;
    height: 30px;
    font-weight: bold;
    margin: 10px;
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
</style>
