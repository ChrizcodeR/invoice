import React, { useState } from 'react';
import Loader from './components/Animation';
import Form from './components/Form';
import Download from './components/download';
import DownloadT from './components/downloadt';
import Pdf from './views/Pdf';
import './App.css';

const App = () => {
  const [data, setData] = useState(null); // Estado para los datos cargados

  const handleFileLoaded = (fileData) => {
    setData(fileData); // Guardamos los datos del archivo
  };

  const handleGeneratePDF = () => {
    if (data && data.length > 0) {
      console.log('Iniciando generación de un solo PDF...');
      // Llamar a la función generatePDF una vez para generar un solo PDF con todas las filas
      generatePDF();
      alert('Proceso de generación de PDF completado.');
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
        <DownloadT/>
      </div>
    </>
  );
};

export default App;
