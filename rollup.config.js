import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import { nodeExternals } from 'rollup-plugin-node-externals';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read package.json manually
const pkg = JSON.parse(readFileSync(resolve(__dirname, './package.json'), 'utf8'));

const config = {
  name: 'UnifiedWallet',
  extensions: ['.ts', '.tsx', '.js', '.jsx'],
};

export default {
  input: 'src/index.tsx',
  output: [
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true,
    },
  ],
  external: ['react', 'react-dom', '@emotion/react', '@emotion/styled', '@mui/material'],
  plugins: [
    nodeExternals({
      exclude: [/^react-use/],
    }),

    nodeResolve({ extensions: config.extensions }),

    commonjs(),
    babel({
      extensions: config.extensions,
      include: ['src/**/*'],
      exclude: 'node_modules/**',
    }),
  ],
};
