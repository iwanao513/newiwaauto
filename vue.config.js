module.exports = { 
  publicPath: "/",
  pluginOptions: {
    electronBuilder: {
      preload: 'src/preload.js',
      nodeIntegration: true,
      builderOptions: {
        productName: "NewIwaAuto",
                appId: "com.NewIwaAuto",
                copyright: "Copyright © iwachan",
        win: {
          icon: "build/icon.png",
          target: [{
            target: 'nsis',
            arch: ['x64']
          }],
          
        },
      },
      nsis: {
        oneClick: true,
        allowToChangeInstallationDirectory: false
      }
    },
  },
  transpileDependencies: ["vuetify"],
  
  chainWebpack: (config) => {
    config.plugins.delete("prefetch");
  },
  css: {
    extract: true,
  },
};
