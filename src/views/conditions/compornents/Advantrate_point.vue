<template>
 
  
          <v-text-field
          v-model="Advantrate_point"
          type="number"
          label="有利レートエントリー猶予ポイント"
          suffix="point"
          hint="MT4より届いたハイロー予測値とハイローのレートを比較して、より有利な場合エントリーします。猶予ポイントを3pointとした場合、ハイローの値が予測値と比べて上下3ポイント以内ならエントリーします。（※この機能を使う場合チャートにAS.autoWeb.ex4が入っている必要があります。）"
          ></v-text-field>
  
    
</template>

<script>

export default {
  name: 'Advantrate_point',

  data: () => ({
    

  }),
  filters:{
  },
  computed:{
    Advantrate_point:{
      get: function() {
          return this.$store.state.Advantrate_point
        },
        set: function(value) {
          if (value > 60) {
            value = 59;
          } else if (value < 0) {
            value = 1;
          }
          this.$store.commit('UpdateAdvantrate_point', value )
        }
    },
  
  },
  methods: {

  }
};
</script>
