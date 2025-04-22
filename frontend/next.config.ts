import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  images: {
    domains: ['avatars.githubusercontent.com']
  }
  /* config options here */
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
