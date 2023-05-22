import { prettier } from '../../libs';
import * as fs from 'fs';
import * as path from 'path';
import * as process from 'process';

function generateComponentFileContent(name: string) {
    return prettier(`
import { specsValuesParser } from '@react-site-editor/functions';
import type { ComponentPropsSpecs } from '@react-site-editor/types';
import type { ${name}Props } from './${name}.types';
import styles from './${name}.module.css';

const ${name}: React.FunctionComponent<${name}Props> = (props) => {
    // The component definitions
    return <><div className={styles.container} onClick={props.onClick}>{props.myProp}</div></>;
};

export const propsSpecs: ComponentPropsSpecs<${name}Props> = {
    // The default props of the component
    myProp: {
        value: 'default value',
        control: {
            type: 'text'
        }
    },
    onClick: {
        value: () => alert('Hello world!'),
        control: {
            type: 'callback'
        }
    },
    iconName: 'ui-default'
};

${name}.defaultProps = specsValuesParser<${name}Props>(propsSpecs);

export default ${name};
    `);
}

function generateTypeFileContent(name: string) {
    return prettier(`
export interface ${name}Props {
    myProp: string;
    onClick: (event?: React.SyntheticEvent) => void;
}
    `);
}

function generateIndexFileContent(name: string) {
    return prettier(`
export { default } from './${name}.component';
export { propsSpecs as ${
        name[0].toLowerCase() + name.substring(1)
    }PropsSpecs } from './${name}.component';
export * from './${name}.types';
    `);
}

function generateStyleFileContent() {
    return prettier(
        `
.container {
    @apply uppercase;
}
  `,
        { parser: 'css' }
    );
}

function generateStoryFileContent(name: string, group: string) {
    return prettier(`
import type { Meta, StoryObj } from '@storybook/react';
import { specsValuesParser } from '@react-site-editor/functions';
import { argTypesControlsParser } from '@/utils';
import ${name}, { propsSpecs } from './${name}.component';
import type { ${name}Props } from './${name}.types';

const meta = {
    title: '${group}/${name}',
    argTypes: argTypesControlsParser<${name}Props>(propsSpecs),
    component: ${name},
} satisfies Meta<typeof ${name}>;


type ${name}Story = StoryObj<typeof ${name}>;

export const Default = { 
    args: specsValuesParser<${name}Props>(propsSpecs)
} satisfies ${name}Story;

export default meta;
    `);
}

const componentName = process.argv[2] || '';
const categoryName = process.argv[3] || '';

if (!componentName || !categoryName) {
    console.error('Error: Argument is missing');
    process.exit(1);
}

const categoryDir = path.join(__dirname, '..', 'src', 'components', 'exposed', categoryName);

if (!fs.existsSync(categoryDir)) {
    console.log(`Creating the ${categoryName} category's directory...`);
    fs.mkdirSync(categoryDir);
}

const componentDir = path.join(categoryDir, componentName);

if (fs.existsSync(componentDir)) {
    console.error(`\x1b[31mError: Component ${componentName} already exists\x1b[0m`);
    process.exit(1);
}

const componentFiles = [
    // The index file
    {
        fileName: path.join(componentDir, 'index.ts'),
        fileContent: generateIndexFileContent(componentName)
    },
    // The component file
    {
        fileName: path.join(componentDir, `${componentName}.component.tsx`),
        fileContent: generateComponentFileContent(componentName)
    },
    // The types file
    {
        fileName: path.join(componentDir, `${componentName}.types.ts`),
        fileContent: generateTypeFileContent(componentName)
    },
    // The style file
    {
        fileName: path.join(componentDir, `${componentName}.module.css`),
        fileContent: generateStyleFileContent()
    },
    // The story file
    {
        fileName: path.join(componentDir, `${componentName}.stories.tsx`),
        fileContent: generateStoryFileContent(componentName, categoryName)
    }
];

let progress = '';

// Creation of the component's directory
process.stdout.write(
    `[${progress}${' '.repeat(10 - progress.length)}] Creating the component's directory...\n`
);
fs.mkdirSync(componentDir);

// Creation of the component's files
componentFiles.forEach(({ fileName, fileContent }) => {
    progress += '##';
    process.stdout.write(
        `\r[${progress}${' '.repeat(10 - progress.length)}] Creating the component's files...`
    );
    fs.writeFileSync(fileName, fileContent);
});

console.log();
