const CracoLessPlugin = require('craco-less');
const {getThemeVariables} = require('antd/dist/theme')
module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: {'@primary-color': '#0195ff', '@font-size-base': '16px'},
                        // modifyVars:getThemeVariables({
                        //     dark:true,
                        //     compact:false
                        // }),
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
};