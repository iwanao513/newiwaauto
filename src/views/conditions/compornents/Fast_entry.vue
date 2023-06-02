<template>
  <div>
    <div class="mt-0">
        <div class="mt-4">
          <v-select
            v-model="Fast_entry"
            :items="items"
            label="高速エントリーモード"
            dense
            hint="高速エントリーモードを変更した場合、ハイローページをリロードしてください。（チャートを削除することで高速化しています。自動と認識されるリスクがあることをご理解ください。）"
            ></v-select>
        </div>
    </div>
  </div>    
</template>

<script>

export default {
  name: 'Fast_entry',

  data: () => ({

    items: ['ON', 'OFF'],

  }),

  computed:{
    Fast_entry:{
      get: function() {
          return this.$store.state.Fast_entry
      },
      set: function(value) {
        this.$store.commit('UpdateFast_entry', value )
      }
    }
  },
  methods: {
    

  }
};
</script>
