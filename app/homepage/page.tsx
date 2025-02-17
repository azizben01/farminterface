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

      <div className="relative space-y-6 bg-gray-100 bg-opacity-50 rounded-xl shadow-xl flex flex-col items-center justify-center w-11/12 sm:w-[600px] md:w-[700px] lg:w-[700px] xl:w-[800px] p-6 sm:p-8 md:p-10 lg:p-12">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-4xl font-bold text-custom-button sm:pb-10 md:pb-10 lg:pb-10 xl:pb-10">
          Bienvenue dans la ferme D&apos;élevage de Monsieur Clément
        </h1>

        <div className="flex flex-row gap-5">
          <Link
            href="/chooseform"
            className="bg-white text-custom-button px-3 py-2 rounded-2xl font-bold text-lg sm:text-xl md:text-2xl lg:text-xl hover:bg-custom-button hover:text-white transition duration-300"
          >
            Remplire une fiche
          </Link>

          <Link
            href="/checkdates"
            className="bg-white text-custom-button px-3 py-2 rounded-2xl font-bold text-lg sm:text-xl md:text-2xl lg:text-xl hover:bg-custom-button hover:text-white transition duration-300"
          >
            Verifier les dates a venir
          </Link>

          <Link
            href="/adminlogin"
            className="bg-white text-custom-button px-1 py-2 rounded-2xl font-bold text-lg sm:text-xl md:text-2xl lg:text-xl hover:bg-custom-button hover:text-white transition duration-300"
          >
            Se connecter comme Administrateur
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Home;
