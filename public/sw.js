if(!self.define){let e,s={};const a=(a,c)=>(a=new URL(a+".js",c).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(c,i)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(s[n])return;let t={};const r=e=>a(e,n),d={module:{uri:n},exports:t,require:r};s[n]=Promise.all(c.map((e=>d[e]||r(e)))).then((e=>(i(...e),t)))}}define(["./workbox-1bb06f5e"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/FeEmtQk89v_J-wNrhKvVa/_buildManifest.js",revision:"044daef8341403e95cbbdec0c64fd6d0"},{url:"/_next/static/FeEmtQk89v_J-wNrhKvVa/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/1bfc9850-ac2f4f86fc89f82c.js",revision:"ac2f4f86fc89f82c"},{url:"/_next/static/chunks/2066-187d0b7eb4412fd7.js",revision:"187d0b7eb4412fd7"},{url:"/_next/static/chunks/2089-3d53c6b03c13f749.js",revision:"3d53c6b03c13f749"},{url:"/_next/static/chunks/2439-b5b5bd213abc0b2e.js",revision:"b5b5bd213abc0b2e"},{url:"/_next/static/chunks/252f366e-2c25541eacbc6b55.js",revision:"2c25541eacbc6b55"},{url:"/_next/static/chunks/29107295-4cc022cea922dbb4.js",revision:"4cc022cea922dbb4"},{url:"/_next/static/chunks/3325-0c74637d2df82ff8.js",revision:"0c74637d2df82ff8"},{url:"/_next/static/chunks/3613-d183c39947fa7866.js",revision:"d183c39947fa7866"},{url:"/_next/static/chunks/386-94a0b77537a63118.js",revision:"94a0b77537a63118"},{url:"/_next/static/chunks/4635-5942385aa2986a72.js",revision:"5942385aa2986a72"},{url:"/_next/static/chunks/545f34e4-9168457277c208d5.js",revision:"9168457277c208d5"},{url:"/_next/static/chunks/5994-6a8a2cc62c92e13a.js",revision:"6a8a2cc62c92e13a"},{url:"/_next/static/chunks/6091-c18b8b73ce462403.js",revision:"c18b8b73ce462403"},{url:"/_next/static/chunks/649-ca4bc55c5a5f88f8.js",revision:"ca4bc55c5a5f88f8"},{url:"/_next/static/chunks/6745.89e10905f95c7121.js",revision:"89e10905f95c7121"},{url:"/_next/static/chunks/6987-454017ff8150ef3a.js",revision:"454017ff8150ef3a"},{url:"/_next/static/chunks/6c44d60f.456060dda8b048f2.js",revision:"456060dda8b048f2"},{url:"/_next/static/chunks/7229.7b2254cd3a925612.js",revision:"7b2254cd3a925612"},{url:"/_next/static/chunks/7821-0fc40815894ac095.js",revision:"0fc40815894ac095"},{url:"/_next/static/chunks/78e521c3-9b739bef7af73ea8.js",revision:"9b739bef7af73ea8"},{url:"/_next/static/chunks/8730-620d1b8c22f1768d.js",revision:"620d1b8c22f1768d"},{url:"/_next/static/chunks/9175-a7a3fe84080087c9.js",revision:"a7a3fe84080087c9"},{url:"/_next/static/chunks/95b64a6e-ab068f5264b3dcba.js",revision:"ab068f5264b3dcba"},{url:"/_next/static/chunks/9880.f98da60907350492.js",revision:"f98da60907350492"},{url:"/_next/static/chunks/ae51ba48-8d26639ae7aae636.js",revision:"8d26639ae7aae636"},{url:"/_next/static/chunks/d0c16330-b416e97bffb9f0ac.js",revision:"b416e97bffb9f0ac"},{url:"/_next/static/chunks/framework-0e8d27528ba61906.js",revision:"0e8d27528ba61906"},{url:"/_next/static/chunks/main-96a211b016bcff73.js",revision:"96a211b016bcff73"},{url:"/_next/static/chunks/pages/__index-8b59c9ef35c69f83.js",revision:"8b59c9ef35c69f83"},{url:"/_next/static/chunks/pages/__login-5c2246b7752e9556.js",revision:"5c2246b7752e9556"},{url:"/_next/static/chunks/pages/_app-d60aec0b2745c752.js",revision:"d60aec0b2745c752"},{url:"/_next/static/chunks/pages/_error-08caa031b975b88d.js",revision:"08caa031b975b88d"},{url:"/_next/static/chunks/pages/busca/avancada-df0e0a31f6b480e9.js",revision:"df0e0a31f6b480e9"},{url:"/_next/static/chunks/pages/busca/simples-d4f2a51cd62be95f.js",revision:"d4f2a51cd62be95f"},{url:"/_next/static/chunks/pages/clientes-339f84714a1e0239.js",revision:"339f84714a1e0239"},{url:"/_next/static/chunks/pages/clientes/%5BclientId%5D/editar-d38bbd1ce8191278.js",revision:"d38bbd1ce8191278"},{url:"/_next/static/chunks/pages/clientes/%5BclientId%5D/pastas-71704c1145a3898e.js",revision:"71704c1145a3898e"},{url:"/_next/static/chunks/pages/clientes/%5BclientId%5D/pastas/%5BfolderId%5D/editar-ff51401459e76672.js",revision:"ff51401459e76672"},{url:"/_next/static/chunks/pages/clientes/%5BclientId%5D/pastas/%5BfolderId%5D/proposicoes-13fbeab7bb88c875.js",revision:"13fbeab7bb88c875"},{url:"/_next/static/chunks/pages/clientes/%5BclientId%5D/pastas/__index-e7bc751d2683060f.js",revision:"e7bc751d2683060f"},{url:"/_next/static/chunks/pages/clientes/%5BclientId%5D/pastas/cadastrar-92342336f4786be8.js",revision:"92342336f4786be8"},{url:"/_next/static/chunks/pages/clientes/cadastrar-3675f4e9dce113fc.js",revision:"3675f4e9dce113fc"},{url:"/_next/static/chunks/pages/external-customer-register-2b0bf192a77f6c26.js",revision:"2b0bf192a77f6c26"},{url:"/_next/static/chunks/pages/index-c5395609ef96a788.js",revision:"c5395609ef96a788"},{url:"/_next/static/chunks/pages/login-f17bf76c99b949d4.js",revision:"f17bf76c99b949d4"},{url:"/_next/static/chunks/pages/logout-e891c17cf70aae20.js",revision:"e891c17cf70aae20"},{url:"/_next/static/chunks/pages/monitoramento-ba1469fc3009ef15.js",revision:"ba1469fc3009ef15"},{url:"/_next/static/chunks/pages/monitoramento/%5BsearchId%5D/editar-65d9df014cdd1201.js",revision:"65d9df014cdd1201"},{url:"/_next/static/chunks/pages/monitoramento/cadastrar-c9fc4448624d3a25.js",revision:"c9fc4448624d3a25"},{url:"/_next/static/chunks/pages/monitoramento/resultados/%5BsearchId%5D-caf67e4f3746d5d0.js",revision:"caf67e4f3746d5d0"},{url:"/_next/static/chunks/pages/notification-32c2d67f58e4e228.js",revision:"32c2d67f58e4e228"},{url:"/_next/static/chunks/pages/proposicoes/%5BpropositionId%5D-3a7585a0fae6cbd1.js",revision:"3a7585a0fae6cbd1"},{url:"/_next/static/chunks/pages/usuarios-0a6301b3af4cd324.js",revision:"0a6301b3af4cd324"},{url:"/_next/static/chunks/pages/usuarios/cadastrar-f2ff92fc8d53660d.js",revision:"f2ff92fc8d53660d"},{url:"/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",revision:"79330112775102f91e1010318bae2bd3"},{url:"/_next/static/chunks/webpack-0729f429209b1f87.js",revision:"0729f429209b1f87"},{url:"/_next/static/css/27c0dd259d518f86.css",revision:"27c0dd259d518f86"},{url:"/_next/static/css/78ae2e498d49f2ff.css",revision:"78ae2e498d49f2ff"},{url:"/_next/static/css/b17afcd90b9a5557.css",revision:"b17afcd90b9a5557"},{url:"/_next/static/css/c52010833e4528d6.css",revision:"c52010833e4528d6"},{url:"/_next/static/css/dd6d1a3d83835d56.css",revision:"dd6d1a3d83835d56"},{url:"/_next/static/media/background-register.629e803d.jpg",revision:"629e803d"},{url:"/_next/static/media/background.43f4b9c1.jpg",revision:"43f4b9c1"},{url:"/_next/static/media/binoculars-see-svgrepo-com 1.dd584212.svg",revision:"dd584212"},{url:"/_next/static/media/default-image-user-profile.58d9bad5.svg",revision:"cb9ddaf9b20705dbe13cabf51994c04c"},{url:"/_next/static/media/delete-icon.fb760fc3.svg",revision:"c9f8f600dbd2e8408e1b082992bdfb5d"},{url:"/_next/static/media/edit-icon.7c935108.svg",revision:"b286cff13d81157cf7e0588486101bf8"},{url:"/_next/static/media/edit-svgrepo-com 1.38701d49.svg",revision:"3c8dcc27b4606d5d8bf2f207ca064723"},{url:"/_next/static/media/eye-svgrepo-com 1.2f4a0b1b.svg",revision:"652f391167ae7e4fe27225ae0fca1f9a"},{url:"/_next/static/media/folder-minus-svgrepo-com.2871b9c4.svg",revision:"e5bdec18f55b71c91478b00a18174642"},{url:"/_next/static/media/human-svg-dashboard.51d729f6.svg",revision:"f9672498a15331592a3738cfbb10b945"},{url:"/_next/static/media/iconLogo.131aab08.svg",revision:"98d9e21b0cc07f5b5f35a38ad124a76f"},{url:"/_next/static/media/newlogo-removebg-preview.43421114.png",revision:"de9d56968747622cf6dbda7cbfa58e5f"},{url:"/_next/static/media/notification-icon.2b147c7a.svg",revision:"eb4fb5128950a5d12c13a83a584e0dd4"},{url:"/_next/static/media/trash-bin-minimalistic-svgrepo-com 1.97ca2839.svg",revision:"0df706a6c1b3918c0a4948daaa48e225"},{url:"/icons/android-chrome-192x192.png",revision:"9e0a819439163510584b4200a8df87b2"},{url:"/icons/android-chrome-384x384.png",revision:"3e5e70cc8886067bea4230d302d32436"},{url:"/icons/apple-touch-icon.png",revision:"61e2d00ea0fff488f62cd7eddca4cc66"},{url:"/icons/browserconfig.xml",revision:"68c9044fa4a08749efb85bb2a4edaede"},{url:"/icons/favicon-16x16.png",revision:"75a062adf1e1ac26e0a6374e3b869af4"},{url:"/icons/favicon-32x32.png",revision:"c1081576a82db3faf14353c66e52fea0"},{url:"/icons/favicon.ico",revision:"45f31d618d79d60d3157d43418df4818"},{url:"/icons/mstile-150x150.png",revision:"ba2357fa737195f32f26b7d90967e217"},{url:"/icons/safari-pinned-tab.svg",revision:"758dcca15dbec9fe1f57a79a639b0ce2"},{url:"/icons/site.webmanifest",revision:"facd21a39afa138ed313c2dfa91498c1"},{url:"/images/background-register.jpg",revision:"3f8698b65e8de90b7d546da69b4b7a00"},{url:"/images/background.jpg",revision:"d3d7c2afaf4c718c65d6826c3843ef62"},{url:"/images/binoculars-see-svgrepo-com 1.svg",revision:"ecdc655b237935a1df6dba6c83140cf4"},{url:"/images/default-image-user-profile.svg",revision:"cb9ddaf9b20705dbe13cabf51994c04c"},{url:"/images/delete-icon.svg",revision:"c9f8f600dbd2e8408e1b082992bdfb5d"},{url:"/images/edit-icon.svg",revision:"b286cff13d81157cf7e0588486101bf8"},{url:"/images/edit-svgrepo-com 1 copy.svg",revision:"3c8dcc27b4606d5d8bf2f207ca064723"},{url:"/images/edit-svgrepo-com 1.svg",revision:"3c8dcc27b4606d5d8bf2f207ca064723"},{url:"/images/eye-svgrepo-com 1.svg",revision:"652f391167ae7e4fe27225ae0fca1f9a"},{url:"/images/folder-minus-svgrepo-com.svg",revision:"e5bdec18f55b71c91478b00a18174642"},{url:"/images/human-svg-dashboard.svg",revision:"f9672498a15331592a3738cfbb10b945"},{url:"/images/iconLogo.svg",revision:"98d9e21b0cc07f5b5f35a38ad124a76f"},{url:"/images/newlogo-removebg-preview.png",revision:"de9d56968747622cf6dbda7cbfa58e5f"},{url:"/images/notification-icon.svg",revision:"eb4fb5128950a5d12c13a83a584e0dd4"},{url:"/images/observatorio_brasil_logo.png",revision:"6b26bfe1ce3d8e41732d3935d040652a"},{url:"/images/trash-bin-minimalistic-svgrepo-com 1 copy.svg",revision:"0df706a6c1b3918c0a4948daaa48e225"},{url:"/images/trash-bin-minimalistic-svgrepo-com 1.svg",revision:"0df706a6c1b3918c0a4948daaa48e225"},{url:"/manifest.json",revision:"d9cc0c1b27d560748c9ea42c472edc96"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:c})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
