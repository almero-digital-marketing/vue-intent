<template>
  <div class="app">

  </div>
</template>
<script setup>
import { ref } from 'vue'
import Carousel from './components/Carousel.vue'
import Slide from './components/Slide.vue'

const active = ref(0)
</script>

<style>
body {
  margin: 0;
}
* {
  box-sizing: border-box;
}
</style>
