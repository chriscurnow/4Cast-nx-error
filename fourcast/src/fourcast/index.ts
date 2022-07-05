import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
// import { strings } from '@angular-devkit/core';
import { Schema } from './schema';
//  apply, mergeWith, template, , url
// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function fourcast(_options: Schema): Rule {

  return (tree: Tree, _context: SchematicContext) => {

    // const sourceTemplates = url('./files');;

    // const sourceParameterizedTemplates = apply(sourceTemplates, [
    //   template({
    //     ..._options,
    //     ...strings
    //   })
    // ])

    tree.create(`${name}.js`, `console.log('Hello!');`);

    return tree;

    // const mergetree = mergeWith(sourceParameterizedTemplates)(tree, _context);
    // return mergetree;

  };
}
