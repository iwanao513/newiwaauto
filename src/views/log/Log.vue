<template>
    <v-container fluid class="down-top-padding">
        <BaseBreadcrumb :title="page.title" :icon="page.icon" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
        <v-row>
            <v-col cols="12" sm="12" lg="12">
              <BaseCard heading="エントリーログ">
                 
                 <entry_list></entry_list>
             </BaseCard>
            </v-col>

        </v-row>
    </v-container>
</template>

<script>

export default {
  name: "Log",

  data: () => ({
      page: {
        title: "Log"
      },
      breadcrumbs: [
        {
          text: "Log",
          disabled: true
        }
      ]
  }),
  components: {
    entry_list: () => import('@/views/log/compornents/entry_list'),
 
  }
};

</script>