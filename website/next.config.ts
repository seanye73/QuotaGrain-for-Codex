import type { NextConfig } from 'next';

const pages = process.env.QG_PAGES_BUILD === '1';
const basePath = pages ? (process.env.QG_PAGES_BASE_PATH ?? '') : '';
if (basePath !== '' && !/^\/[A-Za-z0-9][A-Za-z0-9_-]*$/.test(basePath)) {
  throw new Error('Pages base path must be empty or one repository path.');
}
const nextConfig: NextConfig = {
  ...(pages ? { output: 'export', trailingSlash: true, basePath } : {}),
  env: { NEXT_PUBLIC_SITE_BASE_PATH: basePath },
};

export default nextConfig;
