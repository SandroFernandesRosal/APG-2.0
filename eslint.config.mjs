import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  {
    ignores: [
      '*.d.ts', // Ignora todos os arquivos de declaração de tipos
      'src/app/generated/**',
      'prisma/**',
    ],
  },
  ...compat.extends(
    'next/core-web-vitals',
    'next/typescript',
    '@rocketseat/eslint-config/next',
  ),
]

export default eslintConfig
