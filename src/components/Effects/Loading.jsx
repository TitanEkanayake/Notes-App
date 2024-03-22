import { useSelector, useDispatch } from "react-redux";
const LoadingAnimation = () => {
  const { loading } = useSelector((state) => state.notes);
  if (!loading) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg flex items-center space-x-2">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        <div className="text-lg font-semibold">Loading...</div>
      </div>
    </div>
  );
};

export default LoadingAnimation;
