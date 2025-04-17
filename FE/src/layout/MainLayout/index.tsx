import React from "react";
import Header from "../../components/common/Header/Header";
import Sidebar from "../../components/common/Sidebar/Sidebar";
import "./MainLayout.css";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="app-container">
      <Header />

      <div className="content-container">

        <Sidebar />
        

       {children}
      </div>
      </div>
  );
};

export default MainLayout;
