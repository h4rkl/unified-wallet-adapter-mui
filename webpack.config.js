import path from 'path';
import { fileURLToPath } from 'url';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import nodeExternals from 'webpack-node-externals';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('Resolved node_modules:', path.resolve(__dirname, 'node_modules'));
console.log('Resolved src/pages:', path.resolve(__dirname, 'src/pages'));

export default {
  mode: 'production',
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'components.esm.js',
    libraryTarget: 'module',
    chunkFormat: 'module'
  },
  experiments: {
    outputModule: true
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    plugins: [new TsconfigPathsPlugin()],
    alias: {
      '@src': path.resolve(__dirname, 'src/')
    }
  },
  externalsType: 'module',
  externals: [
    nodeExternals({
      allowlist: [/^@src\//]
    }),
    {
      react: 'react',
      'react-dom': 'react-dom',
      '@mui/material': '@mui/material',
      '@mui/icons-material': '@mui/icons-material',
      '@solana/wallet-adapter-base': '@solana/wallet-adapter-base',
      '@solana/wallet-adapter-react': '@solana/wallet-adapter-react',
      '@solana/web3.js': '@solana/web3.js',
      '@solana-mobile/wallet-adapter-mobile': '@solana-mobile/wallet-adapter-mobile'
    }
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: 'ts-loader',
        exclude: [
          /node_modules/,
          /src[\/\\]pages[\/\\]/
        ],
      }
    ]
  }
};