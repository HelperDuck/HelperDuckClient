import { Navigate } from "react-router-dom";

type Props = {
  isAuthUser: any;
  children: any;
  loading: any;
};

const Protected = (props: Props) => {
  const { children } = props;
  const { isAuthUser } = props;
  const { loading } = props;

  if (loading) return;
  if (isAuthUser) return children;
  if (!isAuthUser) return <Navigate to="/" replace />;
};
export default Protected;
