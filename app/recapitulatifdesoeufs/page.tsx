"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { GiDeadHead } from "react-icons/gi";
import { TbEggs } from "react-icons/tb";
///////////////// Edit the layout of the page here /////////////////////////

type FormData = {
  type_oeufs: string;
  oeufs_collectes: number | string;
  oeufs_casses: number | string;
  oeufs_restants: number | string;
  nombre_de_plateaux: number | string;
  Description: string;
};

export default function Recapitulatifdesoeufs() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    type_oeufs: "",
    oeufs_collectes: "",
    oeufs_casses: "",
    oeufs_restants: "",
    nombre_de_plateaux: "",
    Description: "",
  });

  const handleInputChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]:
        name === "Description" || name === "type_oeufs"
          ? value
          : value
          ? parseInt(value, 10)
          : "",
    }));
    // Set custom validation message in French
    if (event.target.validity.valueMissing) {
      setFrenchValidationMessage(
        event.target as HTMLInputElement | HTMLTextAreaElement
      );
    } else {
      event.target.setCustomValidity("");
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // prepare all data, ensuring all numeric values are integers
    const dataToSend = {
      ...formData,
      oeufs_collectes:
        formData.oeufs_collectes === ""
          ? null
          : parseInt(formData.oeufs_collectes as string),
      oeufs_casses:
        formData.oeufs_casses === ""
          ? null
          : parseInt(formData.oeufs_casses as string),
      oeufs_restants:
        formData.oeufs_restants === ""
          ? null
          : parseInt(formData.oeufs_restants as string),
      nombre_de_plateaux:
        formData.nombre_de_plateaux === ""
          ? null
          : parseInt(formData.nombre_de_plateaux as string),
    };

    try {
      const response = await fetch("https://fermeclement.site/api/tableeggs", {
        // const response = await fetch("http://192.168.1.8:5050/tableeggs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });
      if (response.ok) {
        alert("La fiche a bien ete envoyee!");
        setFormData({
          type_oeufs: "",
          oeufs_collectes: "",
          oeufs_casses: "",
          oeufs_restants: "",
          nombre_de_plateaux: "",
          Description: "",
        });
        router.push("/chooseform");
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message || "something went wrong"}`);
      }
    } catch (error) {
      console.error("error submitting the form:", error);
      alert(
        "Une erreur s'est produite pendant la soumission de la fiche. Veuillez reessayer a nouveau."
      );
    }
  };
  const setFrenchValidationMessage = (
    element: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  ) => {
    element.setCustomValidity("Vous devez obligatoirement remplir ce champ.");
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Background Image */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/eggtable.jpg')" }}
      />

      {/* Gradient Overlay */}
      <div className="fixed inset-0 bg-gradient-to-b from-black via-black to-black opacity-70" />

      {/* Content Container */}
      <div className="relative z-10 flex justify-center items-center h-full w-full p-2 sm:p-6 md:p-8">
        <div className="bg-white p-2 sm:p-6 md:p-8 rounded-lg shadow-lg w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl h-full max-h-full overflow-y-auto">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6 text-center">
            Fiche récapitulative des œufs de table.
          </h1>
          <p className="text-center text-black mb-4 sm:mb-8">
            Remplissez cette fiche pour enregistrer la production des œufs de
            table.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 pb-4">
            {/* Type d'œufs */}
            <div>
              <p className="text-black">Type d&apos;œufs</p>
              <select
                name="type_oeufs"
                value={formData.type_oeufs}
                onChange={handleInputChange}
                required
                className="w-full px-4 text-gray-800 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-gray-800"
              >
                <option value="">Sélectionnez un type</option>
                <option value="Goliath">Goliath</option>
                <option value="Pintade">Pintade</option>
                <option value="Caille">Caille</option>
                <option value="Canard">Canard</option>
              </select>
            </div>

            {/* Inputs */}
            <div className="relative mt-1">
              <p className="ml-2 text-black text-sm sm:text-base">
                Nombre d&apos;œufs ramassés
              </p>
              <TbEggs className="absolute top-[40px] sm:top-[47px] left-3 transform -translate-y-1/2 text-gray-900" />
              <input
                type="number"
                id="OeufsCollects"
                name="oeufs_collectes"
                value={formData.oeufs_collectes}
                onChange={handleInputChange}
                placeholder="Nombre d'œufs ramassés"
                required
                onInvalid={(e) => setFrenchValidationMessage(e.currentTarget)}
                className="bg-white text-gray-900 bg-opacity-80 pl-10 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-800"
              />
            </div>

            <div className="relative mt-1">
              <p className="ml-2 text-black text-sm sm:text-base">
                Nombre d&apos;œufs cassés
              </p>
              <GiDeadHead className="absolute top-[42px] sm:top-[49px] left-3 transform -translate-y-1/2 text-gray-900" />
              <input
                type="number"
                id="OeufsCasses"
                name="oeufs_casses"
                value={formData.oeufs_casses}
                onChange={handleInputChange}
                placeholder="Nombre d'œufs cassés"
                required
                onInvalid={(e) => setFrenchValidationMessage(e.currentTarget)}
                className="bg-white text-gray-900 bg-opacity-80 pl-10 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-800"
              />
            </div>

            <div className="relative mt-1">
              <p className="ml-2 text-black text-sm sm:text-base">
                Nombre d&apos;œufs restants
              </p>
              <TbEggs className="absolute top-[40px] sm:top-[45px] left-3 transform -translate-y-1/2 text-gray-900" />
              <input
                type="number"
                id="OeufsRestants"
                name="oeufs_restants"
                value={formData.oeufs_restants}
                onChange={handleInputChange}
                placeholder="Nombre d'œufs restants"
                required
                onInvalid={(e) => setFrenchValidationMessage(e.currentTarget)}
                className="bg-white text-gray-900 bg-opacity-80 pl-10 border border-gray-300 w-full px-3 py-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-800"
              />
            </div>

            <div className="relative mt-1">
              <p className="ml-2 text-black text-sm sm:text-base">
                Nombre de plateaux
              </p>
              <TbEggs className="absolute top-[40px] sm:top-[45px] left-3 transform -translate-y-1/2 text-gray-900" />
              <input
                type="number"
                id="Nombredeplateux"
                name="nombre_de_plateaux"
                value={formData.nombre_de_plateaux}
                onChange={handleInputChange}
                placeholder="Nombre de plateaux"
                required
                onInvalid={(e) => setFrenchValidationMessage(e.currentTarget)}
                className="bg-white text-gray-900 bg-opacity-80 pl-10 border border-gray-300 w-full px-3 py-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-800"
              />
            </div>

            {/* Commentaire */}
            <div>
              <p className="ml-2 text-black text-sm sm:text-base">
                Ajouter un commentaire si besoin
              </p>
              <textarea
                id="Description"
                name="Description"
                value={formData.Description}
                onChange={handleInputChange}
                rows={2}
                className="bg-white text-gray-900 bg-opacity-80 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-800"
                placeholder="Ajouter un commentaire"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-custom-green text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-custom-button hover:scale-105 transition-transform duration-200 focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
            >
              Enregistrer
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
