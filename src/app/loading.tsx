import { Loader } from "~/components/Loader";

type LoadingProps = {
  id?: string;
};

export const Loading: React.FC<LoadingProps> = () => {
  return <Loader />;
};

export default Loading;
