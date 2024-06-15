import { FC, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { StoreState } from "../store";
import {
  addLike,
  addDislike,
  remove,
  removeLike,
  removeDislike,
} from "../store/slices/videos";
import { Video } from "../types";
import Thumb from "./Thumb";

import styles from "./VideoBox.module.css";

export type VideoBoxProps = {
  id: Video["id"];
};

const VideoBox: FC<VideoBoxProps> = ({ id }) => {
  const dispatch = useDispatch();

  const { title, category, likes, dislikes } = useSelector(
    (state: StoreState) => state.videos.data[id]
  );

  const opinion = useSelector((state: StoreState) => state.videos.opinions[id]);

  const positiveRatio = useMemo(
    () => likes / (likes + dislikes),
    [dislikes, likes]
  );
  const negativeRatio = useMemo(
    () => dislikes / (likes + dislikes),
    [dislikes, likes]
  );

  const handleLike = useCallback(() => {
    dispatch((opinion === "like" ? removeLike : addLike)(id));
  }, [dispatch, id, opinion]);

  const handleDislike = useCallback(() => {
    dispatch((opinion === "dislike" ? removeDislike : addDislike)(id));
  }, [dispatch, id, opinion]);

  const handleRemove = useCallback(() => {
    dispatch(remove(id));
  }, [dispatch, id]);

  const showManyLikes = useCallback((likes: number) => {
    if (likes < 1e3) return likes;
    if (likes < 1e6) return `${Math.floor(likes / 100) / 10}k`;
    if (likes < 1e9) return `${Math.floor(likes / 100e3) / 10}m`;
    if (likes < 1e12) return `${Math.floor(likes / 100e6) / 10}M`;
    return "999+M";
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper__category}>{category}</div>
      <strong className={styles.wrapper__title}>{title}</strong>
      <div className={styles.wrapper__reception}>
        <div className={styles.wrapper__reception__gauge}>
          <div
            className={styles.wrapper__reception__gauge__positive}
            style={{ width: `calc(100% * ${positiveRatio})` }}
          />
          <div
            className={styles.wrapper__reception__gauge__negative}
            style={{ width: `calc(100% * ${negativeRatio})` }}
          />
        </div>
        <div className={styles.wrapper__reception__buttons}>
          <button
            onClick={handleLike}
            className={styles["wrapper__reception__buttons__button--positive"]}
          >
            <Thumb
              direction="up"
              filled={opinion === "like"}
              height="15px"
              width="15px"
            />
            <span
              className={styles.wrapper__reception__buttons__button__number}
            >
              {showManyLikes(likes)}
            </span>
          </button>
          <button
            onClick={handleDislike}
            className={styles["wrapper__reception__buttons__button--negative"]}
          >
            <Thumb
              direction="down"
              filled={opinion === "dislike"}
              height="15px"
              width="15px"
            />
            <span
              className={styles.wrapper__reception__buttons__button__number}
            >
              {showManyLikes(dislikes)}
            </span>
          </button>
        </div>
      </div>
      <button
        className={styles.wrapper__suppression_button}
        onClick={handleRemove}
      >
        <img height={7} width={7} alt="remove video" src={"/cross.svg"}></img>
      </button>
    </div>
  );
};

export default VideoBox;
