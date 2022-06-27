// Import => React
import React, { useEffect, useState } from "react";

// Import => Style Component
import "../../Components/NewBuildingsCard/NewBuildingsCard.scss";

// Import => Axios
import axios from "axios";

// Import => Skeleton
import ContentLoader from "react-content-loader";

function NewBuildingsCard() {

    const [regionData, setRegionData] = useState([]);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        axios.get(`https://ali98.uz/api/regions`)
            .then(res => {
                const resdata = res.data.data;
                setRegionData(resdata)
                setLoading(true)
            })
    }, [])

    const isLodArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    return (
        <>
            <div className="new-buildin-wrap-card">
                {
                    isLoading ? (
                        regionData.map((reg) => {
                            return (
                                <div className="new-buildin-card" key={reg.id}>
                                    <img className="new-buildin-card__img" src={reg.image} alt="" />

                                    <div className="new-buildin-card__body">
                                        <h4 className="new-buildin-card__title">{reg.name_uz}</h4>
                                    </div>
                                </div>
                            )
                        })
                    ) : (
                        isLodArr.map((lod) => {
                            return (
                                <ContentLoader
                                    speed={2}
                                    width={400}
                                    height={260}
                                    viewBox="0 0 400 260"
                                    backgroundColor="#f3f3f3"
                                    foregroundColor="#ecebeb">
                                    <rect x="88" y="229" rx="3" ry="3" width="150" height="15" />
                                    <circle cx="46" cy="236" r="21" />
                                    <rect x="19" y="47" rx="0" ry="0" width="350" height="150" />
                                </ContentLoader>
                            )
                        })
                    )
                }
            </div>
        </>
    )
}

export default NewBuildingsCard;