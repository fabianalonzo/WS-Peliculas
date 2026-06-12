// Este archivo contendrá toda la lógica para operar con los datos -> BD
const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Utilizando express (framework JS) vamos a utilizar métodos de acceso
// localhost:3000/herramienta
// req = require = solicitud
// res = response = respuesta (JSON)
router.get("/", async (req, res) => {
  try {
    const query = "SELECT * FROM peliculas";

    // Deserialización, el primer valor
    // El método query devuelve una MATRIZ (arreglo que contiene a otros arreglos)
    // db.query = [[registros...], [info_query...]]

    const [rows] = await db.query(query);

    // Devolvemos los datos obtenidos como JSON
    res.status(200).json({
      success: true,
      data: rows,
    });
  } catch (err) {
    // ¿Por qué 500? Error generado del lado servidor
    res.status(500).json({
      success: false,
      message: "Error en la comunicación al servidor",
      error: err.message,
    });
  }
});

// Buscador
// http://ip:3000/api/herramientas/n
router.get("/:id", async (req, res) => {
  try {
    const query = "SELECT * FROM peliculas WHERE idpelicula = ?";

    // Deserialización, el primer valor
    // El método query devuelve una MATRIZ (arreglo que contiene a otros arreglos)
    // db.query = [[registros...], [info_query...]]
    const [rows] = await db.query(query, [req.params.id]);

    // Es necesario validar si existen datos
    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No encontrado",
      });
    }

    // Devolvemos los datos obtenidos como JSON
    res.status(200).json({
      success: true,
      data: rows[0],
    });
  } catch (err) {
    // ¿Por qué 500? Error generado del lado servidor
    res.status(500).json({
      success: false,
      message: "Error en la comunicación al servidor",
      error: err.message,
    });
  }
});

// Registrar
router.post("/", async (req, res) => {
  try {
    // Consulta esperada
    const query = 'INSERT INTO peliculas (titulo, duracionmin, genero, alanzamiento) VALUES (?, ?, ?, ?)';

    //Obtener los datos ... Deserializar objeto. Se debe respetar el orden de los ATRIBUTOS
    const {titulo, duracionmin, genero, alanzamiento} = req.body;

    //El WS tiene que tener la capacidad de validar
    if (!titulo || titulo == "") {
      return res.status(400).json({
        success: false,
        message: "Se requiere el titulo de la película",
      });
    }

    if (!duracionmin || duracionmin == "") {
      return res.status(400).json({
        success: false,
        message: "Se requiere la duracion de la película",
      });
    }

    if (!genero || genero == "") {
      return res.status(400).json({
        success: false,
        message: "Se requiere el genero de la película",
      });
    }

    if (!alanzamiento || alanzamiento == "") {
      return res.status(400).json({
        success: false,
        message: "Se requiere el año de lanzamiento de la película",
      });
    }

    //Datos requeridos para los comodines
    const values = [
      titulo,
      duracionmin,
      genero,
      alanzamiento
    ];

    // Ejecutar la consulta
    const [result] = await db.query(query, values);

    //Informar la ejecición der la operación
    res.status(201).json({
      success: true,
      message: "pelicula registrada correctamente",
      id: result.insertId, // ID generado por la BD
    })

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error en la comunicación al servidor",
      error: err.message,
    });
  }
});

module.exports = router;