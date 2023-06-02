<template>
  
  <v-app id="materialpro" :class="`${!$vuetify.breakpoint.smAndDown ? 'full-sidebar' : 'mini-sidebar'}`">
      <router-view />
      <Loading />
      <v-dialog
        v-model="dialog"
        persistent
        width="360"
      > 
      <v-card
        align="center"
      >
        <v-card-title>
          {{dialogtitle}}
        </v-card-title>
        <v-card-text class="text-left">
          {{dialogtext}}
        </v-card-text>
        <v-btn
          @click="recover"
          outlined
          color="red lighten-2"
          class="mb-3"
        >OK</v-btn>
      </v-card>
    </v-dialog>
  </v-app>
  
</template>

<script>
import { ipcRenderer} from 'electron'
import Loading from "./components/Loading.vue";
export default {
  name: 'App',
 
  components: {
    Loading
  },

  computed:{
    dialog(){
      return this.$store.state.dialog
    },
    dialogtitle(){
      return this.$store.state.dialogtitle
    },
    dialogtext(){
      return this.$store.state.dialogtext
    },
  },
  methods: {
    recover() {
      this.$store.commit('Updatedialog', false)
    },
    StartLoop(){
      this.requestHistoryData()
      setInterval(this.requestHistoryData, 300000);
    },
    requestHistoryData(){
      console.log("History取得")
      const  Logstate=this.$store.state.Logdata.some(el=>el.state=="判定中")
      if(Logstate){
        ipcRenderer.send('requestHistoryData')
      }
    }
  },
  mounted(){
    let vuex=JSON.parse(localStorage.getItem('vuex'))
    if(vuex!=null){
      this.$store.state.UserID=vuex.UserID
      this.$store.state.UserPassword=vuex.UserPassword
      this.$store.state.Advantrate_entry=vuex.Advantrate_entry
      this.$store.state.Advantrate_point=vuex.Advantrate_point
      this.$store.state.Entry_bet=vuex.Entry_bet
      this.$store.state.Entry_mode=vuex.Entry_mode
      this.$store.state.Entry_stop=vuex.Entry_stop
      this.$store.state.Entry_stopSec=vuex.Entry_stopSec
      this.$store.state.Entry_time=vuex.Entry_time
      this.$store.state.Fast_entry=vuex.Fast_entry
      this.$store.state.Hour=vuex.Hour
      this.$store.state.HourNYalldone=vuex.HourNYalldone
      this.$store.state.HourRondonalldone=vuex.HourRondonalldone
      this.$store.state.Houralldone=vuex.Houralldone
      this.$store.state.Login_set=vuex.Login_set
      this.$store.state.Login_setMin=vuex.Login_setMin
      this.$store.state.Min=vuex.Min
      this.$store.state.Min5alldone=vuex.Min5alldone
      this.$store.state.Minalldone=vuex.Minalldone
      this.$store.state.Retry_set=vuex.Retry_set
      this.$store.state.Logdata=vuex.Logdata
    }  
    else this.$store.commit('VuexSend')
    ipcRenderer.send('vuexdata', vuex);
    ipcRenderer.on('sendOrderData',(event,arg)=>{
      console.log("オーダーデータ")
      this.$store.commit('VuexSendOrderData', arg)
    })
    //エントリー終わり
    ipcRenderer.on('orderFinish', (e, data) => {
      this.$store.commit('removeList', data)

    });

    //エントリーエラー
    ipcRenderer.on('orderError', (e, data) => {
      this.$store.commit('errorList', data)
    });
    //時間もしくは分によるエラー
    ipcRenderer.on('orderTimeError', (e, data) => {
      console.log(data)
      this.$store.commit('errorTimeList', data)
    });
    //取引時間外
    ipcRenderer.on('orderTimeOut', (e, data) => {
      console.log(data)
      this.$store.commit('errorTimeOutList', data)
    });
    //有利エントリー
    ipcRenderer.on('orderNext', (e, data) => {
      this.$store.commit('nextList', data)
    });
    //ヒストリー取得リターン
    ipcRenderer.on('returnHistoryData', (e, data) => {
      console.log("Historyリターン")
     
      this.$store.commit('HistoryDataList', data)
    });
    let date = new Date();
      let nextm = getNextMins(2,date.getMinutes());
      setTimeout(this.StartLoop, (60000 * nextm) - 1000 * date.getSeconds() - date.getMilliseconds());
  },
  
};
function getNextMins(autogettime,m) {
  
  let ret = 60 + autogettime - m;
  let intv = 5;
  if(ret <= intv) {
    return ret;
  } else {
    return getNextMins(autogettime,m + intv);
  }
}

</script>
