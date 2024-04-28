import React, { useState, useContext, useEffect } from "react";
import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs";
import { Box, Container, useTheme } from "@mui/system";
import { Divider, Typography } from "@mui/material";
import { OrderSummary } from "../../components/OrderSummary/OrderSummary";
import { getProductDetails } from "../../services/utils/getProductDetails";
import { useMediaQuery } from "react-responsive";
import { CartInfo } from "./gettingCartInfo/CartInfo";
import { OrderDetails } from "../../components/OrderDetails/OrderDetails";
import { SharedParentContext } from "../../contexts/CategoryPageFilter";

export default function CartPage() {
    const theme = useTheme();
    const isSmall = useMediaQuery({ query: "(max-width: 991px)" });
    const { setRefresh, refresh } = useContext(SharedParentContext);
    const [product, setProduct] = useState(getProductDetails());


    useEffect(() => {
        const cartData = localStorage.getItem('cart');
        setProduct(cartData ? JSON.parse(cartData) : []);
    }, [refresh]);
    
    const removeHandler = (index) => {
        setRefresh(()=> !refresh)
        const updateList = [...product];
        updateList.splice(index, 1);
        setProduct(updateList);

        const updatedCart = JSON.parse(localStorage.getItem("cart")) || [];
        updatedCart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    }


    return (
        <Container sx={{ marginBottom: '185px' }}>
            <BreadCrumbs BreadCrumbsName={'my cart'} />
            <Typography sx={{ fontSize: '34px', fontWeight: '600', color: theme.palette.primary.carouselColor, padding: "0", mt: '28px', mb: '87px' }} >My Cart</Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: isSmall ? 'minmax(1fr 1fr)' : '2fr 1fr', gap: '108px' }}>

                <Box sx={{ display: 'grid', gridTemplateColumns: isSmall ? 'auto auto auto auto' : '2fr 1fr 1fr 1fr' }}>
                    <Box>
                        <Typography> Product Name </Typography>
                        <Divider sx={{ mt: '8px', mb: '8px' }} />
                        <OrderSummary getProductDetails={getProductDetails} variant={'withoutDetails'} />
                    </Box>
                    <Box>
                        <Typography sx={{ marginLeft: '20px' }}> Price </Typography>
                        <Divider sx={{ mt: '8px', mb: '8px' }} />
                        <CartInfo getProductDetails={getProductDetails} variant={'price'} />
                    </Box>
                    <Box>
                        <Typography> Qty </Typography>
                        <Divider sx={{ mt: '8px', mb: '8px' }} />
                        <CartInfo getProductDetails={getProductDetails} variant={'qty'} />

                    </Box>
                    <Box >
                        <Typography> Subtotal </Typography>
                        <Divider sx={{ mt: '8px', mb: '8px' }} />
                        <CartInfo getProductDetails={getProductDetails} variant={'subtotal'} removeHandler={removeHandler} />
                    </Box>
                </Box>
                <Box>
                    <OrderDetails title={"Order Summary"} getProductDetails={getProductDetails} variant={'withButton'} />
                </Box>
            </Box>
        </Container>
    )
}