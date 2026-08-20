import { createFileRoute, Link } from "@tanstack/react-router";
import Navbar from "@/components/Navbar"; import FooterSection from "@/components/FooterSection"; import ProductsSection from "@/components/ProductsSection";
export const Route=createFileRoute("/seprod")({component:Page}); function Page(){return <><Navbar/><main className="pt-28"><ProductsSection/><div className="pb-16 text-center"><Link to="/" className="font-semibold text-brand">Volver a CONFIMÉX</Link></div></main><FooterSection/></>}
