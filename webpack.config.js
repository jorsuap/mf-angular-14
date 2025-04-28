const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const mf = require("@angular-architects/module-federation/webpack");
const path = require("path");
const share = mf.share;

const sharedMappings = new mf.SharedMappings();
sharedMappings.register(
  path.join(__dirname, 'tsconfig.json'),
  [/* mapped paths to share */]);

module.exports = {
  output: {
    uniqueName: "mfAngular14",
    publicPath: "auto",
  },
  optimization: {
    runtimeChunk: false
  },
  resolve: {
    alias: {
      ...sharedMappings.getAliases(),
    }
  },
  experiments: {
    outputModule: true
  },
  plugins: [
    new ModuleFederationPlugin({
      library: { type: "module" },
        name: "mfAngular14",
        filename: "remoteEntry.js",
        exposes: {
            './mf-angular-remoto-14': './src/bootstrap.ts',
        },
        shared: share({
          "@angular/core": { singleton: false, strictVersion: false, requiredVersion: "^14.2.0" },
          "@angular/common": { singleton: false, strictVersion: false, requiredVersion: "^14.2.0" },
          "@angular/router": { singleton: false, strictVersion: false, requiredVersion: "^14.2.0" },
        })
    }),
    sharedMappings.getPlugin()
  ],
};



