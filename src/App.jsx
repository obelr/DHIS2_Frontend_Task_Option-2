import React from 'react';
import DashboardList from './components/DashboardList';
import { DashboardProvider } from './context/DashboardContext';

const App = () => {
  return (
    <DashboardProvider>

   
    <div className="p-4">
     
      <DashboardList />
    </div>
    </DashboardProvider>
  );
};

export default App;