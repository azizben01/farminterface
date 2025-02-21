// pages/accueil.tsx
import Link from "next/link";

const Accueil = () => {
  return (
    <main className="h-screen container mx-auto p-4 text-center flex flex-col justify-center items-center">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center md:bg-fixed"
        style={{ backgroundImage: "url('/images/trees.jpg')" }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-black opacity-70" />

      {/* Content */}
      <div className="relative space-y-6 bg-white bg-opacity-70 rounded-xl shadow-xl flex flex-col items-center justify-center w-11/12 sm:w-[600px] md:w-[700px] lg:w-[700px] xl:w-[800px] p-6 sm:p-8 md:p-10 lg:p-12">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-4xl font-bold text-custom-button sm:pb-10 md:pb-10 lg:pb-10 xl:pb-10">
          Bienvenue dans la ferme D&apos;élevage de Monsieur Clément
        </h1>
        <div className="flex flex-col w-full gap-4">
          <Link
            href="/userregistration"
            className="bg-white text-custom-button px-5 py-1 font-bold rounded-2xl text-lg sm:text-lg md:text-lg lg:text-xl hover:bg-custom-button hover:text-white transition duration-300"
          >
            S&apos;inscrire
          </Link>

          <Link
            href="/userlogin"
            className="bg-white text-custom-button px-5 py-1 font-bold rounded-2xl text-lg sm:text-lg md:text-lg lg:text-xl hover:bg-custom-button hover:text-white transition duration-300"
          >
            Se connecter
          </Link>
          <Link
            href="/adminlogin"
            className="bg-white text-custom-button px-4 py-1 rounded-2xl font-bold text-base sm:text-lg md:text-lg lg:text-xl hover:bg-custom-green hover:text-white focus:ring-2 focus:ring-custom-button focus:ring-opacity-50 transition duration-300 ease-in-out transform hover:scale-105 shadow-lg text-center"
          >
            Se connecter comme Administrateur
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Accueil;
