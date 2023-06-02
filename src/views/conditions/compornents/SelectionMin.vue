<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- SelectionControlsChkColors -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-list-item-subtitle class="text-wrap">
           注文を行う分を設定してください。
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
                    v-model="all5Mindone"
                    label="5分毎選択"
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
                    label="10"
                    value="10"
                    hide-details
                    ></v-checkbox>
                    <v-checkbox
                    v-model="ex4"
                    label="20"
                    value="20"
                    hide-details
                    ></v-checkbox>
                    <v-checkbox
                    v-model="ex4"
                    label="30"
                    value="30"
                    hide-details
                    ></v-checkbox>
                    <v-checkbox
                    v-model="ex4"
                    label="40"
                    value="40"
                    hide-details
                    ></v-checkbox>
                    <v-checkbox
                    v-model="ex4"
                    label="50"
                    value="50"
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
                    label="11"
                    value="11"
                    hide-details
                    ></v-checkbox>
                    <v-checkbox
                    v-model="ex4"
                    label="21"
                    value="21"
                    hide-details
                    ></v-checkbox>
                    <v-checkbox
                    v-model="ex4"
                    label="31"
                    value="31"
                    hide-details
                    ></v-checkbox>
                    <v-checkbox
                    v-model="ex4"
                    label="41"
                    value="41"
                    hide-details
                    ></v-checkbox>
                    <v-checkbox
                    v-model="ex4"
                    label="51"
                    value="51"
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
                    label="12"
                    value="12"
                    hide-details
                    ></v-checkbox>
                    <v-checkbox
                    v-model="ex4"
                    label="22"
                    value="22"
                    hide-details
                    ></v-checkbox>
                    <v-checkbox
                    v-model="ex4"
                    label="32"
                    value="32"
                    hide-details
                    ></v-checkbox>
                    <v-checkbox
                    v-model="ex4"
                    label="42"
                    value="42"
                    hide-details
                    ></v-checkbox>
                    <v-checkbox
                    v-model="ex4"
                    label="52"
                    value="52"
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
                    label="13"
                    value="13"
                    hide-details
                    ></v-checkbox>
                    <v-checkbox
                    v-model="ex4"
                    label="23"
                    value="23"
                    hide-details
                    ></v-checkbox>
                    <v-checkbox
                    v-model="ex4"
                    label="33"
                    value="33"
                    hide-details
                    ></v-checkbox>
                    <v-checkbox
                    v-model="ex4"
                    label="43"
                    value="43"
                    hide-details
                    ></v-checkbox>
                    <v-checkbox
                    v-model="ex4"
                    label="53"
                    value="53"
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
                    label="14"
                    value="14"
                    hide-details
                    ></v-checkbox>
                    <v-checkbox
                    v-model="ex4"
                    label="24"
                    value="24"
                    hide-details
                    ></v-checkbox>
                    <v-checkbox
                    v-model="ex4"
                    label="34"
                    value="34"
                    hide-details
                    ></v-checkbox>
                    <v-checkbox
                    v-model="ex4"
                    label="44"
                    value="44"
                    hide-details
                    ></v-checkbox>
                    <v-checkbox
                    v-model="ex4"
                    label="54"
                    value="54"
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
                    label="15"
                    value="15"
                    hide-details
                    ></v-checkbox>
                    <v-checkbox
                    v-model="ex4"
                    label="25"
                    value="25"
                    hide-details
                    ></v-checkbox>
                    <v-checkbox
                    v-model="ex4"
                    label="35"
                    value="35"
                    hide-details
                    ></v-checkbox>
                    <v-checkbox
                    v-model="ex4"
                    label="45"
                    value="45"
                    hide-details
                    ></v-checkbox>
                    <v-checkbox
                    v-model="ex4"
                    label="55"
                    value="55"
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
                    label="16"
                    value="16"
                    hide-details
                    ></v-checkbox>
                    <v-checkbox
                    v-model="ex4"
                    label="26"
                    value="26"
                    hide-details
                    ></v-checkbox>
                    <v-checkbox
                    v-model="ex4"
                    label="36"
                    value="36"
                    hide-details
                    ></v-checkbox>
                    <v-checkbox
                    v-model="ex4"
                    label="46"
                    value="46"
                    hide-details
                    ></v-checkbox>
                    <v-checkbox
                    v-model="ex4"
                    label="56"
                    value="56"
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
                    label="17"
                    value="17"
                    hide-details
                    ></v-checkbox>
                    <v-checkbox
                    v-model="ex4"
                    label="27"
                    value="27"
                    hide-details
                    ></v-checkbox>
                    <v-checkbox
                    v-model="ex4"
                    label="37"
                    value="37"
                    hide-details
                    ></v-checkbox>
                    <v-checkbox
                    v-model="ex4"
                    label="47"
                    value="47"
                    hide-details
                    ></v-checkbox>
                    <v-checkbox
                    v-model="ex4"
                    label="57"
                    value="57"
                    hide-details
                    ></v-checkbox>
                </v-col>
                <v-col cols="12" sm="1" lg="1">
                    <v-checkbox
                    v-model="ex4"
                    label="8"
                    value="8"
                    hide-details
                    ></v-checkbox>
                    <v-checkbox
                    v-model="ex4"
                    label="18"
                    value="18"
                    hide-details
                    ></v-checkbox>
                    <v-checkbox
                    v-model="ex4"
                    label="28"
                    value="28"
                    hide-details
                    ></v-checkbox>
                    <v-checkbox
                    v-model="ex4"
                    label="38"
                    value="38"
                    hide-details
                    ></v-checkbox>
                    <v-checkbox
                    v-model="ex4"
                    label="48"
                    value="48"
                    hide-details
                    ></v-checkbox>
                    <v-checkbox
                    v-model="ex4"
                    label="58"
                    value="58"
                    hide-details
                    ></v-checkbox>
                </v-col>
                <v-col cols="12" sm="1" lg="1">
                    <v-checkbox
                    v-model="ex4"
                    label="9"
                    value="9"
                    hide-details
                    ></v-checkbox>
                    <v-checkbox
                    v-model="ex4"
                    label="19"
                    value="19"
                    hide-details
                    ></v-checkbox>
                    <v-checkbox
                    v-model="ex4"
                    label="29"
                    value="29"
                    hide-details
                    ></v-checkbox>
                    <v-checkbox
                    v-model="ex4"
                    label="39"
                    value="39"
                    hide-details
                    ></v-checkbox>
                    <v-checkbox
                    v-model="ex4"
                    label="49"
                    value="49"
                    hide-details
                    ></v-checkbox>
                    <v-checkbox
                    v-model="ex4"
                    label="59"
                    value="59"
                    hide-details
                    ></v-checkbox>
                </v-col>
                
                
                
                
            </v-row>

                
        </div>
    </div>
