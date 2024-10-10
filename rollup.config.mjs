import replace from '@rollup/plugin-replace';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import size from 'rollup-plugin-size';
import nodeResolve from '@rollup/plugin-node-resolve';
import { babel } from '@rollup/plugin-babel';

const PACKAGE_NAME = 'ReactDecoupler';
const FILE_BASE_NAME = 'react-decoupler';

const external = ['react', 'prop-types'];
const globals = {
  react: 'React',
  'prop-types': 'PropTypes',
};

const input = 'src/index.js';

const babelOptions = {
  exclude: /node_modules/,
  babelHelpers: 'bundled',
  babelrc: true,
};

const replaceOptions = {
  exclude: 'node_modules/**',
  preventAssignment: true,
};

export default [
  {
    input,
    output: {
      file: `dist/${FILE_BASE_NAME}.mjs`,
      format: 'es',
      sourcemap: true,
    },
    external,
    plugins: [
      replace({
        ...replaceOptions,
        'process.env.NODE_ENV': JSON.stringify('dev'),
      }),
      nodeResolve(),
      babel(babelOptions),
      commonjs(),
    ],
  },
  {
    input,
    output: {
      file: `dist/${FILE_BASE_NAME}.min.mjs`,
      format: 'es',
      sourcemap: true,
    },
    external,
    plugins: [
      replace({
        ...replaceOptions,
        'process.env.NODE_ENV': JSON.stringify('production'),
      }),
      nodeResolve(),
      babel(babelOptions),
      commonjs(),
      terser(),
    ],
  },
  {
    input,
    output: {
      name: PACKAGE_NAME,
      file: `dist/${FILE_BASE_NAME}.development.js`,
      format: 'umd',
      sourcemap: true,
      globals,
    },
    external,
    plugins: [
      replace({
        ...replaceOptions,
        'process.env.NODE_ENV': JSON.stringify('dev'),
      }),
      nodeResolve(),
      babel(babelOptions),
      commonjs(),
    ],
  },
  {
    input,
    output: {
      name: PACKAGE_NAME,
      file: `dist/${FILE_BASE_NAME}.production.min.js`,
      format: 'umd',
      sourcemap: true,
      globals,
    },
    external,
    plugins: [
      replace({
        ...replaceOptions,
        'process.env.NODE_ENV': JSON.stringify('production'),
      }),
      nodeResolve(),
      babel(babelOptions),
      commonjs(),
      terser(),
      size(),
    ],
  },
];
