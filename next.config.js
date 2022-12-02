/** @type {import('next').NextConfig} */
const CopyPlugin = require('copy-webpack-plugin');

const nextConfig = {
  basePath: '/taxi-trip-fare-prediction',
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/_next/static/chunks/pages/\\*onnx',
        locale: false,
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=9999999999, must-revalidate',
          }
        ],
      },
    ]
  },
  webpack: (config, {  }) => {
    config.plugins.push(
      new CopyPlugin({
        patterns: [
          {
            from: './node_modules/onnxruntime-web/dist/ort-wasm.wasm',
            to: 'static/chunks/pages',
          },             {
            from: './node_modules/onnxruntime-web/dist/ort-wasm-simd.wasm',
            to: 'static/chunks/pages',
          },          
          {
            from: './models/dl.onnx',
            to: 'static/chunks/pages',
          },
          {
            from: './models/lgbm.onnx',
            to: 'static/chunks/pages',
          },
        ],
      }),
    );

    return config;
  }
}

module.exports = nextConfig
