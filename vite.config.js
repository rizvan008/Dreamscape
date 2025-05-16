import { defineConfig } from 'vite';
import restart from 'vite-plugin-restart'
import basicSsl from '@vitejs/plugin-basic-ssl';

export default defineConfig({
    root: 'src/', // Sources files (typically where index.html is)
    publicDir: '../static/', // Path from "root" to static assets (files that are served as they are)
    server:
    {
            // Enable HTTPS locally
        https: true, // Force HTTPS
        host: true, // Open to local network and display URL
        open: !('SANDBOX_URL' in process.env || 'CODESANDBOX_HOST' in process.env) // Open if it's not a CodeSandbox
    },
    build:
    {
        outDir: '../dist', // Output in the dist/ folder
        emptyOutDir: true, // Empty the folder first
        sourcemap: true // Add sourcemap
    },
    plugins:
    [
        basicSsl({
            /** name of certification */
            name: 'Local certification',
            /** custom trust domains */
            domains: ['*.custom.com'],
            /** custom certification directory */
            certDir: '/Users/.../.devServer/cert',
          }),
        restart({ restart: [ '../static/**', ] }) // Restart server on static file change
    ],
});


// import { readFileSync } from 'node:fs'

// export default defineConfig({
//   server: {
//     https: {
//       key: readFileSync('localhost-key.pem'),
//       cert: readFileSync('localhost.pem'),
//       // Add these security options:
//       minVersion: 'TLSv1.2',
//       ciphers: 'HIGH:!aNULL:!eNULL:!EXPORT:!DES:!RC4:!MD5:!PSK:!SRP:!CAMELLIA'
//     },
//     host: true,
//   }
// })

// import { readFileSync } from 'node:fs'
// import path from 'node:path'

// export default defineConfig({
//   server: {
//     https: {
//    //   key: readFileSync(path.resolve(__dirname, 'localhost-key.pem')),
//    //  cert: readFileSync(path.resolve(__dirname, 'localhost.pem')),
//       key: readFileSync(path.resolve(devServer\cert, 'localhost-key.pem')),
//       cert: readFileSync(path.resolve(devServer\cert, 'localhost.pem')),
//     },
//     host: true
//   }
// })

// import fs from 'fs';

// export default defineConfig({
//   server: {
//     https: {
//       key: fs.readFileSync('localhost-key.pem'),
//       cert: fs.readFileSync('localhost.pem'),
//     },
//     host: true, // Enable LAN access for mobile testing
//   }
// });
