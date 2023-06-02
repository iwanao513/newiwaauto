<template>
    <v-col cols="12" sm="12" lg="12">
      <v-card>
      <v-card-title>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="検索"
          single-line
          hide-details
        >
      </v-text-field>
      <v-btn
        color="primary"
       
        small
        v-on:click="alldel"
      >
        all<v-icon>mdi-trash-can</v-icon>
      </v-btn>
      <v-btn
        color="primary"
        fab
        x-small
        v-on:click="downloadCSV"
      >
        <v-icon>mdi-tray-arrow-down</v-icon>
      </v-btn>
      </v-card-title>
        <v-data-table
        :search="search"
        :headers="headers"
        :items="indexedItems"
        :items-per-page="500"
        :footer-props="footerProps"
        multi-sort
        class="elevation-1"

      >
      <template v-slot[`item.actions`]="{ item }" >
        <v-icon small @click="deletePerson(item)" >
          mdi-delete
        </v-icon>
      </template>
      </v-data-table>
    </v-card>
    </v-col>   
</template>

<script>

export default {
  name: 'file_view',

  data: () => ({
    footerProps : {
        'items-per-page-options':[50,100,200,500,-1],
        'show-first-last-page': true,
        'show-current-page': true,
        'items-per-page-text':'1ページあたりの件数：',
        'items-per-page-all-text':'すべて',
        'page-text':'{0}-{1} 件目 / {2}件',
      },
    search: '',
    headers: [
        {
          text: 'No',
          align: 'start',
          sortable: true,
          value: 'No',
        },
        { text: 'エントリー状況', value: 'state', sortable: true  },
        { text: 'モード', value: 'game',  },
        { text: '通貨', value: 'symbol' , sortable: true },
        { text: "金額", value: "amount", sortable: true },
        { text: "ペイアウト金額", value: "getamount", },
        { text: "方向", value: "direction", sortable: true },
        { text: "受信時間", value: "orderTime",  },
        { text: "エントリー時間", value: "orderTimeafter", sortable: true  },
        { text: "判定時間", value: "finishTime",  },
        { text: "受信レート", value: "late",  },
        { text: "エントリーレート", value: "entrylate",  },
        { text: "判定レート", value: "finishlate",  },
        { text: "勝敗", value: "winlose",  },
        { text: "削除", value: "actions", sortable: false }
    ],
    

  }),
  computed:{
    
    indexedItems(){

       let data=[]
       let Logdata=this.$store.state.Logdata

       for(let i=Logdata.length-1;i>=0;i--){
        data.push({
          No:i,
          state:Logdata[i].state,
          game:Logdata[i].game+" "+Logdata[i].tradeBox,
          symbol:Logdata[i].symbol,
          amount:Logdata[i].amount,
          getamount:Logdata[i].getamount,
          direction:Logdata[i].direction,
          orderTime:Logdata[i].orderTime,
          orderTimeafter:Logdata[i].orderTimeafter,
          finishTime:Logdata[i].finishTime,
          late:Logdata[i].late,
          entrylate:Logdata[i].entrylate,
          finishlate:Logdata[i].finishlate,
          winlose:Logdata[i].winlose
        })
       }
       return data
    },
  },
  methods: {
    downloadCSV () {
      var csv = '\ufeff' + ',エントリー状況,モード,通貨,金額,ペイアウト金額,方向,受信時間,エントリー時間,判定時間,受信レート,エントリーレート,判定レート,勝敗\n'
      this.indexedItems.forEach(el => {
        var line = ','+el['state']+','+el['game']+','+el['symbol']+','+el['amount']+','+el['getamount']+
        ','+el['direction']+','+el['orderTime']+','+el['orderTimeafter']+','+el['finishTime']+','+el['late']+","+
        el['entrylate']+','+el['finishlate']+','+el['winlose']+'\n'
        csv += line
      })
      let blob = new Blob([csv], { type: 'text/csv' })
      let link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.download = 'エントリーログ.csv'
      link.click()
    },
    deletePerson(item) {
      let index=this.indexedItems.indexOf(item)
        this.$store.commit("DeleteLogData", 
              index,
            )  
    },
    alldel() {
        this.$store.commit("AllDeleteLogData", 
            )  
    },
  },
  mounted () {
    
      
    
  },  
  components:{
    
  },
  

};

</script>
<style>
 
  </style>