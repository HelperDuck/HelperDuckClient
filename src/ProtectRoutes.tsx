import { Navigate } from "react-router-dom";

type Props = {
  isAuthUser: any;
  children: any;
};
const Protected = (props: Props) => {
  const { children } = props;
  const { isAuthUser } = props;

  if (!isAuthUser) {
    return <Navigate to="/" replace />;
  } else {
    return children;
  }

  // if (!isAuthUser) {
  //   // setTimeout(() => {
  //   return <Navigate to="/" replace />;
  //   // }, 1000);
  // }
  // return children;
};
export default Protected;
