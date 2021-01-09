<template>
  <div>
    <h2 class="title">Liste des posts signalés :</h2>
    <div class="bloc" v-for="post in posts" v-bind:key="post.text">
      <p class="bloc__text">{{ post.text }}</p>
      <div class="bloc__moderate">
        <button
          class="bloc__moderate__ok"
          @click="(PostId = post.id), validPost()"
        >
          <i class="far fa-thumbs-up"></i>
        </button>
        <button
          class="bloc__moderate__no"
          @click="(PostId = post.id), deletePost()"
        >
          <i class="far fa-thumbs-down"></i>
        </button>
      </div>
    </div>
    <p v-if="this.posts.length < 1">Aucun post n'a été signalé.</p>
    <h2 class="title">Liste des commentaires signalés :</h2>
    <div v-for="comment in comments" v-bind:key="comment.text" class="bloc">
      <p class="bloc__text">{{ comment.text }}</p>
      <div class="bloc__moderate">
        <button
          class="bloc__moderate__ok"
          @click="(CommentId = comment.id), validComment()"
        >
          <i class="far fa-thumbs-up"></i>
        </button>
        <button
          class="bloc__moderate__no"
          @click="(CommentId = comment.id), deleteComment()"
        >
          <i class="far fa-thumbs-down"></i>
        </button>
      </div>
    </div>
    <p v-if="this.comments.length < 1">Aucun commentaire n'a été signalé.</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "IsSignaled",
  components: {},
  props: {},

  data() {
    return {
      posts: [],
      comments: [],
      PostId: "",
      CommentId: "",
      userConnected: JSON.parse(sessionStorage.getItem("userInfo")),
    };
  },

  methods: {
    // création de la methods pour supprimer le post.
    deletePost() {
      let PostId = this.PostId;
      let token = this.userConnected.token;
      if (confirm("Êtes-vous sûr de vouloir supprimer ce post ?"))
        axios
          .delete("http://localhost:3000/api/post/" + PostId, {
            headers: {
              "Content-type": "application/json",
              Authorization: "Bearer " + token,
            },
          })
          .then((res) => {
            console.log(res.data);
            alert("Votre post a été effacé avec succès.");
            this.$router.go("/profil");
          });
    },
    // création de la methods pour supprimer le commentaire.
    deleteComment() {
      let CommentId = this.CommentId;
      let token = this.userConnected.token;
      if (confirm("Êtes-vous sûr de vouloir supprimer ce commentaire ?"))
        axios
          .delete("http://localhost:3000/api/comment/" + CommentId, {
            headers: {
              "Content-type": "application/json",
              Authorization: "Bearer " + token,
            },
          })
          .then((res) => {
            console.log(res.data);
            alert("Votre commentaire a été effacé avec succès.");
            this.$router.go("/profil");
          });
    },
    // création de la methods pour réhabiliter le post.
    validPost() {
      let PostId = this.PostId;
      let token = this.userConnected.token;
      let postData = {
        isSignaled: 0,
      };
      if (confirm("Êtes-vous sûr de vouloir valider ce post ?"))
        axios
          .put("http://localhost:3000/api/post/" + PostId, postData, {
            headers: {
              "Content-type": "application/json",
              Authorization: "Bearer " + token,
            },
          })
          .then((res) => {
            console.log(res.data);
            alert("Signalement retiré sur ce post.");
            this.$router.go("/profil");
          })
          .catch((error) => {
            console.log(error);
          });
    },
    // création de la methods pour réhabiliter le commentaire.
    validComment() {
      let CommentId = this.CommentId;
      let token = this.userConnected.token;
      let commentData = {
        isSignaled: 0,
      };
      if (confirm("Êtes-vous sûr de vouloir valider ce commentaire ?"))
        axios
          .put("http://localhost:3000/api/comment/" + CommentId, commentData, {
            headers: {
              "Content-type": "application/json",
              Authorization: "Bearer " + token,
            },
          })
          .then((res) => {
            console.log(res.data);
            alert("Signalement retiré sur ce commentaire.");
            this.$router.go("/profil");
          })
          .catch((error) => {
            console.log(error);
          });
    },
  },

  mounted: function () {
    // création d'une request multiple pour récupérer l'ensemble des commentaires et post signalé'.
    let one = "http://localhost:3000/api/post/isSignaled";
    let two = "http://localhost:3000/api/comment/isSignaled";

    const requestOne = axios.get(one);
    const requestTwo = axios.get(two);

    axios
      .all([requestOne, requestTwo])
      .then(
        axios.spread((...responses) => {
          this.posts = responses[0].data;
          this.comments = responses[1].data;
        })
      )
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.bloc {
  display: flex;
  //border: solid 1px orange;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  &__text {
    width: 80%;
    padding: 10px;
    border-radius: 15px;
    word-wrap: break-word;
    background-color: #f5f5f5;
    -webkit-box-shadow: 0px 10px 13px -7px #000000,
      5px 5px 15px 5px rgba(0, 0, 0, 0);
    box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0, 0, 0, 0);
  }
  &__moderate {
    width: 200px;
    &__ok {
      border: none;
      outline: none;
      background-color: white;
      font-size: 20px;
      padding: 10px;
      width: 60px;
      &:active {
        color: greenyellow;
      }
      &:hover {
        color: greenyellow;
      }
    }
    &__no {
      border: none;
      outline: none;
      background-color: white;
      font-size: 20px;
      padding: 10px;
      width: 60px;
      &:active {
        color: red;
      }
      &:hover {
        color: red;
      }
    }
  }
}
</style>
