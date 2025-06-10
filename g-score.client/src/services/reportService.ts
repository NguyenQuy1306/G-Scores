import { getScoreStatisticsApi, getSubjectStatisticsApi, getTopStudentsApi } from '@/api/report'

export function useReportService() {
  async function getScoreStatistics() {
    return await getScoreStatisticsApi()
  }
  async function getSubjectStatistics() {
    return await getSubjectStatisticsApi()
  }
  async function getTopStudents(params: { limit: number; subjects?: string[] }) {
    return await getTopStudentsApi(params)
  }
  return {
    getScoreStatistics,
    getSubjectStatistics,
    getTopStudents,
  }
}
