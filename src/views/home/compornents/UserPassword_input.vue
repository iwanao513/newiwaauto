<template>
 
  
          <v-text-field
            v-model="UserPassword"
            :type="show1 ? 'text' : 'password'"
            label="パスワード"
            :rules="[required]"
            placeholder="パスワードを入力してください。"
            @click:append="show1 = !show1"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          ></v-text-field>
  
    
</template>

<script>

export default {
  name: 'UserPassword',

  data: () => ({
    
    show1: false,
  }),
  computed:{
    UserPassword:{
      get: function() {
          return this.$store.state.UserPassword
      },
      set: function(value) {
        this.$store.commit('UpdateUserPassword', value )
      }
    },

  },
  methods: {
    required (v) {
      return !!v || '必須項目です。'
    },
  }
};
</script>
