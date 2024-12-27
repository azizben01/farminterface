// pages/index.tsx
import Link from "next/link";

const Home = () => {
  return (
    <main className=" h-screen container mx-auto p-6 text-center flex flex-col justify-center items-center ">
      <div
        className="absolute inset-0 bg-cover bg-center md:bg-fixed"
        style={{ backgroundImage: "url('/images/trees.jpg')" }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-black opacity-70" />
      <div className="relative space-y-8 bg-gray-100 bg-opacity-50 rounded-xl w-1/2 h-1/2 flex flex-col items-center justify-center shadow-xl">
        <h1 className="text-[40px] mb-[30px]">
          Bienvenue dans la ferme ALIBOTO
        </h1>
        <Link
          href="/chooseform"
          className="bg-gray-800 text-white px-4 py-2 rounded-2xl text-xl"
        >
          Remplire une fiche
        </Link>
        <Link
          href="/adminlogin"
          className="bg-custom-hover text-white px-4 py-2 rounded-2xl text-xl"
        >
          Se connecter comme Administrateur
        </Link>
      </div>
    </main>
  );
};

export default Home;
