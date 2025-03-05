<template>
  <header :class="{ scrolled: isScrolled }">
    <div class="logo">
      <h1></h1>
    </div>
    <nav>
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/#skills">Skills</router-link></li>
        <li><router-link to="/#hobbies">Interests</router-link></li>
        <li><router-link to="/#resources">Resources</router-link></li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      isScrolled: false
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      this.isScrolled = window.scrollY > 50;
    }
  }
}
</script>