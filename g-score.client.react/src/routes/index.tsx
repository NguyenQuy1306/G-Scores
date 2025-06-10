import MainLayout from "../layout/MainLayout"
import Dashboard from "../pages/dashboard/Dashboard"
import Reports from "../pages/reports/Reports"
import SearchScores from "../pages/searchscore/SearchScores"
export const routes = [

  {
    path: "/",
    component: Dashboard,
    layout: MainLayout,
    role: "owner",
  },


  {
    path: "/reports",
    component: Reports,
    layout: MainLayout,
    role: ["admin"],
    title: "Bảng điều khiển",
  },
  {
    path: "/search",
    component: SearchScores,
    layout: MainLayout,
    role: ["admin"],
    title: "Bảng điều khiển",
  },
];
export default routes;