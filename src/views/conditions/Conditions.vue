<template>
    <v-container fluid class="down-top-padding">
    
        <BaseBreadcrumb :title="page.title" :icon="page.icon" :breadcrumbs="breadcrumbs">
        </BaseBreadcrumb>
      
        <v-row >
            <v-col cols="12" sm="12" lg="12">
              <BaseCard heading="エントリー設定">
                <v-list-item-subtitle class="text-wrap">
                 
                </v-list-item-subtitle>
                <v-row>
                  <v-col  cols="12" sm="4" lg="4">
                      <Fast_entry></Fast_entry>
                  </v-col>

                  <v-col  cols="12" sm="4" lg="4">
                      <Retry_set></Retry_set>
                  </v-col>
                  
                </v-row>    
                <v-row>
                  <v-col  cols="12" sm="4" lg="4">
                      <Entry_stop></Entry_stop>
                  </v-col>
                  <v-col  v-show="isEntry_stopSec" cols="12" sm="4" lg="4">
                      <Entry_stopSec></Entry_stopSec>
                  </v-col>
                </v-row>  
                <v-row>
                  <v-col  cols="12" sm="4" lg="4">
                      <Advantrate_entry></Advantrate_entry>
                  </v-col>
                  <v-col  v-show="isAdvantrate_entry" cols="12" sm="4" lg="4">
                      <Advantrate_point></Advantrate_point>
                  </v-col>
                </v-row> 
              </BaseCard>
            </v-col>
            

            <v-col cols="12" sm="12" lg="12">
              <BaseCard heading="アプリ側指定値">
                <v-row>
                  <v-col  cols="12" sm="4" lg="4">
                      <Entry_mode></Entry_mode>
                  </v-col>
                  <v-col v-show="isLogin_setMin" cols="12" sm="4" lg="4">
                      <Entry_time></Entry_time>
                  </v-col>
                  <v-col v-show="isLogin_setMin" cols="12" sm="4" lg="4">
                      <Entry_bet></Entry_bet>
                  </v-col>
                  
                </v-row>  
              </BaseCard>
            </v-col>
            <v-col cols="12" sm="12" lg="12">
              <v-expansion-panels multiple>
                <v-expansion-panel>
                  <v-expansion-panel-header>
                    注文時間設定
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <SelectionHour></SelectionHour>
                  </v-expansion-panel-content>
                </v-expansion-panel>  
                <v-expansion-panel>
                  <v-expansion-panel-header>
                    注文分設定
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <SelectionMin></SelectionMin>
                  </v-expansion-panel-content>
                </v-expansion-panel>  
              </v-expansion-panels>
              
            </v-col>

            
            
        </v-row>
    </v-container>
</template>

<script>

export default {
  name: "Conditions",

  data: () => ({
      page: {
        title: "エントリー条件設定"
      },
      breadcrumbs: [
        {
          text: "Home",
          disabled: false,
          to: '/'
        },
        {
          text: "Conditions",
          disabled: true
        }
      ]
  }),
  components: {
    SelectionMin: () => import('@/views/conditions/compornents/SelectionMin'),
    SelectionHour: () => import('@/views/conditions/compornents/SelectionHour'),
    Retry_set: () => import('@/views/conditions/compornents/Retry_set'),
    Fast_entry: () => import('@/views/conditions/compornents/Fast_entry'),
    Entry_stop: () => import('@/views/conditions/compornents/Entry_stop'),
    Entry_stopSec: () => import('@/views/conditions/compornents/Entry_stopSec'),

    Advantrate_entry: () => import('@/views/conditions/compornents/Advantrate_entry'),
    Advantrate_point: () => import('@/views/conditions/compornents/Advantrate_point'),
    Entry_mode: () => import('@/views/conditions/compornents/Entry_mode'),
    Entry_time: () => import('@/views/conditions/compornents/Entry_time'),
    Entry_bet: () => import('@/views/conditions/compornents/Entry_bet'),
  },
  computed:{
    isEntry_stopSec:{
      get(){
        if(this.$store.state.Entry_stop=="ON")return true
        else return false
      }
    },
    isLogin_setMin:{
      get(){
        if(this.$store.state.Login_set=="ON")return true
        else return false
      }
    },
    isAdvantrate_entry:{
      get(){
        if(this.$store.state.Advantrate_entry=="ON")return true
        else return false
      }
    }
  }
};

</script>