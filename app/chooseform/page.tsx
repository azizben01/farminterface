"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Chooseform = () => {
  const router = useRouter();

  const handleBackClick = () => {
    router.push("/homepage");
  };

  return (
    <main className="h-screen container mx-auto flex flex-col justify-center items-center text-center">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center md:bg-fixed"
        style={{ backgroundImage: "url('/images/poussins.jpg')" }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/80" />

      {/* Content Container */}
      <div className="relative bg-gray-100/90 rounded-xl w-11/12 md:w-3/4 lg:w-2/3 xl:w-3/2 h-auto flex flex-col items-center justify-center shadow-2xl py-8 md:py-5 px-4 md:px-8">
        {/* Page Title */}
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
          Choisissez une fiche à remplir
        </h1>

        {/* Grid of Buttons */}
        <div className="flex flex-col gap-4 w-full">
          {[
            {
              href: "/incubation",
              text: "Incubation des oeufs",
              bgColor: "bg-white",
              hoverColor: "hover:bg-custom-green",
              textColor: "text-custom-green",
              hoverTextColor: "hover:text-white",
            },
            {
              href: "/poussinprod",
              text: "La production des poussins",
              bgColor: "bg-white",
              hoverColor: "hover:bg-custom-yellow",
              textColor: "text-custom-green",
              hoverTextColor: "hover:text-black",
            },
            {
              href: "/ventesdesoeufs",
              text: "Le récapitulatif de vente des oeufs",
              bgColor: "bg-white",
              hoverColor: "hover:bg-custom-red",
              textColor: "text-custom-green",
              hoverTextColor: "hover:text-white",
            },
            {
              href: "/besoins",
              text: "Achats de la ferme",
              bgColor: "bg-white",
              hoverColor: "hover:bg-custom-green",
              textColor: "text-custom-green",
              hoverTextColor: "hover:text-white",
            },
            {
              href: "/recapitulatifdesoeufs",
              text: "Le récapitulatif des oeufs de table",
              bgColor: "bg-white",
              hoverColor: "hover:bg-custom-yellow",
              textColor: "text-custom-green",
              hoverTextColor: "hover:text-black",
            },
            {
              href: "/ventesdelaferme",
              text: "Les ventes de la ferme",
              bgColor: "bg-white",
              hoverColor: "hover:bg-custom-red",
              textColor: "text-custom-green",
              hoverTextColor: "hover:text-white",
            },
          ].map((button, index) => (
            <Link
              key={index}
              href={button.href}
              className={`border border-custom-green flex items-center justify-center ${button.bgColor} ${button.textColor} font-semibold rounded-xl text-center p-2 transform transition-all duration-300 hover:scale-95 ${button.hoverColor} ${button.hoverTextColor} hover:shadow-lg`}
            >
              {button.text}
            </Link>
          ))}
        </div>

        {/* Back Button */}
        <button
          onClick={handleBackClick}
          className="mt-8 px-6 py-2 bg-white text-custom-button font-semibold text-lg rounded-xl shadow-md hover:bg-gray-200 hover:text-custom-button transition-all duration-300"
        >
          Retour au menu principal
        </button>
      </div>
    </main>
  );
};

export default Chooseform;
