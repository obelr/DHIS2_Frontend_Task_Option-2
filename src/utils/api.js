const BASE_URL = 'https://gist.githubusercontent.com/kabaros/da79636249e10a7c991a4638205b1726/raw/fa044f54e7a5493b06bb51da40ecc3a9cb4cd3a5';

export const fetchDashboards = async () => {
  try {
    const response = await fetch(`${BASE_URL}/dashboards.json`);
    const data = await response.json();
    return data.dashboards;
  } catch (error) {
    throw new Error('Error fetching dashboards');
  }
};

export const fetchDashboardDetails = async (dashboardId) => {
  try {
    const response = await fetch(`${BASE_URL}/${dashboardId}.json`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Error fetching dashboard details');
  }
};
