import Vue from 'vue';
import VueRouter from 'vue-router';
import { firestorePlugin } from 'vuefire';

import App from './App.vue';
import Login from './pages/Login';

Vue.use(firestorePlugin)

Vue.use(VueRouter);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router: new VueRouter({
    mode: 'history',
    routes: [
      { path: '', component: Login },
    ]
  })
}).$mount('#app');
