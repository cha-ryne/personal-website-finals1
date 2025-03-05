<template>
    <footer>
      <div class="footer-content">
        <p>&copy; {{ currentYear }} Charijoy Cempron. All rights reserved.</p>
        <div class="social-links">
          <a href="https://www.linkedin.com/in/charijoy-cempron-0b6950281/" target="_blank">
            <i class="fab fa-linkedin"></i>
          </a>
        </div>
      </div>
    </footer>
  </template>
  
  <script>
  export default {
    name: 'Footer',
    computed: {
      currentYear() {
        return new Date().getFullYear()
      }
    }
  }
  </script>