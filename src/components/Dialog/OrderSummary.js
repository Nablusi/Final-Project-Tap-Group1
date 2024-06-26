import React from "react";
import { Box, Typography, } from '@mui/material';
import * as OrderStyles from "./OrderSummaryStyles";

export const OrderSummary = ({ productList, topic, isStatic, text, typoFont, doSum }) => {
    const doTotal = productList.reduce((acc, product) => acc + (product.product.price * product.qty), 0);
    localStorage.setItem('total', doTotal );
    return (
        <Box component={'div'} sx={OrderStyles.summaryContainer} >
            <Typography component={'h2'} sx={{ fontWeight: typoFont }}> {topic}: </Typography>
            <Typography>
                {isStatic ? text : doSum ? doTotal + 2 : doTotal} $
            </Typography>
        </Box>
    )
}