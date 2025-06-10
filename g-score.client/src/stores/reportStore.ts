import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useReportService } from '@/services/reportService'

export const useReportStore = defineStore('report', () => {
  const reportService = useReportService()

  const statistics = ref({
    subjectName: 'Tổng quan',
    level1: 0,
    level2: 0,
    level3: 0,
    level4: 0,
  })
  const subjectStatistics = ref([])
  const topStudents = ref([])
  const loading = ref(false)
  const error = ref('')

  async function fetchScoreStatistics() {
    loading.value = true
    try {
      statistics.value = await reportService.getScoreStatistics()
      error.value = ''
    } catch (err: any) {
      error.value = err.message || 'Error'
    } finally {
      loading.value = false
    }
  }

  async function fetchSubjectStatistics() {
    loading.value = true
    try {
      subjectStatistics.value = await reportService.getSubjectStatistics()
      error.value = ''
    } catch (err: any) {
      error.value = err.message || 'Error'
    } finally {
      loading.value = false
    }
  }

  async function fetchTopStudents(params: { limit: number; subjects?: string[] }) {
    loading.value = true
    try {
      topStudents.value = await reportService.getTopStudents(params)
      error.value = ''
    } catch (err: any) {
      error.value = err.message || 'Error'
    } finally {
      loading.value = false
    }
  }

  return {
    statistics,
    subjectStatistics,
    topStudents,
    loading,
    error,
    fetchScoreStatistics,
    fetchSubjectStatistics,
    fetchTopStudents,
  }
})
