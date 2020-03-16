<template>
  <div class="hello">
      <input type="text" :value="text" @change="handleUpdate">
  </div>
</template>

<script>
export default {
  name: 'Input',
    computed: {
        text: function () {
            return this.$store.state.text
        }
    },
    methods:{
      handleUpdate(event){
          this.$store.commit("updateText",{
                  text: event.target.value,
                  processed: false
              });
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
