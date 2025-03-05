<template>
    <main>
      <Hero />
      <Education />
      <Skills />
      <Gallery /> <!-- This will use your custom gallery -->
      <div class="two-column">
        <Hobbies />
        <Goals />
      </div>
      <Projects />
      <Resources />
    </main>
  </template>
  
  <script>
  import Hero from '@/components/Hero.vue';
  import Education from '@/components/Education.vue';
  import Skills from '@/components/Skills.vue';
  import Gallery from '@/components/Gallery.vue';
  import Hobbies from '@/components/Hobbies.vue';
  import Goals from '@/components/Goals.vue';
  import Projects from '@/components/Projects.vue';
  import Resources from '@/components/Resources.vue';
  
  export default {
    name: 'Home',
    components: {
      Hero,
      Education,
      Skills,
      Gallery,
      Hobbies,
      Goals,
      Projects,
      Resources
    }
  }
  </script>