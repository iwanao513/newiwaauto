const { ipcRenderer } = require('electron');
let keeplist=[]
let vuex
window.addEventListener("load", async function() {
    ipcRenderer.sendToHost('vuexdata');
    if(location.href=="https://app.highlow.com/login"){
        ipcRenderer.sendToHost('StartLogin');
    }
    
})    
//ログイン後のURL処理
let href = location.href;
let observer = new MutationObserver(async function() {
  if(href !== location.href && href=='https://app.highlow.com/login') {
    let logintime=new Date().setHours(7, 30, 0, 0) - new Date()
    if(logintime<=0)logintime=new Date().setHours(7, 30, 0, 0) + 24 * 60 * 60 * 1000- new Date()

    setTimeout(() => {
      if(location.href!="https://app.highlow.com/quick-demo")location.href='https://app.highlow.com/login'
    }, logintime) 
    if(vuex.Fast_entry=="ON"){
      let canvas
      for(let i=0;i<30;i++){
        canvas=document.querySelector("#chart-container > canvas")
        if(canvas!=null){
            break;
        }
        
        await waitTime(100)
      }
      if(canvas!=null){
        canvas.style.visibility ="hidden";
  
        observer.disconnect();
      }
    }
    
  }
});
observer.observe(document, { childList: true, subtree: true });
//高速エントリー
ipcRenderer.on('vuexdatasend', async (event, data) =>  {
    vuex=data
    console.log(location.href)
    if(location.href=="https://app.highlow.com/quick-demo" || location.href=="https://app.highlow.com/"){
        console.log(vuex)
        if(vuex.Fast_entry=="ON"){
          let canvas
          for(let i=0;i<30;i++){
            canvas=document.querySelector("#chart-container > canvas")
            if(canvas!=null){
                break;
            }
            
            await waitTime(100)
          }
          if(canvas!=null){
            canvas.style.visibility ="hidden";
      
          }
        }
    }
})
//ヒストリー取得
ipcRenderer.on('requestHistoryData', async () =>  {
    console.log("ヒストリー取得")
    let container=document.querySelector("#App_sideContainerContent__3UncR").children.length
      if(container==0 && container!=null){
        let button=document.querySelector("#TOOLTIP_ANCHOR_ID_OPEN_TRADES_TOGGLE")
        button.click(); 
      }

      let listOpen=document.querySelector("#TOOLTIP_ANCHOR_ID_TRADE_ACTIVITY_MODAL > div.ClickBounce_container__301Kv.OpenTrades_openFullOpenTradesScreenButton__3SoWr > div > span")
      if(listOpen!=null)listOpen.click(); 
      await waitTime(300)
      let recentlistOpen=document.querySelector("#root > div > div.takeOverModal_container__3Q2sx.takeOverModal_show__1_XV9 > div.takeOverModal_content__1jzs0 > div.takeOverModal_body__5UGc6.OpenTradesModal_body__6GZz7 > div.OpenTradesModal_controls__1_ViY>div")
    
      if(recentlistOpen!=null)recentlistOpen.children[1].click();
      await waitTime(300)
      let recentArea=document.querySelector("#root > div > div.takeOverModal_container__3Q2sx.takeOverModal_show__1_XV9 > div.takeOverModal_content__1jzs0 > div.takeOverModal_body__5UGc6.OpenTradesModal_body__6GZz7 > div.TradesReportTable_container__HEHc3.OpenTradesModal_tableWrapper__2hiiI >div> div.Table_overflowYContentWrapper__3ZAeX > div > div.Table_bodyArea__1Qbjv > div.Table_scrollArea__23zTk >div > div")
      
      let recentAreaLists
    if(recentArea!=null){
        for(let i=0;i<30;i++){
          recentAreaLists=Array.prototype.slice.call(recentArea.children)
          if(recentAreaLists.length<=1){
            await waitTime(100)

          }  
          else break
        }
        console.log(recentAreaLists)
     
      let recentBox = [];

      recentAreaLists.forEach((el) => {
        recentBox.push({
          mode:(function(){
            let rate=el.querySelector("div>div.Table_cell__37-ZF> div  > div.TradesReportTable_optionInfo__2c94e")
            if(rate==null)return null
            else return rate.innerText
          })(),
          symbol:(function(){
            let symbolval=el
            if(symbolval==null || symbolval.innerText==null)return null
            if(symbolval.innerText.substr(0, 7).indexOf("GOLD")>-1)return symbolval.innerText.substr(0, 4);
            else return symbolval.innerText.substr(0, 7);
          })(),
          entryrate:(function(){
            let rate=el.querySelector("div>div.Table_cell__37-ZF.TradesReportTable_tradingStrike__9yQq3 > div > span")
           if(rate==null)return null
            else return rate.innerText
          })(),
          finishrate:(function(){
            let rate=el.querySelector("div>div.Table_cell__37-ZF.TradesReportTable_closeStrike__3MRjJ > div ")
            if(rate==null)return null
            else return rate.innerText
          })(),
          amount:(function(){
            let rate=el.querySelector("div>div.Table_cell__37-ZF.TradesReportTable_money__1_eq3  ")
            if(rate==null)return null
            else return rate.innerText
          })(),
          entrytime:(function(){
            let rate=el.querySelector("div>div.Table_cell__37-ZF.TradesReportTable_tradingTime__344iB")
            if(rate==null)return null
            else return rate.innerText
          })(),
          finishtime:(function(){
            let rate=el.querySelector("div>div.Table_cell__37-ZF.TradesReportTable_expiryTime__3wO1P")
            if(rate==null)return null
            else return rate.innerText
          })(),
          No:(function(){
            let rate=el.querySelector("div>div.Table_cell__37-ZF.TradesReportTable_tradeIdLabel__1DZGf")
            if(rate==null)return null
            else return rate.innerText
          })(),
          finishamount:(function(){
            let rate=el.querySelector("div>div.Table_cell__37-ZF.TradesReportTable_moneySecondaryCell__3Oquv>div")
            if(rate==null)return null
            else return rate.innerText
          })(),

        })  
      });  
    
      console.log(recentBox)

      if(keeplist.length>=2){
        if(keeplist!=recentBox){
          ipcRenderer.send('returnHistoryData', recentBox);
        }
      }
      else ipcRenderer.send('returnHistoryData', recentBox);
      keeplist=recentBox
    }

    
    let close=document.querySelector("#root > div > div.takeOverModal_container__3Q2sx.takeOverModal_show__1_XV9 > div.takeOverModal_content__1jzs0 > div.takeOverModal_header__Ht3GR > div > div > div")
    if(close!=null)close.click();

})    

