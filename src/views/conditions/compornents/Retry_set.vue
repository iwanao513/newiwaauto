<template>
 
  
          <v-text-field
          v-model="Retry_set"
          type="number"
          label="リトライ回数"
          suffix="回"
          hint="リトライする回数を設定します。リトライ不要の場合は0と入力してください。（1回以上のリトライは現在のハイローの仕様上、失敗する可能性が高いです。）"
          ></v-text-field>
  
    
</template>

<script>

export default {
  name: 'Retry_set',

  data: () => ({
    

  }),
  filters:{
  },
  computed:{
    Retry_set:{
      get: function() {
          return this.$store.state.Retry_set
        },
        set: function(value) {
          this.$store.commit('UpdateRetry_set', value )
        }
    },
  
  },
  methods: {

  }
};
</script>
