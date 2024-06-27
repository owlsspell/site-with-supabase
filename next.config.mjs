import path from 'path';
const __dirname = path.resolve();

/** @type {import('next').NextConfig} */
const nextConfig = {
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "euxavmocoiluteuagaod.supabase.co",
            },
        ],
    },
    webpack: (config) => {
        // Add rule for SVG files
        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack', 'url-loader'],
        });

        return config;
    },
    // reactStrictMode: true,
};

export default nextConfig;
