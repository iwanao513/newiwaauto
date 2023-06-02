<template>
  <v-app id="inspire" :class="{ horizontalstyle: setHorizontalLayout }">
    <!-- ---------------------------------- -->
    <!--- Vertical Header part -->
    <!-- ---------------------------------- -->
    <VerticalHeader
      v-if="!setHorizontalLayout"
      v-model="expandOnHover"
    ></VerticalHeader>
    <!-- ---------------------------------- -->
    <!--- Horizontal Header part -->
    <!-- ---------------------------------- -->


    <v-main>
      <v-container fluid class="page-wrapper">
        <router-view />
        
      </v-container>
    </v-main>
    <!-- ---------------------------------- -->
    <!--- Vertical Sidebar  part -->
    <!-- ---------------------------------- -->
    <VerticalSidebar
      v-if="!setHorizontalLayout"
      :expand-on-hover.sync="expandOnHover"
    ></VerticalSidebar>
    <!-- ---------------------------------- -->
    <!--- Horizontal Sidebar part -->
    <!-- ---------------------------------- -->

    <!-- ---------------------------------- -->
    <!--- Customizer part -->
    <!-- ---------------------------------- -->

    <!-- ---------------------------------- -->
    <!--- Vertical Footer part -->
    <!-- ---------------------------------- -->
    <Footer v-if="!setHorizontalLayout"></Footer>
    <!-- ---------------------------------- -->
    <!--- Horizontal Footer part -->

  </v-app>
</template>

<script>

import VerticalHeader from "./vertical-header/VerticalHeader";
import Footer from "./footer/Footer";
import VerticalSidebar from "./vertical-sidebar/VerticalSidebar";

import { mapState, mapMutations } from "vuex";
export default {
  name: "Layout",

  components: {

    VerticalHeader,
    Footer,
    VerticalSidebar,

  },

  props: {
    source: String,
  },
  data: () => ({
    expandOnHover: false,
  }),
  computed: {
    ...mapState(["Customizer_drawer", "setHorizontalLayout"]),
  },

  methods: {
    ...mapMutations({
      setCustomizerDrawer: "SET_CUSTOMIZER_DRAWER",
    }),
  },
};
</script>

<style>
</style>