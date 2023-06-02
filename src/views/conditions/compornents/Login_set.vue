<template>
  <div>
    <div class="mt-0">
        <div class="mt-4">
          <v-select
            v-model="Login_set"
            :items="items"
            label="ログイン状況確認"
            dense
            hint=""
            ></v-select>
        </div>
    </div>
  </div>    
</template>

<script>

export default {
  name: 'Login_set',

  data: () => ({

    items: ['ON', 'OFF'],

  }),

  computed:{
    Login_set:{
      get: function() {
          return this.$store.state.Login_set
      },
      set: function(value) {
        this.$store.commit('UpdateLogin_set', value )
      }
    }
  },
  methods: {
    

  }
};
</script>
