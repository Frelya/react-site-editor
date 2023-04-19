"use strict";
exports.__esModule = true;
var fs = require("fs");
var path = require("path");
var glob = require("glob");
var directoryPath = 'src/components/exposed'; // Remplacez par le chemin de votre projet
// Recherche tous les fichiers .module.css dans le projet
var cssFiles = glob.sync("".concat(directoryPath, "/**/*.module.css"));
// Parcourir chaque fichier CSS
cssFiles.forEach(function (cssFilePath) {
    // Ajouter chaque classe au fichier d'export local
    var outputFileName = "".concat(path.basename(cssFilePath));
    console.log('Création du fichier', outputFileName);
    fs.copyFileSync(cssFilePath, path.join(__dirname, '../../dist', cssFilePath.substring(4)));
});
