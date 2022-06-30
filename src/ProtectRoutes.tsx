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
  }
  return children;
};
export default Protected;
