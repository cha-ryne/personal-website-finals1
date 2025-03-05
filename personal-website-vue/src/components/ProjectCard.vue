<template>
    <div class="project-card">
      <img :src="image" :alt="title" class="project-image">
      <div class="project-content">
        <h3>{{ title }}</h3>
        <p>{{ description }}</p>
        <div class="project-rating">
          <div class="stars">
            <font-awesome-icon 
              v-for="n in 5" 
              :key="`project${projectId}-star-${n}`"
              :icon="[n <= averageRating ? 'fas' : 'far', 'star']"
              @click="rateProject(n)" 
            />
          </div>
          <span class="rating-count">({{ ratingCount }} ratings)</span>
        </div>
        <a v-if="ratingCount > 0" href="#" class="show-comments" @click.prevent="showComments">
          Read reviews
        </a>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ProjectCard',
    props: {
      projectId: {
        type: Number,
        required: true
      },
      title: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      image: {
        type: String,
        required: true
      },
      link: {
        type: String,
        default: '#'
      },
      averageRating: {
        type: Number,
        default: 0
      },
      ratingCount: {
        type: Number,
        default: 0
      }
    },
    methods: {
      rateProject(rating) {
        this.$emit('rate', {
          projectId: this.projectId,
          rating: rating
        });
      },
      showComments() {
        this.$parent.showAllComments(this.projectId);
      }
    }
  }
  </script>