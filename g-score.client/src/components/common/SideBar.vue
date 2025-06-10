<template>
  <div class="sidebar">
    <div class="menu">
      <h3>Menu</h3>
      <ul>
        <li v-for="item in items" :key="item.id" :class="{ active: isActive(item.route) }">
          <router-link :to="item.route">{{ item.name }}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();
function isActive(route: string): boolean {
  return route.toLowerCase() === route.toLowerCase();
}
const items = ref([
  { id: 1, name: 'Home', route: '/' },
  { id: 2, name: 'About', route: '/About' },
]);
</script>
<style scoped>
</style>