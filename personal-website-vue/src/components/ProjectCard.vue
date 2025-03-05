<template>
    <div class="project-card">
      <img :src="image" :alt="title" class="project-image">
      <div class="project-content">
        <h3>{{ title }}</h3>
        <p>{{ description }}</p>
        <div class="project-tags">
          <span v-for="(tag, index) in tags" :key="index" class="tag">{{ tag }}</span>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ProjectCard',
    props: {
      title: String,
      description: String,
      image: String,
      tags: Array
    }
  }
  </script>