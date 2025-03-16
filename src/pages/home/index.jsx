import { useUser, SignOutButton } from "@clerk/clerk-react";

const HomePage = () => {
  const { user } = useUser();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-3xl font-bold">Welcome, {user?.firstName} 👋</h1>
      <p className="text-lg mt-2">This is a private home page.</p>

      <SignOutButton>
        <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded">
          Logout
        </button>
      </SignOutButton>
    </div>
  );
};

export default HomePage;
