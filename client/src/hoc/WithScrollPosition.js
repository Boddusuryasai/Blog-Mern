import { useEffect } from "react";

function WithScrollPosition(Component) {
  return function WithScrollPositionComponent(props) {
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

    return <Component {...props} />;
  };
}

export default WithScrollPosition;
