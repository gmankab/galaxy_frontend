<template>
  <div id="app">
    <div class="counter">{{ counter }}</div> <!-- Счётчик -->
    <div class="background">
      <img class="planet" src="@/assets/planet/green.svg" alt="Green Planet" @click="incrementCounter" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  data() {
    return {
      counter: 0
    };
  },
  methods: {
    incrementCounter() {
      this.counter += 1;
    }
  }
});
</script>

<style scoped>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
}

#app {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url('@/assets/background/purple.svg');
  background-size: cover;
  background-repeat: no-repeat;
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.counter {
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 20px;
  font-weight: bold;
}

.planet {
  width: 200px;
  height: 200px;
  cursor: pointer;
}
</style>

