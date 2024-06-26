import React, { useState, useContext } from "react";
import { Box, Button, Divider, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { authUser } from "../../services/utils/authUser";
import { toast } from "react-toastify";
import * as OrderStyles from "./OrderDetailsStyle";
import { AddToCartIfLoggedInContext } from "../../contexts/addToCart";
import axios from "axios";
import { getUserId } from "../../services/utils/getUserId";
import { getToken } from "../../services/utils/getToken";

export const OrderDetails = ({ title, getProductDetails, variant }) => {
    const products = getProductDetails();
    const theme = useTheme();
    const totalPrice = products.reduce((acc, curr) => acc + (curr.qty * curr.product.price), 0);
    const discount = 13;
    const deliveryFee = 12;
    const grandTotal = totalPrice - discount + deliveryFee;
    const navigate = useNavigate();
    const { sendProductData } = useContext(AddToCartIfLoggedInContext);
    const total = localStorage.getItem('total');
    const cart = JSON.parse(localStorage.getItem('cart'));

    const [productList, setProductList] = useState(cart);
    const [res, setRes] = useState([]);



    

    const placeOrderWithAxios = async () => {

        const formattedItems = productList.map(item => ({
            productId: item.product.id,
            qty: item.qty,
            price: item.product.price
        }));

        const response = await axios.post(`https://backend-final-1-latest.onrender.com/api/orders/user/${getUserId()}`,
            {
                total: total,
                status: 'pending',
                isPaid: false,
                checkoutId: null,
                items: formattedItems,

            },
            {
                headers: {
                    'Authorization': `Bearer ${getToken()}`
                }
            })
        setRes(response.data)
        return response.data
    }

    const clickHandler = () => {
        navigate('/category/1');
        sendProductData();
    }


    const placeOrderHandler = () => {
        if (authUser()) {
            placeOrderWithAxios();
            navigate('/checkout');
        } else {
            toast.warning(
                <>
                    Please <a href="/sign/signin">sign in</a> to continue the process.
                </>
                , {
                    position: 'top-center'
                });
        }
    }

    const order = {
        'withButton': {
            content: (
                products.length === 0 ? '' :
                    <Box sx={OrderStyles.boxContainer}>
                        <Typography sx={OrderStyles.typoTitle}>{title}</Typography>
                        <Divider sx={OrderStyles.dividerOne} />
                        <Box sx={OrderStyles.box}>
                            <Typography sx={OrderStyles.typo} >Sub total</Typography>
                            <Typography sx={OrderStyles.typo} >${totalPrice}</Typography>
                        </Box>
                        <Box sx={OrderStyles.box}>
                            <Typography sx={OrderStyles.typo} >Discount</Typography>
                            <Typography sx={OrderStyles.typo} >$ {discount}</Typography>
                        </Box>
                        <Box sx={OrderStyles.box}>
                            <Typography sx={OrderStyles.typo} >Delivery Fee</Typography>
                            <Typography sx={OrderStyles.typo} >${deliveryFee}</Typography>
                        </Box>
                        <Box sx={OrderStyles.box}>
                            <Typography sx={OrderStyles.typoSecond} >Grand Total</Typography>
                            <Typography sx={OrderStyles.typoSecond} >${grandTotal}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'row', gap: '32px', mt: '40px' }}>
                            <Button sx={OrderStyles.firstButton(theme)} variant="contained" onClick={placeOrderHandler} >place order</Button>
                            <Button sx={OrderStyles.secondButton(theme)} variant="outlined" onClick={clickHandler} >Continue Shopping</Button>
                        </Box>
                    </Box>
            )
        },
        "withoutButton": {
            content: (
                <Box sx={OrderStyles.boxContainer}>
                    <Typography sx={OrderStyles.typoTitle}>{title}</Typography>
                    <Divider sx={OrderStyles.dividerOne} />
                    <Box sx={OrderStyles.box}>
                        <Typography sx={OrderStyles.typo} >Sub total</Typography>
                        <Typography sx={OrderStyles.typo} >${totalPrice}</Typography>
                    </Box>
                    <Box sx={OrderStyles.box}>
                        <Typography sx={OrderStyles.typo} >Discount</Typography>
                        <Typography sx={OrderStyles.typo} >$ {discount}</Typography>
                    </Box>
                    <Box sx={OrderStyles.box}>
                        <Typography sx={OrderStyles.typo} >Delivery Fee</Typography>
                        <Typography sx={OrderStyles.typo} >${deliveryFee}</Typography>
                    </Box>
                    <Box sx={OrderStyles.box}>
                        <Typography sx={OrderStyles.typoSecond} >Grand Total</Typography>
                        <Typography sx={OrderStyles.typoSecond} >${grandTotal}</Typography>
                    </Box>
                </Box>
            )
        }
    }



    return (
        <>
            {order[variant].content}
        </>
    )
}