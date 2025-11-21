import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import dataListReducer from "./dataList/DataList"; 
import filterValueReducer from "./filterValue/FilterValue"; 
import paginationReducer from "./pagination/Pagination";
import parentFilterReducer from "./parentFilter/ParentFilter";
import permissionsReducer from "./permissions/Permissions";
import searchBarReducer from "./searchBar/SearchBar";
import alertReducer from "./alert/Alert";

const rootReducer = combineReducers({
  user: userReducer,
  alert: alertReducer,
  datalist: dataListReducer,
  filtervalue: filterValueReducer, 
  pagination: paginationReducer,
  parentfilter: parentFilterReducer,
  permissions: permissionsReducer,
  searchbar: searchBarReducer,
  
});

export default rootReducer;
