import { Skeleton } from "@mui/material";

import "@/styles/components/index.scss";

export const LoadingSkeleton = () => {
  return (
    <>
      {Array.from({ length: 11 }).map((_, index) => (
        <div className="chat" key={index}>
          <div className="flex-left">
            <Skeleton
              variant="circular"
              animation="wave"
              sx={{ width: "3.2rem", height: "3.2rem" }}
            />
          </div>
          <div className="flex-right">
            <div className="flex-top">
              <p className="name">
                <Skeleton variant="text" animation="wave" width={31.12} />
              </p>
              <p className="time">
                <Skeleton variant="text" animation="wave" width={35.84} />
              </p>
            </div>
            <div className="flex-bottom">
              <p>
                <Skeleton variant="text" animation="wave" />
              </p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
