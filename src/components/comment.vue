<template>
  <div class="comment">
    <div class="avatar"><img src="../images/avatar.png" alt="" /></div>
    <div class="content">
      <div class="author">{{ comments.username }}</div>
      <div class="metadata">
        <span class="date">{{ comments.created_at }}</span>
      </div>
      <div class="text">{{ comments.content }}</div>
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
