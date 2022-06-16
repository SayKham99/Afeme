// Import => React 
import React, {useContext} from "react";
import { useEffect, useState } from "react";
import { NavLink as Redirect } from "react-router-dom";
import { Context as LangContext } from "../../Context/LangContext";

// Import => Axios
import axios from "axios";

// Import => Components
import Container from "../Container/Container";
import "../../Assets/scss/colors.scss";
import "../Categories/Categories.scss";

// Import => ComponnetsImg
import HomeIcon from "../../Assets/Img/homeIcon.svg";
import Categories1 from "../../Assets/Img/categories1.svg";
import Categories2 from "../../Assets/Img/categories2.svg";
import Categories3 from "../../Assets/Img/categories3.svg";
import Categories4 from "../../Assets/Img/categories4.svg";

// Import => Mui
import { Box } from "@mui/material";

function Categories() {

    const { lang, setLang } = useContext(LangContext);
    const [price, setPrice] = React.useState('');
    const [room, setRoom] = React.useState('');
    const [categorieData, setCategorieData] = useState([])

    const priceChange = (event) => {
        setPrice(event.target.value);
    };

    const roomChange = (event) => {
        setRoom(event.target.value);
    };


    // Axios
    useEffect(() => {
        axios.get('https://ali98.uz/api/htype').then(res => {
            const categs = res.data.data;
            setCategorieData(categs)
            
            console.log(categs.name_uz);
        })
    }, [])

    return (
        <>
            <Box className="categories">
                <Container>
                    <Box className="categories__content">
                        {
                            categorieData?.map((categ) => {
                                return (
                                    <Redirect className="categories__items" to={{ pathname: "/adverts", search: `?htype=${categ.id}`}}>
                                        <img className="categories__img-icon" src={`https://ali98.uz/public/admin2/categories/${categ.icon}`} alt="" />
                                        <h3 className="categories__items-title">{lang == 'uz' ? categ.name_uz : lang == 'ru' ? categ.name_ru : categ.name_en}</h3>
                                    </Redirect> 
                                )
                            })
                        }
                    </Box>
                </Container>
            </Box>
        </>
    );
}

export default Categories;
