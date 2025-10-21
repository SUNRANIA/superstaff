import Hero from "../components/Hero";
import Service from "../components/Service";
import Footer from "../components/Footer";
console.log("Hero is:", Hero);
console.log("Service is:", Service);

function Home() {
  return (
    <div>
      <Hero />
      <Service />
      <Footer/>
    </div>
  );
}

export default Home;
