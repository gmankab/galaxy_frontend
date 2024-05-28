<template>
  <div id="app">
    <div class="background">
      <img class="planet" src="@/assets/planet/green.svg" alt="Green Planet" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'App'
});
</script>

<style scoped>
#app {
  height: 98vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url('@/assets/background/purple.svg');
  background-size: cover;
  background-repeat: no-repeat;
  overflow: hidden;
}

.planet {
  width: 200px;
  height: 200px;
}

</style>

