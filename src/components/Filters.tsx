import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { StoreState } from "../store";
import { toggleSelectedCategories } from "../store/slices/videos";
import { Select } from "./Select";

import styles from "./Filters.module.css";

const Filters = () => {
  const dispatch = useDispatch();

  const categories = useSelector(
    (state: StoreState) => state.videos.categories
  );
  const selectedCategories = useSelector(
    (state: StoreState) => state.videos.selectedCategories
  );

  const categoriesOptions = useMemo(
    () => [{ label: "Toggle category", value: "" }, ...categories],
    [categories]
  );

  const removeCategory = useCallback(
    (category: string) => {
      dispatch(toggleSelectedCategories(category));
    },
    [dispatch]
  );

  const changeSelectedCategory = useCallback(
    (category: string) => {
      dispatch(toggleSelectedCategories(category));
    },
    [dispatch]
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper__spacing}></div>
      <div className={styles.wrapper__categories}>
        {selectedCategories.map((category) => (
          <button
            className={styles.wrapper__categories__button}
            key={category}
            onClick={() => {
              removeCategory(category);
            }}
          >
            {category}{" "}
            <img
              height={10}
              width={10}
              alt="remove video"
              src={"/cross.svg"}
            ></img>
          </button>
        ))}
      </div>
      <Select
        options={categoriesOptions}
        onChange={changeSelectedCategory}
        value=""
      ></Select>
    </div>
  );
};

export default Filters;
