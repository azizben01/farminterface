// pages/index.tsx
import Link from "next/link";

const Home = () => {
  return (
    <main className="h-screen container mx-auto p-4 text-center flex flex-col justify-center items-center">
      <div
        className="absolute inset-0 bg-cover bg-center md:bg-fixed"
        style={{ backgroundImage: "url('/images/trees.jpg')" }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-black opacity-70" />

      <div className="relative space-y-6 bg-gray-100 bg-opacity-50 rounded-xl shadow-xl flex flex-col items-center justify-center w-11/12 sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-2/5 p-6 sm:p-8 md:p-10 lg:p-12">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-3xl font-bold text-white">
          Bienvenue dans la ferme D'élevage de Monsieur Clément
        </h1>

        <Link
          href="/chooseform"
          className="bg-gray-800 text-white px-6 py-3 rounded-2xl text-lg sm:text-xl md:text-2xl lg:text-xl hover:bg-gray-700 transition duration-300"
        >
          Remplire une fiche
        </Link>

        <Link
          href="/checkdates"
          className="bg-gray-700 text-white px-6 py-3 rounded-2xl text-lg sm:text-xl md:text-2xl lg:text-xl hover:bg-gray-700 transition duration-300"
        >
          Verifier les dates a venir
        </Link>

        <Link
          href="/adminlogin"
          className="bg-gray-600 text-white px-6 py-3 rounded-2xl text-lg sm:text-xl md:text-2xl lg:text-xl hover:bg-gray-700 transition duration-300"
        >
          Se connecter comme Administrateur
        </Link>
      </div>
    </main>
  );
};

export default Home;
