import Vue from 'vue';
import VueRouter from 'vue-router';

import App from './App.vue';
import Login from './pages/Login';
import NewAccount from './pages/NewAccount';
import Home from './pages/Home';

import * as firebase from 'firebase';

firebase.initializeApp({
  apiKey: "AIzaSyCJ6WCLQz1npFzHNMK6XRBc3oyJ-iQBE1U",
  authDomain: "xkcd-reader-6f9fc.firebaseapp.com",
  databaseURL: "https://xkcd-reader-6f9fc.firebaseio.com",
  projectId: "xkcd-reader-6f9fc",
  storageBucket: "xkcd-reader-6f9fc.appspot.com",
  messagingSenderId: "588693180118",
  appId: "1:588693180118:web:41094279ea0c3dfe9d8377"
});

Vue.use(VueRouter);

Vue.config.productionTip = false;

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/home', component: Home },
    { path: '/newAccount', component: NewAccount },
    { path: '', component: Login },
  ]
})

router.beforeEach((to, from, next) => {
  if (!firebase.auth().currentUser && to.path !== '/') {
    return next('/');
  }

  if (firebase.auth().currentUser && to.path === '/') {
    return next('/home');
  }

  return next();
})

new Vue({
  render: h => h(App),
  router: router,
}).$mount('#app');
