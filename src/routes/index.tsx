import { createFileRoute } from "@tanstack/react-router";

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import BenefitsSection from "@/components/BenefitsSection";
import ObjectionsSection from "@/components/ObjectionsSection";
import ProductsSection from "@/components/ProductsSection";
import CtaSection from "@/components/CtaSection";
import FooterSection from "@/components/FooterSection";

import TidioChat from "@/components/TidioChat";
import ConfimexChatButton from "@/components/ConfimexChatButton";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {

  return (

    <>

      <TidioChat />

      <Navbar />

      <main>
        <HeroSection />
        <BenefitsSection />
        <ProductsSection />
        <ObjectionsSection />
        <CtaSection />
      </main>

      <FooterSection />

      <ConfimexChatButton />

    </>

  );

}