</template>

<script>
export default {
  name: "SelectionMin",

  data: () => ({
  }),
  computed:{
    ex4: {
        get () {
        return this.$store.state.Min
        },
        set (value) {
            this.$store.commit('UpdateMin', value)
        }
    },
    alldone:{
        get () {
        return this.$store.state.Minalldone
        },
        set (value) {
            let checkArray = [];
            //チェックが入った場合（trueでの判定）
            if (value) {
                for (let i = 0; i < 60; i++){
                    checkArray.push(String(i));
                } 
            }
            this.$store.commit('UpdateMin', checkArray)
        }
    },
    all5Mindone:{
        get () {
        return this.$store.state.Min5alldone
        },
        set (value) {
            let checkArray = this.ex4;
            let array=this.ex4;
            console.log(checkArray)
            //チェックが入った場合（trueでの判定）
            if (value) {
                for (let i = 0; i < 60; i++){
                    if(i%5==0 && array.indexOf(String(i))==-1)checkArray.push(String(i));
                } 
            }
            else {  
                checkArray =checkArray.filter(function(item){
                    if(Number(item)%5==0 && array.indexOf(String(item))!=-1 ){
                        return false 
                    }   
                    else return true
                })
            }
            this.$store.commit('UpdateMin', checkArray)
        }
    }
  }
};
</script>