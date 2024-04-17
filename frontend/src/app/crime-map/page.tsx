"use client";
import {
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { RefObject, useCallback, useEffect, useRef, useState } from "react";
import { useWindowSize } from "@uidotdev/usehooks";
import HeapmapExplanation from "../common/HeapmapExplanation";
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
} from "../common/NeighbourhoodFilters";

export default function Page() {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const iframeRefs: Map<string, RefObject<HTMLIFrameElement>> = new Map<
    string,
    any
  >([
    [Panels.crime_map, useRef<HTMLIFrameElement>(null)],
    [Panels.crime_heap_map, useRef<HTMLIFrameElement>(null)],
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
        <Grid item xs={12} md={4}>
          <SimpleCard title="Data Explanation">
            <>
              <Typography variant="body1">
                Crime rate is calculated as the crime count per 100,000
                population (resident population only) per year.
              </Typography>
              {/* <Box sx={{ display: "flex", flexDirection: "row", mt: 2 }}>
                <DateRangeIcon />
                <Typography variant="body1" ml={2}>
                  {" "}
                  Date Range: 2020-2022
                </Typography>
              </Box> */}
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
        <Grid item xs={12} md={6}>
          <NeighbourhoodFilters
            onChange={(data) => {
              setNeighbourhoodFilterData(data);
            }}
            show={[NeighbourhoodFilterTypes.year]}
          ></NeighbourhoodFilters>
        </Grid>
        <Grid item xs={12}>
          <ChartContainer
            sx={{ display: "flex", justifyContent: "center", mb: 4 }}
          >
            {(neighbourhoodFilterData.year && (
              <iframe
                ref={iframeRefs.get(Panels.crime_map)}
                src={panelUrlsObj.get(Panels.crime_map)?.toString()}
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
            {(neighbourhoodFilterData.year && (
              <iframe
                ref={iframeRefs.get(Panels.crime_heap_map)}
                src={panelUrlsObj.get(Panels.crime_heap_map)?.toString()}
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
