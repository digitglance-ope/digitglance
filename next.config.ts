import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ["localhost:3000", "digitglance.com", "www.digitglance.com"],
    },
  },
  async redirects() {
    return [
      // Old flat /app/* paths → new /app/invoice/* paths
      { source: '/app/invoices',          destination: '/app/invoice/invoices',      permanent: true },
      { source: '/app/invoices/new',      destination: '/app/invoice/invoices/new',  permanent: true },
      { source: '/app/invoices/:id',      destination: '/app/invoice/invoices/:id',  permanent: true },
      { source: '/app/customers',         destination: '/app/invoice/customers',     permanent: true },
      { source: '/app/suppliers',         destination: '/app/invoice/suppliers',     permanent: true },
      { source: '/app/inventory',         destination: '/app/invoice/inventory',     permanent: true },
      { source: '/app/reports',           destination: '/app/invoice/reports',       permanent: true },
      { source: '/app/settings',          destination: '/app/invoice/settings',      permanent: true },
      { source: '/app/audit',             destination: '/app/invoice/audit',         permanent: true },
      { source: '/app/users',             destination: '/app/invoice/users',         permanent: true },
      { source: '/app/subscription',      destination: '/app/invoice/subscription',  permanent: true },

      // POS platform pages — share invoice module equivalents until POS-specific versions are built
      { source: '/app/pos/users',         destination: '/app/invoice/users',         permanent: false },
      { source: '/app/pos/subscription',  destination: '/app/invoice/subscription',  permanent: false },
      { source: '/app/pos/audit',         destination: '/app/invoice/audit',         permanent: false },
    ]
  },
};

export default nextConfig;