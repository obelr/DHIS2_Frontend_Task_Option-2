// components/dashboard/DashboardDetails.jsx
import React, { useMemo } from 'react';
import { useDashboardContext } from '../context/DashboardContext';

const DashboardDetails = ({ dashboard }) => {
  const { state } = useDashboardContext();
  const { filterType } = state;

  const getIcon = (item) => {
    switch (item.type) {
      case 'VISUALIZATION':
        return '📊';
      case 'MAP':
        return '🗺️';
      case 'TEXT':
        return '📝';
      default:
        return '';
    }
  };

  const getItemName = (item) => {
    if (item.visualization) {
      return item.visualization.name;
    } else if (item.map) {
      return item.map.name;
    } else if (item.text) {
      return item.text;
    } else {
      return 'Unknown Item';
    }
  };

  const filteredDashboardItems = useMemo(() => {
    return dashboard.dashboardItems.filter((item) => {
      if (filterType === 'all') {
        return true;
      }

      if (item.type && item.type === filterType) {
        return true;
      }

      if (item.visualization && item.visualization.type === filterType) {
        return true;
      }

      if (item.map && item.map.type === filterType) {
        return true;
      }

      return false;
    });
  }, [dashboard.dashboardItems, filterType]);

  return (
    <div className="mt-4">
      <h3 className="text-xl font-semibold mb-2">{dashboard.displayName} Items</h3>
      <ul>
        {filteredDashboardItems.map((item) => (
          <li key={item.id} className="mb-2">
            {getIcon(item)}
            <span className="ml-2">{getItemName(item)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DashboardDetails;
