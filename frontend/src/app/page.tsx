"use client";
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  Paper,
  Typography,
  TypographyProps,
  useTheme,
} from "@mui/material";
import styled from "@emotion/styled";
import Image from "next/image";
// import { metadata } from "./const";
// export { metadata };

export default function Home() {
  const theme = useTheme();

  const ArticleHeader = styled(Typography)((props: TypographyProps) => ({
    color: theme.palette.primary.main,
  }));
  const Article = styled(Typography)((props: TypographyProps) => ({
    marginBottom: "30px",
  }));

  return (
    <Container maxWidth="lg">
      <Grid container>
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <ArticleHeader variant="h6" gutterBottom>
              About
            </ArticleHeader>
            <Article variant="body1">
              This website aims to create a dynamic and informative platform for
              users to explore and interact with data. By leveraging government
              data and employing user-friendly design and functionality, this
              website can offer an engaging and credible experience. With a
              focus on enhancing user engagement through visualizations and
              customization, the interactive map website will be a valuable
              resource for users seeking to navigate and understand complex
              information.
            </Article>
            <ArticleHeader variant="h6" gutterBottom>
              Interactive Maps
            </ArticleHeader>
            <Article variant="body1">
              Interactive maps have revolutionized the way we navigate and
              consume information. They provide an engaging and dynamic way to
              explore data, making it easier to comprehend complex information.
            </Article>

            <Box sx={{ display: "flex" }}>
              <Image
                src="/grafana.jpeg"
                alt="Grafana Logo"
                height="50"
                width="50"
                style={{
                  marginRight: "10px",
                }}
              />
              <Article variant="body1">
                The interactive maps are build on{" "}
                <Link href="https://grafana.com/" target="_blank">
                  Grafana
                </Link>{" "}
                - a multi-platform open source analytics and interactive
                visualization web application. It offer an intuitive and
                informative platform for users to interact with data.
              </Article>
            </Box>
            <ArticleHeader variant="h6" gutterBottom>
              Leveraging Reliable Data Sources
            </ArticleHeader>
            <Article variant="body1">
              When collecting data to build the interactive maps, the use of
              reliable data sources is paramount. Government data, with its
              comprehensive and verified information, serves as an ideal
              foundation for the development of such a platform. By harnessing
              this data, the interactive map website can offer users accurate
              and up-to-date information, enhancing its credibility and value.
            </Article>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
