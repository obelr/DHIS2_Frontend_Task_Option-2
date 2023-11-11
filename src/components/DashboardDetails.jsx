import React, { useMemo } from 'react';

const DashboardDetails = ({ dashboard, filterType }) => {
  // Helper function to get the appropriate icon based on item type
  const getIcon = (item) => {
    switch (item.type) {
      case 'VISUALIZATION':
        return '📊';
      case 'MAP':
        return '🗺️';
      case 'TEXT':
        return '📝';
      // Add other types as needed
      default:
        return '';
    }
  };

  // Helper function to get the item name or text for text types
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

  // Use useMemo to memoize the filteredDashboardItems
  const filteredDashboardItems = useMemo(() => {
    return dashboard.dashboardItems.filter((item) => {
      if (filterType === 'all') {
        return true;
      }

      // Check if the item has a type property and it matches the filter
      if (item.type && item.type === filterType) {
        return true;
      }

      // Check if the item has nested types (visualization, map) and one of them matches the filter
      if (item.visualization && item.visualization.type === filterType) {
        return true;
      }

      if (item.map && item.map.type === filterType) {
        return true;
      }

      // Add similar checks for other types if needed

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
