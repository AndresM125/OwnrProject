import React from "react";
import HomeContainerOrganism from "../components/Organisms/HomeContainerOrganism";
import { AnimalsProvider } from "../contexts/animals";

const Home = () => {
  return (
    <AnimalsProvider>
      <HomeContainerOrganism/>
    </AnimalsProvider>
  )
}

export default Home