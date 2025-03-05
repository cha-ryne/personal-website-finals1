<template>
    <section class="gallery" id="gallery">
      <h2><i class="fas fa-images"></i> Gallery</h2>
      <div class="gallery-container">
        <img class="image" v-for="(image, i) in images" :key="i" :src="image" @click="onClick(i)" :alt="`Gallery Image ${i+1}`">
        <vue-gallery-slideshow v-if="showSlideshow" :images="images" :index="index" @close="closeSlideshow"></vue-gallery-slideshow>
      </div>
    </section>
  </template>
  
  <script>
  import VueGallerySlideshow from 'vue-gallery-slideshow'
  
  export default {
    name: 'Gallery',
    components: {
      VueGallerySlideshow
    },
    data() {
      return {
        images: [
          require('@/assets/images/proj1.png'),
          require('@/assets/images/proj2.png'),
          require('@/assets/images/proj3.png')
        ],
        showSlideshow: false,
        index: 0
      }
    },
    methods: {
      onClick(index) {
        this.index = index;
        this.showSlideshow = true;
      },
      closeSlideshow() {
        this.showSlideshow = false;
      }
    }
  }
  </script>