module.exports = {
  presets: [
    [
      'next/babel',
      {
        'preset-react': {
          runtime: 'automatic',
          importSource: '@emotion/react',
        },
      },
    ],
  ],
  plugins: [
  '@emotion/babel-plugin', 
  'babel-plugin-macros', 
  ['module-resolver', {
    "alias": {
            "~cms/*": "./src/cms",
      "~components/*": "./src/components",
      "~constants/*": "./src/constants",
      "~contexts/*": "./src/contexts",
      "~entities/*": "./src/entities",
      "~pages/*": "./src/pages",
      "~services/*": "./src/services",
      "~styles/*": "./src/styles",
      "~utils/*": "./src/utils"
    }
  }]
],
}