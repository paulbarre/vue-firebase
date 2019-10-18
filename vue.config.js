module.exports = {
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            config.externals = {
                ...config.externals,
                'firebase/app': 'firebase/app',
                'firebase/firestore': 'firebase/firestore',
                'firebase/auth': 'firebase/auth'
            }
        }
    }
}