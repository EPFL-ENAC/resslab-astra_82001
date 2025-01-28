#!/usr/bin/env node
const fs = require('fs');

// Read the JSON file synchronously
const jsonData = fs.readFileSync('data.json');

// Pour l’étape 1 une interface informatique est utilisée, les paramètres d'entrée sont listés ci-
// après:
// 1) Type de pont
// 2) Sous-type de pont
// 3) Appuis
// 4) Largeur de la chaussée: 9, 12, 15, 18 m
// 5) Pistes et direction : 2, 4, unidirectionnel ou bidirectionnel, sans ou avec R-BAU
// 6) Pour les dalles, transversalement, point de calcul : p1, p2 p3 où p1 = position à
// gauche de la voie 1, p2 = position au centre de la voie 2, p3 = position à droite de la
// voie 1, (voir Figure 5:29, le trafic venant vers nous)
// 7) Type d’effort intérieur : V, Mp, Mn
// 8) Portée : 4 à 80 m
// 9) Groupe de trafic : Class, Class+, ou All
// 10) Facteur d’amplification dynamique : 𝜑𝑐𝑎𝑙
// Les paramètres de sortie sont les valeurs des coefficients d’actualisation :
// 1) 𝛼𝑄1
// 2) 𝛼𝑄2
// 3) 𝛼𝑞

// Parse the JSON data
global.data = JSON.parse(jsonData);

// Start REPL
const repl = require('node:repl');
repl.start({
  prompt: 'Node CLI > ',
  useGlobal: true
});
