<template>
  <div class="actu">
      <Header /> 
    <h1>VOUS ETES SUR ACTU</h1>
    <comments model="Post" id="1"></comments>
  </div>
</template>

<script>

import Header from '@/components/header.vue'
import Comments from '../components/posts.vue'

export default {
    name: 'Actu',
    components: {
    Header,
    Comments
    },
    props: {
    
    },

    data: () => { 
        return {
            
        }
    },

    methods: {

    },

    mounted: () => {

    },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
