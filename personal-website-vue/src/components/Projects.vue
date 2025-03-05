<template>
    <section class="projects" id="projects">
      <h2><i class="fas fa-star"></i> My Projects</h2>
      <p>Check out my latest work and share your feedback!</p>
      
      <div class="projects-grid">
        <project-card
          v-for="(project, index) in projects"
          :key="index"
          :title="project.title"
          :description="project.description"
          :image="project.image"
          :tags="project.tags"
        />
      </div>
    </section>
  </template>
  
  <script>
  import ProjectCard from '@/components/ProjectCard.vue'
  
  export default {
    name: 'Projects',
    components: {
      ProjectCard
    },
    data() {
      return {
        projects: [
          {
            title: 'Personal Website',
            description: 'A responsive portfolio website built with Vue.js.',
            image: require('@/assets/images/proj1.png'),
            tags: ['Vue', 'CSS', 'JavaScript']
          },
          {
            title: 'UI Design',
            description: 'UI design project for a mobile application.',
            image: require('@/assets/images/proj2.png'),
            tags: ['UI/UX', 'Design', 'Figma']
          },
          {
            title: 'Web Game',
            description: 'A simple web-based game using JavaScript.',
            image: require('@/assets/images/proj3.png'),
            tags: ['JavaScript', 'HTML5', 'Game']
          }
        ]
      }
    }
  }
  </script>