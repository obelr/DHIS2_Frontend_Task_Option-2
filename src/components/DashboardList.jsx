// src/components/DashboardList.jsx
import React, { useState, useEffect } from 'react';
import DashboardCard from './DashboardCard';

const DashboardList = () => {
  const [dashboards, setDashboards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedDashboard, setExpandedDashboard] = useState(null);
  const [filterType, setFilterType] = useState("all");

  useEffect(() => {
    const fetchDashboards = async () => {
      try {
        const response = await fetch(
          'https://gist.githubusercontent.com/kabaros/da79636249e10a7c991a4638205b1726/raw/fa044f54e7a5493b06bb51da40ecc3a9cb4cd3a5/dashboards.json'
        );
        const data = await response.json();
        setDashboards(data.dashboards);
        setLoading(false);
        // Set the first dashboard as expanded by default
        setExpandedDashboard(data.dashboards[0].id);
      } catch (error) {
        setError('Error fetching dashboards');
        setLoading(false);
      }
    };

    fetchDashboards();
  }, []);

  const handleCardClick = (dashboardId) => {
    setExpandedDashboard(dashboardId);
  };

  const handleFilterChange = (event) => {
    setFilterType(event.target.value);
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
            onCardClick={handleCardClick}
            filterType={filterType}
          />
        ))}
      </ul>
    </div>
  );
};

export default DashboardList;
