import styled from "@emotion/styled";
import { Box, Card, CardProps, Skeleton, Typography } from "@mui/material";

const ChartContainer = styled(Card)((props: CardProps) => ({
  minHeight: "400px",
  padding: "10px",
}));

const FilterContainer = styled(Card)((props: CardProps) => ({
  width: "100%",
  padding: "20px",
}));

const chartAltMessage = (
  <Box style={{ flexDirection: "column", textAlign: "center", width: "100%" }}>
    <Typography variant="h6">
      Please choose filter parameters
    </Typography>
    <Skeleton
      animation="wave"
      variant="rectangular"
      height="100%"
      width="100%"
    />
  </Box>
);

export { ChartContainer, FilterContainer, chartAltMessage };
