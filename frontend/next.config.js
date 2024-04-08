/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    // Dev
    GA_MEASUREMENT_ID: "",
    GRAFANA_URL: "http://localhost:8883",
    GRAFANA_CRIME_MAP_PATH:  "/d-solo/e750f314-443f-419d-9270-9e51e73a6c0b/crimeratesmap?orgId=1&panelId=1", // var-year=2021
    GRAFANA_CRIME_HEAP_MAP_PATH:  "/d-solo/e750f314-443f-419d-9270-9e51e73a6c0b/crime-rates-map?orgId=1&panelId=2", 
    GRAFANA_CRIME_COMPARISON_AREA_PATH:  "http://localhost:8883/d-solo/dc627ba2-94df-408b-aac0-16e721ab7d9a/crime-rates-of-area?orgId=1&panelId=6",// &from=1388552400000&to=1672549200000
    GRAFANA_CRIME_RATIO_COMPARE_PATH:  "http://localhost:8883/d-solo/dc627ba2-94df-408b-aac0-16e721ab7d9a/crime-rates-of-area?orgId=1&panelId=2",
    GRAFANA_CRIME_GUAGE_PATH:  "http://localhost:8883/d-solo/dc627ba2-94df-408b-aac0-16e721ab7d9a/crime-rates-of-area?orgId=1&panelId=1",
    GRAFANA_CRIME_GROWTH_CHART_PATH:  "http://localhost:8883/d-solo/dc627ba2-94df-408b-aac0-16e721ab7d9a/crime-rates-of-area?orgId=1&panelId=3",
  },
};

module.exports = nextConfig;

//glsa_n8zbx1MoY9L9WfPLFeyiqZKtDoNyFkYN_92d2649c