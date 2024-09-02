import React from "react";
import HomeHero from "../Components/HomeHero";
import MarketsHome from "../Components/MarketsHome";
import useAuth from "../hooks/useAuth";
import MainLandingPage from "../LandingPage/MainLandingPage";

const UserHome = () => {
  const { auth } = useAuth(); // Assuming auth contains the entire object

  const Authenticated = () => (
    <div>
      <div className="border-b">
        <HomeHero isProfile={false} />
      </div>
      <div className="">
        <MarketsHome />
        {/* <div className="border-2 border-green-900 w-80 h-screen"></div> */}
      </div>
    </div>
  );

  const NotAuthenticated = () => {
    return (
      <div>
        <MainLandingPage />
      </div>
    );
  };

  return (
    <div>{auth && auth.token ? <Authenticated /> : <NotAuthenticated />}</div>
  );
};

export default UserHome;
