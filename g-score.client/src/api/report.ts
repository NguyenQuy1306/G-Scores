import axiosInstance from './index'

export async function getScoreStatisticsApi() {
  const { data } = await axiosInstance.get('/reports/statistics')
  return data
}

export async function getSubjectStatisticsApi() {
  const { data } = await axiosInstance.get('/reports/subject-statistics')
  return data
}

export async function getTopStudentsApi(params: { limit: number; subjects?: string[] }) {
  const { data } = await axiosInstance.get('/reports/top-students', { params })
  return data
}
