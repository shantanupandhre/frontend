import React, {Fragment, useEffect} from "react";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { getProductDetails } from "../../actions/productAction";
import ReactStars from "react-rating-stars-component";
import ReviewCard from "./ReviewCard.js";
import {useAlert} from "react-alert";
import { clearErrors } from "../../actions/productAction";
import MetaData from "../layout/MetaData";

const ProductDetails = ({match}) => {
    const dispatch = useDispatch();

    const {product, loading, error} = useSelector(
        (state) => state.productDetails
    );

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProductDetails(match.params.id));
    }, [dispatch, match.params.id, error, alert]);

    const options = {
        edit: false,
        color: "rgba(20,20,20,0.1)",
        activeColor:"tomato",
        size: window.innerWidth < 600 ? 20 : 25,
        value: product.ratings,
        isHalf: true,
    }

    return (
    <Fragment>
        <MetaData title={`${product.name} -- Hypechowk`}/>
        <div className="ProductDetails">
            <div>
                <Carousel>
                    {product.images && product.images.map((item, i) => (
                        <img 
                            className="CarouselImage"
                            key={item.url}
                            src={item.url}
                            alt={`${i} Slide`}
                        />
                    ))}
                </Carousel>
            </div>

            <div>
                <div className="detailsBlock-1">
                        <h2>{product.name}</h2>
                        <p>Product # {product.id}</p>
                </div>
                <div>
                    <ReactStars {...options} />
                    <span>({product.numOfReviews} Reviews)</span>
                </div>
                <div className="detailsBlock-3">
                        <h1>{`₹${product.price}`}</h1>
                        <div className="detailsBlock-3-1">
                            <div className="detailsBlock-3-1-1">
                                <button>-</button>
                                <input value="1" type="number"/>
                                <button>+</button>
                            </div>{" "}
                            <button>Add to Cart</button>
                        </div>

                        <p>
                            Status:{" "}
                            <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                                {product.Stock < 1 ? "OutOfStock" : "InStock"}
                            </b>
                        </p>
                </div>
                <div className="detailsBlock-4">
                        Description: <p>{product.Description}</p>
                </div>
                <button className="submitReview">Submit Review</button>
            </div>
        </div>
        <h3 className="reviewsHeading">REVIEWS</h3>
        {product.reviews && product.reviews[0] ? (
            <div className="reviews">
                {product.reviews && product.reviews.map((review) => <ReviewCard review={review} />)}
            </div>
        ) : (
            <p className="noReviews">No Reviews Yet</p>
        )}
    </Fragment>
)};

export default ProductDetails;