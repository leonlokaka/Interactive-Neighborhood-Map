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
