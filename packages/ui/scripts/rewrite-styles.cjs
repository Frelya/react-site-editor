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
    // const css = fs.readFileSync(cssFilePath, 'utf8');
    // // Transformer le fichier css en un objet JavaScript
    // const root = postcss.parse(css);
    // const styles = objectify(root);
    // // Ajouter chaque classe au fichier d'export local
    var outputFileName = "".concat(path.basename(cssFilePath));
    // // Créer un objet JS local qui contiendra les styles exportés
    // const exportedStyles: ExportedStyles = {};
    // for (const className in styles) {
    //     // Supprimer le point du nom de classe
    //     const key = className.slice(1);
    //     // Récupérer la valeur associée à la classe
    //     const value = Object.keys(styles[className])[0].replace('@apply ', '').trim();
    //     // Ajouter la classe et sa valeur à l'objet JS local
    //     exportedStyles[key] = value;
    // }
    // Exporter l'objet JS local dans un fichier JS du même nom que le fichier CSS
    // const js = `export default ${JSON.stringify(exportedStyles)};`;
    // const jsFilePath = path.join(__dirname, '../dist', cssFilePath.substring(4), '.js');
    console.log('Création du fichier', outputFileName);
    fs.copyFileSync(cssFilePath, path.join(__dirname, '../dist', cssFilePath.substring(4)));
    // fs.writeFileSync(jsFilePath, js);
});
