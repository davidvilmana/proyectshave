export const PrediccionMananza = async (imageBlob) => {
    const formData = new FormData();
    formData.append('imagen', imageBlob);
  
    try {
      const response = await fetch('http://127.0.0.1:3000/predecir', {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error desconocido');
      }
  
      const data = await response.json();
      return data;
    } catch (err) {
      throw new Error(err.message);
    }
  };
  