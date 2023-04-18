import * as fs from 'fs';
import * as path from 'path';
import * as glob from 'glob';

const directoryPath = 'src/components/exposed'; // Remplacez par le chemin de votre projet

// Recherche tous les fichiers .module.css dans le projet
const cssFiles = glob.sync(`${directoryPath}/**/*.module.css`);

// Parcourir chaque fichier CSS
cssFiles.forEach((cssFilePath: string) => {
    // Ajouter chaque classe au fichier d'export local
    const outputFileName = `${path.basename(cssFilePath)}`;

    console.log('Création du fichier', outputFileName);

    fs.copyFileSync(cssFilePath, path.join(__dirname, '../../dist', cssFilePath.substring(4)));
});
