<template>
  <section class="hero">
    <div class="hero-content">
      <img src="@/assets/images/sit.jpg" alt="Profile Photo" class="profile-image">
      <div class="hero-text">
        <h2>Charijoy Cempron</h2>
        <p class="subtitle">IT Student & Web Enthusiast</p>
        <p>Cha/ri, Kakay, Acerola</p>
        <p>Metro Manila, Philippines</p>
        <div class="social-links">
          <a href="https://www.linkedin.com/in/charijoy-cempron-0b6950281/" target="_blank">
            <font-awesome-icon :icon="['fab', 'linkedin']" /> LinkedIn
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Hero'
}
</script>