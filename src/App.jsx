import React, { useState } from 'react';
import Loader from './components/Animation';
import Form from './components/Form';
import Download from './components/download';
import Pdf from './views/Pdf';
import './App.css';

const App = () => {
  const [data, setData] = useState(null); // Estado para los datos cargados

  const handleFileLoaded = (fileData) => {
    setData(fileData); // Guardamos los datos del archivo
  };

  const handleGeneratePDF = () => {
    if (data) {
      data.generatePDF(data); // Llamamos a la función para generar el PDF
    } else {
      alert('Por favor, carga un archivo primero.');
    }
  };

  return (
    <>
      <div className="file">
        <Loader />
      </div>
      <h1>Creador de Certificados de Facturas</h1>
      <div className="file">
        {/* El Form pasa los datos cargados al estado data */}
        <Form onFileLoaded={handleFileLoaded} />
      </div>
      <div className="button">
        <Pdf data={data} />
        <Download/>
      </div>
    </>
  );
};

export default App;
