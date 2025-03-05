import axios from 'axios';

// Define the API base URL
const API_BASE_URL = 'https://charyn.pythonanywhere.com/api';

// Detect iPad Safari for special handling
const isIPadSafari = /iPad/.test(navigator.userAgent) || 
                    (/Macintosh/.test(navigator.userAgent) && 'ontouchend' in document);

// Create axios instance
const apiClient = axios.create({
  baseURL: isIPadSafari ? 'https://corsproxy.io/?https://charyn.pythonanywhere.com/api' : API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  timeout: 10000
});

export default {
  // Get all ratings
  getRatings() {
    return apiClient.get('/ratings');
  },
  
  // Submit a new rating
  postRating(ratingData) {
    return apiClient.post('/ratings', ratingData);
  }
};