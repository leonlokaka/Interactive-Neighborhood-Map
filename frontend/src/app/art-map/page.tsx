"use client";
import {
  Box,
  Container,
  Grid,
  Typography,
} from "@mui/material";

export default function Page() {

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
