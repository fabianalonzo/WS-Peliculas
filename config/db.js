const mysql = require('mysql2/promise'); //Acceso motor BD
require('dotenv').config(); //Acceso al erchivo .env

// Pool de conexiones => número defunudo de conexiones disponibles
const pool = mysql.createPool({
host: process.env.DB_HOST,
user: process.env.DB_USER,
password: process.env.DB_PASSWORD,
database: process.env.DB_NAME,
port: process.env.DB_PORT,
waitForConnections: true, //Esperar a que haya una conexión disponible
connectionLimit: 10,
queueLimit: 0,
timezone: "-05:00" //Zona horaria de Colombia(bogotá) == Perú
});

//Inicializar la conexión a travéz de una función anónima
(async () => {
  try{
    //await ... getConection() puede tomar un tiempo indeterminado en ejecutarse
    const conexion = await pool.getConnection();
    console.log(`Conexión al server y MySQL correcto`);
    conexion.release(); //Liberar la conexión para que esté disponible para otros procesos
  }catch(error){
    console.error(`Error al inicializar la conexión: ${error.message}`);
  }
})();

module.exports = pool;