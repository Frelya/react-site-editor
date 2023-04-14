import * as fs from 'fs';
import * as path from 'path';

// Récupération du nom du composant en paramètre
const componentName = process.argv[2];

// Vérification que le nom du composant a bien été passé en paramètre
if (!componentName) {
    console.error('Error: Component name is missing');
    process.exit(1);
}
console.log('Creating the component...');

// Chemin du dossier de destination du nouveau composant
const componentsDir = path.join(__dirname, 'src', 'components', 'exposed');

// Chemin du nouveau fichier de composant
const componentFile = path.join(componentsDir, `${componentName}.tsx`);
console.log(componentFile);

// Vérification que le fichier de composant n'existe pas déjà
if (fs.existsSync(componentFile)) {
    console.error(`Error: Component ${componentName} already exists`);
    process.exit(1);
}

// Contenu du nouveau fichier de composant
const componentContent = `import React from 'react';

interface ${componentName}Props {
  // Props du composant
}

const ${componentName}: React.FC<${componentName}Props> = ({ /* Props destructurées */ }) => {
  return (
    // Contenu du composant
  );
};

export default ${componentName};
`;

// Création du nouveau fichier de composant
// fs.writeFileSync(componentFile, componentContent);

// console.log(`Component ${componentName} created successfully`);
