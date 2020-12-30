<template>
  <div class="comment">
    <div class="content">
      <div class="author">{{ post.UserId }}</div>
      <div class="metadata">
        <span class="date">{{ post.createdAt }}</span>
      </div>
      <div class="text">{{ post.title }}</div>
      <div class="text">{{ post.text }}</div>
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
    return {};
  },

  methods: {},

  mounted: () => {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
