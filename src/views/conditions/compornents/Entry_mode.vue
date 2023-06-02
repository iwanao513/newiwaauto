<template>
  <div>
    <div class="mt-0">
        <div class="mt-4">
          <v-select
            v-model="Entry_mode"
            :items="items"
            label="モードの選択"
            dense
            ></v-select>
        </div>
    </div>
  </div>    
</template>

<script>

export default {
  name: 'Entry_mode',

  data: () => ({

    items: ['HighLow', 'HighLowスプレッド','Turbo','Turboスプレッド'],

  }),

  computed:{
    Entry_mode:{
      get: function() {
          return this.$store.state.Entry_mode
      },
      set: function(value) {
        this.$store.commit('UpdateEntry_mode', value )
      }
    }
  },
  methods: {
    

  }
};
</script>
