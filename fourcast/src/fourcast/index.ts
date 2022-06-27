import { Rule, SchematicContext, Tree, apply, mergeWith, template, url } from '@angular-devkit/schematics';
import { strings } from '@angular-devkit/core';
import { Schema } from './schema';

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function fourcast(_options: Schema): Rule {

  return (tree: Tree, _context: SchematicContext) => {

    const sourceTemplates = url('./files');;

    const sourceParameterizedTemplates = apply(sourceTemplates, [
      template({
        ..._options,
        ...strings,
        addExclamation
      })
    ])

    function addExclamation(value: string): string {
      return value + '!';
    }

    // tree.create('hello.js', `console.log('Hello ${name}!');`);

    // return tree;

    return mergeWith(sourceParameterizedTemplates)(tree, _context);

  };
}
