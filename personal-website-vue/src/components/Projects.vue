<template>
    <section class="projects" id="projects">
      <h2><font-awesome-icon :icon="['fas', 'star']" /> My Projects</h2>
      <p>Check out my latest work and share your feedback!</p>
      
      <div v-if="isLoading" class="loading">
        <p>Loading projects...</p>
      </div>
      
      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>
      
      <div class="projects-grid">
        <project-card
          v-for="project in projects"
          :key="project.id"
          :project-id="project.id"
          :title="project.title"
          :description="project.description"
          :image="project.image"
          :link="project.link"
          :average-rating="getAverageRating(project.id)"
          :rating-count="getRatingCount(project.id)"
          @rate="openRatingModal"
        />
      </div>
      
      <!-- Rating Modal -->
      <div v-if="showRatingModal" class="modal">
        <div class="modal-content">
          <span class="close-modal" @click="closeRatingModal">&times;</span>
          <h3>Rate This Project</h3>
          <div class="stars large">
            <font-awesome-icon 
              v-for="n in 5" 
              :key="`modal-star-${n}`"
              :class="{ 'selected': n <= selectedRating }"
              :icon="[n <= selectedRating ? 'fas' : 'far', 'star']"
              @click="selectedRating = n" 
            />
          </div>
          <textarea v-model="ratingComment" placeholder="Share your thoughts about this project (optional)"></textarea>
          <button class="rating-btn" @click="submitRating" :disabled="isLoading">
            {{ isLoading ? 'Submitting...' : 'Submit Rating' }}
          </button>
        </div>
      </div>
      
      <!-- Comments Modal -->
      <div v-if="showCommentsModal" class="modal">
        <div class="modal-content">
          <span class="close-modal" @click="closeCommentsModal">&times;</span>
          <h3>Reviews for {{ currentProjectTitle }}</h3>
          <div v-if="getAllComments().length === 0" class="no-comments">
            No reviews yet. Be the first to leave a review!
          </div>
          <div v-else class="comments-list">
            <div v-for="(comment, index) in getAllComments()" :key="index" class="comment">
              <div class="comment-header">
                <div class="stars">
                  <font-awesome-icon 
                    v-for="n in 5" 
                    :key="`comment-${index}-star-${n}`"
                    :icon="['fas', 'star']" 
                    :class="{ 'filled': n <= comment.stars }"
                  />
                </div>
                <span class="comment-date">{{ formatDate(comment.created_at) }}</span>
              </div>
              <p class="comment-text">{{ comment.comment }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  import ProjectCard from '@/components/ProjectCard.vue';
  import ApiService from '@/services/ApiService';
  
  export default {
    name: 'Projects',
    components: {
      ProjectCard
    },
    data() {
      return {
        projects: [
          {
            id: 1,
            title: 'Personal Website',
            description: 'A responsive personal website.',
            image: require('@/assets/images/proj1.png'),
            link: '/'
          },
          {
            id: 2,
            title: 'Ramquest',
            description: 'A mobile wireframe of Ramquest app.',
            image: require('@/assets/images/proj2.png'),
            link: 'https://www.figma.com/proto/tQESkzv4TdzWyUJZHTJjIK/RAMQUEST-MOBILE-VERSION'
          },
          {
            id: 3,
            title: 'Meneshu',
            description: 'A responsive restaurant website.',
            image: require('@/assets/images/proj3.png'),
            link: 'https://rheaanne.github.io/Meneshu/home/'
          }
        ],
        projectRatings: {},
        showRatingModal: false,
        showCommentsModal: false,
        selectedProject: null,
        selectedRating: 0,
        ratingComment: '',
        userId: null,
        isLoading: false,
        errorMessage: ''
      }
    },
    created() {
      // Generate a user ID for this session if one doesn't exist
      this.userId = localStorage.getItem('ratingUserId') || 
        ('user_' + Math.random().toString(36).substring(2, 9));
      localStorage.setItem('ratingUserId', this.userId);
      
      // Fetch ratings when component is created
      this.fetchRatings();
    },
    computed: {
      currentProjectTitle() {
        if (!this.selectedProject) return '';
        const project = this.projects.find(p => p.id === this.selectedProject);
        return project ? project.title : '';
      }
    },
    methods: {
      async fetchRatings() {
        this.isLoading = true;
        this.errorMessage = '';
        
        try {
          const response = await ApiService.getRatings();
          
          // Group ratings by project ID
          const ratings = {};
          response.data.forEach(rating => {
            const projectId = parseInt(rating.project_id);
            if (!ratings[projectId]) {
              ratings[projectId] = [];
            }
            ratings[projectId].push(rating);
          });
          
          this.projectRatings = ratings;
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
        
        this.isLoading = true;
        
        try {
          const ratingData = {
            project_id: this.selectedProject,
            user_id: this.userId,
            stars: this.selectedRating,
            comment: this.ratingComment
          };
          
          await ApiService.postRating(ratingData);
          
          await this.fetchRatings();
          this.closeRatingModal();
          alert('Thank you for your feedback!');
        } catch (error) {
          console.error('Error submitting rating:', error);
          alert('Failed to submit rating. Please try again later.');
        } finally {
          this.isLoading = false;
        }
      },
      
      openRatingModal(data) {
        this.selectedProject = data.projectId;
        this.selectedRating = data.rating;
        this.ratingComment = '';
        this.showRatingModal = true;
      },
      
      closeRatingModal() {
        this.showRatingModal = false;
      },
      
      showAllComments(projectId) {
        this.selectedProject = projectId;
        this.showCommentsModal = true;
      },
      
      closeCommentsModal() {
        this.showCommentsModal = false;
      },
      
      getAverageRating(projectId) {
        projectId = parseInt(projectId);
        if (!this.projectRatings[projectId] || this.projectRatings[projectId].length === 0) {
          return 0;
        }
        
        const totalStars = this.projectRatings[projectId].reduce((sum, rating) => sum + rating.stars, 0);
        return Math.round(totalStars / this.projectRatings[projectId].length);
      },
      
      getRatingCount(projectId) {
        projectId = parseInt(projectId);
        if (!this.projectRatings[projectId]) {
          return 0;
        }
        return this.projectRatings[projectId].length;
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
  }
  </script>
  
  <style scoped>
  .modal {
    display: flex;
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
    background-color: var(--primary-pink);
    color: white;
    border: none;
    padding: 0.8rem 1.5rem;
    border-radius: 30px;
    cursor: pointer;
    float: right;
  }
  
  .rating-btn:disabled {
    background-color: #666;
    cursor: not-allowed;
  }
  </style>