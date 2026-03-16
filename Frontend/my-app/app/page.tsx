import Carousel from "@/components/crousal";
import ProfessionalSearch from "@/components/searchBox";
import TopDestinations from "@/components/topDestination";

export default function Home() {
  return (
    <>
      <div className="mt-16 mb-8">
        <Carousel />
        <ProfessionalSearch />
        <TopDestinations />
      </div>
    </>
  );
}
