<template>
  <div class="loginSignup">
    <Header />
    <div v-if="userExist">
      <Login />
      <h2 @click="userExist = !userExist">Vous n’avez pas de compte  ? <span>Inscrivez-vous</span></h2>
    </div>

    <div v-else id="new">
      <Signup />
      <h2 @click="userExist = true">Déjà membre ?</h2>
    </div>
  </div>
</template>

<script>
import Header from "@/components/header.vue";
import Login from "@/components/login.vue";
import Signup from "@/components/signup.vue";

export default {
  name: "loginSignup",
  components: {
    Header,
    Login,
    Signup,
  },
  props: {},

  data: () => {
    return {
      userExist: true,
    };
  },
  methods: {},

  mounted: () => {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.loginSignup {
    width: 100%;
  }

button {
  width: 150px;
  height: 30px;
  font-weight: bold;
  margin: 10px;
  border-radius: 15px;
  border-style: none;
  cursor: pointer;
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

span {
  color: red;
}
h2 {
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
}
@media all and (max-width: 900px) {
  .loginSignup {
    width: 700px;
   
  }
  .ctn {
    width: 600px;
  }
}
</style>
