import { FC } from "react";

import styles from "./Arrow.module.css";

export interface ArrowLeftProps {
  direction: "left" | "right";
  height: string;
  width: string;
}

const ArrowLeft: FC<ArrowLeftProps> = ({ direction, height, width }) => {
  return (
    <svg
      fill="currentcolor"
      height={height}
      width={width}
      className={styles[`icon--${direction}`]}
      version="1.1"
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 490 490"
    >
      <g>
        <g>
          <polygon points="332.668,490 82.631,244.996 332.668,0 407.369,76.493 235.402,244.996 407.369,413.507 		" />
        </g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
      </g>
    </svg>
  );
};

export default ArrowLeft;
