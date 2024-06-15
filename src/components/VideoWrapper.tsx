import { useMemo } from "react";
import { useSelector } from "react-redux";

import { StoreState } from "../store";
import VideoBox from "./VideoBox";

import styles from "./VideoWrapper.module.css";

const VideoWrapper = () => {
  const page = useSelector((state: StoreState) => state.videos.page);
  const numberByPage = useSelector(
    (state: StoreState) => state.videos.numberByPage
  );
  const rawVideoIds = useSelector((state: StoreState) => state.videos.shownIds);

  const videoIds = useMemo(
    () => rawVideoIds.slice((page - 1) * numberByPage, page * numberByPage),
    [numberByPage, page, rawVideoIds]
  );

  return (
    <div className={styles.wrapper}>
      {videoIds.map((id) => (
        <VideoBox key={id} id={id} />
      ))}
    </div>
  );
};

export default VideoWrapper;
