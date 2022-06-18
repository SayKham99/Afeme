// Import => React
import React from "react";
import { useEffect, useState, useContext } from "react";

// Import => React-Router-Dom
import { NavLink, useParams } from "react-router-dom";

// Import => Axios
import axios from "axios";

// Import => Components
import { Context as LangContext } from '../../Context/LangContext';
import Container from "../Container/Container";
import ZvezImgIcon from "../../Assets/Img/Icon/zvezda.svg"

// Import => Style Component
import "../../Components/ReltorCobinet/ReltorCobinet.scss";
import { DoNotStepOutlined } from "@mui/icons-material";

function ReltorCobinet() {

    const { userId } = useParams()
    const [userData, setReltorUserData] = useState({})
    const { lang, setLang } = useContext(LangContext);
    const [userLocData, setReltorUserLocData] = useState({})
    const [userLocationData, setUserLocationData] = useState({});

    // Pogination useState
    // const [currentPage, setCurrentPage] = useState(1);
    // const [postPerPage] = useState(10);
    // const [totalPost, setTotalPost] = useState(0);

    useEffect(() => {
        axios.get(`https://ali98.uz/api/user/${userId}`)
            .then(res => {
                const resdat = res.data.data;
                setReltorUserData(resdat);
            })
    }, [])

    useEffect(() => {
        axios.get(`https://ali98.uz/api/user/${userId}`)
            .then(res => {
                let resData = res.data.data.region_id
                setReltorUserLocData(resData)
            })
    }, [])

    useEffect(() => {
        if (lang == 'uz') {
            setUserLocationData(userLocData.name_uz)
        } else if (lang == 'ru') {
            setUserLocationData(userLocData.name_ru)
        } else {
            setUserLocationData(userLocData.name_en)
        }
    }, [lang])

    return (
        <>
            <Container>

                <section className="reltorcob">
                <NavLink to={"/catalogreltor"} className="reltorcob__btn-all">
                        Barchasini ko’rish
                    </NavLink>

                    <div className="reltorcob__box" >
                        <img className="reltorcob__avatar" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRI7M4Z0v1HP2Z9tZmfQaZFCuspezuoxter_A&usqp=CAU" alt="" width={"100px"} />

                        <h3 className="reltorcob__title-name">{userData.name} {userData.lastname}</h3>
                        <div className="reltorcob__reytin">
                            <div className="reltorcob__reyting-title">
                                Reytinglar
                            </div>
                            <img src={ZvezImgIcon} alt="" />
                        </div>
                        <div className="reltorcob__wrap">
                            <div className="reltorcob__work">
                                <div className="reltorcob__work-title">Ish Tajribasi</div>
                                <div className="reltorcob__work-box">
                                    <p className="reltorcob__work-taj">2008 yildan beri</p>
                                    <p className="reltorcob__work-afeme">2 oydan beri</p>
                                </div>
                            </div>
                            <div className="reltorcob__idesc-box">
                                <div className="reltorcob__idesc-title">O'zim haqimda</div>

                                <p className="reltorcob__idescrip">
                                    2008-yildan buyon ko‘chmas mulk sohasida faoliyat yuritaman, ishim davomida yuridik bilim oldim. Mening uchta oliy ma'lumotim bor. Men yakka tartibdagi tadbirkorman. Mening ishim tamoyillari - individual yondashuv, uzoq muddatli hamkorlik, o'zaro ...
                                </p>
                            </div>
                            <div className="reltorcob__location-info">
                                <div className="reltorcob__location-title">Ish hududi</div>

                                <div className="reltorcob__location-region">Andijon </div>
                            </div>
                            <div className="reltorcob__contact-box">
                                <div className="reltorcob__contact-title">Kontaktlar</div>
                                <a href="tel:{userData.phone}" className="reltorcob__cantact-tel">{userData.phone}</a>
                                <a href={`mailto:${userData.email}`} className="reltorcob__cantact-email">{userData.email}</a>
                            </div>
                        </div>
                    </div>
                </section>
            </Container>
        </>
    )
};

export default ReltorCobinet;