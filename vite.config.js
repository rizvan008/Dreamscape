// import { defineConfig } from 'vite';
// import basicSsl from '@vitejs/plugin-basic-ssl';

// export default defineConfig({
//   plugins: [basicSsl()], // Enable HTTPS locally
//   server: {
//     https: true, // Force HTTPS
//     host: true,  // Allow LAN access (for mobile testing)
//   }
// });

// import { defineConfig } from 'vite'
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

// import { defineConfig } from 'vite'
// import { readFileSync } from 'node:fs'
// import path from 'node:path'

// export default defineConfig({
//   server: {
//     https: {
//       key: readFileSync(path.resolve(__dirname, 'localhost-key.pem')),
//       cert: readFileSync(path.resolve(__dirname, 'localhost.pem')),
//     },
//     host: true
//   }
// })

// import { defineConfig } from 'vite';
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
