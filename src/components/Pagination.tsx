import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { StoreState } from "../store";
import { changeNumberByPage, changePage } from "../store/slices/videos";
import Arrow from "./Arrow";
import { Select } from "./Select";

import styles from "./Pagination.module.css";

const numberByPageOptions = [4, 8, 16];

const Pagination = () => {
  const dispatch = useDispatch();

  const videoIds = useSelector((state: StoreState) => state.videos.shownIds);
  const page = useSelector((state: StoreState) => state.videos.page);
  const numberByPage = useSelector(
    (state: StoreState) => state.videos.numberByPage
  );

  const numberOfPage = useMemo(
    () => Math.ceil(videoIds.length / numberByPage),
    [numberByPage, videoIds]
  );

  const goToPreviousPage = useCallback(() => {
    dispatch(changePage(page - 1));
  }, [dispatch, page]);

  const goToNextPage = useCallback(() => {
    dispatch(changePage(page + 1));
  }, [dispatch, page]);

  const changeNumberByPageChange = useCallback(
    (value: number) => {
      dispatch(changeNumberByPage(value));
    },
    [dispatch]
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper__buttons}>
        <span>
          Page {page} sur {numberOfPage}
        </span>
        <button
          disabled={page === 1}
          onClick={goToPreviousPage}
          className={styles.wrapper__buttons__button}
        >
          <Arrow direction="left" height="10px" width="10px" />
        </button>
        <button
          disabled={page === numberOfPage}
          onClick={goToNextPage}
          className={styles.wrapper__buttons__button}
        >
          <Arrow direction="right" height="10px" width="10px" />
        </button>
      </div>
      <Select
        options={numberByPageOptions}
        onChange={changeNumberByPageChange}
        value={numberByPage}
      />
    </div>
  );
};

export default Pagination;
