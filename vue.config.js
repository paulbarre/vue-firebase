module.exports = {
    chainWebpack: config => {
        config.externals({
            'firebase/app': 'firebase/app',
            'firebase/firestore': 'firebase/firestore'
        })
    }
}