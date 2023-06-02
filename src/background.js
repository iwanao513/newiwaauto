'use strict'

import { app, protocol, BrowserWindow  ,ipcMain} from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'


const isDevelopment = process.env.NODE_ENV !== 'production'
import path from 'path'
const express = require('express');
const ex = express();
//app.disableHardwareAcceleration()
// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])
const dataStore = require('./store.js');
var projectionWin = null
var win=null
var vuex=null
app.on('render-process-gone', (e,w,d) => {
  if(d.reason == "crashed") {
  w.reload()
  } else {
  fs.appendFileSync('./log .txt', `${new Date()} レンダリング プロセスが ${d.reason}\n`)
  }
})
async function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,

      webviewTag: true
    }
  })
  win.setMenu(null);
  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }
  win.on('closed', () => {

    app.quit()
  })
}
const fs = require("fs");
app.on('render-process-gone', (e,w,d) => {
  if(d.reason == "crashed") {
  w.reload()
  } else {
  fs.appendFileSync('./log .txt', `${new Date()} レンダリング プロセスが ${d.reason}\n`)
  }
})
async function createBrowserWindow(){
  projectionWin = new BrowserWindow({
     width: 1300,
     height: 1000,
     useContentSize: true,
     webPreferences: {
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
      preload: path.join(__dirname, 'preload.js'),
      webviewTag: true,
      webSecurity: false
     }
  })
  projectionWin.setMenu(null);

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await projectionWin.loadURL(process.env.WEBPACK_DEV_SERVER_URL+ '#/browser')
  
    if (!process.env.IS_TEST) projectionWin.webContents.openDevTools()
  } else {
    await  projectionWin.loadURL('app://./index.html#/browser').then(()=>{
     
  })
  }
  projectionWin.on('closed', () => {
    projectionWin = null
    app.quit()
  })
}
// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate',async () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()

})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createWindow()
  createBrowserWindow()
  
})


// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}

//express 設定
ex.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

ex.use(express.urlencoded({ extended: true }));
ex.use(express.json());

