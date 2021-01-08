<template>
  <div>
    <h2>Liste des posts signalé :</h2>
    <div v-for="post in posts" v-bind:key="post.text" class="postsList">
      <p>{{ post.text }}</p>
    </div>
    <h2>Liste des commentaires signalé :</h2>
    <div
      v-for="comment in comments"
      v-bind:key="comment.text"
      class="commentsList"
    >
      <p>{{ comment.text }}</p>
    </div>
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

      userConnected: JSON.parse(sessionStorage.getItem("userInfo")),
    };
  },

  methods: {},

  mounted: function () {
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
          console.log(responses, this.posts, this.comments);
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
</style>
