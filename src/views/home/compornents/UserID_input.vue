<template>
 
  
          <v-text-field
          v-model="UserID"
          type="text"
          label="ユーザーID"
          :rules="[required]"
          ></v-text-field>
  
    
</template>

<script>

export default {
  name: 'UserID',

  data: () => ({
    

  }),
  computed:{
    UserID:{
      get: function() {
          return this.$store.state.UserID
      },
      set: function(value) {
        this.$store.commit('UpdateUserID', value )
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
