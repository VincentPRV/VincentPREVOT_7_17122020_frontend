<template>
  <div class="comment">
    <div class="content" v-for="comment in Comments" v-bind:key="comment.id">
      <div class="author">{{ comment.UserId }}</div>
      <div class="metadata">
        <span class="date">{{ comment.createdAt }}</span>
      </div>
    
      <div class="text">{{ comment.text }}</div>
    </div>
    <div class="actions"><a href="#">Répondre></a></div>
  </div>
</template>

<script>
export default {
  name: "Comment",
  components: {},
  props: {},

  data: () => {
    return {
      Comments: JSON.parse(sessionStorage.getItem("Comments"))
    };
  },

  methods: {},

  mounted: () => {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
