<template>
  <div class="lastPost">
    <div v-for="item in posts" v-bind:key="item.text" class="lastPost__list">
      <p class="lastPost__list__text">
        {{ item.text }}
      </p>
    </div>
    <p v-if="this.posts.length < 1">Vous n'avez publié aucun post.</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "UserPost",
  components: {},
  props: {},

  data: () => {
    return {
      posts: [],
    };
  },

  methods: {},

  mounted: function () {// création de la methods pour récupérer l'ensemble des posts publié par l'utilisateur connecté.
    let username = JSON.parse(sessionStorage.getItem("userInfo")).username;
    let token = JSON.parse(sessionStorage.getItem("userInfo")).token;
    axios
      .get("http://localhost:3000/api/post/userPosts/" + username, {
        headers: {
            "Content-type": "application/json",
            'Authorization': 'Bearer ' + token,
          },
      })
      .then((res) => {
        this.posts = res.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.lastPost {
  display: flex;
  padding: 20px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  &__list {
    width: 90%;
    border-radius: 15px;
    margin: 10px 0px 10px 0px;
    background-color: #f5f5f5;
    -webkit-box-shadow: 0px 10px 13px -7px #000000,
      5px 5px 15px 5px rgba(0, 0, 0, 0);
    box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0, 0, 0, 0);
  }
}
</style>