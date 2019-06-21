module.exports = {
    chainWebpack: config => {
        config.externals({
            'firebase/app': 'firebase',
            'firebase/firestore': 'firestore'
        })
    }
}