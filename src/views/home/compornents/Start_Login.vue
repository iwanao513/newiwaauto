<template>
  <div class="mt-0">
    
      <v-col cols="12 ">
        <v-btn @click="Start_login" x-large color="primary" dark block>ログイン</v-btn>
      </v-col>     
   
  </div>    
</template>

<script>
 import { ipcRenderer } from 'electron'
export default {
  name: 'Start_Login',

  data: () => ({
    

  }),
  computed:{
    
  },
  methods: {
    Start_login(){
      ipcRenderer.send('StartLogin');
      
      
    }

  }
};
</script>
