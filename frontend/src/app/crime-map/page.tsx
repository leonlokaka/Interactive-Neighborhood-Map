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
import SimpleCard from "../common/SimpleCard";
import DateRangeIcon from "@mui/icons-material/DateRange";
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

  const panelPath = process.env.GRAFANA_CRIME_MAP_PATH;
  const panelURL = panelPath ? new URL(panelPath, process.env.GRAFANA_URL) : "";
  
  return (
    <Container maxWidth="xl">
      <Grid container spacing={4} justifyContent={"center"}>
        <Grid item xs={12} md={4}>
          <SimpleCard title="Data Explanation">
            <>
              <Typography variant="body1">
                Crime rate is calculated as the crime count per 100,000
                population (resident population only) per year.
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "row", mt: 2 }}>
                <DateRangeIcon />
                <Typography variant="body1" ml={2}>
                  {" "}
                  Date Range: 2020-2022
                </Typography>
              </Box>
            </>
          </SimpleCard>
        </Grid>
        <Grid item xs={12} md={4}>
          <SimpleCard title="Heapmap Explanation" contentCenter>
            <HeapmapExplanation
              colorBarWidth={250}
              pointerLabelWidth={100}
              pointers={[
                {
                  text: "Lower Crime Rates",
                  position: 0,
                },
                {
                  text: "Higher Crime Rates",
                  position: 100,
                },
              ]}
            />
          </SimpleCard>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
            <iframe
              ref={iframeRef}
              src={panelURL.toString()}
              width={size.width ? size.width * 0.9 : 800}
              height={size.height ? size.height * 0.8 : 500}
              frameBorder="0"
            ></iframe>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
