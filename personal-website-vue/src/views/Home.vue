<template>
    <div class="container">
      <main>
        <Hero />
        <Education />
        <Skills />
        <Gallery />
        <div class="two-column">
          <Hobbies />
          <div class="goals" id="goals">
            <h2><i class="fas fa-heart"></i> Life Goals</h2>
            <ul class="goals-list">
              <li>Have successful businesses</li>
              <li>Be a model at least once</li>
              <li>Master a musical instrument</li>
              <li>Retire early</li>
              <li>Find my purpose</li>
              <li>Master a sport</li>
              <li>Fitness and health journey</li>
            </ul>
          </div>
        </div>
        <Projects />
        <Resources />
      </main>
    </div>
  </template>
  
  <script>
  import Hero from '@/components/Hero.vue'
  import Education from '@/components/Education.vue'
  import Skills from '@/components/Skills.vue'
  import Gallery from '@/components/Gallery.vue'
  import Hobbies from '@/components/Hobbies.vue'
  import Projects from '@/components/Projects.vue'
  import Resources from '@/components/Resources.vue'
  
  export default {
    name: 'Home',
    components: {
      Hero,
      Education,
      Skills,
      Gallery,
      Hobbies,
      Projects,
      Resources
    }
  }
  </script>