import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filt_toggle: false,
  data_a: [],
  data_b: [],
  data_c: [],
  data_d: [],
  data_e: [],
  data_f: [],
  data_g: [],
  data_h: [],
  data_i: [],
  data_j: [],
  data_k: [],
  data_l: [],
  data_m: [],
  data_n: [],
  data_o: [],
  data_p:[],
  data_q:[],
  data_r:[],
  data_s:[],
  data_t:[],
};

export const filterValueSlice = createSlice({
  name: "filterValue",
  initialState,
  reducers: {
    setFilterToggle: (state, action) => {
      state.filt_toggle = action.payload;
    },
    setFilterA: (state, action) => {
      state.data_a = action.payload;
    },
    setFilterB: (state, action) => {
      state.data_b = action.payload;
    },
    setFilterC: (state, action) => {
      state.data_c = action.payload;
    },
    setFilterD: (state, action) => {
      state.data_d = action.payload;
    },
    setFilterE: (state, action) => {
      state.data_e = action.payload;
    },
    setFilterF: (state, action) => {
      state.data_f = action.payload;
    },
    setFilterG: (state, action) => {
      state.data_g = action.payload;
    },
    setFilterH: (state, action) => {
      state.data_h = action.payload;
    },
    setFilterI: (state, action) => {
      state.data_i = action.payload;
    },
    setFilterJ: (state, action) => {
      state.data_j = action.payload;
    },
    setFilterK: (state, action) => {
      state.data_k = action.payload;
    },
    setFilterL: (state, action) => {
      state.data_l = action.payload;
    },
    setFilterM: (state, action) => {
      state.data_m = action.payload;
    },
    setFilterN: (state, action) => {
      state.data_n = action.payload;
    },
    setFilterO: (state, action) => {
      state.data_o = action.payload;
    },
    setFilterP: (state, action) => {
      state.data_p = action.payload;
    },
    setFilterQ: (state, action) => {
      state.data_q = action.payload;
    },
    setFilterR: (state, action) => {
      state.data_r = action.payload;
    },
    setFilterS: (state, action) => {
      state.data_s = action.payload;
    },
    setFilterT: (state, action) => {
      state.data_t = action.payload;
    },
    setresetFilterValueState: (state, action) => {
      // Reset the state
      state.filt_toggle= false;
      state.data_a= [];
      state.data_b= [];
      state.data_c= [];
      state.data_d= [];
      state.data_e= [];
      state.data_f= [];
      state.data_g= [];
      state.data_h= [];
      state.data_i= [];
      state.data_j= [];
      state.data_k= [];
      state.data_l= [];
      state.data_m= [];
      state.data_n= [];
      state.data_o= [];
      state.data_p=[];
      state.data_q=[];
      state.data_r=[];
      state.data_s=[];
      state.data_t=[];
    }
  },
});

// Action creators are generated for each case reducer function
export const {
  setFilterToggle,
  setFilterA,
  setFilterB,
  setFilterC,
  setFilterD,
  setFilterE,
  setFilterF,
  setFilterG,
  setFilterH,
  setFilterI,
  setFilterJ,
  setFilterK,
  setFilterL,
  setFilterM,
  setFilterN,
  setFilterO,
  setFilterP,
  setFilterQ,
  setFilterR,
  setFilterS,
  setFilterT,
  setresetFilterValueState,
} = filterValueSlice.actions;

export default filterValueSlice.reducer;
