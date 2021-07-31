import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const LoadingToRedirect = () => {
  const [count, setCount] = useState(5);

  const history = useHistory();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);

    count === 0 && history.push("/");
    return () => clearInterval(interval);
  }, [count]);

  return (
    <div className="countdown">
      <h1>
        Redirecting you in <span className="count">{count}</span>{" "}
        {count > 1 ? "seconds" : "second"}
      </h1>
    </div>
  );
};

export default LoadingToRedirect;
