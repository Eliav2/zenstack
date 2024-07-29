import { Prisma } from '@prisma/client';

// import path from 'path';
// import { existsSync } from 'fs';
// import { pkgUp } from 'pkg-up';
//
// async function getDefaultOutdir(outputDir: string): Promise<string> {
//     if (outputDir.endsWith('node_modules/@prisma/client')) {
//         return path.join(outputDir, '../../.prisma/client');
//     }
//     if (
//         process.env.INIT_CWD &&
//         process.env.npm_lifecycle_event === 'postinstall' &&
//         !process.env.PWD?.includes('.pnpm')
//     ) {
//         // INIT_CWD is the dir, in which "npm install" has been invoked. That can e.g. be in ./src
//         // If we're in ./ - there'll also be a package.json, so we can directly go for it
//         // otherwise, we'll go up in the filesystem and look for the first package.json
//         if (existsSync(path.join(process.env.INIT_CWD, 'package.json'))) {
//             return path.join(process.env.INIT_CWD, 'node_modules/.prisma/client');
//         }
//         const packagePath = await pkgUp({ cwd: process.env.INIT_CWD });
//         if (packagePath) {
//             return path.join(path.dirname(packagePath), 'node_modules/.prisma/client');
//         }
//     }
//
//     return path.join(outputDir, '../../.prisma/client');
// }
//
// console.log(await getDefaultOutdir('.'));

// const p = import.meta.resolve('@zenstackhq/runtime');
// console.log(p)

const p = require.resolve('@zenstackhq/runtime');
console.log(p);
