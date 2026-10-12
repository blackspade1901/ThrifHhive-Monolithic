/** Jest config — project uses native ESM ("type": "module" in package.json),
 * so no transform is applied; tests run via `node --experimental-vm-modules`. */
export default {
  testEnvironment: "node",
  transform: {},
  testMatch: ["**/tests/**/*.test.js"],
  setupFilesAfterEnv: ["<rootDir>/tests/setup.js"]
};
