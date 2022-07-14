// Import => Reactl
import React, { useState, useEffect, useContext } from "react";
import { NavLink as Link } from "react-router-dom";

// Import => Mui
import {
    Box,
    Card,
    CardMedia,
    Typography,
    CardContent,
    CardActions,
    IconButton,
} from "@mui/material";

// Import => Components
import LoveBtn from "../LoveBtn/LoveBtn";
import LoveIcon from "../../Lib/Svg/love";
import LocationIcon from "../../Lib/Svg/location";
import DeleteIcon from "../../Lib/Svg/delete";
import EditIcon from "../../Lib/Svg/edit";

import CardTools from "../../Utils/cardTools";
import { CurrencyContext } from "../../Context/CurrencyContext";
import { Context as LangContext } from "../../Context/LangContext";
import { UserContext } from "../../Context/UserContext";
import "./Card.scss";
import CardImg1 from "../../Assets/Img/hero-img.png";
import CardImg2 from "../../Assets/Img/advertImg.jpg";
import { logRoles } from "@testing-library/react";
import { Token } from "@mui/icons-material";

function Cards({ data, editDelete = false, fullCard = false, like = false }) {
    const { lang, setLang } = useContext(LangContext);
    const { currency, setCurrency } = useContext(CurrencyContext);
    const { isUser, setIsUser } = useContext(UserContext);

    const [price, setPrice] = useState("");
    const [advertTitle, setAdvertTitle] = useState("");
    const [advertLink, setAdvertLink] = useState("");
    const [advertType, setAdvertType] = useState("");
    const [advertTypeImg, setAdvertTypeImg] = useState("");
    const [advertTypeLink, setAdvertTypeLink] = useState("");
    const [advertAddress, setAdvertAddress] = useState("");
    const [advertCity, setAdvertCity] = useState("");

    CardTools(
        data,
        lang,
        currency,
        setPrice,
        setAdvertTitle,
        setAdvertLink,
        setAdvertType,
        setAdvertTypeImg,
        setAdvertTypeLink,
        setAdvertAddress,
        setAdvertCity
    );
    let CardImg = Math.floor(Math.random() * 2) == 0 ? CardImg1 : CardImg2;

    const token = localStorage.getItem('Token')
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`)

    let requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        redirect: 'follow'
    };

    console.log(data)

    const Delete = (id) => {
        fetch(`http://ali98.uz/api/post/${id}`, requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }

    const cardControls = (
        <>
            <IconButton
                variant="outlined"
                color="error"
                className="cardControls cardDelete"
                sx={{ mr: 1.5 }}
                advertId={data.id}
                onClick={() => Delete(data.id)}
            >
                <DeleteIcon />
            </IconButton>
            <IconButton
                variant="solid"
                color="primary"
                className="cardControls cardEdit"
            >
                <EditIcon />
            </IconButton>
        </>
    );

    if (!fullCard) {
        return (
            <Card sx={{ maxWidth: 300 }} className="card">
                <Link to={advertLink}>
                    <CardMedia
                        component="img"
                        alt="Card img"
                        height="140"
                        className="card__img"
                        image={
                            data.image?.length > 0
                                ? data?.image[0]?.url
                                : CardImg
                        }
                        onError={(e) => (e.target.src = CardImg)}
                    />
                </Link>
                <Box className="card__content">
                    <CardContent className="card__header">
                        <Link to={advertTypeLink} className="house__type">
                            <img
                                src={advertTypeImg}
                                alt=""
                                className="house__type__icon"
                            />
                            <p className="house__type__name">{advertType}</p>
                        </Link>
                        <Typography variant="body2" className="house__prices">
                            <span className="house__price">{price}</span>
                        </Typography>
                    </CardContent>
                    <CardContent className="card__main">
                        <Link to={advertLink} className="card__title">
                            {advertTitle}
                        </Link>
                    </CardContent>
                    <CardActions className="card__footer">
                        <Typography className="house__address__bar">
                            <LocationIcon className="card__location" />{" "}
                            <span className="house__address">
                                {advertAddress}
                            </span>
                        </Typography>
                        <div className="card__actions">
                            {editDelete ? (
                                cardControls
                            ) : (
                                <LoveBtn advertID={data.id} />
                            )}
                        </div>
                    </CardActions>
                </Box>
            </Card>
        );
    } else {
        return (
            <Card sx={{}} className="fullCard">
                <Link to={advertLink}>
                    <CardMedia
                        className="fullCard__img"
                        component="img"
                        alt="Card img"
                        image={
                            data?.image.length > 0
                                ? data?.image[0]?.url
                                : CardImg
                        }
                        onError={(e) => (e.target.src = CardImg)}
                    />
                </Link>
                <Box className="card__content">
                    <CardContent className="card__header">

                        <Link to={advertTypeLink} className="house__type">
                            <img
                                src={advertTypeImg}
                                alt=""
                                className="house__type__icon"
                            />
                            <p className="house__type__name">
                                {advertType}
                            </p>
                        </Link>

                        <Typography variant="body2" className="house__prices">
                            <span className="house__price">{price}</span>
                        </Typography>

                    </CardContent>

                    <CardContent className="card__main">
                        <div className="card__header__items">
                            <Link to={advertLink} className="card__title">
                                {advertTitle}
                            </Link>
                        </div>

                        <div className="card__wrap">
                            <div className="card__room card__men">Xonalar: {data.room}</div>
                            <div className="card__flet card__men">Qavat: {data.floor}</div>
                            <div className="card__ara card__men">Maydoni: {data.total_area} m²</div>
                        </div>

                        <p className="card__desc">{data?.description}</p>
                    </CardContent>
                    <CardActions className="card__footer">
                        <div className="fullCard__foot">
                            <Typography className="house__address__bar">
                                <LocationIcon className="card__location" />{" "}
                                <span className="house__address">
                                    {advertAddress}
                                </span>
                            </Typography>
                        </div>
                        <LoveBtn advertID={data.id} />
                    </CardActions>
                </Box>
            </Card>
        );
    }
}
export default Cards;
