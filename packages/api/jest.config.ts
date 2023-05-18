import type { Config } from "jest";
/**  */
export default {
  clearMocks: true,
  coverageProvider: 'v8',
  preset: 'ts-jest/presets/js-with-ts',
  setupFiles: ['dotenv/config'],
  transform: {
    // '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.mjs$': 'ts-jest',
  },
} satisfies Config