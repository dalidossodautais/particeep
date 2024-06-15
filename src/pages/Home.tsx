import { useEffect } from "react";
import { useDispatch } from "react-redux";

import Filters from "../components/Filters";
import Pagination from "../components/Pagination";
import VideoWrapper from "../components/VideoWrapper";
import { movies$ } from "../resources/movies";
import { init } from "../store/slices/videos";
import styles from "./Home.module.css";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const movies = await movies$;

      dispatch(init(movies));
    })();
  }, [dispatch]);

  return (
    <section className={styles.wrapper}>
      <div className={styles.wrapper__header}>
        <h2 className={styles.wrapper__header__title}>Particeep</h2>
        <Filters />
      </div>
      <VideoWrapper></VideoWrapper>
      <Pagination />
    </section>
  );
};

export default Home;
