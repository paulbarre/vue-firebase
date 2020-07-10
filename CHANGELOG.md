# Changelog

## 0.4.1

**Changes**

* Update dependencies
* Move `firebase` from dev dependencies to peer dependencies
* Update Documentation to explain how to run the example application

## 0.4.0

* Provide `getFromCache`, a custom method to `$firestore` equivalent to `docRef.get({ source: 'cache' })` but download data from server if no data in cache found

## 0.3.0

* Add `enablePersistence` parameter to Firestore to enable offline data

## 0.2.0

* Provide access to Firebase authentication to components with `$auth` property
* Provide to components `$logged` computed property to check if application is logged in

## 0.1.0

* Initial release