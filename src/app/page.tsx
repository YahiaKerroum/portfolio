import Header from "@/components/Header";
import Hero from "@/components/hero/Hero";
import PageMotion from "@/components/PageMotion";
import { About, Contact, Footer, Work } from "@/components/Sections";

export default function Home() {
  return (
    <>
      <Header />
      <main id="top">
        <Hero />
        <Work />
        <About />
        <Contact />
      </main>
      <Footer />
      <PageMotion />
    </>
  );
}
