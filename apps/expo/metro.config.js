// Learn more: https://docs.expo.dev/guides/monorepos/
const { getDefaultConfig } = require("@expo/metro-config");
const path = require("path");

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, "../..");

// Create the default Metro config
const config = getDefaultConfig(projectRoot);

// Add import aliases
config.resolver.alias = {
  "~": path.resolve(projectRoot, "src"),
  "@assets": path.resolve(projectRoot, "assets"),
};

// Add the additional `cjs` extension to the resolver
config.resolver.sourceExts.push("cjs");

// 1. Watch all files within the monorepo
config.watchFolders = [workspaceRoot];
// 2. Let Metro know where to resolve packages and in what order
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, "node_modules"),
  path.resolve(workspaceRoot, "node_modules"),
];
// 3. Force Metro to resolve (sub)dependencies only from the `nodeModulesPaths`
// config.resolver.disableHierarchicalLookup = true;

// allow resolving svg assets
config.transformer.babelTransformerPath = require.resolve(
  "react-native-svg-transformer",
);
config.resolver.sourceExts.push("svg");
config.resolver.assetExts = config.resolver.assetExts.filter(
  (/** @type {string} */ ext) => ext !== "svg",
);

// @see https://github.com/facebook/react-native/issues/36794#issuecomment-1500880284
config.server = {
  rewriteRequestUrl: (/** @type {string} */ url) => {
    if (!url.endsWith(".bundle")) {
      return url;
    }
    // https://github.com/facebook/react-native/issues/36794
    // JavaScriptCore strips query strings, so try to re-add them with a best guess.
    return (
      url +
      "?platform=ios&dev=true&minify=false&modulesOnly=false&runModule=true"
    );
  }, 
};

module.exports = config;
