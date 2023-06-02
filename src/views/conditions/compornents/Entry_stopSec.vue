<template>
 
  
          <v-text-field
          v-model="Entry_stopSec"
          type="number"
          label="エントリー停止秒数"
          suffix="回"
          hint="5分単位で〇秒を超えたらエントリーを停止します。最小単位は1秒です。"
          ></v-text-field>
  
    
</template>

<script>

export default {
  name: 'Entry_stopSec',

  data: () => ({
    

  }),
  filters:{
  },
  computed:{
    Entry_stopSec:{
      get: function() {
          return this.$store.state.Entry_stopSec
        },
        set: function(value) {
          if (value > 60) {
            value = 59;
          } else if (value < 0) {
            value = 1;
          }
          this.$store.commit('UpdateEntry_stopSec', value )
        }
    },
  
  },
  methods: {

  }
};
</script>
