<template>
  <div class="profil">
    <Header />
    <div class="ctn">
      <img
        class="ctn__image"
        src="../images/icon-above-font.png"
        alt="Photo de profil"
      />
      <ul class="ctn__detail">
        <li class="ctn__detail__username"><h1 >{{ user.username }}</h1></li>
        <li class="ctn__detail__email">{{ user.email }}</li>
        <button type="button">Supprimer son profil</button>
      </ul>
    </div>
  </div>
</template>

<script>
import Header from "@/components/header.vue";

export default {
  name: "Profil",
  components: {
    Header,
  },
  props: {},

  data: () => {
    return {
      user: {
        username: "John Rambo",
        email: "john.rambo@gmail.fr",
      },
    };
  },

  methods: {},

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
