<template>
    <v-container fluid class="down-top-padding">
        <BaseBreadcrumb :title="page.title" :icon="page.icon" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
        <v-row>
            <v-col cols="12" sm="12" lg="12">
              <BaseCard heading="ユーザー情報">
                <v-row>
                  <v-col cols="12" sm="12" lg="12">
                    <UserID_input></UserID_input>
                  </v-col>  
                  <v-col cols="12" sm="12" lg="12">
                    <UserPassword_input></UserPassword_input>
                  </v-col>  
                </v-row>  
                
              </BaseCard>
            </v-col>
            <v-col cols="6" sm="6" lg="6">
              <Start_Login></Start_Login>
            </v-col>
            <v-col cols="6" sm="6" lg="6">
              <Start_Demo></Start_Demo>
            </v-col>
            
        </v-row>
    </v-container>
</template>

<script>

export default {
  name: "Home",

  data: () => ({
      page: {
        title: "Home"
      },
      breadcrumbs: [
        {
          text: "Home",
          disabled: true
        }
      ]
  }),
  components: {
    Start_Login: () => import('@/views/home/compornents/Start_Login'),
    Start_Demo: () => import('@/views/home/compornents/Start_Demo'),
    UserID_input: () => import('@/views/home/compornents/UserID_input'),
    UserPassword_input: () => import('@/views/home/compornents/UserPassword_input'),
  }
};

</script>