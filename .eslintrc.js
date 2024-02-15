module.exports = {
    parserOptions: {
        "ecmaVersion": "latest"
      },
    plugins: ['unused-imports'],
    rules: {
      'unused-imports/no-unused-imports': 'error'
    }
  };