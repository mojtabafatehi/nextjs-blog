import Container from "@/components/Container";
import NextCeremony from "@/components/NextCeremony";
import HomeSlider from "@/components/Slider";

export default function Home() {
  return (
    <div className="my-6">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-9 h-80 order-1  md:order-none">
            <HomeSlider />
          </div>

          <div className="md:col-span-3 h-80 order-2 md:order-none">
            <NextCeremony />
          </div>
        </div>
        home
      </Container>
    </div>
  );
}
