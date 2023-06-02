import Vue from "vue";
import Vuex from "vuex";
import { ipcRenderer } from 'electron'
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    Sidebar_drawer: null,
    Customizer_drawer: false,
    SidebarColor: "white", //Change Sidebar Color || 'white', | "#2b2b2b" | "rgb(44, 59, 164)" | "rgb(96, 44, 164)" | "rgb(151, 210, 219)" | "rgb(77, 86, 100)"
    SidebarBg: "",
    navbarColor: "dark",
    setHorizontalLayout: false, // Horizontal layout
    UserID:"",
    UserPassword:"",
    Hour:["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23"],
    Min:["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30",
        "31","32","33","34","35","36","37","38","39","40","41","42","43","44","45","46","47","48","49","50","51","52","53","54","55","56","57","58","59"],
    Houralldone:"all",
    HourJapanalldone:"all",
    HourRondonalldone:"all",
    HourNYalldone:"all",
    Minalldone:"all",
    Min5alldone:"all",
    Retry_set:0,
    Fast_entry:"ON",
    Entry_stop:"ON",
    Entry_stopSec:30,
    SameEntry_stop:"OFF",
    SameEntry_stopNo:5,
    Login_set:"ON",
    Login_setMin:13,
    Advantrate_entry:"OFF",
    Advantrate_point:3,
    Entry_mode:"HighLow",
    Entry_time:'短期',
    Entry_bet:1000,
    Logdata:[]
  },
  mutations: {
    VuexSend(){
      ipcRenderer.send('vuexdata', this.state);
      localStorage.setItem('vuex', JSON.stringify(this.state))
    },
    DeleteLogData(state,Index){
      state.Logdata.splice(Index, 1)
      ipcRenderer.send('vuexdata', this.state);
      localStorage.setItem('vuex', JSON.stringify(this.state))
    },
    AllDeleteLogData(state){
      state.Logdata=[]
      ipcRenderer.send('vuexdata', this.state);
      localStorage.setItem('vuex', JSON.stringify(this.state))
    },
    HistoryDataList(state,data){
      console.log(data)
      for(let index=0;index< state.Logdata.length;index++){
        for(let a=0;a<data.length;a++){
          if(a==0)continue;
          let amount=data[a].amount.replace(/¥/g, '').replace(/,/g, '');
          let getamount=data[a].finishamount.replace(/¥/g, '').replace(/,/g, '');
          let nowTime = new Date(state.Logdata[index].orderTimeafter)
          let nowTimeyear = nowTime.getFullYear()
          let entryTodate =data[a].entrytime.split(/•/);
          let entryToMonth =entryTodate[1].split(/月/);
          let entryTohourmin =entryTodate[0].split(/:/);
          let entrytime=new Date(nowTimeyear,entryToMonth[0]-1,entryToMonth[1].replace(/[^0-9]/g, ''),entryTohourmin[0],entryTohourmin[1],entryTohourmin[2])
          
          let finishTodate =data[a].finishtime.split(/•/);
          let finishToMonth =finishTodate[1].split(/月/);
          let finishTohourmin =finishTodate[0].split(/:/);
          let finishtime=new Date(nowTimeyear,finishToMonth[0]-1,finishToMonth[1].replace(/[^0-9]/g, ''),finishTohourmin[0],finishTohourmin[1],finishTohourmin[2])
          let tradeBox=state.Logdata[index].tradeBox
          let CategoryFlag=true
          console.log(tradeBox)
          switch(tradeBox) {
            case"30s":
                if(data[a].mode.indexOf("30秒")>-1)CategoryFlag=true
                else CategoryFlag=false
                break;
            case"1m":
                if(data[a].mode.indexOf("1分")>-1)CategoryFlag=true
                else CategoryFlag=false
                break;
            case"3m":
                if(data[a].mode.indexOf("3分")>-1)CategoryFlag=true
                else CategoryFlag=false
                break;
            case"5m":
                if(data[a].mode.indexOf("5分")>-1)CategoryFlag=true
                else CategoryFlag=false  
                break;
            case"1H":
                if(data[a].mode.indexOf("1時間")>-1)CategoryFlag=true
                else CategoryFlag=false   
                break; 
            case"1D":
                if(data[a].mode.indexOf("23時間")>-1 || data[a].mode.indexOf("22時間")>-1 || data[a].mode.indexOf("19時間")>-1)CategoryFlag=true
                else CategoryFlag=false   
                break;
            case "15m5m":
            case "15m10m":  
            case "15m15m":{
              let time =Math.abs((entrytime.getTime()-finishtime.getTime())/1000)
              console.log(time)
              if(tradeBox=="15m5m" && time<=360)CategoryFlag=true
              else if(tradeBox=="15m10m" && time>360 && time<=660)CategoryFlag=true
              else if(tradeBox=="15m15m" && time>660)CategoryFlag=true
              else CategoryFlag=false
              break;
            }  
          }  
          
          if(state.Logdata[index].symbol==data[a].symbol &&
            state.Logdata[index].amount==amount &&
             Math.abs(nowTime.getTime()-entrytime.getTime())/1000<10 &&
             CategoryFlag){
              state.Logdata[index].state = "判定終了";
              state.Logdata[index].entrylate = data[a].entryrate;
              state.Logdata[index].orderTimeafter = getYYMMDDHHSSMM(entrytime);
              state.Logdata[index].finishTime =getYYMMDDHHSSMM(finishtime);
              state.Logdata[index].finishlate = data[a].finishrate;
              state.Logdata[index].getamount = getamount;
              if(getamount<amount*1.74 && getamount!=0)state.Logdata[index].winlose="転売"
              else if(getamount==0)state.Logdata[index].winlose="負け"
              else state.Logdata[index].winlose="勝ち"
              break
            }

        }
        
        


      }
    },
    removeList(state,data) {
      for (let index in state.Logdata) {
          if (state.Logdata[index].key == data.key) {
            state.Logdata[index].state = "判定中";
            state.Logdata[index].orderTimeafter = data.orderTimeafter;
            state.Logdata[index].entrylate = data.entrylate;
          }
      }
    },
    errorTimeList(state,data) {
      for (let index in state.Logdata) {
          if (state.Logdata[index].key == data.key) {
            state.Logdata[index].state = "禁止分または禁止時間";
          }
      }
    },
    errorTimeOutList(state,data) {
      for (let index in state.Logdata) {
          if (state.Logdata[index].key == data.key) {
            state.Logdata[index].state = data.state;
          }
      }
    },
    errorList(state,data) {
      for (let index in state.Logdata) {
          if (state.Logdata[index].key == data.key) {
            state.Logdata[index].state = data.errortext;
            state.Logdata[index].orderTimeafter = data.orderTimeafter;
            state.Logdata[index].entrylate = data.entrylate;
          }
      }
    },
    nextList(state,data) {
      for (let index in state.Logdata) {
          if (state.Logdata[index].key == data.key) {
            state.Logdata[index].state = "有利エントリー待機";
            state.Logdata[index].key = data.newkey
          }
      }
    },
    VuexSendOrderData(state, value){
      console.log(value)
      state.Logdata.push(value)
      if(state.Logdata.length>100){
        state.Logdata.splice(0,state.Logdata.length-100)
      }
      ipcRenderer.send('vuexdata', this.state);
      localStorage.setItem('vuex', JSON.stringify(this.state))
    },
    UpdateUserID(state, value){
      state.UserID=value
      ipcRenderer.send('vuexdata', this.state);
      localStorage.setItem('vuex', JSON.stringify(this.state))
    },
    UpdateUserPassword(state, value){
      state.UserPassword=value
      ipcRenderer.send('vuexdata', this.state);
      localStorage.setItem('vuex', JSON.stringify(this.state))
    },
    UpdateSameEntry_stopNo(state, value){
      state.SameEntry_stopNo=value
      ipcRenderer.send('vuexdata', this.state);
      localStorage.setItem('vuex', JSON.stringify(this.state))
    },
    UpdateSameEntry_stop(state, value){
      state.SameEntry_stop=value
      ipcRenderer.send('vuexdata', this.state);
      localStorage.setItem('vuex', JSON.stringify(this.state))
    },
    UpdateEntry_bet(state, value){
      state.Entry_bet=value
      ipcRenderer.send('vuexdata', this.state);
      localStorage.setItem('vuex', JSON.stringify(this.state))
    },
    UpdateEntry_time(state, value){
      state.Entry_time=value
      ipcRenderer.send('vuexdata', this.state);
      localStorage.setItem('vuex', JSON.stringify(this.state))
    },
    UpdateEntry_mode(state, value){
      state.Entry_mode=value
      if(state.Entry_mode=="HighLow" || state.Entry_mode=="HighLowスプレッド"){
        if(state.Entry_time=='30秒'||state.Entry_time=='1分'||state.Entry_time=='3分'||state.Entry_time=='5分'){
          state.Entry_time='短期'
        }
      }
      else {
        if(state.Entry_time=='短期'||state.Entry_time=='中期'||state.Entry_time=='長期'||state.Entry_time=='1時間'||state.Entry_time=='24時間'){
          state.Entry_time='30秒'
        }
      }
      ipcRenderer.send('vuexdata', this.state);
      localStorage.setItem('vuex', JSON.stringify(this.state))
    },
    UpdateAdvantrate_point(state, value){
      state.Advantrate_point=value
      ipcRenderer.send('vuexdata', this.state);
      localStorage.setItem('vuex', JSON.stringify(this.state))
    },
    UpdateAdvantrate_entry(state, value){
      state.Advantrate_entry=value
      ipcRenderer.send('vuexdata', this.state);
      localStorage.setItem('vuex', JSON.stringify(this.state))
    },
    UpdateLogin_setMin(state, value){
      state.Login_setMin=value
      ipcRenderer.send('vuexdata', this.state);
      localStorage.setItem('vuex', JSON.stringify(this.state))
    },
    UpdateLogin_set(state, value){
      state.Login_set=value
      ipcRenderer.send('vuexdata', this.state);
      localStorage.setItem('vuex', JSON.stringify(this.state))
    },
    UpdateEntry_stopSec(state, value){
      state.Entry_stopSec=value
      ipcRenderer.send('vuexdata', this.state);
      localStorage.setItem('vuex', JSON.stringify(this.state))
    },
    UpdateEntry_stop(state, value){
      state.Entry_stop=value
      ipcRenderer.send('vuexdata', this.state);
      localStorage.setItem('vuex', JSON.stringify(this.state))
    },
    UpdateFast_entry(state, value){
      state.Fast_entry=value
      ipcRenderer.send('vuexdata', this.state);
      localStorage.setItem('vuex', JSON.stringify(this.state))
    },
    UpdateRetry_set(state, value){
      state.Retry_set=value
      ipcRenderer.send('vuexdata', this.state);
      localStorage.setItem('vuex', JSON.stringify(this.state))
    },
    UpdateMin(state, value) {
      let Min5=["5","10","15","20","25","30","35","40","45","50","55","0"]
      const isAllIncludes = (arr, target) => arr.every(el => target.includes(el));
      state.Min= value
      if(state.Min.length!=60)state.Minalldone=""
      else state.Minalldone="all"
      if(isAllIncludes(Min5,state.Min))state.Min5alldone="all"
      else state.Min5alldone=""
      ipcRenderer.send('vuexdata', this.state);
      localStorage.setItem('vuex', JSON.stringify(this.state))
    },
    UpdateHour(state, value) {
      let JapanHour=["9","10","11","12","13","14","15"]
      let RondonHour=["0","1","2","16","17","18","19","20","21","22","23"]
      let NYHour=["0","1","2","3","4","5","6","21","22","23"]
      const isAllIncludes = (arr, target) => arr.every(el => target.includes(el));
      state.Hour= value
      if(state.Hour.length!=24)state.Houralldone=""
      else state.Houralldone="all"
      if(isAllIncludes(NYHour,state.Hour))state.HourNYalldone="all"
      else state.HourNYalldone=""
      if(isAllIncludes(RondonHour,state.Hour))state.HourRondonalldone="all"
      else state.HourRondonalldone=""
      if(isAllIncludes(JapanHour,state.Hour))state.HourJapanalldone="all"
      else state.HourJapanalldone=""
      ipcRenderer.send('vuexdata', this.state);
      localStorage.setItem('vuex', JSON.stringify(this.state))
    },
    SET_SIDEBAR_DRAWER(state, payload) {
      state.Sidebar_drawer = payload;
    },
    SET_CUSTOMIZER_DRAWER(state, payload) {
      state.Customizer_drawer = payload;
    },
    SET_SIDEBAR_COLOR(state, payload) {
      state.SidebarColor = payload;
    },
    SET_NAVBAR_COLOR(state, payload) {
      state.navbarColor = payload;
    },
    SET_LAYOUT(state, payload) {
      state.setHorizontalLayout = payload;
    },
  },
  actions: {},
  getters: {},
});
function getYYMMDDHHSSMM(dt)
{
var year = dt.getFullYear() ;
var month = dt.getMonth() + 1 ;
var date = dt.getDate() ;
var hours = dt.getHours() ;
var minutes = dt.getMinutes() ;
var seconds = dt.getSeconds();
var ymdhms = new String( year ) + "/" + ( "00" + new String( month )).slice( -2 ) + "/" + ( "00" + new String( date )).slice( -2 ) ;
ymdhms += " " + ( "00" + new String( hours )).slice( -2 ) + ":" + ( "00" + new String( minutes )).slice( -2 ) + ":" + ( "00" + new String( seconds )).slice( -2 ) ;
return ymdhms ;
}