//ログイン
ipcRenderer.on('StartLogin', async (event, data) =>  {
    inputLoginData(data)
})
//エントリー
ipcRenderer.on('EntrySend', async (event, data) =>  {
    console.log(data)
    try {
        //取引時間外表記の場合
        let timeout=document.querySelector("#root > div > div.App_tradingInterface__Kc3Cj > div.MarketClosed_marketClosed__1EgIi > div > div:nth-child(2) > div.MarketClosed_title__3bJvo")
        if(timeout!=null){
            if(timeout.innerText=="お取引時間外")throw new Error('Timeout');
        }
        
        //ワンクリックトレードON
        let OneClick=document.querySelector("#scroll_panel_1_content > div.App_tradeArea__1rrhJ > div > div.App_tradeForm__3vFhv > div > div.TradePanel_footer__37dl2 > div:nth-child(2)")
        if(OneClick!=null && OneClick.className.indexOf("false")>=0)OneClick.click()

        //左の取引が出てるかチェック
        let container=document.querySelector("#App_sideContainerContent__3UncR").children.length
        if(container==0){
        let button=document.querySelector("#TOOLTIP_ANCHOR_ID_OPEN_TRADES_TOGGLE")
        if(button)button.click();
        await waitTime(300)
        }
        //同時刻決済エントリー数チェック
        if(data.SameTimestop=="true" || data.SameTimestop==true){
            let histroydata=histroyDuration()
            let ShortPosi=0
            let MidlePosi=0
            let LongPosi=0
            let errorcom=false
            for(let i=0;i<histroydata.length;i++){
                switch(data.tradeBox) {
                    case"30s":
                    case "1m":
                    case "3m":
                    case "5m":  
                        break
                    case "15m5m":{
                        if(histroydata[i].countdoun<=360 && histroydata[i].countdoun>60 && histroydata[i].countdoun!=null){
                            ShortPosi++
                        }
                        if(data.SameTimestopNo<=ShortPosi){
                            errorcom=true
                        }
                        break
                    }
                    case "15m10m":{
                        if(histroydata[i].countdoun>360 && histroydata[i].countdoun<=660  && histroydata[i].countdoun!=null){
                        MidlePosi++
                        }
                        if(data.SameTimestopNo<=MidlePosi){
                        errorcom=true
                        }
                        break
                    }    
                    case "15m15m" :{
                        let nowTime = new Date()
                        let nowTimeMin = nowTime.getMinutes()
                        let nowTimeSec = nowTime.getSeconds()
                        let Minremainder=nowTimeMin % 5
                        if(Minremainder==4 || (Minremainder==0 && nowTimeSec<=20)){
                        if(histroydata[i].countdoun>540 && histroydata[i].countdoun<=900  && histroydata[i].countdoun!=null){
                            LongPosi++
                            }
                        }  
                        else{
                        if(histroydata[i].countdoun>660 && histroydata[i].countdoun<=900  && histroydata[i].countdoun!=null){
                            LongPosi++
                        }
                        }  
                        if(data.SameTimestopNo<=LongPosi){
                        errorcom=true
                        }
                        break
                    }  
                }  
            }  
            if(errorcom){
                throw new Error('PositionOver');
            }
        }
      //ゲームモードの選択
        if (data.game != 'NULL' || data.symbol=="GOLD") {
            selectGame(data.game);          
        }
        //通貨の選択
        if (data.symbol != 'NULL') {
            let symboltext
            for(let i=0;i<5;i++){
                symboltext=document.getElementsByClassName("OptionBrowser_assetFilter__26N3g Dropdown_container__Oet-c    Dropdown_searchable__128vn")
                if(symboltext!=null)break;
                await waitTime(100)
            }
            let symbolinnerText=symboltext[0].children[0].children[0].children[0].innerText
            let symbol=document.getElementById(data.symbol)
            
            let isLoaded2=false
            if (symbolinnerText!= data.symbol) {
                symbol.click()
                for (let i=0; i<30; i++) {
                    let loaded_groups = document.querySelector("#content_0 > div:nth-child(1)")
                    let loaded_groups2 = document.querySelector("#content_0 > div:nth-child(2)")
                    if(loaded_groups==null && loaded_groups2==null)isLoaded2=false
                    if(data.symbol=="GOLD"){
                        if(loaded_groups.innerText.indexOf(data.symbol)>-1)isLoaded2=true
                    }
                    else if(loaded_groups.innerText.indexOf(data.symbol)>-1 && loaded_groups2.innerText.indexOf(data.symbol)>-1) isLoaded2=true
                    
                    if(!isLoaded2){
                    await waitTime(100);
                    if(i==29)throw new Error('symbolOver');
                    }  
                    else break; 
                }  
            }
        }
      //カテゴリーの選択
        let category
        await waitTime(300);
        if (data.category != 'NULL') {
            for(let i=0;i<10;i++){
                try{ 
                    let durations = convertDuration(data)
                    let targetDurationName = "";
                    switch(data.tradeBox) {
                        case"30s":targetDurationName = "30秒";break;
                        case "1m":targetDurationName = "1分";break;
                        case "3m":targetDurationName = "3分";break;
                        case "5m":targetDurationName = "5分";break;
                        case "15m5m":case "15m10m":case "15m15m":targetDurationName = "15分";break;
                        case "1H": targetDurationName = "1時間"; break;
                        case "1D":targetDurationName = "23時間";break;
                    }
                    console.log(targetDurationName)
                    if (targetDurationName == "15分") {
                        let nowTime = new Date()
                        let nowTimeMin = nowTime.getMinutes()
                        let nowTimeSec = nowTime.getSeconds()
                        let Minremainder=nowTimeMin % 5
                        let lists = durations.filter(el=>el.duration==targetDurationName)
                        switch(data.tradeBox) {
                            case "15m5m":{
                                if(Minremainder==4 || Minremainder==0){
                                    let _max = lists.reduce((max,el) => max.countdown > el.countdown ? max:el)
                                    let _min = lists.reduce((min,el) => min.countdown < el.countdown ? min:el)
                                    let mid = lists.find(el=> {
                                    if (el!=_max && el!=_min) return el;
                                    })
                                    if(Minremainder==4 || (Minremainder==0 && nowTimeSec<=20) )mid.target.click();
                                    else _min.target.click();
                                }
                                else{
                                    let min = lists.reduce((min,el) => min.countdown < el.countdown ? min:el)
                                    min.target.click();
                                } 
                                break
                            }   
                            case "15m10m":{
                                if(Minremainder==4 || Minremainder==0 ){
                                    let _max = lists.reduce((max,el) => max.countdown > el.countdown ? max:el)
                                    let _min = lists.reduce((min,el) => min.countdown < el.countdown ? min:el)
                                    let mid = lists.find(el=> {
                                        if (el!=_max && el!=_min) return el;
                                    })
                                    if(Minremainder==4 || (Minremainder==0 && nowTimeSec<=20) )_max.target.click();
                                    else  mid.target.click();
                                }  
                                else{
                                    let _max = lists.reduce((max,el) => max.countdown > el.countdown ? max:el)
                                    let _min = lists.reduce((min,el) => min.countdown < el.countdown ? min:el)
                                    let mid = lists.find(el=> {
                                        if (el!=_max && el!=_min) return el;
                                    })
                                    mid.target.click();
                                } 
                                break
                            }  
                            case "15m15m":{
                                let max = lists.reduce((max,el) => max.countdown > el.countdown ? max:el)
                                max.target.click();
                                break
                            }   
                        }
                    } else if (targetDurationName == "23時間" ) {
                        const obj = durations.find(el=>(el.duration==targetDurationName 
                        || el.duration=="22時間"  || el.duration=="19時間"))
                        obj.target.click();
                    } else {
                        const obj = durations.find(el=>el.duration==targetDurationName)
                        obj.target.click();
                    }
                }catch(e){
                    await waitTime(100)
                    if(i==9){
                        category="error"
                    }
                }
            } 
        }
        if(category=="error")throw new Error('categoryOver');
        for (let i=0; i<30; i++) {
            if(!isLoaded(data)){
                await waitTime(100);
                if(i==29)throw new Error('categoryOver');
            }
            else break; 
        }  
        //金額の設定
        let checkAmount = document.getElementsByClassName('MoneyInputField_amount__6JeTs');
        let amountVal = checkAmount[0].value.replace(/,/g, '');
        if (data.amount != 'NULL' && amountVal.replace(/¥/g, '') != data.amount) {
            await inputAmount(data.amount, data.time)
        }
        checkAmount = document.getElementsByClassName('MoneyInputField_amount__6JeTs');
        amountVal = checkAmount[0].value.replace(/,/g, '');

        //金額入力のチェック
        if (amountVal.replace(/¥/g, '') != data.amount) {
            //読み込みが終了していない
            for (let i=0; i<20; i++) {
            await waitTime(100);
            checkAmount = document.getElementsByClassName('MoneyInputField_amount__6JeTs');
            amountVal = checkAmount[0].value.replace(/,/g, '');
            if (amountVal.replace(/¥/g, '') == data.amount)  break

            }
        }

        let objStrike
        for (let i=0; i<10; i++) {
          await waitTime(100);
          //チャート価格
          objStrike = document.querySelector("#scroll_panel_1_content > div.App_tradeArea__1rrhJ > div > div.App_chart__1TMEu > div.ChartInfo_chartInfo__2JqPK.ChartInfo_container__1N5nc.App_chartInfo__FBBmM > div.ChartInfo_optionAssetContainer__3bPBB > div")
          if(objStrike.children[1].innerText!=null)break;
        }
        let beforeStrke = objStrike.children[1].innerText;
         //差分計算
        let dig = 0.001;
        if (beforeStrke < 30.0) {
            dig = 0.00001;
        }
        if(data.symbol=="BTC/USD"){
            dig = 1;
        }
        else if(data.symbol=="ETH/USD"){
            dig = 0.1;
        }

        //-1が入ってくるときはスルー

        let beforeStrke2
        //リトライ処理
        console.log(Number(data.Retry_set))
        for(let i=0;i<=Number(data.Retry_set);i++){
            console.log("b")
            let objStrike2 = document.querySelector("#scroll_panel_1_content > div.App_tradeArea__1rrhJ > div > div.App_chart__1TMEu > div.ChartInfo_chartInfo__2JqPK.ChartInfo_container__1N5nc.App_chartInfo__FBBmM > div.ChartInfo_optionAssetContainer__3bPBB > div")
            beforeStrke2 = objStrike2.children[1].innerText;
            let retryflag=false;
            let entryclose=EntryClose({
                entrystop:data.entrystop,
                entrystoptime:data.entrystoptime,
            })
            if(entryclose==true){
                throw new Error('entryOver');
            }
            if(vuex.Advantrate_entry=="ON"){
                if(Number(data.late) >=0){
                    if(data.direction == 'LOW'){
                        if(Number(data.late)-Number(vuex.Advantrate_point)* dig>Number(beforeStrke2)){
                            throw new Error('adentry');
                        }
                    }
                    else if(data.direction == 'HIGH'){
                        if(Number(data.late)+Number(vuex.Advantrate_point)* dig<Number(beforeStrke2)){
                            throw new Error('adentry');
                        }
                    }
                }
            }
            //エントリー
            if ( data.direction != 'NULL') {
                if (data.direction == 'LOW') {
                        selectDirection(data.direction);
                } else if (data.direction == 'HIGH') {
                        selectDirection(data.direction);
        
                }
            }
            let breakflag=false;
            let breakflagbefor=false;
            const contracttext2=document.querySelector("#root > div > div.Toasts_container__3FULM.App_toasts__2BOdb")
            if(contracttext2.innerText.indexOf("連続した注文のため") > -1|| contracttext2.innerText.indexOf("激しい値動きのため") > -1){
                breakflagbefor=true;
            } 
            //エントリーの確認
            if(Number(data.Retry_set)!=0){
            for(let a=0;a<30;a++){
                entryclose=EntryClose({
                entrystop:data.entrystop,
                entrystoptime:data.entrystoptime,
                })
                if(entryclose==true){
                    throw new Error('entryOver');
                }
                let time1= categorytime({
                tradeBox: data.tradeBox,
                category: data.category,
                nextTimeRef: data.nextTimeRef,  
                });
                let histroydata=histroyDuration()
                for(let b=0;b<histroydata.length;b++){
                    let mode
                    switch(data.tradeBox) {
                        case"30s":
                            mode = "30秒";
                            if(histroydata[b].mode==mode && 
                            histroydata[b].symbol==data.symbol &&
                            histroydata[b].amount==data.amount){
                                retryflag=false;
                                break;
                            }  
                            else{
                                retryflag=true;
                                break;
                            }      
                        case "1m":
                            mode = "1分";
                            if(histroydata[b].mode==mode && 
                            histroydata[b].symbol==data.symbol &&
                            histroydata[b].amount==data.amount){
                                retryflag=false;
                                break;
                            }  
                            else{
                                retryflag=true;
                                break;
                            }  
                        case "3m":
                            mode = "3分";
                            if(histroydata[b].mode==mode && 
                                histroydata[b].symbol==data.symbol &&
                                histroydata[b].amount==data.amount){
                                retryflag=false;
                                break;
                            }  
                            else{
                                retryflag=true;
                                break;
                            }  
                        case "5m":
                            mode = "5分";
                            if(histroydata[b].mode==mode && 
                                histroydata[b].symbol==data.symbol &&
                                histroydata[b].amount==data.amount){
                                retryflag=false;
                                break;
                            }  
                            else{
                                retryflag=true;
                                break;
                            }  
                        case "15m5m":
                        case "15m10m":  
                        case "15m15m":
                            mode = "15分";
                            if(histroydata[b].mode==mode && 
                                histroydata[b].symbol==data.symbol &&
                                histroydata[b].amount==data.amount &&
                                Math.abs(histroydata[b].countdoun-(time1+60))<25){
                                retryflag=false;
                                break;
                            }  
                            else{
                                retryflag=true;
                                break;
                            }  
                        case "1H":
                            mode = "1時間";
                            if(histroydata[b].mode==mode && 
                                histroydata[b].symbol==data.symbol &&
                                histroydata[b].amount==data.amount &&
                                Math.abs(histroydata[b].countdoun-(time1+60))<25){
                                retryflag=false;
                                break;
                            }  
                            else{
                                retryflag=true;
                                break;
                            }  
                        case "1D":
                            mode = "23時間";
                            if((histroydata[b].mode==mode ||  histroydata[b].mode=="19時間"  ||  histroydata[b].mode=="22時間")&& 
                                histroydata[b].symbol==data.symbol &&
                                histroydata[b].amount==data.amount && 
                                Math.abs(histroydata[b].countdoun-(time1+960))<25){
                                retryflag=false;
                                break;
                            }  
                            else{
                                retryflag=true;
                                break;
                            }  
                    }
                    if(!retryflag)break;
                }
                const contracttext=document.querySelector("#root > div > div.Toasts_container__3FULM.App_toasts__2BOdb")
                if(contracttext!=null){
                    if( retryflag && (contracttext.innerText.indexOf("連続した注文") > -1|| contracttext.innerText.indexOf("激しい値動") > -1)){
                        breakflag=true;
                    }
                }  
                if(a==29){
                    throw new Error('entryfinishOver');
                }
                if(!retryflag && a==0)await waitTime(1000)
                if(!retryflag || (breakflag && !breakflagbefor))break;
                await waitTime(100)
            }
            }
            else{
                const contracttext3=document.querySelector("#root > div > div.Toasts_container__3FULM.App_toasts__2BOdb")
                if(contracttext3!=null){
                    if((contracttext3.innerText.indexOf("連続した注文") > -1|| contracttext3.innerText.indexOf("激しい値動き") > -1)){
                    throw new Error('contracterror');
                    }
                }  
            }
            if(breakflag)await waitTime(500);  
            if(!retryflag)break;
        }


        //オーダー終了

        let reData = {};
        reData.channel = 'getOrderFinish';
        reData.key = data.key;
        reData.orderTimeafter =getYYMMDDHHSSMM();
        //reData.entrylate=beforeStrke2;
        if(Number(data.Retry_set)==0)await waitTime(1000)
        ipcRenderer.send('getOrderFinish', reData);
    }catch(e){
        console.error(e)
        let reData = {};
      let date = new Date();
      if(e.message=="adentry"){
        reData.channel = 'getOrderNext';
        reData.key = data.key;
        reData.newkey = date.getTime();
        reData.orderTimeafter =getYYMMDDHHSSMM();
        ipcRenderer.send('getOrderNext', reData);
      }
      else{
        reData.channel = 'getOrderError';
        reData.key = data.key;
        reData.orderTimeafter =getYYMMDDHHSSMM();
        if(e.message=="entryOver")reData.errortext="時間オーバー"
        else if(e.message=="symbolOver")reData.errortext="通貨切替エラー"
        else if(e.message=="categoryOver")reData.errortext="満期切替エラー"
        else if(e.message=="entryfinishOver")reData.errortext="エントリー確認不可"
        else if(e.message=="spredOver")reData.errortext="レート乖離"
        else if(e.message=="PositionOver")reData.errortext="ポジション数オーバー"
        else if(e.message=="contracterror")reData.errortext="約定拒否"
        else if(e.message=="Timeout")reData.errortext="取引時間外"
        else reData.errortext="プログラムエラー:"+e.message

        ipcRenderer.send('getOrderError', reData);
      } 
    }    
})
async function inputLoginData(data) {
    await waitTime(1000);

    let selectID = document.querySelector("#login-username")
    await typingLikeManual(data.ID, selectID);

    await waitTime(1000);

    let selectPW = document.querySelector("#login-password")
    await typingLikeManual(data.password, selectPW);

    await waitTime(1000);

    let selectSubmit = document.getElementsByClassName("SubmitButton_submitButton__hCD5k");
    selectSubmit[0].click();
}
async function typingLikeManual(text, input) {

      let delay = 100;
      for (let i = 0, l = text.length; i < l; i++) {
        await new Promise((resolve) => {
            setTimeout(() => {
                if(i==0){
                    input.focus(()=>{
                    this.select()
                    })
                }    
                document.execCommand('insertText', false, text.charAt(i));
                resolve();
                
            }, delay);
        })
      }
      input.blur()
}
async function inputAmount(textPrice) {
        let price = String(textPrice)
        let target =document.getElementsByClassName('MoneyInputField_amount__6JeTs');
        target[0].value =""
     
        for (let i = 0; i < price.length; i++) {
            await new Promise((resolve) => {
                setTimeout(() => {
                  if(i==0){
                    target[0].focus(()=>{
                      this.select()
                    })
                  }  
                  document.execCommand('insertText', false, price.charAt(i));
                    resolve();
                }, 10);
            });
        }
        target[0].blur()
}
async function waitTime(setTime) {
    await new Promise((r) => setTimeout(r, setTime));
} 
async function selectGame(data) {
    const mode = [{
        Name : "HighLow",
        Elemment : "ChangingStrike0",
    },
    {
        Name : "HighLowS",
        Elemment : "FixedPayoutHL0",
    },
    {
        Name : "Turbo",
        Elemment : "ChangingStrikeOOD0",
    },
    {
        Name : "TurboS",
        Elemment : "FixedPayoutHLOOD0",
    }]
    let selectData = mode.filter(
      (item) => item.Name == data
    );
    //選択したいゲームの属性を取得
    let test = selectData[0].Elemment;
    let selectGame = document.getElementById(test);
      await selectGame.click();     
      await waitTime(200);
    return true;
}
function EntryClose(data){
    let nowTime = new Date()
    let nowTimeMin = nowTime.getMinutes()
    let nowTimeSec = nowTime.getSeconds()
    let Minremainder=nowTimeMin % 5

    if((data.entrystop=="true" || data.entrystop==true) && Minremainder==0 && nowTimeSec>Number(data.entrystoptime) && nowTimeSec<45){
      return true;
    }
    else return false;
}
async function selectDirection(data){
    if (data == 'HIGH') {
        console.log("a")
      document.getElementById("HIGH_TRADE_BUTTON").click();
      await waitTime(300);
    } else if(data == 'LOW'){
      document.getElementById("LOW_TRADE_BUTTON").click();
      await waitTime(300);
    }
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
async function histroyDuration(){
    let historyBoxArea = document.querySelector("#App_sideContainerContent__3UncR > div > div.OpenTrades_tradeActions__i0Y_V")
    if(historyBoxArea==null){
        let container=document.querySelector("#App_sideContainerContent__3UncR").children.length
        if(container==0){
        let button=document.querySelector("#TOOLTIP_ANCHOR_ID_OPEN_TRADES_TOGGLE")
        if(button)button.click();
        await waitTime(300)
       
        }
        historyBoxArea = document.querySelector("#App_sideContainerContent__3UncR > div > div.OpenTrades_tradeActions__i0Y_V")
    }
    historyBoxArea = document.querySelector("#App_sideContainerContent__3UncR > div > div.OpenTrades_tradeActions__i0Y_V").children[0].children[0]
    const historyBoxLists = Array.prototype.slice.call(historyBoxArea.children)
    let historyBox = [];
    historyBoxLists.forEach((el)=>{
      historyBox.push({
        symbol:(function(){
          let symbolval=el
          if(symbolval==null || symbolval.innerText==null)return null
          if(symbolval.innerText.substr(0, 7).indexOf("GOLD")>-1)return symbolval.innerText.substr(0, 4);
          else return symbolval.innerText.substr(0, 7);
        })(),  
        amount:(function() {
          let amountval=el.querySelector("div >div:nth-child(2) > div.OpenTradeItem_money__2BUz9 > div.OpenTradeItem_moneyInvestment__wQrKS")
          if(amountval==null || amountval.innerText==null)return null
          return amountval.innerText.replace(/¥/g, '').replace(/,/g, '');
        })(),
        countdoun:(function() {
          let countdounval=el.querySelector("div >div:nth-child(2) > div.OpenTradeItem_timeLeft__2xj8X > span")
          let flag=true
          let countdounval2
          if(countdounval==null || countdounval.innerText==null){
            countdounval2=document.querySelector(" div > div:nth-child(2) > div.OpenTradeItem_timeLeftLite__3GvKI")
            flag=false
          }  
          if(countdounval==null && countdounval2==null){
            return null
          }
          if(flag){ 
            if (countdounval.innerText.match(/:/)) {
              let countdownToSec = countdounval.innerText
                .split(':')
                .reverse()
                .map((el,i)=> {
                    if (i>0) return Number(el)*(60^i);
                    else     return Number(el)
                })
                .reduce((sum, val) =>  sum + val);
              return countdownToSec;
            } else {
              return Number(countdounval.innerText);
            }
          }
          else {
            let countdownTodate =countdounval2.innerText.split(/\n/);
            let countdownToMonth =countdownTodate[1].split(/月/);
            let countdownTohourmin =countdownTodate[0].split(/:/);
            let nowTime = new Date()
            let nowTimeyear = nowTime.getFullYear()
            let historytime=new Date(nowTimeyear,countdownToMonth[0]-1,countdownToMonth[1].replace(/[^0-9]/g, ''),countdownTohourmin[0],countdownTohourmin[1])
            let countdoun=Math.floor((historytime-nowTime)/1000)
            return countdoun
          }
          
        })(),
        mode:(function() {
          let modeval=el.querySelector("div > div:nth-child(2) > div:nth-child(1) > div.OpenTradeItem_optionInfo__2OuqH")
          if(modeval==null  || modeval.innerText==null)return null
          return modeval.innerText
        })(),
  
  
      })
    })
    return historyBox;
}
function convertDuration(data) {
    const tradeBoxArea = document.querySelector("div[class^='OptionBrowser_optionsHeightSpaceholder']");
    const tradeBoxLists = tradeBoxArea.querySelectorAll("div[class^='OptionItem_container__']");
    let tradeBox = [];
    tradeBoxLists.forEach((el) => {
        tradeBox.push({
            target: el,
            symbol: el.querySelector("span[class^='OptionItem_ticker__']").innerText,
            duration :el.querySelector("span[class^='OptionItem_duration__']").innerText,
            countdown : (function() {
                if(data.tradeBox=="30s" || data.tradeBox=="1m" || data.tradeBox=="3m" || data.tradeBox=="5m"){
                  return null;
                }  
                const _duration = el.querySelector("span[class^='OptionItem_timeLeft']").innerText;
                if (_duration.match(/:/)) {
                    const durationToSec = _duration
                        .split(':')
                        .reverse()
                        .map((el,i)=> {
                        
                            if (i==1) {
                              return Number(el)*(60);
                            }  
                            else if(i==2){
                              return Number(el)*(60*60);
                            }
                            else     return Number(el)
                        })
                        .reduce((sum, val) => {
                          
                          return sum + val
                          
                        });   
                       
                    return durationToSec;
                } else {
                    return Number(_duration);
                }
            })()
        })
    })
    return tradeBox;
  }
function isLoaded(data) {
    let loaded_groups = document.querySelector("#scroll_panel_1_content > div.App_tradeArea__1rrhJ > div > div.App_chart__1TMEu > div.ChartInfo_chartInfo__2JqPK.ChartInfo_container__1N5nc.App_chartInfo__FBBmM > div.ChartInfo_optionAssetContainer__3bPBB > div > div.ChartInfo_optionAssetName__1ZNif")
    let loaded_mode=document.querySelector("#scroll_panel_1_content > div.App_tradeArea__1rrhJ > div > div.App_chart__1TMEu > div.ChartInfo_chartInfo__2JqPK.ChartInfo_container__1N5nc.App_chartInfo__FBBmM > div.ChartInfo_chartLabel__1xt4H.ChartInfo_option__217I_ > div.ChartInfo_optionInfoValue__1mxxO")
    let loaded_time
    let loaded_spred
    let date=new Date()
    let nowTimeMin = date.getMinutes()
    let Minremainder=nowTimeMin % 5
    let Short_timestamp=new Date(Math.ceil(date.getTime()/1000/60/5)*1000*60*5)
    let Midle_timestamp=new Date(Math.ceil(date.getTime()/1000/60/5)*1000*60*5+300000)
    let Long_timestamp=new Date(Math.ceil(date.getTime()/1000/60/5)*1000*60*5+600000)
   
    if(data.game=="HighLow" || data.game=="HighLowSpread"){
      loaded_time=document.querySelector("#scroll_panel_1_content > div.App_tradeArea__1rrhJ > div > div.App_chart__1TMEu > div.ChartInfo_chartInfo__2JqPK.ChartInfo_container__1N5nc.App_chartInfo__FBBmM > div:nth-child(3) > div.ChartInfo_optionInfoValue__1mxxO")
    }else {
      loaded_time="a"
    }
    if(data.game=="HighLowSpread" ||  data.game=="HighLow"){
      loaded_spred=document.querySelector("#scroll_panel_1_content > div.App_tradeArea__1rrhJ > div > div.App_chart__1TMEu > div.ChartInfo_chartInfo__2JqPK.ChartInfo_container__1N5nc.App_chartInfo__FBBmM > div:nth-child(4) > div.ChartInfo_optionInfoLabel__2rAyk")  
    }else if(data.game=="TurboSpread" || data.game=="Turbo"){
      loaded_spred=document.querySelector("#scroll_panel_1_content > div.App_tradeArea__1rrhJ > div > div.App_chart__1TMEu > div.ChartInfo_chartInfo__2JqPK.ChartInfo_container__1N5nc.App_chartInfo__FBBmM > div:nth-child(3) > div.ChartInfo_optionInfoLabel__2rAyk")
    }
  
    if(loaded_groups==null)return false;
    if(loaded_mode==null)return false;
    if(loaded_time==null)return false;
    if((data.game=="HighLowSpread" || data.game=="TurboSpread") && loaded_spred==null)return false;
    let gametime
  
    if(data.tradeBox=="15m5m" || data.tradeBox=="15m10m" || data.tradeBox=="15m15m")gametime="15分"
    else if(data.tradeBox=="1H")gametime="1時間"
    else if(data.tradeBox=="1D")gametime="23時間"
    else if(data.tradeBox=="30s")gametime="30秒"
    else if(data.tradeBox=="1m")gametime="1分"
    else if(data.tradeBox=="3m")gametime="3分"
    else if(data.tradeBox=="5m")gametime="5分"
  
  
    if(loaded_groups.innerText.indexOf(data.symbol)>-1){
      switch(data.game){
        case "HighLow":
          if(loaded_spred==null){
            switch(data.tradeBox){
              case "15m5m":
                if(Minremainder==4){
                  if(loaded_time.innerText.indexOf(Midle_timestamp.getMinutes())>-1 && loaded_time.innerText.indexOf(Midle_timestamp.getHours())>-1)return true
                }  
                else {
                  
                  if(loaded_time.innerText.indexOf(Short_timestamp.getMinutes())>-1 && loaded_time.innerText.indexOf(Short_timestamp.getHours())>-1)return true
                }
                break;
              case "15m10m":
                if(Minremainder==4 ){
                  if(loaded_time.innerText.indexOf(Long_timestamp.getMinutes())>-1 && loaded_time.innerText.indexOf(Long_timestamp.getHours())>-1)return true
                }  
                else {
                  if(loaded_time.innerText.indexOf(Midle_timestamp.getMinutes())>-1 && loaded_time.innerText.indexOf(Midle_timestamp.getHours())>-1)return true
                }
                break;
              case "15m15m":
                if(loaded_time.innerText.indexOf(Long_timestamp.getMinutes())>-1 && loaded_time.innerText.indexOf(Long_timestamp.getHours())>-1)return true
                break;
              case "1H":return true
              case "1D":
                if(loaded_mode.innerText.indexOf(gametime)>-1 || loaded_mode.innerText.indexOf("19時間")>-1 || loaded_mode.innerText.indexOf("22時間")>-1){
                  return true
                }
                break;
            }
          }
          break
        case "Turbo":
          if(loaded_spred==null && loaded_mode.innerText.indexOf(gametime)>-1)return true
          break  
        case "HighLowSpread":
          if(loaded_spred.innerText=="スプレッド"){
            switch(data.tradeBox){
              case "15m5m":
                if(Minremainder==4){
                  if(loaded_time.innerText.indexOf(Midle_timestamp.getMinutes())>-1 && loaded_time.innerText.indexOf(Midle_timestamp.getHours())>-1)return true
                }  
                else {
                  if(loaded_time.innerText.indexOf(Short_timestamp.getMinutes())>-1 && loaded_time.innerText.indexOf(Short_timestamp.getHours())>-1)return true
                }
                break;
              case "15m10m":
                if(Minremainder==4 ){
                  if(loaded_time.innerText.indexOf(Long_timestamp.getMinutes())>-1 && loaded_time.innerText.indexOf(Long_timestamp.getHours())>-1)return true
                }  
                else {
                  if(loaded_time.innerText.indexOf(Midle_timestamp.getMinutes())>-1 && loaded_time.innerText.indexOf(Midle_timestamp.getHours())>-1)return true
                }
                break;
              case "15m15m":
                if(loaded_time.innerText.indexOf(Long_timestamp.getMinutes())>-1 && loaded_time.innerText.indexOf(Long_timestamp.getHours())>-1)return true
                break;
              case "1H":return true
              case "1D":
                if(loaded_mode.innerText.indexOf(gametime)>-1 || loaded_mode.innerText.indexOf("19時間")>-1 || loaded_mode.innerText.indexOf("22時間")>-1){
                  return true
                }
                break;
            }
          }
          break   
        case "TurboSpread":
          if(loaded_spred.innerText=="スプレッド" && loaded_mode.innerText.indexOf(gametime)>-1)return true
          break  
      }  
    }  
    return false;
}  
function categorytime(data){
    let durations = convertDuration(data)
     let targetDurationName = "";
      switch(data.tradeBox) {
         case"30s":targetDurationName = "30秒";break;
         case "1n":targetDurationName = "1分";break;
         case "3m":targetDurationName = "3分";break;
         case "5m":targetDurationName = "5分";break;
         case "15m5m":case "15m10m":case "15m15m":targetDurationName = "15分";break;    
         case "1H":targetDurationName = "1時間";break;
         case "1D":targetDurationName = "23時間";break;
      }
 
     if (targetDurationName == "15分") {
        let nowTime = new Date()
        let nowTimeMin = nowTime.getMinutes()
        let Minremainder=nowTimeMin % 5
        let  lists = durations.filter(el=>el.duration==targetDurationName)
    
         switch(data.tradeBox) {
             case "15m5m":
              if(Minremainder==4  || Minremainder==0){
                let _max = lists.reduce((max,el) => max.countdown > el.countdown ? max:el)
                let _min = lists.reduce((min,el) => min.countdown < el.countdown ? min:el)
                let mid = lists.find(el=> {
                    if (el!=_max && el!=_min) return el;
                })
                if(_min.countdown<=60)return mid.countdown
                else return _min.countdown
              }
              else{
                
                let min = lists.reduce((min,el) => min.countdown < el.countdown ? min:el)
                  return min.countdown
              }    
 
             case "15m10m":
              if(Minremainder==4  || Minremainder==0){
                let _max = lists.reduce((max,el) => max.countdown > el.countdown ? max:el)
                 let _min = lists.reduce((min,el) => min.countdown < el.countdown ? min:el)
                 let mid = lists.find(el=> {
                     if (el!=_max && el!=_min) return el;
                 })
                 if(_min.countdown<=60)return _max.countdown
                 else return mid.countdown
              }  
              else{
                 let _max = lists.reduce((max,el) => max.countdown > el.countdown ? max:el)
                 let _min = lists.reduce((min,el) => min.countdown < el.countdown ? min:el)
                 let mid = lists.find(el=> {
                     if (el!=_max && el!=_min) return el;
                 })
                 return mid.countdown
                } 

             case "15m15m":{
                let max = lists.reduce((max,el) => max.countdown > el.countdown ? max:el)
                 return max.countdown
             }
                 
         }
     } else if (targetDurationName == "23時間") {
         let max = durations.find(el=>(el.duration==targetDurationName || el.duration=="22時間" || el.duration=="19時間"))
          return max.countdown
     } else if (targetDurationName == "1時間") {
        const obj = durations.find(el=>el.duration==targetDurationName)
        return obj.countdown

     }  else {
         const obj = durations.find(el=>el.duration==targetDurationName)
         return obj.duration
     }
}