<template>
    <section class="resources" id="resources">
      <h2><font-awesome-icon :icon="['fas', 'link']" /> Useful Links</h2>
      <div class="resources-grid">
        <a href="https://blog.pixelfreestudio.com/using-css-grid-and-flexbox-together-best-practices/" class="resource-link" target="_blank">
          <font-awesome-icon :icon="['fas', 'th']" />
          <span>Flexbox and CSS grid</span>
        </a>
        <a href="https://www.w3schools.com/tags/tag_button.asp" class="resource-link" target="_blank">
          <font-awesome-icon :icon="['fas', 'square']" />
          <span>Buttons</span>
        </a>
        <a href="https://vuejsexamples.com/responsive-gallery-component-for-vuejs/" class="resource-link" target="_blank">
          <font-awesome-icon :icon="['fab', 'vuejs']" />
          <span>Vue Gallery</span>
        </a>
        <a href="https://surveyjs.io/form-library/examples/rating-scale/documentation" class="resource-link" target="_blank">
          <font-awesome-icon :icon="['fas', 'poll']" />
          <span>Vue Rating</span>
        </a>
      </div>
    </section>
  </template>
  
  <script>
  export default {
    name: 'Resources'
  }
  </script>