<template>
    <section class="resources" id="resources">
      <h2><i class="fas fa-link"></i> Resources</h2>
      <div class="resources-grid">
        <a href="https://vuejs.org/" target="_blank" class="resource-card">
          <i class="fab fa-vuejs"></i>
          <h3>Vue.js</h3>
          <p>Official Vue.js documentation</p>
        </a>
        <a href="https://developer.mozilla.org/en-US/" target="_blank" class="resource-card">
          <i class="fab fa-firefox-browser"></i>
          <h3>MDN Web Docs</h3>
          <p>Web development resources</p>
        </a>
        <a href="https://css-tricks.com/" target="_blank" class="resource-card">
          <i class="fas fa-magic"></i>
          <h3>CSS Tricks</h3>
          <p>Useful CSS techniques</p>
        </a>
      </div>
    </section>
  </template>
  
  <script>
  export default {
    name: 'Resources'
  }
  </script>