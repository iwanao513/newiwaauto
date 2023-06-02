module.exports = {
  

 
  orderList : [
  ],
  addList(data) {
      this.orderList.push(data);
  },
  removeList(key) {
      for (let index in this.orderList) {
          if (this.orderList[index].key == key) {
              this.orderList.splice(index, 1);
              return index;
          }
      }
      return -1;
  },
  changeList(key,newkey){
    for (let index in this.orderList) {
      if (this.orderList[index].key == key) {
        
          this.orderList[index].key = newkey
          return this.orderList[index];
      }
    }
    return -1
  },
  changeState(key, newState) {
      for (let index in this.orderList) {
          if (this.orderList[index].key == key) {
              this.orderList[index].state = newState;
              return this.orderList[index];
          }
      }
      return -1;
  },
  checkOrderTimeout() {
    let key = null

    if (this.orderList.length > 0) {
      //注文がある時
      console.log("Message: dataStore.checkOrderTimeout -> orderList is exists")
      //現在時刻
      let nowTime = new Date()

      for (let i=0; i<this.orderList.length; i++) {
        let val = this.orderList[i]
        let diff = nowTime - val.orderTime
        console.log("Message: dataStore.checkOrderTimeout -> orde time diff", diff, val.key)
        if (diff > 1 * 60 * 1000) {
          console.log("Message: dataStore.checkOrderTimeout -> order delete", val.key)
          return val.key
        }
      }
    }
    return key
  },
  /**
   * 注文可否判定
   * @returns bool 注文許可
   */
  checkOrderFlag() {
      let flagN = this.controlFlag.filter(item => item.Flag == false);
      if (flagN.length > 0) {
          return false;
      } else {
          return true;
      }
  },
  getStockOrderData() {
      //keyから一番古い注文を取得する
      let oldKey = Math.min.apply(null, this.orderList.map(item => item.key));
      for (let index in this.orderList) {
          if (this.orderList[index].key == oldKey) {
              return this.orderList[index];
          }
      }
      return -1;
  },

  mode : [
    {
        Name : "HighLow",
        RequestName : "HighLow",
        Element : "ChangingStrike",
        Text : "HighLow",
        TimeFrame : [
            {
                Name : "Short",
                Text : "短期",
                Element : "//*[@id='assetsCategoryFilterZoneRegion']/div/div[2]",
                Judge : [
                    {
                        Name : "Short",
                        Element : ""
                    },
                ],
            },
            {
                Name : "Mid",
                Text : "中期",
                Element : "//*[@id='assetsCategoryFilterZoneRegion']/div/div[2]",
                Judge : [
                    {
                        Name : "Mid",
                        Element : ""
                    },
                ],
            },
            {
                Name : "Long",
                Text : "長期",
                Element : "//*[@id='assetsCategoryFilterZoneRegion']/div/div[2]",
                Judge : [
                    {
                        Name : "Long",
                        Element : ""
                    },
                ],
            },
            {
                Name : "H1",
                Text : "1時間",
                Element : "//*[@id='assetsCategoryFilterZoneRegion']/div/div[3]",
                Judge : [
                    {
                        Name : "Hour",
                        Element : ""
                    }
                ]
            },
            {
                Name : "D1",
                Text : "23時間",
                Element : "//*[@id='assetsCategoryFilterZoneRegion']/div/div[4]",
                Judge : [
                    {
                        Name : "Day",
                        Element : ""
                    }
                ]
            }
        ],
        Symbol : [
            {
              Name : "AUD/JPY"
            },
            {
              Name : "AUD/USD"
            },
            {
              Name : "CAD/JPY"
            },
            {
              Name : "CHF/JPY"
            },
            {
              Name : "EUR/AUD"
            },
            {
              Name : "EUR/GBP"
            },
            {
              Name : "EUR/JPY"
            },
            {
              Name : "EUR/USD"
            },
            {
              Name : "GBP/AUD"
            },
            {
              Name : "GBP/JPY"
            },
            {
              Name : "GBP/USD"
            },
            {
              Name : "NZD/JPY"
            },
            {
              Name : "NZD/USD"
            },
            {
              Name : "USD/CAD"
            },
            {
              Name : "USD/CHF"
            },
            {
              Name : "USD/JPY"
            },
            {
              Name : "GOLD",
            },
            {
              Name : "BTC/JPY"
            },
            {
              Name : "BTC/USD"
            },
            {
              Name : "ETH/JPY"
            },
            {
              Name : "ETH/USD"
            },
        ]
    },
    {
        Name : "HighLowSpread",
        RequestName : "HighLowS",
        Element : "FixedPayoutHL",
        Text : "HighLowスプレッド",
        TimeFrame : [
            {
                Name : "Short",
                Text : "短期",
                Element : "//*[@id='assetsCategoryFilterZoneRegion']/div/div[2]",
                Judge : [
                    {
                        Name : "Short",
                        Element : ""
                    },
                ],
            },
            {
                Name : "Mid",
                Text : "中期",
                Element : "//*[@id='assetsCategoryFilterZoneRegion']/div/div[2]",
                Judge : [
                    {
                        Name : "Mid",
                        Element : ""
                    },
                ],
            },
            {
                Name : "Long",
                Text : "長期",
                Element : "//*[@id='assetsCategoryFilterZoneRegion']/div/div[2]",
                Judge : [
                    {
                        Name : "Long",
                        Element : ""
                    },
                ],
            },
            {
                Name : "H1",
                Text : "1時間",
                Element : "//*[@id='assetsCategoryFilterZoneRegion']/div/div[3]",
                Judge : [
                    {
                        Name : "Hour",
                        Element : ""
                    }
                ]
            },
            {
                Name : "D1",
                Text : "23時間",
                Element : "//*[@id='assetsCategoryFilterZoneRegion']/div/div[4]",
                Judge : [
                    {
                        Name : "Day",
                        Element : ""
                    }
                ]
            }
        ],
        Symbol : [
            {
              Name : "AUD/JPY"
            },
            {
              Name : "AUD/USD"
            },
            {
              Name : "CAD/JPY"
            },
            {
              Name : "CHF/JPY"
            },
            {
              Name : "EUR/AUD"
            },
            {
              Name : "EUR/GBP"
            },
            {
              Name : "EUR/JPY"
            },
            {
              Name : "EUR/USD"
            },
            {
              Name : "GBP/AUD"
            },
            {
              Name : "GBP/JPY"
            },
            {
              Name : "GBP/USD"
            },
            {
              Name : "NZD/JPY"
            },
            {
              Name : "NZD/USD"
            },
            {
              Name : "USD/CAD"
            },
            {
              Name : "USD/CHF"
            },
            {
              Name : "USD/JPY"
            },
            {
              Name : "GOLD",
            },
            {
              Name : "BTC/JPY"
            },
            {
              Name : "BTC/USD"
            },
            {
              Name : "ETH/JPY"
            },
            {
              Name : "ETH/USD"
            },
        ]
    },
    {
        Name : "Turbo",
        RequestName : "Turbo",
        Element : "ChangingStrikeOOD",
        Text : "Turbo",
        TimeFrame : [
            {
                Name : "S30",
                Text : "30秒",
                Element : "//*[@id='assetsCategoryFilterZoneRegion']/div/div[2]"
            },
            {
                Name : "M1",
                Text : "1分",
                Element : "//*[@id='assetsCategoryFilterZoneRegion']/div/div[3]"
            },
            {
                Name : "M3",
                Text : "3分",
                Element : "//*[@id='assetsCategoryFilterZoneRegion']/div/div[4]"
            },
            {
                Name : "M5",
                Text : "5分",
                Element : "//*[@id='assetsCategoryFilterZoneRegion']/div/div[5]"
            }
        ],
        Symbol : [
            {
              Name : "AUD/JPY"
            },
            {
              Name : "AUD/USD"
            },
            {
              Name : "EUR/JPY"
            },
            {
              Name : "EUR/USD"
            },
            {
              Name : "GBP/JPY"
            },
            {
              Name : "NZD/JPY"
            },
            {
              Name : "USD/JPY"
            },
            {
              Name : "BTC/JPY"
            },
            {
              Name : "ETH/JPY"
            },
            {
              Name : "BTC/USD"
            },
            {
              Name : "ETH/USD"
            },
        ]
    },
    {
        Name : "TurboSpread",
        RequestName : "TurboS",
        Element : "FixedPayoutHLOOD",
        Text : "Turboスプレッド",
        TimeFrame : [
            {
                Name : "S30",
                Text : "30秒",
                Element : "//*[@id='assetsCategoryFilterZoneRegion']/div/div[2]"
            },
            {
                Name : "M1",
                Text : "1分",
                Element : "//*[@id='assetsCategoryFilterZoneRegion']/div/div[3]"
            },
            {
                Name : "M3",
                Text : "3分",
                Element : "//*[@id='assetsCategoryFilterZoneRegion']/div/div[4]"
            },
            {
                Name : "M5",
                Text : "5分",
                Element : "//*[@id='assetsCategoryFilterZoneRegion']/div/div[5]"
            }
        ],
        Symbol : [
            {
              Name : "AUD/JPY"
            },
            {
              Name : "AUD/USD"
            },
            {
              Name : "EUR/JPY"
            },
            {
              Name : "EUR/USD"
            },
            {
              Name : "GBP/JPY"
            },
            {
              Name : "NZD/JPY"
            },
            {
              Name : "USD/JPY"
            },
            {
              Name : "BTC/JPY"
            },
            {
              Name : "ETH/JPY"
            },
            {
              Name : "BTC/USD"
            },
            {
              Name : "ETH/USD"
            },
        ]
    },
  ],
  

  direction : [
    {
        Name : "High",
        Element : "up_button"
    },
    {
        Name : "Low",
        Element : "down_button"
    },
    {
        Name : "APP",
        RequestName : "APP",
        Element : "NONE",
        TimeFrame : [
        ],
        Symbol : [
        ]
    },
    {
        Name : "NULL",
        RequestName : "NULL",
        Element : "NONE",
        TimeFrame : [
        ],
        Symbol : [
        ]
    },
],
}
