/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  env: {
    API_URL: process.env.API_URL,
    TELEPHONE: process.env.TELEPHONE,
    EMAIL: process.env.EMAIL,
    EMAIL2: process.env.EMAIL2,
    ADDRESS: process.env.ADDRESS,
    PIB: process.env.PIB,
    MB: process.env.MB,
    CODE: process.env.CODE,
    COMPANY: process.env.COMPANY,
    SITE: process.env.SITE,
    NAME: process.env.NAME,
    STREET: process.env.STREET,
    CITY: process.env.CITY,
    POSTCODE: process.env.POSTCODE,
    STATE: process.env.STATE,
    WORKINGHOURS: process.env.WORKINGHOURS,
    CAPTCHAKEY: process.env.CAPTCHAKEY,
    SLIDESPERVIEW1: process.env.SLIDESPERVIEW1,
    SLIDESPERVIEW2: process.env.SLIDESPERVIEW2,
    ADDTOCART: process.env.ADDTOCART,
    SHOW_CHECKOUT_SHIPPING_FORM: process.env.SHOW_CHECKOUT_SHIPPING_FORM,
  },
  images: {
    domains: ["api.nimaco.croonus.com", "192.168.1.223"],
    minimumCacheTTL: 60 * 60 * 12 * 90,
  },
};

module.exports = nextConfig;