//MT4からの通信
ex.listen(44444);
ex.get('/', function (req, res) {
  res.send('POST is sended.');
  console.log('GET');
  console.log('get query=' + req.query.tradeType);
  console.log('get query=' + req.query.symbolName);
  console.log('get query=' + req.query.tradeTime);
  console.log('get query=' + req.query.betPrice);
  console.log('get query=' + req.query.direction);
  console.log('get query=' + req.query.rateData);
  let data = {};
  data.game = req.query.tradeType;
  data.symbol = req.query.symbolName;
  data.tradeBox = req.query.tradeTime;
  data.amount = req.query.betPrice;
  data.direction = req.query.direction;
  data.late = req.query.rateData;
  
  if (data.game == 'APP') {
    if( vuex.Entry_mode=="HighLowスプレッド")data.game = "HighLowS"
    else if( vuex.Entry_mode=="Turboスプレッド")data.game = "TurboS"
    else data.game = vuex.Entry_mode
  }
  if (data.tradeBox == 'APP') {
    if(vuex.Entry_time=="短期")data.tradeBox ="15m5m"
    else if(vuex.Entry_time=="中期")data.tradeBox ="15m10m"
    else if(vuex.Entry_time=="長期")data.tradeBox ="15m15m"
    else if(vuex.Entry_time=="1時間")data.tradeBox ="1H"
    else if(vuex.Entry_time=="24時間")data.tradeBox ="1D"
    else if(vuex.Entry_time=="30秒")data.tradeBox ="30s"
    else if(vuex.Entry_time=="1分")data.tradeBox ="1m"
    else if(vuex.Entry_time=="3分")data.tradeBox ="3m"
    else if(vuex.Entry_time=="5分")data.tradeBox ="5m"

  }  
  let amount = Number(data.amount);
  if (data.amount == 'APP') {
    amount = Number(vuex.Entry_bet)
  }
  if (data.amount == '') {
    amount = 1000;
  }
  if (amount > 200000) amount = 200000;
  if (amount < 1000) amount = 1000;
  data.amount = amount;

  if (
    data.late == undefined ||
    data.late == '' ||
    data.late == 'NULL' ||
    data.late == '0'
  ) {
    data.late = -1;
  } 

  if (data.direction == 'APP') {
    data.direction = null;
  }
  if (data.direction == '') {
    data.direction = null;
  }
  data.state="待機中"
  data.orderTime =getYYMMDDHHSSMM();
  data.orderTimeafter="NULL";
  data.winlose="NULL"
  data.finishlate="NULL"
  data.finishTime="NULL"
  data.entrylate="NULL"
  data.getamount="NULL"
  let  date = new Date();
  data.key = date.getTime();
  win.webContents.send('sendOrderData', data);
  
  dataStore.addList(data);
  sendOrderData()
} )
//レンダラーからの通信等
ipcMain.on('vuexdata', (e,data) => {
  console.log("vuexデータ")
  vuex=data
  projectionWin.webContents.send('vuexdata',data)
})
ipcMain.on('StartLogin', () => {
  console.log("ログイン")
  projectionWin.webContents.send('StartLogin')
})
ipcMain.on('StartDemo', () => {
  console.log("デモ")
  projectionWin.webContents.send('StartDemo')
})
//分、もしくは時間でエントリー出来ない場合
ipcMain.on('getOrderTimeError', (e,data) => {
  console.log(data)
  dataStore.removeList(data.key);
  win.webContents.send('orderTimeError', data);

  if (dataStore.orderList.length > 0) {
    console.log('order is exist');
    sendOrderData();
  } else {
    console.log('order is empty');
  }
})
//取引時間外
ipcMain.on('getOrderTimeOut', (e,data) => {
  console.log(data)
  dataStore.removeList(data.key);
  win.webContents.send('orderTimeOut', data);

  if (dataStore.orderList.length > 0) {
    console.log('order is exist');
    sendOrderData();
  } else {
    console.log('order is empty');
  }
})
//エントリー終わり
ipcMain.on('getOrderFinish', (e,data) => {
    dataStore.removeList(data.key);
    win.webContents.send('orderFinish', data);

    if (dataStore.orderList.length > 0) {
      console.log('オーダーが残っています。');
      sendOrderData();
    } else {
      console.log('オーダーがなくなった');
    }
})
//エントリーエラー時
ipcMain.on('getOrderError', (e,data) => {
  console.log('key : ' + data.key);
  dataStore.removeList(data.key);
  win.webContents.send('orderError', data);

  if (dataStore.orderList.length > 0) {
    console.log('order is exist');
    sendOrderData();
  } else {
    console.log('order is empty');
  }
})
//有利エントリー時
ipcMain.on('getOrderNext', (e,data) => {
  console.log('key : ' + data.key);
  let orderdata=dataStore.changeList(data.key,data.newkey);
  console.log(orderdata)
  win.webContents.send('orderNext', data);

  if (dataStore.orderList.length > 0) {
    console.log('order is exist');
    sendOrderData();
  } else {
    console.log('order is empty');
  }
})
//ヒストリー取得リクエスト
ipcMain.on('requestHistoryData', () => {

  projectionWin.webContents.send('requestHistoryData');

})
//ヒストリー取得リターン
ipcMain.on('returnHistoryData', (e,data) => {

  win.webContents.send('returnHistoryData',data);

})
function sendOrderData(){
  console.log('order info send to browse');

    // 注文情報を待機リストから取得
    let orderData = {};
    orderData = dataStore.getStockOrderData();
    if (orderData == -1) return;

    // ブラウザへ情報送信
    orderData.channel = 'doOrder';
    orderData.lateTime = 80;
    orderData.Retry_set=vuex.Retry_set
    orderData.Entry_stop=vuex.Entry_stop
    orderData.Entry_stopSec=vuex.Entry_stopSec

    orderData.SameTimestop=vuex.SameEntry_stop
    orderData.SameTimestopNo=vuex.SameEntry_stopNo

    orderData.Login_set=vuex.Login_set
    orderData.Login_setMin=vuex.Login_setMin

    orderData.Advantrate_entry=vuex.Advantrate_entry
    orderData.Advantrate_point=vuex.Advantrate_point
    projectionWin.webContents.send('EntrySend', orderData);
}

function getYYMMDDHHSSMM()
{
let dt = new Date() ;
let year = dt.getFullYear() ;
let month = dt.getMonth() + 1 ;
let date = dt.getDate() ;
let hours = dt.getHours() ;
let minutes = dt.getMinutes() ;
let seconds = dt.getSeconds();
let ymdhms = new String( year ) + "/" + ( "00" + new String( month )).slice( -2 ) + "/" + ( "00" + new String( date )).slice( -2 ) ;
ymdhms += " " + ( "00" + new String( hours )).slice( -2 ) + ":" + ( "00" + new String( minutes )).slice( -2 ) + ":" + ( "00" + new String( seconds )).slice( -2 ) ;
return ymdhms ;
}