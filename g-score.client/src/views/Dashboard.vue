<!-- filepath: c:\Users\LENOVO\Desktop\g-score\G-Scores\g-score.client\src\views\Dashboard.vue -->
<template>
  <main class="main-content">
    <h1 style="color: black">Dashboard</h1>
    <div class="stats-cards">
      <StatisticsCard
        title="Excellent Students"
        :count="statistics.level1"
        description="Students with scores ≥ 8"
        icon="🏆"
        color="green"
      />
      <StatisticsCard
        title="Good Students"
        :count="statistics.level2"
        description="Students with scores 6-8"
        icon="👍"
        color="blue"
      />
      <StatisticsCard
        title="Average Students"
        :count="statistics.level3"
        description="Students with scores 4-6"
        icon="😐"
        color="orange"
      />
      <StatisticsCard
        title="Below Average"
        :count="statistics.level4"
        description="Students with scores < 4"
        icon="📚"
        color="red"
      />
    </div>
    <div class="chart-container">
      <ScoreDistribution />
    </div>
  </main>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import StatisticsCard from '@/components/Dashboard/StatisticsCard/StatisticsCard.vue'
import ScoreDistribution from '@/components/Dashboard/ScoreDistribution/ScoreDistribution.vue'

// Giả lập dữ liệu, bạn nên thay bằng fetch từ store hoặc API
const statistics = ref({
  level1: 0,
  level2: 0,
        level3: 0,
        level4: 0,
})

onMounted(() => {
  // Gọi API hoặc store để lấy dữ liệu thực tế
  // Ví dụ:
  // await fetchStatistics()
  statistics.value = {
    level1: 12,
    level2: 34,
    level3: 21,
    level4: 5,
  }
})
</script>

<style scoped>
/* Thêm style nếu cần */
</style>