// context/DashboardContext.js
import React, { createContext, useContext, useReducer, useEffect } from "react";
import { fetchDashboards, fetchDashboardDetails } from "../utils/api";

const initialState = {
  dashboards: [],
  loading: true,
  error: "",
  expandedDashboard: null,
  filterType: "all",
};

const actionTypes = {
  SET_DASHBOARDS: "SET_DASHBOARDS",
  SET_LOADING: "SET_LOADING",
  SET_ERROR: "SET_ERROR",
  SET_EXPANDED_DASHBOARD: "SET_EXPANDED_DASHBOARD",
  SET_FILTER_TYPE: "SET_FILTER_TYPE",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_DASHBOARDS:
      return { ...state, dashboards: action.payload };
    case actionTypes.SET_LOADING:
      return { ...state, loading: action.payload };
    case actionTypes.SET_ERROR:
      return { ...state, error: action.payload };
    case actionTypes.SET_EXPANDED_DASHBOARD:
      return { ...state, expandedDashboard: action.payload };
    case actionTypes.SET_FILTER_TYPE:
      return { ...state, filterType: action.payload };
    default:
      return state;
  }
};

const DashboardContext = createContext();

const DashboardProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: actionTypes.SET_LOADING, payload: true });
        const dashboardsData = await fetchDashboards();

        dispatch({ type: actionTypes.SET_DASHBOARDS, payload: dashboardsData });
        dispatch({
          type: actionTypes.SET_EXPANDED_DASHBOARD,
          payload: dashboardsData[0]?.id,
        });
        dispatch({ type: actionTypes.SET_LOADING, payload: false });
      } catch (error) {
        dispatch({
          type: actionTypes.SET_ERROR,
          payload: "Error fetching dashboards",
        });
        dispatch({ type: actionTypes.SET_LOADING, payload: false });
      }
    };

    fetchData();
  }, []);

  return (
    <DashboardContext.Provider value={{ state, dispatch }}>
      {children}
    </DashboardContext.Provider>
  );
};

const useDashboardContext = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error(
      "useDashboardContext must be used within a DashboardProvider"
    );
  }
  return context;
};

export { DashboardProvider, useDashboardContext, actionTypes };
