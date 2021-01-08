<template>
  <div class="notConnected">
    <router-link to="/"
      >
      <img
      class="img-header"
      src="../images/icon-left-font-monochrome-black.png"
      alt="Logo de Groupomania"
    />
     <p> Merci de vous connecter pour naviguer sur Groupomania.</p>
    </router-link>
  </div>  
</template>

<script>

export default {
  name: "NotConnected",
  components: {
  },
  props: {},

  data: () => {
    return {
    };
  },

  methods: {},

  mounted: () => {
    
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.notConnected {
  width: 100%;
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  a{
    text-decoration: none;
    font-size: 20px;
    color: black;
  }
  img {
    //width: 300px;
    height: 150px;
    
  }
  &:hover{
    text-decoration:underline;
  }
}
</style>
