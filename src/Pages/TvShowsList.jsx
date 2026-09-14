import { useState, useEffect } from "react";
import TvShowCard from "../Components/TvShowCard";
import {getTvShows} from "../Api/api";
import Pagination from "../Components/Pagination";
import Loading from "../Components/Loading";

function TvShowsList() {
    const [tvshows, settvshows] = useState([]);
    const [isloading, setloading] = useState(true);
    const [currentpag, setcurrentpag] = useState(1);
    const [totalpag, settotal] = useState(1);

    useEffect(() => {
        async function fetchTvShows() {
            setloading(true);
            const data = await getTvShows(currentpag);
            settvshows(data.results);
            console.log(data.results);
            settotal(data.total_pages);
            setloading(false);
        }
        fetchTvShows();
    }, [currentpag]);

    if (isloading) return <Loading />;

    return (
        <div style={{ width: "100%", margin: "50px auto",marginTop:"150px" }} className="px-4">
            <div>
                <h2 className="titles">Popular TV Shows</h2>
                <div className="row g-2 mt-4">
                    {
                        tvshows.map((show) => {
                        return (
                            <div key={show.id} className="col-12 col-md-3 col-lg-2">
                                <TvShowCard show={show} />
                            </div>
                        )})
                    }
                </div>
            </div>
            <Pagination currentpag={currentpag} totalpag={totalpag} on_pagchange={(num) => setcurrentpag(num)} />
        </div>
    )
}
export default TvShowsList;