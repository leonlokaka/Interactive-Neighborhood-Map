import type { Metadata } from "next";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const metadata: Metadata = {
  title: "Toronto Neighborhood Map",
  description:
    "An informative platform that provide Toronto neighborhood information in interactive map ",
  icons: "/logo.png",
};

const mainMenu = [
  { title: "Home", url: "/" },
  { title: "Crime Rates Map", url: "/crime-map" },
  { title: "Recreation Map", url: "/recreation-map" },
  { title: "Art Map", url: "/art-map" },
  { title: "Cultural Hotspot Map", url: "/cultural-map" },
];

const socialLinkages = [
  { name: "GitHub", icon: GitHubIcon, link: "https://github.com/leonlokaka" },
  {
    name: "LinkedIn",
    icon: LinkedInIcon,
    link: "https://www.linkedin.com/in/leon-lo/",
  },
];

enum Panels {
  "crime_map" = "crime_map",
  "crime_heap_map" = "crime_heap_map",
  "crime_comparison_area" = "crime_comparison_area",
  "crime_ratio_compare" = "crime_ratio_compare",
  "crime_guage" = "crime_guage",
  "crime_growth_chart" = "crime_growth_chart",
}

const panelPaths = {
  crime_map: process.env.GRAFANA_CRIME_MAP_PATH,
  crime_heap_map: process.env.GRAFANA_CRIME_HEAP_MAP_PATH,
  crime_comparison_area: process.env.GRAFANA_CRIME_COMPARISON_AREA_PATH,
  crime_ratio_compare: process.env.GRAFANA_CRIME_RATIO_COMPARE_PATH,
  crime_guage: process.env.GRAFANA_CRIME_GUAGE_PATH,
  crime_growth_chart: process.env.GRAFANA_CRIME_GROWTH_CHART_PATH,
};

const panelUrls: Map<string, URL | null> = new Map<string, URL | null>([
  [Panels.crime_map, getPanelUrl(Panels.crime_map)],
  [Panels.crime_heap_map, getPanelUrl(Panels.crime_heap_map)],
  [Panels.crime_comparison_area, getPanelUrl(Panels.crime_comparison_area)],
  [Panels.crime_ratio_compare, getPanelUrl(Panels.crime_ratio_compare)],
  [Panels.crime_guage, getPanelUrl(Panels.crime_guage)],
  [Panels.crime_growth_chart, getPanelUrl(Panels.crime_growth_chart)],
]);

function getPanelUrl(panel: Panels) {
  if (panelPaths[panel] && process.env.GRAFANA_URL)
    return new URL(
      panelPaths[panel] || "",
      process.env.GRAFANA_URL
    );
  return null;
}

export {
  metadata,
  mainMenu,
  socialLinkages,
  panelPaths,
  Panels,
  getPanelUrl,
  panelUrls,
};
