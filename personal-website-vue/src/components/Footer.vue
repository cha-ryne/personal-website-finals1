<template>
    <footer>
      <div class="footer-content">
        <p>&copy; {{ currentYear }} Charijoy Cempron</p>
        <div class="footer-links">
          <router-link to="/#education">Education</router-link>
          <router-link to="/#projects">Projects</router-link>
        </div>
      </div>
    </footer>
  </template>
  
  <script>
  export default {
    name: 'Footer',
    computed: {
      currentYear() {
        return new Date().getFullYear();
      }
    }
  }
  </script>