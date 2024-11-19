import React from 'react';
import { Outlet } from 'react-router-dom';

function BlankLayout() {
  return (
    <div style={{ padding: '20px' }}>
      <Outlet />
    </div>
  );
}

export default BlankLayout;
