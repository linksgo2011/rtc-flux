<template>
  <div class="board">
      <div class="create-card-form">
          <textarea type="text" v-model="text"/>
          <button @click="handleCardCreate">Add Card</button>
      </div>
      <div class="card-list">
          <div class="card" v-for="card in cards" :key="card.id">
              {{card.content}}
          </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Board',
    data:()=>{
      return {
          text: ""
      }
    },
    computed: {
        cards: function () {
            return this.$store.state.cards
        }
    },
    methods:{
        handleCardCreate(){
            console.log(this)
          this.$store.commit("createCard",{
                  content: this.text,
                  processed: false
          });
          this.text = '';
      },
    }
}
</script>

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
