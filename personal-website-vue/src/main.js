// src/main.js
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faLinkedin, faVuejs, faJava, faPython } from '@fortawesome/free-brands-svg-icons';
import { faGraduationCap, faLaptopCode, faImages, faHeart, faStar, faLink, faTh, faSquare, faPoll } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// Add FontAwesome icons
library.add(
  faLinkedin, faVuejs, faJava, faPython,
  faGraduationCap, faLaptopCode, faImages, faHeart, faStar, faLink, faTh, faSquare, faPoll
);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');