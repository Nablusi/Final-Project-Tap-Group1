import React from "react";
import { Box, Container } from "@mui/material";
import Swiper from "./Swiper/Swiper";
import FilteredShoppingOption from "./Filtered-Shopping-Options/FilteredHeroOption";

export default function Home() {
  return (
    <Container>
      <Box component={"div"}>
        <Swiper />






          <FilteredShoppingOption />      
      </Box>
    </Container>
  );
}
