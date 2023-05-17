import fs from "fs";
import { glob } from 'glob';
import path from "path";

const locals = "../nextjs/public/locales/**/*.json";
const files = await glob(locals);

// get locale and file name from filepath
const locales = files.map((file) => {
  return {
    locale: path.dirname(file).split(path.sep).slice(-1)[0],
    name: path.basename(file, ".json"),
    path: path.join("../../", file),
  };
});

const imports = locales
  .map(({ locale, name, path }) => `import ${locale}_${name} from '${path}';`)
  .join("\n");

const resourcesGroupedByLocale = locales.reduce((acc, { locale, name }) => {
  acc[locale] = {
    ...(acc[locale] || {}),
    [name]: `${locale}_${name}`,
  };
  return acc;
}, {});

const contentLines = ['export const resources = {']

Object.entries(resourcesGroupedByLocale).forEach(([locale, resources]) => {
  contentLines.push(`  ${locale}: {`)
  Object.entries(resources).forEach(([name, resource]) => {
    contentLines.push(`    ${name}: ${resource},`)
  })
  contentLines.push('  },')
})

contentLines.push('} as const;')

const content = `
${imports}

${contentLines.join('\n')}
`
const translationFilePath = "./src/@generated/translations.ts";
// write to translation file overwriting previous content
fs.writeFileSync(translationFilePath, content);
