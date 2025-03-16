import { useParams } from "react-router-dom";

const FarmPage = () => {
  const { id } = useParams();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-3xl font-bold">Details Page</h1>
      <p className="text-lg mt-2">
        You are viewing details for ID: <strong>{id}</strong>
      </p>
    </div>
  );
};

export default FarmPage;
