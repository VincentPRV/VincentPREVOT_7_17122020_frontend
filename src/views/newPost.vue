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
          class="ctn__title"
        />
        <textarea
          type="text"
          name="text"
          v-model="newPost.text"
          placeholder="texte"
          class="ctn__text"
        />
        <input type="submit" value="Créer" class="ctn__btn" />
      </form>
    </div>
  </div>
  <div v-else class="notConnected">
    <NotConnected />
  </div>
</template>

<script>
import Header from "@/components/header.vue";
import axios from "axios";
import NotConnected from "@/components/notConnected.vue";

export default {
  name: "newPost",
  components: {
    Header,
    NotConnected,
  },
  props: {},

  data: () => {
    return {
      userConnected: JSON.parse(sessionStorage.getItem("userInfo")),

      newPost: {
        title: "",
        text: "",
        UserId: "",
        username: "",
      },
    };
  },

  methods: {
    creatPost(e) {
      e.preventDefault();
      this.newPost.UserId = this.userConnected.UserId;
      this.newPost.username = this.userConnected.username;
      let token = this.userConnected.token;
      axios
        .post("http://localhost:3000/api/post/", this.newPost, {
          headers: {
            "Content-type": "application/json",
            'Authorization': 'Bearer ' + token,
          },
        })
        .then((res) => {
          console.log(res);
          alert("Post créé avec succès !")
          window.location.href = "http://localhost:8080/#/actu";
        });
    },
  },

  mounted: () => {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.ctn {
  width: 600px;
  background-color: #F5F5F5;
  margin: auto;
  margin-top: 50px;
  height: 400px;
  word-wrap: break-word;
  border: black 1px solid;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  box-shadow: 0 0 15px 4px rgba(0, 0, 0, 0.06);

  &__text {
    width: 100%;
    margin: 20px 0px 20px 0px;
    height: 60%;
    resize: none;
    box-shadow: 0 0 15px 4px rgba(0, 0, 0, 0.06);
  }
  &__title {
    width: 80%;
    box-shadow: 0 0 15px 4px rgba(0, 0, 0, 0.06);
    margin-top: 20px;
  }
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
    box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0, 0, 0, 0);
    background: rgb(255, 23, 68);
    background: linear-gradient(
      90deg,
      rgba(255, 23, 68, 1) 35%,
      rgba(183, 28, 28, 1) 100%
    );
  }
}

@media all and (max-width: 900px) {
  .ctn {
    &__text {
      width: 500px;
      font-size: 10px;
    }
  }
}

@media all and (max-device-width: 480px) {
  .newPost {
   width: 300px;
  }
  .ctn{
   
    width: 280px;
    &__text {
      width: 250px;
    }
  }
}
</style>
