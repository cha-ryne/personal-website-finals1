// Create an isolated gallery style with unique namespace
const galleryStyle = document.createElement('style');
galleryStyle.textContent = `
/* Use a unique namespace for all gallery elements */
.my-isolated-gallery-container {
  /* Reset any inherited styles */
  all: initial;
  font-family: inherit;
  color: inherit;
}

.my-isolated-gallery-container * {
  box-sizing: border-box;
}

/* Grid layout - explicitly scoped */
.my-isolated-gallery-container .my-gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
  width: 100%;
}

/* Thumbnails */
.my-isolated-gallery-container .my-gallery-item {
  overflow: hidden;
  cursor: pointer;
  border-radius: 10px;
  height: 200px; /* Fixed height */
}

.my-isolated-gallery-container .my-gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
  border-radius: 10px;
}

.my-isolated-gallery-container .my-gallery-item:hover img {
  transform: scale(1.05);
}

/* Fullscreen overlay */
.my-isolated-gallery-container .my-gallery-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Large image */
.my-isolated-gallery-container .my-gallery-large-img {
  max-height: 80vh;
  max-width: 90vw;
  object-fit: contain;
  border-radius: 10px;
}

/* Controls */
.my-isolated-gallery-container .my-gallery-close {
  position: absolute;
  top: 20px;
  right: 20px;
  color: white;
  font-size: 30px;
  cursor: pointer;
}

.my-isolated-gallery-container .my-gallery-prev,
.my-isolated-gallery-container .my-gallery-next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  color: white;
  font-size: 30px;
  cursor: pointer;
  padding: 20px;
}

.my-isolated-gallery-container .my-gallery-prev { left: 20px; }
.my-isolated-gallery-container .my-gallery-next { right: 20px; }
`;

document.head.appendChild(galleryStyle);

// Create a completely isolated gallery implementation
new Vue({
  el: '#app',
  data: {
    images: [
      "images/gong.jpg",
      'images/Sakamoto.jpg',
      'images/bp.jpg',
      'images/Manga.jpg',
      'images/pirates.jpg',
      'https://preview.redd.it/new-wallpaper-for-my-pc-they-have-no-right-being-this-cool-v0-3l2k9lpytrcc1.jpeg?auto=webp&s=84fbc9925af40466495e023248afa37305b232fd',
      'images/Chman.jpg',
      "images/fish.jpg"
    ],
    currentIndex: 0,
    showGallery: false
  },
  methods: {
    openGallery(index) {
      this.currentIndex = index;
      this.showGallery = true;
      document.body.style.overflow = 'hidden';
    },
    closeGallery() {
      this.showGallery = false;
      document.body.style.overflow = '';
    },
    prevImage() {
      this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    },
    nextImage() {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    },
    handleKeydown(event) {
      if (!this.showGallery) return;
      
      if (event.key === 'ArrowLeft') {
        this.prevImage();
      } else if (event.key === 'ArrowRight') {
        this.nextImage();
      } else if (event.key === 'Escape') {
        this.closeGallery();
      }
    }
  },
  mounted() {
    window.addEventListener('keydown', this.handleKeydown);
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.handleKeydown);
  },
  template: `
    <div class="my-isolated-gallery-container">
      <!-- Image grid with unique class names -->
      <div class="my-gallery-grid">
        <div 
          v-for="(image, index) in images" 
          :key="index"
          class="my-gallery-item"
          @click="openGallery(index)"
        >
          <img :src="image" :alt="'Gallery image ' + (index + 1)" />
        </div>
      </div>
      
      <!-- Custom gallery overlay with unique class -->
      <div v-if="showGallery" class="my-gallery-overlay">
        <img :src="images[currentIndex]" class="my-gallery-large-img" />
        <div class="my-gallery-close" @click="closeGallery">×</div>
        <div class="my-gallery-prev" @click="prevImage">❮</div>
        <div class="my-gallery-next" @click="nextImage">❯</div>
      </div>
    </div>
  `
});