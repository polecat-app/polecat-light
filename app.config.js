import 'dotenv/config';

export default ({ config }) => ({
  ...config,
  expo: {
    name: 'Polecat',
    slug: 'Polecat',
    version: '1.0.1',
    orientation: 'portrait',
    icon: './assets/icon.png',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#20b2aa'
    },
    updates: {
      fallbackToCacheTimeout: 0
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      buildNumber: '4',
      supportsTablet: true,
      bundleIdentifier: 'com.wilddevs.polecat.free'
    },
    android: {
      versionCode: 4,
      androidStatusBar: {
        backgroundColor: '#008080'
      },
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#20b2aa'
      },
      package: 'com.wilddevs.polecat.free.test',
      config: {
        googleMaps: {
          apiKey: process.env.GOOGLE_MAPS_API_KEY,
        },
      },
    },
    web: {
      favicon: './assets/favicon.png'
    },
    extra: {
      eas: {
        projectId: '1f23fab5-d23f-4733-976c-830f6cf3e4dc'
      }
    }
  }
});
