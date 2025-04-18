// import { defineConfig } from 'vite';
// import basicSsl from '@vitejs/plugin-basic-ssl';

// export default defineConfig({
  // plugins: [basicSsl()], // Enable HTTPS locally
//   server: {
//     https: true, // Force HTTPS
//     host: true,  // Allow LAN access (for mobile testing)
//   }
// });

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


// export default defineConfig({
//   server: {
//     https: {
//       key: readFileSync('localhost-key.pem'),
//       cert: readFileSync('localhost.pem'),
//       secureOptions: {
//         minVersion: 'TLSv1.2',
//         ciphers: [
//           'TLS_AES_128_GCM_SHA256',
//           'TLS_AES_256_GCM_SHA384',
//           'TLS_CHACHA20_POLY1305_SHA256'
//         ].join(':')
//       }
//     }
//   }
// })