<template>
  <div class="ui">
    <div v-for="item in posts" v-bind:key="item.title" class="post">
      <h3 class="post__title">{{ item.title }}</h3>
      <div class="post__info">
        <p class="post__info__username">
          Posté par {{ item.username }} le
          <span date="2020-08-07T11:32:01.592Z" format="DD-MM-YYYY">{{
            item.createdAt
          }}</span>
        </p>
        <div @click="(reportThisPost = item.id), postReport()">
          <i class="fas fa-exclamation-circle"></i>
        </div>
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
          v-if="
            userConnected.UserId === item.UserId ||
            userConnected.isAdmin === true
          "
          @click="(PostId = item.id), deletePost()"
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
              <div class="comment__info__btn">
                <button
                  @click="(comId = comment.id), deleteComment()"
                  v-if="
                    userConnected.UserId === comment.UserId ||
                    userConnected.isAdmin === true
                  "
                >
                  <i class="far fa-trash-alt"></i>
                </button>
                <button
                  @click="(comId = comment.id), commentReport()"
                  v-if="userConnected.UserId !== comment.UserId"
                >
                  <i class="fas fa-exclamation-circle"></i>
                </button>
              </div>
              <p class="comment__info__username">
                Posté par {{ comment.User.username }} le {{ comment.createdAt }}
              </p>
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
import {formatTimes} from "../service/utils";
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
      reportThisPost: "",
      comments: [],
      userReply: true,
      userConnected: JSON.parse(sessionStorage.getItem("userInfo")),
      reply: {
        PostId: "",
      },
      comId: "",
      PostId: "",
    };
  },

  methods: {
    // récupération du PostId au click pour la méthode qui sera créé plus tard pour la création de commentaire sur ce même post.
    replyComment() {
      sessionStorage.setItem("PostId", this.reply.PostId);
    },
// création de la methods pour supprimer le commentaire.
    deleteComment() {
      let commentId = this.comId;
      let token = this.userConnected.token;
      if (confirm("Êtes-vous sûr de vouloir supprimer ce commentaire ?"))
        axios
          .delete("http://localhost:3000/api/comment/" + commentId, {
            headers: {
              "Content-type": "application/json",
              Authorization: "Bearer " + token,
            },
          })
          .then((res) => {
            console.log(res.data);
            alert("Votre commentaire a été effacé avec succès.");
            this.$router.go("/actu");
          });
    },
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
            this.$router.go("/actu");
          });
    },
// création de la methods pour récupérer l'ensemble des commentaires lié au post.
    showAllComments() {
      let id = this.showComments;
      let token = this.userConnected.token;
      axios
        .get("http://localhost:3000/api/comment/readAll/" + id, {
          headers: {
            "Content-type": "application/json",
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          this.comments = res.data.map(comment => {
            comment.createdAt = formatTimes(comment.createdAt);
            return comment
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
// création de la methods pour signaler à l'admin le post.
    postReport() {
      console.log(this.reportThisPost);
      let postData = {
        isSignaled: 1,
      };
      let token = this.userConnected.token;
      if (confirm("Êtes-vous sûr de vouloir signaler ce post ?"))
        axios
          .put(
            "http://localhost:3000/api/post/" + this.reportThisPost,
            postData,
            {
              headers: {
                "Content-type": "application/json",
                Authorization: "Bearer " + token,
              },
            }
          )
          .then((res) => {
            console.log(res.data);
            alert(
              "Merci pour votre signalement ! Notre équipe va vérifier ce post dès que possible."
            );
          })
          .catch((error) => {
            console.log(error);
          });
    },
// création de la methods pour signaler à l'admin le commentaire.
    commentReport() {
      let commentData = {
        isSignaled: 1,
      };
      let token = this.userConnected.token;
      if (confirm("Êtes-vous sûr de vouloir signaler ce commentaire ?"))
        axios
          .put("http://localhost:3000/api/comment/" + this.comId, commentData, {
            headers: {
              "Content-type": "application/json",
              Authorization: "Bearer " + token,
            },
          })
          .then((res) => {
            console.log(res.data);
            alert(
              "Merci pour votre signalement ! Notre équipe va vérifier ce commentaire dès que possible."
            );
          })
          .catch((error) => {
            console.log(error);
          });
    },
  },

  mounted: function () {
    // création de la methods pour récupérer l'ensemble des posts.
    let token = this.userConnected.token;
    axios
      .get("http://localhost:3000/api/post/", {
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
          this.posts = res.data.map(post => {
            post.createdAt = formatTimes(post.createdAt);
            return post
          });
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
      outline: none;
      margin: 10px;
      font-size: 16px;
      border-radius: 50px;
      color: white;
      box-shadow: 5px 5px 2px -2px #a5a5a5;
      background-image: linear-gradient(to right, #11998e, #38ef7d);
      &:hover {
        cursor: pointer;
      }
    }
    &__delete {
      border: none;
      height: 50px;
      width: 130px;
      outline: none;
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
      &:hover {
        cursor: pointer;
      }
    }
  }
  .btn_comment {
    border: none;
    margin-top: 25px;
    background-color: #f5f5f5;
    font-style: italic;
    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }
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
       overflow-wrap: break-word;
      width: 80%;
    }
    &__info {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      margin-top: -15px;
      &__btn {
        width: 200px;
        button {
          border: none;
          outline: none;
          background-color: #f5f5f5;
          font-size: 20px;
          padding: 10px;
          width: 60px;
          &:active {
            color: red;
          }
          &:hover {
            cursor: pointer;
            color: red;
          }
        }
      }
    }
    &__info__username {
      //margin-top: -10px;
      font-size: 10px;
      font-style: italic;
      text-align: right;
      width: 55%;
    }
  }
}

@media all and (max-width: 900px) {
  .post {
    width: 500px;
  }
}

@media all and (max-device-width: 480px) {
  .ui {
    width: 300px;
  }
  .post {
    width: 250px;
  }
  .comment {
    font-size: inherit;
    font-size: 10px;
    &__text {
      font-size: inherit;
     
    }
  }
}
</style>
