import MainLayout from "../layout/MainLayout"
import Dashboard from "../pages/dashboard/Dashboard"
import Reports from "../pages/reports/Reports"
import SearchScores from "../pages/searchscore/SearchScores"
import Upload from "../pages/uploadfile/uploadfile"
export const routes = [

  {
    path: "/",
    component: Dashboard,
    layout: MainLayout,
    role: "owner",
  },
  {
    path: "/upload",
    component:Upload,
    layout: MainLayout,
    role: ["guest", "customer", "owner"],
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