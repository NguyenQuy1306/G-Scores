<template>
    <header class="header">
        <button class="menu-button" @click="onMenuClick">
            <span class="menu-icon"></span>
        </button>
        <h1>G-Score</h1>
    </header>
</template>
<script lang="ts" setup>
import { defineProps } from 'vue';

const props = defineProps<{
    onMenuClick?: () => void
}>();
function onMenuClick() {
    props.onMenuClick?.();
}
</script>
<style scoped>
.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 24px;
    background-color: #3a3a3a;
    color: white;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }
  
  .menu-button {
    background-color: transparent;
    border: none;
    padding: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .menu-icon {
    width: 25px;
    height: 2px;
    background-color: white;
    position: relative;
  }
  
  .menu-icon::before,
  .menu-icon::after {
    content: '';
    position: absolute;
    width: 25px;
    height: 2px;
    background-color: white;
  }
  
  .menu-icon::before {
    top: -7px;
  }
  
  .menu-icon::after {
    top: 7px;
  }
  
  h1 {
    font-size: 24px;
    font-weight: bold;
    margin: 0;
    color: white;
  }
  
</style>