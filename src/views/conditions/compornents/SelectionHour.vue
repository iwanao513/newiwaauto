<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- SelectionControlsChkColors -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
           注文を行う時間を設定してください。
        </v-list-item-subtitle>
        <div class="mt-0">
            <v-row>
                <v-col cols="12" sm="3" lg="3">
                    <v-checkbox
                    v-model="alldone"
                    label="全て選択"
                    value="all"
                    hide-details
                    ></v-checkbox>
                </v-col>    
                <v-col cols="12" sm="3" lg="3">
                    <v-checkbox
                    v-model="allJapandone"
                    label="日本時間（9~15時）"
                    value="all"
                    hide-details
                    ></v-checkbox>
                </v-col>
                <v-col cols="12" sm="3" lg="3">
                    <v-checkbox
                    v-model="allRondondone"
                    label="ロンドン時間（16~25時）"
                    value="all"
                    hide-details
                    ></v-checkbox>
                </v-col>
                <v-col cols="12" sm="3" lg="3">
                    <v-checkbox
                    v-model="allNYdone"
                    label="ニューヨーク時間（21～6時）"
                    value="all"
                    hide-details
                    ></v-checkbox>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" sm="1" lg="1">
                    <v-checkbox
                    v-model="ex4"
                    label="0"
                    value="0"
                    hide-details
                    ></v-checkbox>
                    <v-checkbox
                    v-model="ex4"
                    label="8"
                    value="8"
                    hide-details
                    ></v-checkbox>
                    <v-checkbox
                    v-model="ex4"
                    label="16"
                    value="16"
                    hide-details
                    ></v-checkbox>

                </v-col>
                <v-col cols="12" sm="1" lg="1">
                    <v-checkbox
                    v-model="ex4"
                    label="1"
                    value="1"
                    hide-details
                    ></v-checkbox>
                    <v-checkbox
                    v-model="ex4"
                    label="9"
                    value="9"
                    hide-details
                    ></v-checkbox>
                    <v-checkbox
                    v-model="ex4"
                    label="17"
                    value="17"
                    hide-details
                    ></v-checkbox>

                </v-col>
                <v-col cols="12" sm="1" lg="1">
                    <v-checkbox
                    v-model="ex4"
                    label="2"
                    value="2"
                    hide-details
                    ></v-checkbox>
                    <v-checkbox
                    v-model="ex4"
                    label="10"
                    value="10"
                    hide-details
                    ></v-checkbox>
                    <v-checkbox
                    v-model="ex4"
                    label="18"
                    value="18"
                    hide-details
                    ></v-checkbox>
                </v-col>
                <v-col cols="12" sm="1" lg="1">
                    <v-checkbox
                    v-model="ex4"
                    label="3"
                    value="3"
                    hide-details
                    ></v-checkbox>
                    <v-checkbox
                    v-model="ex4"
                    label="11"
                    value="11"
                    hide-details
                    ></v-checkbox>
                    <v-checkbox
                    v-model="ex4"
                    label="19"
                    value="19"
                    hide-details
                    ></v-checkbox>
                </v-col>
                <v-col cols="12" sm="1" lg="1">
                    <v-checkbox
                    v-model="ex4"
                    label="4"
                    value="4"
                    hide-details
                    ></v-checkbox>
                    <v-checkbox
                    v-model="ex4"
                    label="12"
                    value="12"
                    hide-details
                    ></v-checkbox>
                    <v-checkbox
                    v-model="ex4"
                    label="20"
                    value="20"
                    hide-details
                    ></v-checkbox>
                </v-col>
                <v-col cols="12" sm="1" lg="1">
                    <v-checkbox
                    v-model="ex4"
                    label="5"
                    value="5"
                    hide-details
                    ></v-checkbox>
                    <v-checkbox
                    v-model="ex4"
                    label="13"
                    value="13"
                    hide-details
                    ></v-checkbox>
                    <v-checkbox
                    v-model="ex4"
                    label="21"
                    value="21"
                    hide-details
                    ></v-checkbox>
                </v-col>
                <v-col cols="12" sm="1" lg="1">
                    <v-checkbox
                    v-model="ex4"
                    label="6"
                    value="6"
                    hide-details
                    ></v-checkbox>
                    <v-checkbox
                    v-model="ex4"
                    label="14"
                    value="14"
                    hide-details
                    ></v-checkbox>
                    <v-checkbox
                    v-model="ex4"
                    label="22"
                    value="22"
                    hide-details
                    ></v-checkbox>
                </v-col>
                <v-col cols="12" sm="1" lg="1">
                    <v-checkbox
                    v-model="ex4"
                    label="7"
                    value="7"
                    hide-details
                    ></v-checkbox>
                    <v-checkbox
                    v-model="ex4"
                    label="15"
                    value="15"
                    hide-details
                    ></v-checkbox>
                    <v-checkbox
                    v-model="ex4"
                    label="23"
                    value="23"
                    hide-details
                    ></v-checkbox>
                </v-col>
                
                
                
            </v-row>

                
        </div>
    </div>
