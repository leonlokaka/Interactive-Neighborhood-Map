"use client";
import {
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { RefObject, useCallback, useEffect, useRef, useState } from "react";
import { useWindowSize } from "@uidotdev/usehooks";
import SimpleCard from "../common/SimpleCard";
import { Panels, panelUrls } from "../const";
import {
  ChartContainer,
  chartAltMessage,
} from "../common/Component";
import {
  NeighbourhoodFilterData,
  NeighbourhoodFilters,
  NeighbourhoodFilterTypes,
} from "../common/neighbourhoodFilters";

export default function Page() {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const iframeRefs: Map<string, RefObject<HTMLIFrameElement>> = new Map<
    string,
    any
  >([
    [Panels.crime_comparison_area, useRef<HTMLIFrameElement>(null)],
    [Panels.crime_ratio_compare, useRef<HTMLIFrameElement>(null)],
    [Panels.crime_guage, useRef<HTMLIFrameElement>(null)],
    [Panels.crime_growth_chart, useRef<HTMLIFrameElement>(null)],
  ]);

  const size = useWindowSize();
  const [panelUrlsObj, setPanelUrlsObj] = useState(panelUrls);

  const [neighbourhoodFilterData, setNeighbourhoodFilterData] =
    useState<NeighbourhoodFilterData>({ year: "", areaCode: "" });

  const updatePanelUrls = useCallback(
    function updatePanelUrls() {
      for (const url of panelUrlsObj.values()) {
        if (url) {
          url.searchParams.set("var-year", neighbourhoodFilterData.year);
          url.searchParams.set(
            "var-area_long_code",
            neighbourhoodFilterData.areaCode
          );
        }
      }
      setPanelUrlsObj(panelUrlsObj);
    },
    [panelUrlsObj, neighbourhoodFilterData]
  );

  const reloadIFrames = useCallback(
    function reloadIFrames() {
      for (const [key, iframeRef] of iframeRefs.entries()) {
        if (iframeRef.current) {
          iframeRef.current.src = panelUrlsObj.get(key)?.toString() || "";
        }
      }
    },
    [iframeRefs, panelUrlsObj]
  );

  useEffect(() => {
    updatePanelUrls();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(
    function updateSearch() {
      updatePanelUrls();
      reloadIFrames();
    },
    [reloadIFrames, updatePanelUrls, neighbourhoodFilterData]
  );

  return (
    <Container maxWidth="xl">
      <Grid container spacing={4} justifyContent={"center"}>
        <Grid item xs={0} md={4}></Grid>
        <Grid item xs={12} md={4}>
          <SimpleCard title="Data Explanation">
            <>
              <Typography variant="body1">
                Crime rate is calculated as the crime count per 100,000
                population (resident population only) per year.
              </Typography>
            </>
          </SimpleCard>
        </Grid>
        <Grid item xs={0} md={4}></Grid>
        <Grid item xs={12} md={6}>
          <NeighbourhoodFilters
            onChange={(data) => {
              setNeighbourhoodFilterData(data);
            }}
            show={[
              NeighbourhoodFilterTypes.year,
              NeighbourhoodFilterTypes.areaCode,
            ]}
          ></NeighbourhoodFilters>
        </Grid>
        <Grid item xs={12}>
          <ChartContainer
            sx={{ display: "flex", justifyContent: "center", mb: 4 }}
          >
            {(neighbourhoodFilterData.year &&
              neighbourhoodFilterData.areaCode && (
                <iframe
                  ref={iframeRefs.get(Panels.crime_guage)}
                  src={panelUrlsObj.get(Panels.crime_guage)?.toString()}
                  width={size.width ? size.width * 0.9 : 800}
                  height={size.height ? size.height * 0.8 : 500}
                  frameBorder="0"
                ></iframe>
              )) ||
              chartAltMessage}
          </ChartContainer>
        </Grid>
        <Grid item md={6} xs={12}>
          <ChartContainer
            sx={{ display: "flex", justifyContent: "center", mb: 4 }}
          >
            {(neighbourhoodFilterData.year &&
              neighbourhoodFilterData.areaCode && (
                <iframe
                  ref={iframeRefs.get(Panels.crime_ratio_compare)}
                  src={panelUrlsObj.get(Panels.crime_ratio_compare)?.toString()}
                  width={size.width ? size.width * 0.9 : 800}
                  height={size.height ? size.height * 0.8 : 500}
                  frameBorder="0"
                ></iframe>
              )) ||
              chartAltMessage}
          </ChartContainer>
        </Grid>
        <Grid item md={6} xs={12}>
          <ChartContainer
            sx={{ display: "flex", justifyContent: "center", mb: 4 }}
          >
            {(neighbourhoodFilterData.year &&
              neighbourhoodFilterData.areaCode && (
                <iframe
                  ref={iframeRefs.get(Panels.crime_comparison_area)}
                  src={panelUrlsObj
                    .get(Panels.crime_comparison_area)
                    ?.toString()}
                  width={size.width ? size.width * 0.9 : 800}
                  height={size.height ? size.height * 0.8 : 500}
                  frameBorder="0"
                ></iframe>
              )) ||
              chartAltMessage}
          </ChartContainer>
        </Grid>
        <Grid item xs={12}>
          <ChartContainer
            sx={{ display: "flex", justifyContent: "center", mb: 4 }}
          >
            {(neighbourhoodFilterData.areaCode && (
              <iframe
                ref={iframeRefs.get(Panels.crime_growth_chart)}
                src={panelUrlsObj.get(Panels.crime_growth_chart)?.toString()}
                width={size.width ? size.width * 0.9 : 800}
                height={size.height ? size.height * 0.8 : 500}
                frameBorder="0"
              ></iframe>
            )) ||
              chartAltMessage}
          </ChartContainer>
        </Grid>
      </Grid>
    </Container>
  );
}
