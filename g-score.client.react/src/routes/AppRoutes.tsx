import React from 'react';
import { Routes, Route } from 'react-router-dom';
import routes from './index.tsx'; 
import MainLayout from '../layout/MainLayout';

const AppRoutes: React.FC = () => {
  console.log("routes", routes); 
  return (
    <Routes>
      {routes.map((item, index) => {
        const Page = item.component;
        let Layout = MainLayout; 

        if (item.layout) {
          Layout = item.layout; 
        }

        return (
          <Route
            key={index}
            path={item.path}
            element={
              <Layout children={<Page />}> 
               
              </Layout>
            }
          />
        );
      })}
    </Routes>
  );
};

export default AppRoutes;
