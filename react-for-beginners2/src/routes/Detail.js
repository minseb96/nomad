import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "../styles/Detail.module.css";

const Detail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState([]);

  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    console.log(json);
    setLoading(false);
    setInfo(json);
  };
  useEffect(() => {
    getMovie();
  }, []);

  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <h1>
            {info.data.movie.title}({info.data.movie.year})
          </h1>
          <div className={styles.starRateContainer}>
            <span>Rate : </span>
            <span>★</span>
            <span>★</span>
            <span>★</span>
            <span>★</span>
            <span>★</span>
          </div>
          <iframe
            width="420"
            height="315"
            src="https://www.youtube.com/embed/A7DgDpURLRY"
          />
          <p>{info.data.movie.description_full}</p>
        </div>
      )}
    </div>
  );
};
export default Detail;
