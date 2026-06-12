CREATE DATABASE movies;
-- DROP DATABASE movies;
USE movies;

CREATE TABLE peliculas
(
idpelicula  INT AUTO_INCREMENT PRIMARY KEY,
titulo      VARCHAR(100) NOT NULL,
duracionmin SMALLINT NOT NULL,
genero      ENUM('Animado', 'Drama', 'Comedia', 'Accion', 'Terror') NOT NULL,
alanzamiento CHAR(4) NOT NULL
)ENGINE=InnoDB

INSERT INTO peliculas (titulo, duracionmin, genero, alanzamiento)
VALUES
('Toy Story', 81, 'Animado', '1995'),
('Titanic', 195, 'Drama', '1997'),
('Superbad', 113, 'Comedia', '2007'),
('Mad Max: Fury Road', 120, 'Accion', '2015'),
('El Conjuro', 112, 'Terror', '2013');

SELECT * FROM peliculas;