<template>
  <div class="ui comments">
    {{ comments[0].message }}{{ comments[0].username }} {{ comments[1].message
    }}{{ comments[1].username }}
    <ul>
      <li v-for="comment in comments" :key="comment">
        {{ comment.username }}{{ comment.message }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Posts",
  components: {},
  props: {
    username: String,
    message: String,
  },

  data: () => {
    return {
      comments: [
        { username: "John Rambo", message: "coucou !" },
        { username: "Bruce wayne", message: "Super ce site !" },
      ],
    };
  },

  methods: {},

  mounted: () => {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
