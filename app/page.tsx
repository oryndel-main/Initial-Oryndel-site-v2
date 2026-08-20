import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import Proof from "@/components/Proof";
import Skepticism from "@/components/Skepticism";
import Industries from "@/components/Industries";
import BuildProcess from "@/components/BuildProcess";
import Pricing from "@/components/Pricing";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Nav />
      <Hero />
      <Problem />
      <Proof />
      <Skepticism />
      <Industries />
      <BuildProcess />
      <Pricing />
      <FinalCTA />
      <Footer />
    </main>
  );
}
