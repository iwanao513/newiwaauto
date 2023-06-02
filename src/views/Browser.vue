<template>

<body>
   <!--loadingbar-->
    <v-progress-linear :indeterminate="loading" class="webview-progress-bar"></v-progress-linear>

    <!--toolbar-->
    <v-toolbar fixed class="webview-toolbar" height="50">
      <v-btn @click="goBack" icon>
        <v-icon>mdi-arrow-left-bold-circle</v-icon>
      </v-btn>
      <v-btn @click="goForward" icon>
        <v-icon>mdi-arrow-right-bold-circle</v-icon>
      </v-btn>
      <v-btn @click="reload" icon>
        <v-icon>mdi-refresh</v-icon>
      </v-btn>
      <v-btn @click="goHome" icon>
        <v-icon>mdi-home</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-text-field
          v-model="url"
          @keypress.enter="loadUrl"
      ></v-text-field>
    </v-toolbar>
 <webview 
    :src="initUrl" 
    id="webview"
 
    :preload="preload"
    />
 
 
</body>
</template>

<script >
const { ipcRenderer  } = require('electron');
export default {
  name: "Browser",
  data () {
    return {
      loading: false,
      url: '',
      webview: '',
      preload:`file://${require('path').join(__static, 'webviewpreload.js')}`,
      loginflag:false,
      vuex:{},
      typeHighLowStopTime : [
        {
          symbols: [
            "CAD/JPY", "CHF/JPY", "EUR/GBP", "GBP/USD", "USD/CAD", "USD/CHF",
          ],
          stopTime: [
            {
              tradeBox:"15m5m",
              StartHour:8,
              StartMin:0,
              EndHour:2,
              EndMin:59
            },
            {
              tradeBox:"15m10m",
              StartHour:8,
              StartMin:5,
              EndHour:2,
              EndMin:50
            },
            {
              tradeBox:"15m15m",
              StartHour:8,
              StartMin:10,
              EndHour:2,
              EndMin:55
            },
            {
              tradeBox:"1H",
              StartHour:8,
              StartMin:0,
              EndHour:6,
              EndMin:0
            },
            {
              tradeBox:"1D",
              StartHour:7,
              StartMin:0,
              EndHour:6,
              EndMin:0
            },
          ]
        },
        {
          symbols: [
            "EUR/AUD", "GBP/AUD", "NZD/JPY", "NZD/USD"
          ],
          stopTime: [
            {
                tradeBox:"15m5m",
                StartHour:9,
                StartMin:0,
                EndHour:2,
                EndMin:59
              },
              {
                tradeBox:"15m10m",
                StartHour:9,
                StartMin:5,
                EndHour:2,
                EndMin:50
              },
              {
                tradeBox:"15m15m",
                StartHour:9,
                StartMin:10,
                EndHour:2,
                EndMin:55
              },
              {
                tradeBox:"1H",
                StartHour:9,
                StartMin:0,
                EndHour:6,
                EndMin:0
              },
              {
                tradeBox:"1D",
                StartHour:7,
                StartMin:0,
                EndHour:6,
                EndMin:0
              },
          ]
        },
        {
          symbols: [
            "AUD/JPY", "AUD/USD","EUR/JPY","EUR/USD","GBP/JPY","USD/JPY"
          ],
          stopTime: [
            {
              tradeBox:"15m5m",
              StartHour:8,
              StartMin:0,
              EndHour:5,
              EndMin:59
            },
            {
              tradeBox:"15m10m",
              StartHour:8,
              StartMin:5,
              EndHour:5,
              EndMin:50
            },
            {
              tradeBox:"15m15m",
              StartHour:8,
              StartMin:10,
              EndHour:5,
              EndMin:55
            },
            {
              tradeBox:"1H",
              StartHour:8,
              StartMin:0,
              EndHour:5,
              EndMin:59
            },
            {
              tradeBox:"1D",
              StartHour:7,
              StartMin:0,
              EndHour:5,
              EndMin:59
            },
          ]
        },
        {
          symbols: [
            "BTC/JPY", "ETH/JPY","BTC/USD","BTC/JPY",
          ],
          stopTime: [
            {
              tradeBox:"1D",
              StartHour:7,
              StartMin:0,
              EndHour:5,
              EndMin:59
            },
          ]
        },
        {
          symbols: [
            "GOLD",
          ],
          stopTime: [
            {
              tradeBox:"1D",
              StartHour:7,
              StartMin:0,
              EndHour:4,
              EndMin:59
            },
          ]
        },
      ],
      typeTurboStopTime : [
        {
          symbols: [
            "AUD/JPY", "AUD/USD", "EUR/JPY", "EUR/USD", "GBP/JPY", "USD/JPY","BTC/USD","ETH/USD","BTC/JPY","ETH/JPY",
          ],
          stopTime: [
            {
              tradeBox:"30s",
              StartHour:8,
              StartMin:0,
              EndHour:5,
              EndMin:0
            },
            {
              tradeBox:"1m",
              StartHour:8,
              StartMin:0,
              EndHour:5,
              EndMin:0
            },
            {
              tradeBox:"3m",
              StartHour:8,
              StartMin:0,
              EndHour:5,
              EndMin:0
            },
            {
              tradeBox:"5m",
              StartHour:8,
              StartMin:0,
              EndHour:5,
              EndMin:0
            },
          ]
        },
        {
          symbols: [
            "NZD/JPY",
          ],
          stopTime: [
            {
              tradeBox:"30s",
              StartHour:8,
              StartMin:0,
              EndHour:3,
              EndMin:0
            },
            {
              tradeBox:"1m",
              StartHour:8,
              StartMin:0,
              EndHour:3,
              EndMin:0
            },
            {
              tradeBox:"3m",
              StartHour:8,
              StartMin:0,
              EndHour:3,
              EndMin:0
            },
            {
              tradeBox:"5m",
              StartHour:8,
              StartMin:0,
              EndHour:3,
              EndMin:0
            },
          ]
        }
      ]  
    }
  },  
  computed:{
    ID() {
      return this.vuex.UserID
    },
    password(){
      return this.vuex.UserPassword
    }
  },  
  mounted () {
    const webview=document.getElementById('webview')
    webview.addEventListener('dom-ready', function () {
      //webview.openDevTools();

    });
    this.vuex=JSON.parse(localStorage.getItem("vuex"))
    console.log(this.vuex)
    ipcRenderer.on('vuexdata', (event,data) => {
      this.vuex=data
      localStorage.setItem("vuex",JSON.stringify(data))
    })
    ipcRenderer.on('StartLogin', () => {
      if(this.url!="https://app.highlow.com/login"){
        this.webview.loadURL(`https://app.highlow.com/login`)
      }
      else{
        let data={
          ID:this.ID,
          password:this.password
        }
        this.webview.send("StartLogin",data) 
      }
      
    })
    ipcRenderer.on('EntrySend', (event,data) => {
      console.log(data)
      let date=new Date()
      if(data.state=="有利エントリー待機"){
        let orderTimeafter=new Date(data.orderTimeafter)
        let difSec
        if(data.game=="Turbo" || data.game=="TurboS"){
          if(data.tradeBox=="30s") difSec=30
          else if(data.tradeBox=="1m")difSec=60
          else if(data.tradeBox=="3m")difSec=180
          else if(data.tradeBox=="5m")difSec=300
          if(date.getTime()-orderTimeafter.getTime()<difSec/1000)this.webview.send("EntrySend",data) 
          else {
              let reData = {};
              reData.key = data.key;
              reData.state = "有利エントリー時間外";
              ipcRenderer.send('getOrderTimeOut', reData);
          }
        }
        else if(data.game=="HighLow" || data.game=="HighLowS"){
          let flag=true
          if(data.tradeBox=="15m5m" || data.tradeBox=="15m10m" || data.tradeBox=="15m15m"){
            let remainder=orderTimeafter.getMinutes() % 5
            if(remainder==0)difSec=240-orderTimeafter.getSeconds()
            else if(remainder==1)difSec=180-orderTimeafter.getSeconds()
            else if(remainder==2)difSec=120-orderTimeafter.getSeconds()
            else if(remainder==3)difSec=60-orderTimeafter.getSeconds()
            else if(remainder==4)difSec=300-orderTimeafter.getSeconds()
            if(date.getTime()-orderTimeafter.getTime()<difSec/1000 && flag)this.webview.send("EntrySend",data) 
            else {
                let reData = {};
                reData.key = data.key;
                reData.state = "有利エントリー時間外";
                ipcRenderer.send('getOrderTimeOut', reData);
            }
          }
          else if(data.tradeBox=="1H"){
            if(date.getHours()==orderTimeafter.getHours() && date.getMinutes()!=59)this.webview.send("EntrySend",data) 
            else {
              let reData = {};
                reData.key = data.key;
                reData.state = "有利エントリー時間外";
                ipcRenderer.send('getOrderTimeOut', reData);
            }
          }
        }
      }
      else {
        const Min =this.vuex.Min.some(el2=>Number(el2)==date.getMinutes())
        const Hour =this.vuex.Min.some(el2=>Number(el2)==date.getHours())
        let StopTimeList,StopTime

        if(Min && Hour){
          if(data.game=="HighLow" || data.game=="HighLowS"){
            for(let i in this.typeHighLowStopTime){
              if (this.typeHighLowStopTime[i].symbols.indexOf(data.symbol) >= 0) {
                StopTimeList=this.typeHighLowStopTime[i]
                break
              }  
            }
            if(StopTimeList!=null){
              console.log(StopTimeList)
              StopTime = StopTimeList.stopTime.find(el=>el.tradeBox == data.tradeBox)

              let isInTime = isInNowHourTime(StopTime.StartHour, StopTime.StartMin, StopTime.EndHour, StopTime.EndMin)
              if (isInTime) {
                this.webview.send("EntrySend",data) 
              }  
              else {
                let reData = {};
                reData.key = data.key;
                reData.state = "取引時間外";
                ipcRenderer.send('getOrderTimeOut', reData);
              }
            }
            else {
              let reData = {};
                reData.key = data.key;
                reData.state = "取引不可通貨";
                ipcRenderer.send('getOrderTimeOut', reData);
            }
          }
          else {
            for(let i in this.typeTurboStopTime){
              if (this.typeTurboStopTime[i].symbols.indexOf(data.symbol) >= 0) {
                StopTimeList=this.typeTurboStopTime[i]
                break
              }  
            }
            if(StopTimeList!=null){
              StopTime = StopTimeList.stopTime.find(el=>el.tradeBox == data.tradeBox)

              console.log(StopTime)
              let isInTime = isInNowHourTime(StopTime.StartHour, StopTime.StartMin, StopTime.EndHour, StopTime.EndMin)
              if (isInTime) {
                this.webview.send("EntrySend",data) 
              }  
              else {
                let reData = {};
                reData.state = "取引時間外";
                ipcRenderer.send('getOrderTimeOut', reData);
              }
            }
            else {
              let reData = {};
                reData.key = data.key;
                reData.state = "取引不可通貨";
                ipcRenderer.send('getOrderTimeOut', reData);
            }
          }

        }
        else {
          let reData = {};
          reData.key = data.key;
          ipcRenderer.send('getOrderTimeError', reData);
        }
      }  
      
      
    })
    ipcRenderer.on('StartDemo', () => {
      this.webview.loadURL(`https://app.highlow.com/quick-demo`)
    })
    ipcRenderer.on('requestHistoryData', () => {
      this.webview.send("requestHistoryData") 
    })
    
    // 初期URLの設定
    this.url = this.initUrl
    this.webview = document.getElementById('webview')
    // loading eventの付与
    this.webview.addEventListener('did-start-loading', () => {
      this.loading = true
    })
    this.webview.addEventListener('did-stop-loading', () => {
      this.loading = false
    })

    // commit eventの付与
    this.webview.addEventListener('load-commit', (e) => {
      this.setUrlBar(e)
    })

    
    
    
    //webviewからの通信
    this.webview.addEventListener("ipc-message",async (event) => {
      if(event.channel=="StartLogin"){
        let data={
          ID:this.ID,
          password:this.password
        }
        this.webview.send("StartLogin",data) 

      }  
      else if(event.channel=="vuexdata"){
        console.log("vuexdata")
        this.webview.send("vuexdatasend",this.vuex) 

      }  
    })
  },
  props:{
    initUrl: {type: String, require: true, default: 'https://app.highlow.com/login'}
  },
  methods:{

    goBack () {
      this.webview.canGoBack() && this.webview.goBack()
    },
    goForward () {
      this.webview.canGoForward() && this.webview.goForward()
    },
    goHome () {
      this.webview.loadURL(this.initUrl)
    },
    reload () {
      this.webview.reload()
    },
    loadUrl () {
      this.url.match(/^https?:\/\//) ? this.webview.loadURL(this.url)
        : this.webview.loadURL(`${this.url}`)
    },
    setUrlBar (event) {
      if (event.isMainFrame) {
        this.url = event.url
      }
    }
  }
}
function isInNowHourTime(refStartHour, refStartMin, refEndHour, refEndMin) {
  //現在時間取得
  const nowDate = new Date()
  const nowHour = nowDate.getHours()
  const nowMin = nowDate.getMinutes()

  let nowTimeHourToMin = nowHour * 60 + nowMin
  let startTimeHourToMin = Number(refStartHour) * 60 + Number(refStartMin)
  let endTimeHourToMin = Number(refEndHour) * 60 + Number(refEndMin)


  if (nowTimeHourToMin >= startTimeHourToMin || nowTimeHourToMin < endTimeHourToMin) {
    return true
  } else {
    return false
  }
}

</script>
<style>
body{
  height: 100%;
  margin: 0;
}


  .webview-progress-bar {
    position: fixed;
    margin: 0;
    z-index: 999999;
  }

  #webview {
    display: inline-flex;
    height: 100%;
    width:100%;
  }

  .webview-toolbar {
    margin-top: 7px !important;
  }
</style>