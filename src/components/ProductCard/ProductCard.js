import { React } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import Box from "@mui/material/Box";
import theme from "../../theme/Theme";
import { Link, useNavigate } from "react-router-dom";
import GeneratedStars from "../../services/utils/GeneratedStars";
export default function ProductCard({ rating, product }) {
  const styles = {
    text: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      paddingTop: "8px",
      width: "70%",
      [theme.breakpoints.down("md")]: {
        flexDirection: "column",
        alignItems: "flex-start",
        width: "100%",
      },
      [theme.breakpoints.between("md", "lg")]: {
        width: "80%",
      },
    },
  };

  const navigate = useNavigate();

  const goHandler = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <Link style={{ textDecoration: "none" }} onClick={goHandler}>
      <Card sx={{ maxWidth: 350, boxShadow: "none", margin: "auto" }}>
        <CardMedia
          sx={{ height: 280, borderRadius: "10px" }}
          image={require(`../../images/PinkBag.png`)}
          title="green iguana"
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="subtitle1"
            component="h2"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: "16px",
              fontWeight: "500",
              fontFamily: "Inter",
              color:theme.palette.primary.textColor,
              textTransform:'capitalize'
            }}
          >
            {product.name}
            <FavoriteBorderOutlinedIcon />
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="h3" sx={{colot:theme.palette.primary.paragraph,fontWeight:'400',fontSize:'14px'}}>
            Pink Bag
          </Typography>

          {/* Here I will pass the review of the product but still don't have review data from the back-end team => product.reviews.rating + the count of them */}

          {rating === true ? <GeneratedStars /> : ""}
          <Box
            sx={{
              ...styles.text,
            }}
          >
            {product.discountId !== null ? (
              <>
                <Typography
                  sx={{ color: theme.palette.primary.textColor,fontWeight:'500' }}
                  variant="subtitle1"
                  component="p"
                >
                  ${product.price}
                </Typography>
                <Typography
                  sx={{ color: theme.palette.primary.main }}
                  variant="subtitle1"
                  component="p"
                >
                  $39.49
                </Typography>
                <Typography
                  sx={{ textDecoration: "line-through",fontWeight:'400',fontSize:'14px' }}
                  variant="subtitle1"
                  component="p"
                >
                  $78.66
                </Typography>
                <Typography
                  sx={{ color: theme.palette.primary.error,fontWeight:'400',fontSize:'16px' }}
                  variant="subtitle1"
                  component="p"
                >
                  50%OFF
                </Typography>
              </>
            ) : (
              <>
                <Typography
                  sx={{ color: theme.palette.primary.main, fontWeight: "600" }}
                  variant="subtitle1"
                  component="p"
                >
                  ${product.price}
                </Typography>
              </>
            )}
          </Box>
        </CardContent>
      </Card>
    </Link>
  );
}
