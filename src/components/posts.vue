<template>
  <div class="ui">
    <div v-for="item in posts" v-bind:key="item.title" class="post">
      <h3 class="post__title">{{ item.title }}</h3>
      <div class="post__info">
        <p class="post__info__username">
          Poster par {{ item.username }} le {{ item.createdAt }}
        </p>
        <i class="fas fa-exclamation-circle"></i>
      </div>
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
      <div class="reply" v-if="reply.PostId === item.id">
        <NewComment />
      </div>
      <div>
        <button
          class="btn_comment"
          @click="(showComments = item.id), showAllComments()"
        >
          Cliquez-ici pour afficher les commentaires de ce post
        </button>
        <div v-if="showComments === item.id">
          <div
            class="comment"
            v-for="comment in comments"
            v-bind:key="comment.text"
          >
            <p class="comment__text">{{ comment.text }}</p>
            <div class="comment__info">
              <p class="comment__info__username">
                Poster par {{ item.username }} le {{ item.createdAt }}
              </p>
              <div class="comment__info__icons">
                <i class="fas fa-reply"></i>
                <i class="fas fa-ban"></i>
                <i class="fas fa-exclamation-circle"></i>
              </div>
            </div>
          </div>
        </div>
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
      showComments: {},
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
      sessionStorage.setItem("PostId", this.reply.PostId);
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
      let id = this.showComments;
      console.log(id);
      axios
        .get("http://localhost:3000/api/comment/" + id)
        .then((res) => {
          this.comments = res.data;
          console.log(this.comments);
        })
        .catch((error) => {
          console.log(error);
        });
    },
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
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  &__title {
    height: 15%;
    font-size: 25px;
    background-color: #fafafa;
    padding: 10px;
    text-align: start;
  }
  &__info {
    display: flex;
    align-items: center;
    width: 95%;
    justify-content: space-between;
    margin: -30px 0px 0px 5px;
    &__username {
      height: 15%;
      font-size: 13px;
      font-style: italic;
      text-align: start;
    }
  }

  &__text {
    height: 70%;
    margin: 20px 0px 20px 0px;
    background-color: white;
    border-radius: 10px;
    padding: 20px;
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
  .btn_comment {
    border: none;
    background-color: #f5f5f5;
    font-style: italic;
  }

  .comment {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    &__text {
      background-color: white;
      border-radius: 10px;
      font-size: 15px;
      padding: 10px;
      width: 80%;
    }
    &__info {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: row-reverse;
      // border: olive 1px solid;
      width: 100%;
      margin-top: -15px;
    }
    &__info__username {
      //margin-top: -10px;
      font-size: 10px;
      font-style: italic;
      text-align: right;
      width: 55%;
    }
    &__info__icons {
      display: flex;
      justify-content: space-around;
      align-items: center;
      width: 15%;
    }
  }
}
</style>
