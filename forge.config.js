let { join } = require('path');

module.exports = {
  packagerConfig: {
    appBundleId: 'com.dema.app',
    appCopyright: 'Copyright ©️ 2021 - jurgenjacobsen',
    name: 'DemaApp',
    platforms: [
      "win32",
      "linux",
      "darwin"
    ],
    icon: join(__dirname, 'src/images/icon.ico'),
  },
  //electronRebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin', 'linux']
    },
    {
      name: "@electron-forge/maker-squirrel",
      config: {
        setupIcon: join(__dirname, 'src/images/icon.ico'),
        setupExe: 'DemaInstaller.exe',
      }
    }
  ],
  publishers: [
    {
      name: '@electron-forge/publisher-github',
      config: {
        repository: {
          owner: 'jurgenjacobsen',
          name: 'dema-app'
        },
      }
    }
  ],
  //plugins: [ ... ],
  //hooks: { ... },
  buildIdentifier: 'dema-app'
}