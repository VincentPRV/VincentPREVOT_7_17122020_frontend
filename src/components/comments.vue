<template>
  <div class="ui comments">
    <comment
      :comment="comment"
      v-for="comment in comments"
      :key="comment.id"
    ></comment>
  </div>
</template>

<script>
import Comment from "@/components/comment.vue";
// import axios from 'axios';

export default {
  name: "Comments",
  components: {
    Comment,
  },
  props: {
    id: Number,
    username: String,
    model: String,
  },

  data: () => {
    return {
      comments: [],
    };
  },

  methods: {},

  mounted: () => {
    //axios.get('/posts', {params: {id: this.id, type: this.model}}).then((response) => {
    //  this.comments = response.data
    /*{
          id: 1,
          username: "John",
          content: "Salut les gens!",
          commentable_id: 1,
          commentable_type: "Post",
          reply: 0,
          created_at: 2020 - 12 - 28,
          updated_at: 2020 - 12 - 29,
          replies: [
            {
              id: 2,
              username: "Marc",
              content: "héhé je te réponds !",
              commentable_type: "Post",
              commentable_id: 1,
              reply: 1,
              created_at: 2020 - 12 - 29,
              updated_at: 2020 - 12 - 29,
            },
          ],
        }, })*/
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
