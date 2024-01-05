import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import ResponsiveAppBar from "./Appbar";
import { usePathname } from "next/navigation";
import { mainMenu } from "../const";
import { useTheme } from "@mui/material";

export default function Header() {
  const pathname = usePathname();
  const theme = useTheme();
  const title = mainMenu.find((item) => item.url === pathname)?.title;
  return (
    <React.Fragment>
      <ResponsiveAppBar />
      <Toolbar
        sx={{
          backgroundColor: theme.palette.primary.main,
        }}
      >
        <Typography
          component="h2"
          variant="h4"
          color={theme.palette.primary.contrastText}
          align="center"
          noWrap
          sx={{ flex: 1, mt: 4, mb: 4 }}
        >
          {title}
        </Typography>
      </Toolbar>
    </React.Fragment>
  );
}
