<template>
  <div class="ui">
    <div v-for="item in posts" v-bind:key="item.username" class="post">
      <h3 class="post__title">{{ item.title }}</h3>
      <p class="post__username">
        Poster par {{ item.username }} le {{ item.createdAt }}
      </p>
      <p class="post__text">{{ item.text }}</p>
      <div class="post__button">
        <button
          type="button"
          class="post__button__reply"
          
          @click="(reply.PostId = item.id), replyComment()"
        >
          <i class="far fa-comment-dots"></i> Répondre
        </button>
        <button
          type="button"
          class="post__button__delete"
          v-if="userConnected.UserId === item.UserId"
          @:click="deletePost()"
        >
          <i class="fas fa-ban"></i> Supprimer
        </button>
      </div>
      <div class="comments" @click="reply.PostId = item.id, showAllComments()">voir les commentaires</div>
      <div class="reply" v-if="reply.PostId === item.id">
        <NewComment />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import NewComment from "@/components/newComment.vue";
export default {
  name: "Posts",
  components: {
    NewComment,
  },
  props: {},

  data() {
    return {
      posts: [],
      comments: [],
      userReply: true,
      userConnected: JSON.parse(sessionStorage.getItem("userInfo")),
      reply: {
        PostId: "",
      },
    };
  },

  methods: {
    replyComment() {
      sessionStorage.setItem('PostId', this.reply.PostId)
    },
    deletePost() {
      axios
        .delete("http://localhost:3000/api/post/" + this.posts.id, {
          headers: {
            "Content-type": "application/json",
          },
        })
        .then((res) => {
          console.log(res);
          alert("Post effacé avec succès !");
        });
    },

    showAllComments() {
      let id = this.reply.PostId;
      console.log(id, "coucou")
      axios
      .get("http://localhost:3000/api/comment/" + id)
      .then((res) => {
        console.log(res.data);
        this.comments = res.data;
      })
      .catch((error) => {
        console.log(error);
      });
  
    }
  },

  mounted: function () {
    axios
      .get("http://localhost:3000/api/post/")
      .then((res) => {
        console.log(res.data);
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
.ui {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;

  //height: 600px;
}

.post {
  width: 50%;
  margin: 10px 0px 10px 0px;
  border: 2px solid;
  padding: 10px;
  display: flex;
  flex-direction: column;
  border-image-source: linear-gradient(to right, red, orange);
  border-image-slice: 1;
  &__title {
    height: 15%;
    font-size: 25px;
    text-align: start;
  }
  &__username {
    height: 15%;
    font-size: 13px;
    font-style: italic;
    text-align: start;
  }
  &__text {
    height: 70%;
    margin: 20px 0px 20px 0px;
  }
  &__button {
    display: flex;
    justify-content: space-around;
    align-items: center;
    &__reply {
      border: none;
      height: 50px;
      width: 130px;
      margin: 10px;
      font-size: 16px;
      border-radius: 50px;
      color: white;
      box-shadow: 5px 5px 2px -2px #a5a5a5;
      background-image: linear-gradient(to right, #11998e, #38ef7d);
    }
    &__delete {
      border: none;
      height: 50px;
      width: 130px;
      margin: 10px;
      font-size: 16px;
      border-radius: 50px;
      color: white;
      box-shadow: 5px 5px 2px -2px #a5a5a5;
      background-image: linear-gradient(
        to top,
        #d83f91,
        #d0409b,
        #c743a5,
        #bb47af,
        #ae4bb8
      );
    }
  }
  .far {
    font-size: 50px;
  }
}
</style>
