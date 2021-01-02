<template>
  <div class="newComment">
    <div class="ctn">
      <form @submit="creatComment">
        <textarea
          type="text"
          name="text"
          v-model="newComment.text"
          placeholder="Votre commentaire..."
          maxlength="140"
          class="ctn__text"
        />
        <input type="submit" value="Créer" class="ctn__btn" />
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "newComment",
  components: {},
  props: {},

  data: () => {
    return {
      userConnected: sessionStorage.getItem("userInfo"),

      newComment: {
        PostId: "",
        text: "",
        UserId: "",
      },
    };
  },

  methods: {
    creatComment() {
      // e.preventDefault();
      this.newComment.UserId = JSON.parse(this.userConnected).UserId;
      this.newComment.PostId = sessionStorage.getItem("PostId");
      sessionStorage.removeItem("PostId");
      console.log(this.newComment);
      let url = "http://localhost:3000/api/comment/";
      axios
        .post(url, this.newComment, {
          headers: {
            "Content-type": "application/json",
          },
        })
        .then((res) => {
          console.log(res);
          alert("Commentaire créé avec succès !");
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
  height: 100%;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  &__text {
    margin: 10px 0px 10px 0px;
    border-radius: 20px;
    padding: 15px;
    resize: none;
    width: 100%;
  }
  &__btn {
    width: 150px;
    height: 30px;
    font-weight: bold;
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
}
</style>
