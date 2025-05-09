import Link from "next/link";
import Image from "next/image";

const Accueil = () => {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      {/* Background with farm/agriculture image */}
      <div className="absolute inset-0 bg-[url('/images/trees.jpg')] bg-cover bg-center" />
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-black opacity-70" />

      {/* Main card container */}
      <div className="relative w-full max-w-4xl mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Split layout with color block */}
        <div className="flex flex-col md:flex-row">
          {/* Left side - Branding section */}
          <div className="w-full md:w-2/5 bg-custom-button p-8 flex flex-col items-center justify-center">
            <div className="mb-6 w-48 h-48 relative">
              <Image
                src="/images/logo.png"
                alt="Ferme D'élevage de Monsieur Clément"
                fill
                className="object-contain drop-shadow-lg"
                priority
              />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white text-center">
              Ferme D'élevage <br />
              de Monsieur Clément
            </h1>
          </div>

          {/* Right side - Content section */}
          <div className="w-full md:w-3/5 p-8 md:p-12 flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
              Bienvenue sur notre plateforme
            </h2>

            <div className="space-y-4">
              <Link
                href="/userlogin"
                className="block w-full bg-custom-button hover:bg-custom-button-dark text-white font-semibold py-3 px-6 rounded-lg transition duration-300 text-center shadow-md hover:shadow-lg"
              >
                Se connecter
              </Link>

              <Link
                href="/adminlogin"
                className="block w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-lg transition duration-300 text-center shadow-md hover:shadow-lg"
              >
                Espace Administrateur
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Accueil;
