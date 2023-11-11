import React, { useState, useEffect, useCallback } from 'react';
import DashboardDetails from './DashboardDetails';

const DashboardCard = ({ dashboard, isExpanded, onCardClick, filterType }) => {
  const [dashboardDetails, setDashboardDetails] = useState(null);
  const [isStarred, setIsStarred] = useState(false);

  const fetchDashboardDetails = useCallback(async () => {
    try {
      const response = await fetch(
        `https://gist.githubusercontent.com/kabaros/da79636249e10a7c991a4638205b1726/raw/fa044f54e7a5493b06bb51da40ecc3a9cb4cd3a5/${dashboard.id}.json`
      );
      const data = await response.json();
      setDashboardDetails(data);
    } catch (error) {
      console.error('Error fetching dashboard details', error);
    }
  }, [dashboard.id]);

  useEffect(() => {
    // Check if the dashboard is starred in local storage
    const starredDashboards = JSON.parse(localStorage.getItem('starredDashboards')) || [];
    setIsStarred(starredDashboards.includes(dashboard.id));

    if (isExpanded) {
      fetchDashboardDetails();
    }
  }, [dashboard.id, isExpanded, fetchDashboardDetails]);

  const handleCardClick = () => {
    onCardClick(dashboard.id);
  };

  const handleStarToggle = () => {
    // Toggle the star state
    const newIsStarred = !isStarred;
    setIsStarred(newIsStarred);

    // Update the starredDashboards array in local storage
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
              <DashboardDetails dashboard={dashboardDetails} filterType={filterType} />
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
