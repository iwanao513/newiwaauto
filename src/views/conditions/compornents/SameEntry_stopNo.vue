<template>
 
  
          <v-text-field
          v-model="SameEntry_stopNo"
          type="number"
          label="同時刻判定エントリー数"
          suffix="回"
          hint="同時刻の判定でエントリーする数を設定します。"
          ></v-text-field>
  
    
</template>

<script>

export default {
  name: 'SameEntry_stopNo',

  data: () => ({
    

  }),
  filters:{
  },
  computed:{
    SameEntry_stopNo:{
      get: function() {
          return this.$store.state.SameEntry_stopNo
        },
        set: function(value) {
          this.$store.commit('UpdateSameEntry_stopNo', value )
        }
    },
  
  },
  methods: {

  }
};
</script>
