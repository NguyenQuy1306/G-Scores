
<script>
</script>
<template>
  <div class="layout">
    <Header />
    <div class="content-container">
      <SideBar />
      <div class="children">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Header from '@/components/common/Header.vue';
import SideBar from '@/components/common/SideBar.vue';

</script>
<style scoped>
.body-wrapper {
  margin-top: var(--header-height);
  height: calc(100% - var(--header-height));
  position: relative;
}

.content {
  margin-left: var(--sidebar-width);
}

.floating-sidebar + .content {
  margin-left: 0;
}

</style>