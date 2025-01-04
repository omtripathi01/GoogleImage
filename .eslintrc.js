module.exports = {
  root: true,
  extends: [
    '@react-native',
    'plugin:prettier/recommended',  // Integrates Prettier with ESLint
    'eslint:recommended',           // Recommended ESLint rules
    'plugin:react/recommended',     // React-specific linting
    'plugin:react-native/all',      // React Native-specific linting rules
  ],
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 2020,  // Ensure we support the latest JavaScript features
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,  // Enable JSX support
    },
  },
  plugins: ['react', 'react-native', 'prettier'],
  env: {
    'react-native/react-native': true, // Enable React Native global variables
    jest: true,  // Enable Jest testing environment
    browser: true, // Support for browser global variables if needed
  },
  rules: {
    // Prettier rule enforcement (ensures that code follows Prettier's rules)
    'prettier/prettier': 'error',
    
    // React rules
    'react/prop-types': 'off', // You may disable prop-types if using TypeScript or other methods for type checking
    'react/react-in-jsx-scope': 'off', // Since React 17+, it's not necessary to import React explicitly
    
    // React Native rules
    'react-native/no-inline-styles': 'warn', // Warn about inline styles
    'react-native/no-color-literals': 'warn', // Warn about color literals
    
    // ESLint rules
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],  // Ignore unused function arguments prefixed with `_`
    'no-console': 'warn', // Warn about console statements (you can change this to 'error' if needed)
    
    // Other custom rules can be added as needed
  },
  settings: {
    react: {
      version: 'detect', // Automatically detect the React version
    },
  },
};
