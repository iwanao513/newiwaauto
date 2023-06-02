<template>
  <div class="mt-0">
    
      <v-col cols="12 ">
        <v-btn @click="Start_Demo" x-large color="primary" dark block>デモ切り替え</v-btn>
      </v-col>     
   
  </div>    
</template>

<script>
 import { ipcRenderer } from 'electron'
export default {
  name: 'Start_Demo',

  data: () => ({
    

  }),
  computed:{
    
  },
  methods: {
    Start_Demo(){
      ipcRenderer.send('StartDemo');
      
      
    }

  }
};
</script>
