<template>
    <section class="skills" id="skills">
      <h2><font-awesome-icon :icon="['fas', 'laptop-code']" /> IT Experience</h2>
      <div class="skills-container">
        <div class="skill">
          <font-awesome-icon :icon="['fab', 'java']" />
          <p>Basic Java</p>
        </div>
        <div class="skill">
          <font-awesome-icon :icon="['fab', 'python']" />
          <p>Basic Python</p>
        </div>
        <div class="skill">
          <font-awesome-icon :icon="['fas', 'gamepad']" />
          <p>Codee Combat</p>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  export default {
    name: 'Skills'
  }
  </script>