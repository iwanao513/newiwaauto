<template>
  <div>
    <div class="mt-0">
        <div class="mt-4">
          <v-select
            v-model="Advantrate_entry"
            :items="items"
            label="有利レートエントリー"
            dense
            hint=""
            ></v-select>
        </div>
    </div>
  </div>    
</template>

<script>

export default {
  name: 'Advantrate_entry',

  data: () => ({

    items: ['ON', 'OFF'],

  }),

  computed:{
    Advantrate_entry:{
      get: function() {
          return this.$store.state.Advantrate_entry
      },
      set: function(value) {
        this.$store.commit('UpdateAdvantrate_entry', value )
      }
    }
  },
  methods: {
    

  }
};
</script>
