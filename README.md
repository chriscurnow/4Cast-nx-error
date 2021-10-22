# Welcome to the @4cast/workspace

### General

This workspace uses `@nrwl/nx` ([docs](https://nx.dev/l/a/getting-started/intro))

## Run apps

Apps can be started with help of provided npm `serve:*` script, eg `npm run serve:contractor`, please add such script for every newly added application
In case more than one app has to be started simultaneously add the `--port` flag to the serve scripts

## Generate apps & libs

**IMPORTANT** - always preview command output with `--dry-run` flag to make sure it is oging to generate what you expect it to, also don't hesitate to append `--help` to see additional options

Some `generate` flags are specified as defaults so they don't need to be provided explicitly with every invocation, please see the defaults in `nx.json` file

1. **app** - `nx g app <app-name> --tags scope:app --routing`

2. **lib** - `nx g lib <lib-group>/<lib-type>-<lib-name> --tags scope:<lib-type>`

#### Lib types (for tags)

Lib types force clean one way dependency graph in the workspace, see the `.eslintrc.json` file to see (or adjust) import rules between various scopes, keep in mind that we always want to preserve clean one way dependency graph

Read more [library groups](https://nx.dev/l/a/structure/grouping-libraries), [library types](https://nx.dev/l/a/structure/library-types), [tags](https://nx.dev/l/a/structure/monorepo-tags)

- **scope:feature** `nx g lib <lib-group>/feature-<lib-name> --routing --lazy --tags scope:feature --parentModule apps/<app-name>/src/app/app.module.ts` (if used in more than one app (eg when `<lib-group>` is `shared`) then copy definition form the parent module into all other consumers)
- **scope:data-access**
- **scope:data-access**
- **scope:ui**
- **scope:ui:shared**
- **scope:util**

## Generate components, services, ...

- **components** - `nx g c <optional-component-path>/<component-name> --project <project-name>`, eg `nx g c some-component --project shared-ui-main-navigation` will be generated in with `libs/shared/main-navigation/src/lib/some-component`, please note the `-` instead of `/` as that denotes the actual project name which can be double-checked in the `workspace.json`

## Move / Remove code (workspace maintenance)

1. **move** - `nx g mv --project <project-name> <new-destination>`, eg `nx g mv --project shared-ui-main-layout shared/ui-layout`, please note the `-` instead of `/` in project name as that denotes the actual project name which can be double-checked in the `workspace.json`

2. **remove** - `nx g rm <path>-<app-or-lib-name>`, optional `--dry-run` (to preview changes), eg `libs/admin/feature-dashboard` will be removed with `ng g rm admin-feature-dashboard`, please note the `-` instead of `/` as that denotes the actual project name which can be double-checked in the `workspace.json`

## Other

### Icons

Included icon set can be explored [here](https://fonts.google.com/icons)
