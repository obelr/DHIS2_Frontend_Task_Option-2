// components/dashboard/DashboardList.jsx
import React, { useEffect } from 'react';
import DashboardCard from './DashboardCard';
import { useDashboardContext, actionTypes } from '../context/DashboardContext';

const DashboardList = () => {
  const { state, dispatch } = useDashboardContext();
  const { dashboards, loading, error, expandedDashboard, filterType } = state;

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        dispatch({ type: actionTypes.SET_LOADING, payload: true });
        const dashboardsData = await fetchDashboards();
        dispatch({ type: actionTypes.SET_DASHBOARDS, payload: dashboardsData });
        dispatch({ type: actionTypes.SET_EXPANDED_DASHBOARD, payload: dashboardsData[0]?.id });
        dispatch({ type: actionTypes.SET_LOADING, payload: false });
      } catch (error) {
        dispatch({ type: actionTypes.SET_ERROR, payload: 'Error fetching dashboards' });
        dispatch({ type: actionTypes.SET_LOADING, payload: false });
      }
    };

    fetchDashboardData();
  }, [dispatch]);

  const handleFilterChange = (event) => {
    dispatch({ type: actionTypes.SET_FILTER_TYPE, payload: event.target.value });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Dashboards</h1>
        <div className="flex items-center space-x-4">
          <select value={filterType} onChange={handleFilterChange}>
            <option value="all">All Types</option>
            <option value="VISUALIZATION">Visualization</option>
            <option value="MAP">Map</option>
            <option value="TEXT">Text</option>
            {/* Add other types as needed */}
          </select>
        </div>
      </div>
      <ul>
        {dashboards.map((dashboard) => (
          <DashboardCard
            key={dashboard.id}
            dashboard={dashboard}
            isExpanded={dashboard.id === expandedDashboard}
          />
        ))}
      </ul>
    </div>
  );
};

export default DashboardList;
