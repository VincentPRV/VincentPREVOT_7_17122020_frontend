<template>
  <div class="lastComment">
    <div v-for="item in Comments" v-bind:key="item.text" class="lastComment__list">
      <p class="lastComment__list__text">
        {{ item.text }}
      </p>
      <p v-if="Comments.length < 0">coucou</p>
    </div>
    <p v-if="this.Comments.length < 1">Vous n'avez publié aucun commentaire.</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "UserComment",
  components: {},
  props: {},

  data: () => {
    return {
      Comments: [],
    };
  },

  methods: {},

  mounted: function () {// création de la methods pour récupérer l'ensemble des commentaires publié par l'utilisateur connecté.
    let UserId = JSON.parse(sessionStorage.getItem("userInfo")).UserId;
    let token = JSON.parse(sessionStorage.getItem("userInfo")).token;
    axios
      .get("http://localhost:3000/api/comment/" + UserId +"/usercomments", {
        headers: {
            "Content-type": "application/json",
            'Authorization': 'Bearer ' + token,
          },
      })
      .then((res) => {
        this.Comments = res.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.lastComment {
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