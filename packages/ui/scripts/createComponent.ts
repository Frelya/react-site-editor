import { prettier } from '../libs/prettier';
import * as fs from 'fs';
import * as path from 'path';

// This function render the code of the component file
function generateComponentFile(name: string) {
    return prettier(
        `
import type { PredefinedComponentProps } from '@react-site-editor/types';
import { PropsEnum } from '@react-site-editor/types';
import styles from './${name}.module.css';
import { ${name}Props } from './${name}.types';

const ${name}: React.FC<${name}Props> = (props) => {
  // Contenu du composant
  return <><div className={styles.container}>${name}</div></>;
};
export const defaultProps: PredefinedComponentProps<${name}Props> = {
  //Contenu des props par défaut
  onClick: () => {
      return;
  },
  iconName: 'ui-default'
};
${name}.defaultProps=defaultProps;

export default ${name};
`
    );
}

// This function render the code of the component file
function generateTypeFile(name: string) {
    return prettier(`
import type { ComponentChildren, ComponentProp } from '@react-site-editor/types';

export interface ${name}Props {
    onClick: () => void;
    children?: ComponentChildren;
}
  `);
}

// This function render the code of the component file
function generateIndexFile(name: string) {
    return prettier(`
export { default } from './${name}';
export { defaultProps as defaultProps${name} } from './${name}';
export * from './${name}.types';

  `);
}

function generateStyleFile() {
    return prettier(
        `
.container {
    @apply uppercase;
}

  `,
        { parser: 'css' }
    );
}

// Récupération du nom du composant en paramètre
const componentName = process.argv[2];
const categoryName = process.argv[3] ?? '';

// Vérification que le nom du composant a bien été passé en paramètre
if (!componentName) {
    console.error('Error: Component name is missing');
    process.exit(1);
}
console.log('Creating the component...');

// Chemin du dossier de destination du nouveau composant
const componentsDir = path.join(
    __dirname,
    '..',
    'src',
    'components',
    'exposed',
    categoryName,
    componentName
);

// Vérification que le fichier de composant n'existe pas déjà
if (fs.existsSync(componentsDir)) {
    console.log('\x1b[31m', `Error: Component ${componentName} already exists`, '\x1b[0m');
    process.exit(1);
}

// Crée le dossier du composant
fs.mkdirSync(componentsDir);

//------- Génération de fichier --------

// Chemin du nouveau fichier de composant
const componentFile = path.join(componentsDir, `${componentName}.tsx`);

// Contenu du nouveau fichier de composant
const componentContent = generateComponentFile(componentName);

// Création du nouveau fichier de composant
fs.writeFileSync(componentFile, componentContent);

//
//
//

// Chemin du nouveau fichier de composant
const typeFile = path.join(componentsDir, `${componentName}.types.ts`);

// Contenu du nouveau fichier de types
const typeContent = generateTypeFile(componentName);

// Création du nouveau fichier de type
fs.writeFileSync(typeFile, typeContent);

//
//
//

// Chemin du nouveau fichier de style
const styleFile = path.join(componentsDir, `${componentName}.module.css`);

// Contenu du nouveau fichier de style
const styleContent = generateStyleFile();

// Création du nouveau fichier de style
fs.writeFileSync(styleFile, styleContent);

//
//
//

// Chemin du nouveau fichier de index
const indexFile = path.join(componentsDir, 'index.ts');

// Contenu du nouveau fichier de index
const indexContent = generateIndexFile(componentName);

// Création du nouveau fichier de index
fs.writeFileSync(indexFile, indexContent);
console.log('\x1b[32m%s\x1b[0m', `Component ${componentName} created successfully`);
