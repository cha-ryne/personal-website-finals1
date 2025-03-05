// src/store/modules/ratings.js
import api from '@/services/api';

export default {
  state: {
    projectRatings: {},
    userId: localStorage.getItem('ratingUserId') || 
      ('user_' + Math.random().toString(36).substring(2, 9))
  },
  mutations: {
    SET_RATINGS(state, ratings) {
      state.projectRatings = ratings;
    },
    SET_USER_ID(state, userId) {
      state.userId = userId;
      localStorage.setItem('ratingUserId', userId);
    }
  },
  actions: {
    async fetchRatings({ commit }) {
      try {
        const data = await api.fetchRatings();
        // Group ratings by project ID
        const ratings = {};
        data.forEach(rating => {
          const projectId = parseInt(rating.project_id);
          if (!ratings[projectId]) {
            ratings[projectId] = [];
          }
          ratings[projectId].push(rating);
        });
        
        commit('SET_RATINGS', ratings);
      } catch (error) {
        console.error('Error fetching ratings:', error);
        throw error;
      }
    },
    
    async submitRating({ state, dispatch }, ratingData) {
      try {
        const fullRatingData = {
          ...ratingData,
          user_id: state.userId
        };
        
        await api.submitRating(fullRatingData);
        await dispatch('fetchRatings');
        return true;
      } catch (error) {
        console.error('Error submitting rating:', error);
        throw error;
      }
    }
  },
  getters: {
    getAverageRating: (state) => (projectId) => {
      const ratings = state.projectRatings[projectId];
      if (!ratings || ratings.length === 0) return 0;
      
      const totalStars = ratings.reduce((sum, rating) => sum + rating.stars, 0);
      return Math.round(totalStars / ratings.length);
    },
    
    getComments: (state) => (projectId) => {
      const ratings = state.projectRatings[projectId];
      if (!ratings) return [];
      
      return ratings.filter(rating => rating.comment && rating.comment.trim() !== '');
    }
  }
};