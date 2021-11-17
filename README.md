# ts-key-performance-issue

This repository is meant to represent a minimal reproduction of a TypeScript performance issue.
It is extracted and isolated from another project.

Have a look at the `script` section of the `package.json` for the generation of diagnostic files.

A sample output of the `--extendedDiagnostic` can be found in the `diagnostic.txt`

See the issue which references this repository: [TypeScript issue #46840](https://github.com/microsoft/TypeScript/issues/46840)


# This is resolved!

This issue is resolved by the comment: https://github.com/microsoft/TypeScript/issues/46783#issuecomment-967752897

I swapped

```ts
    type NewRM = RM & { [Key in Identifier]: MappedType };
```

with

```ts
    type NewRM = RM & Record<Identifier, MappedType>;
```

and this brings the check time from 50s down to 0.25s.