</template>

<script>
export default {
  name: "SelectionHour",

  data: () => ({
  }),
  computed:{
    ex4: {
        get () {
        return this.$store.state.Hour
        },
        set (value) {
        this.$store.commit('UpdateHour', value)
        }
    },
    alldone:{
        get () {
        return this.$store.state.Houralldone
        },
        set (value) {
            let checkArray = [];
            //チェックが入った場合（trueでの判定）
            if (value) {
                for (let i = 0; i <= 23; i++){
                checkArray.push(String(i));
                } 
            }
            this.$store.commit('UpdateHour', checkArray )
        }
    },
    allJapandone:{
        get () {
        return this.$store.state.HourJapanalldone
        },
        set (value) {
            let checkArray = this.ex4;
            let array=this.ex4;
            //チェックが入った場合（trueでの判定）
            if (value) {
                for (let i = 0; i <= 23; i++){
                  if((i>=9 && i<=15) && array.indexOf(String(i))==-1 )checkArray.push(String(i));
                } 
            }
            else {  
                checkArray =checkArray.filter(function(item){
                    if((item>=Number(9) && item<=Number(15)) && array.indexOf(String(item))!=-1 ){
                        return false 
                    }   
                    else return true
                })
            }
            this.$store.commit('UpdateHour', checkArray )
        }
    },
    allRondondone:{
        get () {
        return this.$store.state.HourRondonalldone
        },
        set (value) {
            let checkArray = this.ex4;
            let array=this.ex4;
            //チェックが入った場合（trueでの判定）
            if (value) {
                for (let i = 0; i <= 23; i++){
                  if((i<=2 || i>=16) && array.indexOf(String(i))==-1 )checkArray.push(String(i));
                } 
            }
            else {  
                checkArray =checkArray.filter(function(item){
                    if((item<=Number(2) || item>=Number(16)) && array.indexOf(String(item))!=-1 ){
                        return false 
                    }   
                    else return true
                })
            }
            this.$store.commit('UpdateHour', checkArray )
        }
    },
    allNYdone:{
        get () {
        return this.$store.state.HourNYalldone
        },
        set (value) {
            let checkArray = this.ex4;
            let array=this.ex4;
            //チェックが入った場合（trueでの判定）
            if (value) {
                for (let i = 0; i <= 23; i++){
                    if((i<=6 || i>=21) && array.indexOf(String(i))==-1 )checkArray.push(String(i));
                } 
            }
            else {  
                checkArray =checkArray.filter(function(item){
                    if((item<=Number(6) || item>=Number(21)) && array.indexOf(String(item))!=-1 ){
                        return false 
                    }   
                    else return true
                })
            }
            this.$store.commit('UpdateHour', checkArray )
        }
    }
  }
};
</script>