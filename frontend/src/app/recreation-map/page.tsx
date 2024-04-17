"use client";
import {
  Container,
  Grid,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useWindowSize } from "@uidotdev/usehooks";
import { Panels, panelUrls } from "../const";
import {
  ChartContainer,
} from "../common/Component";

export default function Page() {

  const size = useWindowSize();

  return (
    <Container maxWidth="xl">
      <Grid container spacing={4} justifyContent={"center"}>
        <Grid item xs={12}>
          <ChartContainer
            sx={{ display: "flex", justifyContent: "center", mb: 4 }}
          >
              <iframe
                src={panelUrls.get(Panels.park)?.toString()}
                width={size.width ? size.width * 0.9 : 800}
                height={size.height ? size.height * 0.8 : 500}
                frameBorder="0"
              ></iframe>
          </ChartContainer>
        </Grid>
        <Grid item xs={12}>
          <ChartContainer
            sx={{ display: "flex", justifyContent: "center", mb: 4 }}
          >
              <iframe
                src={panelUrls.get(Panels.community_centre)?.toString()}
                width={size.width ? size.width * 0.9 : 800}
                height={size.height ? size.height * 0.8 : 500}
                frameBorder="0"
              ></iframe>
          </ChartContainer>
        </Grid>
      </Grid>
    </Container>
  );
}
