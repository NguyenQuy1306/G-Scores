<template>
  <div :class="['stat-card', colorClass]">
    <div class="stat-icon">{{ icon }}</div>
    <div class="stat-info">
      <h3>{{ title }}</h3>
      <div class="stat-count">{{ count }}</div>
      <p>{{ description }}</p>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {defineProps, computed, ref} from 'vue';
const n= ref(0);
interface Props {
  title: {
    type: String,
    required: true
  },
  count: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    default: ''
  },
  color: {
    type: String,
    default: 'default'
  }
};
const props = defineProps<Props>();
const colorClass = computed(() => `stat-card-${props.color}`)

</script>
<style scoped src="./StatisticsCard.css"></style>