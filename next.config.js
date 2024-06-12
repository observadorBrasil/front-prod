const runtimeCaching = require("next-pwa/cache");
const withPwa = require("next-pwa");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["observatoriolake.blob.core.windows.net"],
  },
  pwa: {
    disable: process.env.NODE_ENV === "development",
    dest: "public",
    runtimeCaching,
  },
  output: "standalone",
};

module.exports = withPwa(nextConfig);

// // eslint-disable-next-line @typescript-eslint/no-var-requires
// const withNx = require("@nrwl/next/plugins/with-nx");
// const runtimeCaching = require("next-pwa/cache");
// const withPwa = require("next-pwa");
// const path = require("path");

// /**
//  * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
//  **/

// const nextConfig = {
//   images: {
//     domains: ["observatoriolake.blob.core.windows.net"],
//   },
//   pwa: {
//     disable: process.env.NODE_ENV === "development",
//     dest: "public",
//     runtimeCaching,
//   },
//   nx: {
//     // Set this to true if you would like to to use SVGR
//     // See: https://github.com/gregberge/svgr
//     svgr: false,
//   },
//   experimental: {
//     outputStandalone: true,
//     outputFileTracingRoot: path.join(__dirname, "../../"),
//   },
// };

// module.exports = withPwa(withNx(nextConfig));
