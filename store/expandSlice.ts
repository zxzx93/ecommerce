import { createSlice } from '@reduxjs/toolkit';

interface SidebarState {
  expandSidebar: boolean;
}

const initialState: SidebarState = {
  expandSidebar: false,
};

const expandSlice = createSlice({
  name: 'expandSidebar',
  initialState,
  reducers: {
    toggleSidebar: state => {
      state.expandSidebar = !state.expandSidebar;
    },
  },
});

export const { toggleSidebar } = expandSlice.actions;

export default expandSlice.reducer;
