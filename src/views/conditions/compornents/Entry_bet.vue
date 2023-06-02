<template>
 
  
          <v-text-field
          v-model="Entry_bet"
          type="number"
          label="エントリー金額"
          suffix="円"
   
          ></v-text-field>
  
    
</template>

<script>

export default {
  name: 'Entry_bet',

  data: () => ({
    

  }),
  filters:{
  },
  computed:{
    Entry_bet:{
      get: function() {
          return this.$store.state.Entry_bet
        },
        set: function(value) {
          if (value > 200000) {
            value = 200000;
          } else if (value < 0) {
            value = 0;
          }
          this.$store.commit('UpdateEntry_bet', value )
        }
    },
  
  },
  methods: {

  }
};
</script>
