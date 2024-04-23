import React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import theme from "../../../theme/Theme";
import { Box } from "@mui/system";
export default function ProductBreadCrumbs() {
  return (
    <Box sx={{padding:'20px 0'}}>
      <Breadcrumbs aria-label="breadcrumb" separator=">" sx={{fontWeight:'bold',textDecoration:'none'}}>
        <Link underline="hover" color={theme.palette.primary.main} href="/" sx={{textDecoration:"none"}}>
          Home
        </Link>
        <Link
          underline="hover"
          color={theme.palette.primary.main}
          href="/material-ui/getting-started/installation/"
        >
          CatsName
        </Link>
        <Typography color="text.primary">productName</Typography>
      </Breadcrumbs>
    </Box>
  );
}
