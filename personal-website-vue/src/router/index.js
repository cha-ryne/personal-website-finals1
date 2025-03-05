// src/store/index.js
import Vue from 'vue';
import Vuex from 'vuex';
import ratingsModule from './modules/ratings';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    ratings: ratingsModule
  }
});