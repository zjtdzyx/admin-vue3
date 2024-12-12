import antfu from '@antfu/eslint-config'

export default antfu(
  {
    unocss: true,
    ignores: ['public', 'dist*', 'node_modules', 'src'], // 修正了这里的逗号
  },
  {
    rules: {
      'eslint-comments/no-unlimited-disable': 'off',
      'curly': ['error', 'all'],
      'ts/no-unused-expressions': [
        'error',
        {
          allowShortCircuit: true,
          allowTernary: true,
        },
      ],
    },
  },
  {
    files: ['src/**/*.vue'],
    rules: {
      'vue/block-order': [
        'error',
        {
          order: ['route', 'script', 'template', 'style'],
        },
      ],
    },
  },
)