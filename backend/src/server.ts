import app from './app';


const PORT = 3080;



app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});