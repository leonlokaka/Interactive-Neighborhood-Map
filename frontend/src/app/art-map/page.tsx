"use client";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { useRef, useState } from "react";
import { useWindowSize } from "@uidotdev/usehooks";
import HeapmapExplanation from "../common/HeapmapExplanation";

export default function Page() {
  //   const [arg, setArg] = useState<any>(true);
  //   const updateFilter = () => {
  //     setArg(!arg);
  //     if (arg) iframeRef.current.src = dataUrl;
  //     else iframeRef.current.src = "";
  //   };
  const iframeRef = useRef<any>(null);
  const size = useWindowSize();

  //   const dataUrl =
  //     "http://mylocal.com:3000/d-solo/d2d486b4-b826-4dce-bfc3-5c863cd7f4e9/inm?orgId=1&from=1704108404832&to=1704130004832&panelId=1&var-test=North%20Toronto&var-text=https:%2F%2Fleonlokaka.github.io%2FInteractive-Neighborhood-Map-Datasource%2Fneighbourhood-crime-rates.json";

  const panelPath =
    "/d-solo/d2d486b4-b826-4dce-bfc3-5c863cd7f4e9/inm?orgId=1&from=1704108404832&to=1704130004832&panelId=1";
  const panelURL = new URL(panelPath, process.env.grafanaUrl);

  return (
    <Container maxWidth="xl">
      <Grid container spacing={4} justifyContent={"center"}>
        <Grid item xs={12}>
          <Box sx={{ display: "flex", justifyContent: "center", mb: 4, minHeight: "50vh" }}>
            <Typography variant="h6">Coming Soon</Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
