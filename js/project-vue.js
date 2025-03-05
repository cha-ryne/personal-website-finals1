document.addEventListener('DOMContentLoaded', function() {
  // Add this right after you define API_BASE_URL
  const isIPadSafari = /iPad/.test(navigator.userAgent) || 
  (/Macintosh/.test(navigator.userAgent) && 'ontouchend' in document);
  console.log("Is iPad Safari:", isIPadSafari);
  // API endpoint from your pythonanywhere site
  const API_BASE_URL = 'https://charyn.pythonanywhere.com/api';
  
  // Move userId definition and Vue initialization into a function
  function initializeApp() {
      // Generate a user ID for this session if one doesn't exist
      const userId = localStorage.getItem('ratingUserId') || 
        ('user_' + Math.random().toString(36).substring(2, 9));
      localStorage.setItem('ratingUserId', userId);
      
      console.log('Initializing Vue project component with userId:', userId);
      
      return new Vue({
        el: '#projects-app',
        template: '#projects-template',
        data: {
          projectRatings: {},
          selectedProject: null,
          selectedRating: 0,
          ratingComment: '',
          userId: userId, // Now userId is definitely defined before use
          showRatingModal: false,
          showCommentsModal: false,
          isLoading: true,
          errorMessage: ''
        },
        created() {
          console.log('Vue component created');
          this.fetchRatings();
        },
      methods: {
        // API Calls
        async fetchRatings() {
          console.log('Fetching ratings from API');
          this.isLoading = true;
          this.errorMessage = '';
          
          try {
            let data;
            
            if (isIPadSafari) {
              // Use XMLHttpRequest with CORS proxy for iPad Safari
              console.log('Using XMLHttpRequest with CORS proxy for fetching ratings (iPad compatibility)');
              
              data = await new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                const timeout = setTimeout(() => {
                  xhr.abort();
                  reject(new Error('Request timed out'));
                }, 10000);
                
                // Changed URL to use the proxy
                xhr.open('GET', 'https://corsproxy.io/?https://charyn.pythonanywhere.com/api/ratings', true);
                xhr.setRequestHeader('Accept', 'application/json');
                
                // Rest of your existing code remains the same
                xhr.onload = () => {
                  clearTimeout(timeout);
                  if (xhr.status >= 200 && xhr.status < 300) {
                    try {
                      const responseData = JSON.parse(xhr.responseText);
                      resolve(responseData);
                    } catch (e) {
                      reject(new Error('Invalid JSON response'));
                    }
                  } else {
                    reject(new Error(`Server returned ${xhr.status}`));
                  }
                };
                
                xhr.onerror = () => {
                  clearTimeout(timeout);
                  reject(new Error('Network request failed'));
                };
                
                xhr.send();
              });
              
              console.log('Got API response via XMLHttpRequest:', data);
            } else {
              // Use fetch for modern browsers
              const response = await fetch(`${API_BASE_URL}/ratings`);
              
              // Check for HTTP errors
              if (!response.ok) {
                throw new Error(`Server returned ${response.status}`);
              }
              
              data = await response.json();
              console.log('API response via fetch:', data);
            }
            
            // Group ratings by project ID
            const ratings = {};
            data.forEach(rating => {
              const projectId = parseInt(rating.project_id);
              if (!ratings[projectId]) {
                ratings[projectId] = [];
              }
              ratings[projectId].push(rating);
            });
            
            this.projectRatings = ratings;
            console.log('Ratings grouped by project:', this.projectRatings);
          } catch (error) {
            console.error('Error fetching ratings:', error);
            this.errorMessage = 'Unable to load ratings. Please try again later.';
          } finally {
            this.isLoading = false;
          }
        },
        
        async submitRating() {
          if (!this.selectedRating) {
            alert('Please select a rating by clicking on the stars');
            return;
          }
          
          console.log(`Submitting rating ${this.selectedRating} for project ${this.selectedProject}`);
          this.isLoading = true;
          
          try {
            const ratingData = {
              project_id: this.selectedProject,
              user_id: this.userId,
              stars: this.selectedRating,
              comment: this.ratingComment
            };
            
            console.log('Rating data:', ratingData);
            
            // Check if it's likely an iPad Safari browser
            const isIPadSafari = /iPad/.test(navigator.userAgent) || 
                                 (/Macintosh/.test(navigator.userAgent) && 'ontouchend' in document);
            
            if (isIPadSafari) {
             // Use old XMLHttpRequest API with CORS proxy for iPad Safari
             console.log('Using XMLHttpRequest with CORS proxy for iPad Safari compatibility');
  
             return new Promise((resolve, reject) => {
             const xhr = new XMLHttpRequest();
             const timeout = setTimeout(() => {
               xhr.abort();
               reject(new Error('Request timed out'));
             }, 10000);
    
              // Changed URL to use the proxy
             xhr.open('POST', 'https://corsproxy.io/?https://charyn.pythonanywhere.com/api/ratings', true);
             xhr.setRequestHeader('Content-Type', 'application/json');
             xhr.setRequestHeader('Accept', 'application/json');
                xhr.onload = () => {
                  clearTimeout(timeout);
                  if (xhr.status >= 200 && xhr.status < 300) {
                    const data = JSON.parse(xhr.responseText);
                    console.log('Rating submitted successfully:', data);
                    this.fetchRatings();
                    this.closeRatingModal();
                    alert('Thank you for your feedback!');
                    resolve(data);
                  } else {
                    reject(new Error(`Server error: ${xhr.status} ${xhr.statusText}`));
                  }
                };
                
                xhr.onerror = () => {
                  clearTimeout(timeout);
                  reject(new Error('Network request failed'));
                };
                
                xhr.send(JSON.stringify(ratingData));
              });
            } else {
              // Use fetch for modern browsers (existing code)
              const fetchOptions = {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'omit',
                headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
                },
                redirect: 'follow',
                body: JSON.stringify(ratingData)
              };
              
              const timeoutPromise = new Promise((_, reject) => 
                setTimeout(() => reject(new Error('Request timed out')), 10000)
              );
              
              const response = await Promise.race([
                fetch(`${API_BASE_URL}/ratings`, fetchOptions),
                timeoutPromise
              ]);
              
              if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Server error: ${response.status} ${errorText}`);
              }
              
              const data = await response.json();
              console.log('Rating submitted successfully:', data);
              
              await this.fetchRatings();
              this.closeRatingModal();
              alert('Thank you for your feedback!');
            }
          } catch (error) {
            console.error('Error submitting rating:', error);
            let errorMessage = error.message;
            if (error.message === 'Failed to fetch' || error.message.includes('load failed')) {
              errorMessage = 'Network request failed. Please try again later.';
            }
            alert(`Failed to submit rating: ${errorMessage}`);
          } finally {
            this.isLoading = false;
          }
        },
        
        // UI Interactions
        openRatingModal(projectId, stars) {
          console.log(`Opening rating modal for project ${projectId} with ${stars} stars`);
          this.selectedProject = parseInt(projectId);
          this.selectedRating = stars || 0;
          this.ratingComment = '';
          this.showRatingModal = true;
          
          // Force Vue to redraw the modal
          this.$forceUpdate();
          
          // Force the modal to display using vanilla JS
          setTimeout(() => {
            const modal = document.querySelector('.modal');
            if (modal) modal.style.display = 'flex';
          }, 0);
        },
        
        closeRatingModal() {
          this.showRatingModal = false;
          this.selectedProject = null;
          this.selectedRating = 0;
          this.ratingComment = '';
        },
        
        showAllComments(projectId) {
          this.selectedProject = parseInt(projectId);
          this.showCommentsModal = true;
          
          // Force the modal to display using vanilla JS
          setTimeout(() => {
            const modal = document.querySelector('.modal');
            if (modal) modal.style.display = 'flex';
          }, 0);
        },
        
        closeCommentsModal() {
          this.showCommentsModal = false;
          this.selectedProject = null;
        },
        
        // Helper Functions
        getAverageRating(projectId) {
          projectId = parseInt(projectId);
          if (!this.projectRatings[projectId] || this.projectRatings[projectId].length === 0) {
            return 0;
          }
          
          const totalStars = this.projectRatings[projectId].reduce((sum, rating) => sum + rating.stars, 0);
          return Math.round(totalStars / this.projectRatings[projectId].length);
        },
        
        commentsWithText(projectId) {
          projectId = parseInt(projectId);
          if (!this.projectRatings[projectId]) return [];
          
          return this.projectRatings[projectId].filter(
            rating => rating.comment && rating.comment.trim() !== ''
          );
        },
        
        getTopComments(projectId) {
          const comments = this.commentsWithText(projectId);
          
          // Sort by date (newest first)
          comments.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
          
          // Return top 3
          return comments.slice(0, 3);
        },
        
        getAllComments() {
          if (!this.selectedProject || !this.projectRatings[this.selectedProject]) {
            return [];
          }
          
          return this.commentsWithText(this.selectedProject)
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        },
        
        formatDate(dateString) {
          if (!dateString) return '';
          
          try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) return 'Invalid date';
            
            return date.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            });
          } catch (e) {
            console.error('Date formatting error:', e);
            return 'Date error';
          }
        }
      }
    });
  }

  const projectsApp = initializeApp();
    
    // Add CSS for modal styling
    const style = document.createElement('style');
    style.textContent = `
      .modal {
        display: none;
        position: fixed;
        z-index: 1000;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.8);
        justify-content: center;
        align-items: center;
      }
      
      .modal-content {
        background-color: #1a1a1a;
        border-radius: 10px;
        max-width: 500px;
        width: 90%;
        padding: 2rem;
        position: relative;
        border: 1px solid #333;
      }
      
      .close-modal {
        position: absolute;
        top: 1rem;
        right: 1rem;
        font-size: 1.5rem;
        cursor: pointer;
        color: #888;
      }
      
      textarea {
        width: 100%;
        min-height: 120px;
        background-color: rgba(255, 255, 255, 0.1);
        border: 1px solid #444;
        border-radius: 8px;
        padding: 0.8rem;
        color: #fff;
        font-family: inherit;
        resize: vertical;
        margin: 1rem 0;
      }
      
      .rating-btn {
        background-color: var(--primary-pink, #ff69b4);
        color: white;
        border: none;
        padding: 0.8rem 1.5rem;
        border-radius: 30px;
        cursor: pointer;
        float: right;
      }
    `;
    document.head.appendChild(style);
    
    console.log('Vue project component initialization complete');
  });