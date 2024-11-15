// src/components/PDFViewer.jsx
import React from 'react';
import './PDFViewer.scss';

const PDFViewer = ({ pdfUrl }) => {
  return (
    <div className="pdf-container">
      <iframe 
        src={pdfUrl} 
        title="PDF Viewer" 
        className="pdf-viewer" 
      />
    </div>
  );
};

export default PDFViewer;
