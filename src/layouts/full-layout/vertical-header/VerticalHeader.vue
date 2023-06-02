<template>
  <v-app-bar
    app
    clipped-left
    clipped-right
    :color="navbarColor"
    :dark="navbarColor !== 'white'"
  >
    <!---Logo part -->
    <v-toolbar-title
      class="align-center d-flex logo-width"
      :class="`${showLogo ? 'logo-width' : ''}`"
      v-if="navbarColor !== 'white'"
    >
    <div>岩オート(ver0.1.0)</div>
    </v-toolbar-title>
    <!---Dark Logo part -->
    <v-toolbar-title
      class="align-center d-flex logo-width"
      :class="`${showLogo ? 'logo-width' : ''}`"
      v-else
    >
      <div>岩オート(ver0.1.0)</div>
    </v-toolbar-title>
    <!---Logo part -->
    <!---/Toggle sidebar part -->
    <div @click="showhideLogo">
      <v-app-bar-nav-icon
        @click="
          $vuetify.breakpoint.smAndDown
            ? setSidebarDrawer(!Sidebar_drawer)
            : $emit('input', !value)
        "
      />
    </div>
    <!---/Toggle sidebar part -->
    <!---/ロードボタン -->
   
    <!---
    <v-btn dark icon class="mr-10 d-sm-block d-none" @click="MakeReport">
      レポート作成
    </v-btn>
    -->
     <!---/データ削除ボタン -->
    
    <v-spacer />
    <!---right part -->

    <!---User -->
    
    <!---User -->
  </v-app-bar>
</template>
<script>
// Utilities
import { mapState, mapMutations } from "vuex";
//import { ipcRenderer } from 'electron'
export default {
  name: "VerticalHeader",

  components: {},

  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    showLogo: true,
    
    href() {
      return undefined;
    },
  }),

  computed: {
    ...mapState(["navbarColor", "Sidebar_drawer"]),
  },

  methods: {
    ...mapMutations({
      setSidebarDrawer: "SET_SIDEBAR_DRAWER",
    }),
    showhideLogo: function () {
      this.showLogo = !this.showLogo;
    },
    
  },
  
};
</script>

<style lang="scss">
.hidelogo {
  display: none;
}
.searchinput {
  position: absolute;
  width: 100%;
  margin: 0;
  left: 0;
  z-index: 10;
  padding: 0 15px;
}
.descpart {
  max-width: 220px;
}
</style>