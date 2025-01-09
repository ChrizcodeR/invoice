export const imageToBase64 = async (jpgPath) => {
    try {
      const response = await fetch(jpgPath);
      if (!response.ok) {
        throw new Error(`Error al cargar la imagen JPG: ${response.statusText}`);
      }
      const blob = await response.blob();
      const reader = new FileReader();
      
      return new Promise((resolve, reject) => {
        reader.onloadend = () => {
          const base64 = reader.result;
          resolve(base64);
        };
        
        reader.onerror = (err) => {
          reject(new Error(`Error al convertir JPG a Base64: ${err.message}`));
        };
        
        reader.readAsDataURL(blob);
      });
    } catch (err) {
      throw new Error(`Error al convertir JPG a Base64: ${err.message}`);
    }
  };
  