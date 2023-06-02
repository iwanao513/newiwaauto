<template>
 
  
          <v-text-field
          v-model="Login_setMin"
          type="number"
          label="ログイン状況確認分数"
          suffix="分"
          hint="1時間ごとに設定されている分にログインされているか確認します。"
          ></v-text-field>
  
    
</template>

<script>

export default {
  name: 'Login_setMin',

  data: () => ({
    

  }),
  filters:{
  },
  computed:{
    Login_setMin:{
      get: function() {
          return this.$store.state.Login_setMin
        },
        set: function(value) {
          if (value > 60) {
            value = 59;
          } else if (value < 0) {
            value = 0;
          }
          this.$store.commit('UpdateLogin_setMin', value )
        }
    },
  
  },
  methods: {

  }
};
</script>
