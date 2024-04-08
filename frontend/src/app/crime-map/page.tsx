"use client";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { RefObject, useCallback, useEffect, useRef, useState } from "react";
import { useWindowSize } from "@uidotdev/usehooks";
import HeapmapExplanation from "../common/HeapmapExplanation";
import SimpleCard from "../common/SimpleCard";
import DateRangeIcon from "@mui/icons-material/DateRange";
import { Panels, panelUrls } from "../const";
export default function Page() {
  //   const [arg, setArg] = useState<any>(true);
  //   const updateFilter = () => {
  //     setArg(!arg);
  //     if (arg) iframeRef.current.src = dataUrl;
  //     else iframeRef.current.src = "";
  //   };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const iframeRefs: Map<string, RefObject<HTMLIFrameElement>> = new Map<
    string,
    any
  >([
    // [Panels.crime_map, useRef<HTMLIFrameElement>(null)],
    // [Panels.crime_heap_map, useRef<HTMLIFrameElement>(null)],
    [Panels.crime_comparison_area, useRef<HTMLIFrameElement>(null)],
    [Panels.crime_ratio_compare, useRef<HTMLIFrameElement>(null)],
    [Panels.crime_guage, useRef<HTMLIFrameElement>(null)],
    [Panels.crime_growth_chart, useRef<HTMLIFrameElement>(null)],
  ]);

  const size = useWindowSize();
  const [panelUrlsObj, setPanelUrlsObj] = useState(panelUrls);
  const [yearOptions, setYearOptions] = useState<any[]>([]);
  const [areaCodeOptions, setAreaCodeOptions] = useState<any[]>([]);
  const [year, setYear] = useState("2023");
  const [areaCode, setAreaCode] = useState("19");

  const updatePanelUrls = useCallback(
    function updatePanelUrls() {
      for (const url of panelUrlsObj.values()) {
        if (url) {
          url.searchParams.set("var-year", year);
          url.searchParams.set("var-area_long_code", areaCode);
        }
      }
      setPanelUrlsObj(panelUrlsObj);
    },
    [areaCode, panelUrlsObj, year]
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

  function updateSearchParams() {
    // TODO: query
    // setYearOptions
    // setAreaCodeOptions
  }

  useEffect(function init() {
    updatePanelUrls();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(
    function updateSearch() {
      updatePanelUrls();
      reloadIFrames();
    },
    [reloadIFrames, updatePanelUrls, year]
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
        <Grid item xs={12}>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="year-label">Year</InputLabel>
            <Select
              labelId="year-label"
              id="year"
              // value={year}
              label="Year"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {yearOptions.map((option, i) => (
                <MenuItem value={option.__value} key={i}>
                  {option.__text}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        {/* <Grid item xs={12}>
          <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
            <iframe
              ref={iframeRefs.get(Panels.crime_map)}
              src={panelUrlsObj.get(Panels.crime_map)?.toString()}
              width={size.width ? size.width * 0.9 : 800}
              height={size.height ? size.height * 0.8 : 500}
              frameBorder="0"
            ></iframe>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
            <iframe
              ref={iframeRefs.get(Panels.crime_heap_map)}
              src={panelUrlsObj.get(Panels.crime_heap_map)?.toString()}
              width={size.width ? size.width * 0.9 : 800}
              height={size.height ? size.height * 0.8 : 500}
              frameBorder="0"
            ></iframe>
          </Box>
        </Grid> */}
        <Grid item xs={12}>
          <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
            <iframe
              ref={iframeRefs.get(Panels.crime_guage)}
              src={panelUrlsObj.get(Panels.crime_guage)?.toString()}
              width={size.width ? size.width * 0.9 : 800}
              height={size.height ? size.height * 0.8 : 500}
              frameBorder="0"
            ></iframe>
          </Box>
        </Grid>
        <Grid item md={6} xs={12}>
          <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
            <iframe
              ref={iframeRefs.get(Panels.crime_ratio_compare)}
              src={panelUrlsObj.get(Panels.crime_ratio_compare)?.toString()}
              width={size.width ? size.width * 0.9 : 800}
              height={size.height ? size.height * 0.8 : 500}
              frameBorder="0"
            ></iframe>
          </Box>
        </Grid>
        <Grid item md={6} xs={12}>
          <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
            <iframe
              ref={iframeRefs.get(Panels.crime_comparison_area)}
              src={panelUrlsObj.get(Panels.crime_comparison_area)?.toString()}
              width={size.width ? size.width * 0.9 : 800}
              height={size.height ? size.height * 0.8 : 500}
              frameBorder="0"
            ></iframe>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
            <iframe
              ref={iframeRefs.get(Panels.crime_growth_chart)}
              src={panelUrlsObj.get(Panels.crime_growth_chart)?.toString()}
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
