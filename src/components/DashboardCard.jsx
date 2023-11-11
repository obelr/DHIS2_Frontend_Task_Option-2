// components/dashboard/DashboardCard.jsx
import React, { useState, useEffect, useCallback } from 'react';
import DashboardDetails from './DashboardDetails';
import { useDashboardContext, actionTypes } from '../context/DashboardContext';
import { fetchDashboardDetails } from '../utils/api';

const DashboardCard = ({ dashboard, isExpanded }) => {
  const { state, dispatch } = useDashboardContext();
  const { expandedDashboard } = state;

  const [dashboardDetails, setDashboardDetails] = useState(null);
  const [isStarred, setIsStarred] = useState(false);

  const fetchDashboardDetailsCallback = useCallback(async () => {
    try {
      const data = await fetchDashboardDetails(dashboard.id);
      setDashboardDetails(data);
    } catch (error) {
      console.error('Error fetching dashboard details', error);
    }
  }, [dashboard.id]);

  useEffect(() => {
    const starredDashboards = JSON.parse(localStorage.getItem('starredDashboards')) || [];
    setIsStarred(starredDashboards.includes(dashboard.id));

    if (isExpanded) {
      fetchDashboardDetailsCallback();
    }
  }, [dashboard.id, isExpanded, fetchDashboardDetailsCallback]);

  const handleCardClick = () => {
    dispatch({ type: actionTypes.SET_EXPANDED_DASHBOARD, payload: dashboard.id });
  };

  const handleStarToggle = () => {
    const newIsStarred = !isStarred;
    setIsStarred(newIsStarred);

    const starredDashboards = JSON.parse(localStorage.getItem('starredDashboards')) || [];
    if (newIsStarred) {
      localStorage.setItem('starredDashboards', JSON.stringify([...starredDashboards, dashboard.id]));
    } else {
      const updatedStarredDashboards = starredDashboards.filter((id) => id !== dashboard.id);
      localStorage.setItem('starredDashboards', JSON.stringify(updatedStarredDashboards));
    }
  };

  return (
    <li onClick={handleCardClick}>
      <div className={`bg-gray-100 p-4 border rounded cursor-pointer mb-4 ${isExpanded ? 'border-blue-500' : ''}`}>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">{dashboard.displayName}</h2>
          <button onClick={handleStarToggle}>
            {isStarred ? 'Unstar' : 'Star'}
          </button>
        </div>
        {isExpanded && (
          <div>
            {dashboardDetails ? (
              <DashboardDetails dashboard={dashboardDetails} />
            ) : (
              <div>Loading details...</div>
            )}
          </div>
        )}
      </div>
    </li>
  );
};

export default DashboardCard;
