import Link from "next/link";

const Chooseform = () => {
  return (
    <main className="h-screen container mx-auto flex flex-col justify-center items-center text-center">
      <div
        className="absolute inset-0 bg-cover bg-center md:bg-fixed"
        style={{ backgroundImage: "url('/images/poussins.jpg')" }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-black opacity-70" />
      <div className="relative bg-gray-500 bg-opacity-70  rounded-xl w-full md:w-1/2 h-auto flex flex-col items-center justify-center shadow-xl py-12">
        <h1 className="text-4xl font-bold mb-6 text-white">
          Choisissez une fiche à remplir
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-6 w-full text-xl">
          <Link
            href="/poussinprod"
            className="bg-custom-green text-white rounded-2xl text-center p-4 transform transition-transform duration-500 hover:scale-95 hover:bg-custom-hover hover:text-white hover:shadow-lg transition-all"
          >
            La production des poussins
          </Link>
          <Link
            href="/incubation"
            className="bg-custom-yellow text-black rounded-2xl text-center p-4 transform transition-transform duration-500 hover:scale-95 hover:bg-custom-hover hover:text-white hover:shadow-lg transition-all"
          >
            incubation des oeufs
          </Link>
          <Link
            href="/ventesdesoeufs"
            className="bg-custom-red text-white rounded-2xl text-center p-4 transform transition-transform duration-500 hover:scale-95 hover:bg-custom-hover hover:text-white hover:shadow-lg transition-all"
          >
            Le recapitulatif de vente des oeufs
          </Link>
          <Link
            href="/besoins"
            className="bg-custom-red text-white rounded-2xl text-center p-4 transform transition-transform duration-500 hover:scale-95 hover:bg-custom-hover hover:text-white hover:shadow-lg transition-all"
          >
            Les besoins de la ferme
          </Link>
          <Link
            href="/recapitulatifdesoeufs"
            className="bg-custom-green text-white rounded-2xl text-center p-4 transform transition-transform duration-500 hover:scale-95 hover:bg-custom-hover hover:text-white hover:shadow-lg transition-all"
          >
            Le recapitulatif des oeufs de table
          </Link>
          <Link
            href="/ventesdelaferme"
            className="bg-custom-yellow text-black rounded-2xl text-center p-4 transform transition-transform duration-500 hover:scale-95 hover:bg-custom-hover hover:text-white hover:shadow-lg transition-all"
          >
            Les ventes de la ferme
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Chooseform;
