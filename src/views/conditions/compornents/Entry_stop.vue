<template>
  <div>
    <div class="mt-0">
        <div class="mt-4">
          <v-select
            v-model="Entry_stop"
            :items="items"
            label="エントリー停止機能"
            dense
            ></v-select>
        </div>
    </div>
  </div>    
</template>

<script>

export default {
  name: 'Entry_stop',

  data: () => ({

    items: ['ON', 'OFF'],

  }),

  computed:{
    Entry_stop:{
      get: function() {
          return this.$store.state.Entry_stop
      },
      set: function(value) {
        this.$store.commit('UpdateEntry_stop', value )
      }
    }
  },
  methods: {
    

  }
};
</script>
