import "./BoardSkeleton.scss";
import { Skeleton } from "antd";

export const BoardSkeleton = () => {
  return (
    <div className="board-skeleton-container">
      <Skeleton.Input active className="column-skeleton" />
      <Skeleton.Input active className="column-skeleton" />
      <Skeleton.Input active className="column-skeleton" />
    </div>
  );
};
