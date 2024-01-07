/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    // Dev
    GA_MEASUREMENT_ID: "",
    GRAFANA_URL: "http://localhost:3500",
    GRAFANA_CRIME_MAP_PATH:
      "/d-solo/d2d486b4-b826-4dce-bfc3-5c863cd7f4e9/inm?orgId=1&from=1704108404832&to=1704130004832&panelId=1",
  },
};

module.exports = nextConfig;
