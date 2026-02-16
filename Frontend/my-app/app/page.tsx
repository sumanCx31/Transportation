import Carousel from "@/components/crousal";
import Navbar from "@/components/navbar";
import Image from "next/image";
import UniversalGlassSearch from "@/components/searchBox";
import ProfessionalSearch from "@/components/searchBox";
import TopDestinations from "@/components/topDestination";

export default function Home() {
  return (
    <>
      <div className="mt-16 mb-8">
        <Carousel />
        {/* <UniversalGlassSearch /> */}
        <ProfessionalSearch />
        <TopDestinations />
      </div>
    </>
  );
}
