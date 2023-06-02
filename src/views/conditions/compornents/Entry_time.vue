<template>
  <div>
    <div class="mt-0">
        <div class="mt-4">
          <v-select
            v-model="Entry_time"
            :items="items"
            label="判定時間"
            dense
            ></v-select>
        </div>
    </div>
  </div>    
</template>

<script>

export default {
  name: 'Entry_time',

  data: () => ({

    

  }),

  computed:{
    items(){
      if(this.$store.state.Entry_mode=='HighLow' || this.$store.state.Entry_mode=='HighLowスプレッド'){
        return ['短期', '中期','長期','1時間','24時間']
      }
      else return ['30秒','1分','3分','5分']
    },
    Entry_time:{
      get: function() {
          return this.$store.state.Entry_time
      },
      set: function(value) {
        this.$store.commit('UpdateEntry_time', value )
      }
    }
  },
  methods: {
    

  }
};
</script>
