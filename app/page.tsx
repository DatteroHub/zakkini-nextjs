import NavBar from "@/components/nav/NavBar";

export default function Home() {
  // TODO if authenticated redirect to dashboard (ma anche login ecc)
  return (
    <>
      <NavBar />
      <div className="grid py-12 text-center">
        <h1 className="text-3xl font-bold">Benvenuti su Zakkini</h1>
      </div>
    </>
  );
}
