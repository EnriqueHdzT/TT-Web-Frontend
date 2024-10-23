// src/components/LayoutWithSidebar.jsx
import React, { useState } from 'react';
import PDFViewer from './PDFViewer';
import './LayoutWithSidebar.scss';

const LayoutWithSidebar = ({ pdfUrl }) => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className={`layout ${showSidebar ? 'with-sidebar' : ''}`}>
      {showSidebar && <div className="sidebar">Sidebar Content</div>}
      <div className="main-content">
        <PDFViewer pdfUrl={pdfUrl} />
      </div>
      <button onClick={() => setShowSidebar(!showSidebar)}>
        Toggle Sidebar
      </button>
    </div>
  );
};

export default LayoutWithSidebar;
