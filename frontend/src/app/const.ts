import type { Metadata } from "next";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const metadata: Metadata = {
  title: "Toronto Neighborhood Map",
  description: "An informative platform that provide Toronto neighborhood information in interactive map ",
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

export { metadata, mainMenu, socialLinkages };
