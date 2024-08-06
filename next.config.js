
//const withSass = require('@zeit/next-sass');

module.exports =

//withSass(
{
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  output: 'export',
  images: {
    loader: 'imgix',
    path: '',
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  webpack: config => {
    config.module.rules.push(
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      }
    );
    return config;
  }
}
//)