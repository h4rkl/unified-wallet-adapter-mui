import path from 'path';
import { fileURLToPath } from 'url';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import nodeExternals from 'webpack-node-externals';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseConfig = {
  mode: 'production',
  entry: './src/index.ts',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    plugins: [new TsconfigPathsPlugin()],
    alias: {
      '@src': path.resolve(__dirname, 'src/'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: 'ts-loader',
        exclude: [/node_modules/, path.resolve(__dirname, 'src/pages')],
      },
    ],
  },
};

const externalPackages = {
  react: 'react',
  'react-dom': 'react-dom',
  '@mui/material': '@mui/material',
  '@solana/wallet-adapter-base': '@solana/wallet-adapter-base',
  '@solana/wallet-adapter-react': '@solana/wallet-adapter-react',
  '@solana/web3.js': '@solana/web3.js',
  '@solana-mobile/wallet-adapter-mobile': '@solana-mobile/wallet-adapter-mobile',
};

const esmConfig = {
  ...baseConfig,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'components.esm.js',
    library: { type: 'module' },
    chunkFormat: 'module',
    module: true,
  },
  experiments: {
    outputModule: true,
  },
  externalsType: 'import',
  externals: [
    nodeExternals({
      allowlist: [/^@src\//],
      importType: 'module',
    }),
    externalPackages,
  ],
};

const cjsConfig = {
  ...baseConfig,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'components.cjs.js',
    libraryTarget: 'commonjs2',
  },
  externalsType: 'commonjs',
  externals: [
    nodeExternals({
      allowlist: [/^@src\//],
    }),
    externalPackages,
  ],
};

export default [esmConfig, cjsConfig];
