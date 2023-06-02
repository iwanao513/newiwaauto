<template>
  <div>
    <div class="mt-0">
        <div class="mt-4">
          <v-select
            v-model="SameEntry_stop"
            :items="items"
            label="同時刻判定エントリー数制限機能"
            dense
            ></v-select>
        </div>
    </div>
  </div>    
</template>

<script>

export default {
  name: 'SameEntry_stop',

  data: () => ({

    items: ['ON', 'OFF'],

  }),

  computed:{
    SameEntry_stop:{
      get: function() {
          return this.$store.state.SameEntry_stop
      },
      set: function(value) {
        this.$store.commit('UpdateSameEntry_stop', value )
      }
    }
  },
  methods: {
    

  }
};
</script>
