<template>
  <div v-if="userConnected" class="newPost">
    <Header />
    <div class="ctn">
      <form @submit="creatPost">
        <input
          type="text"
          name="title"
          v-model="newPost.title"
          placeholder="titre"
        />
        <input
          type="text"
          name="text"
          v-model="newPost.text"
          placeholder="text"
        />
        <input type="submit" value="Créer" />
      </form>
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
      userConnected: sessionStorage.getItem("userInfo"),

      newPost: {
        title: "",
        text: "",
        UserId: "",
      },
    };
  },

  methods: {
    creatPost(e) {
      e.preventDefault();
      this.newPost.UserId = JSON.parse(this.userConnected).UserId;
      axios
        .post("http://localhost:3000/api/post/", this.newPost, {
          headers: {
            "Content-type": "application/json",
          },
        })
        .then((res) => {
            console.log(res)
        });
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
