"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { GiChicken } from "react-icons/gi";
import { TbEggs } from "react-icons/tb";

type FormData = {
  oeufs_incuber: number | string;
  oeufs_fertiliser: number | string;
  oeufs_non_fertiliser: number | string;
  Description: string;
  Espece: string;
};

const Incubation = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    oeufs_incuber: "",
    oeufs_fertiliser: "",
    oeufs_non_fertiliser: "",
    Description: "",
    Espece: "", // Default species
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
        name === "Espece" || name === "Description"
          ? value
          : parseInt(value, 10) || "",
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

    // const dataToSend = {
    //   ...formData,
    //   oeufs_incuber:
    //     formData.oeufs_incuber === ""
    //       ? null
    //       : parseInt(formData.oeufs_incuber as string),
    //   oeufs_fertiliser:
    //     formData.oeufs_fertiliser === ""
    //       ? null
    //       : parseInt(formData.oeufs_fertiliser as string),
    //   oeufs_non_fertiliser:
    //     formData.oeufs_non_fertiliser === ""
    //       ? null
    //       : parseInt(formData.oeufs_non_fertiliser as string),
    // };

    const dataToSend = {
      oeufs_incuber:
        formData.oeufs_incuber === "" ? null : Number(formData.oeufs_incuber),
      oeufs_fertiliser:
        formData.oeufs_fertiliser === ""
          ? null
          : Number(formData.oeufs_fertiliser),
      oeufs_non_fertiliser:
        formData.oeufs_non_fertiliser === ""
          ? null
          : Number(formData.oeufs_non_fertiliser),
      description: formData.Description,
      espece: formData.Espece,
    };
    try {
      const response = await fetch("http://192.168.1.4:5050/eggincubation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        alert("La fiche a bien été envoyée!");
        setFormData({
          oeufs_incuber: "",
          oeufs_fertiliser: "",
          oeufs_non_fertiliser: "",
          Description: "",
          Espece: "goliath",
        });
        router.push("/chooseform");
        console.log("la forme envoyee:", formData);
      } else {
        const errorData = await response.json();
        alert(`Erreur: ${errorData.error || "Une erreur s'est produite."}`);
      }
    } catch (error) {
      console.error("error submitting the form:", error);
      alert(
        "Une erreur s'est produite pendant la soumission de la fiche. Réessayez à nouveau."
      );
    }
  };
  const setFrenchValidationMessage = (
    element: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  ) => {
    element.setCustomValidity("Vous devez obligatoirement remplir ce champ.");
  };

  return (
    <div className="min-h-full bg-gray-300 flex justify-center items-center p-4 sm:p-6 md:p-8">
      <div
        className="absolute inset-0 bg-cover bg-center md:bg-fixed"
        style={{ backgroundImage: "url('/images/incubation.jpg')" }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-black opacity-70" />

      <div className="relative bg-white bg-opacity-60 p-2 sm:p-6 md:p-8 rounded-lg shadow-lg max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl w-full max-h-lg h-full">
        <h1 className="text-2xl sm:text-3xl font-bold text-custom-gray1 mb-4 text-center">
          Incubation des Oeufs.
        </h1>
        <p className="text-center text-black mb-4 text-sm sm:text-base">
          Remplissez cette fiche pour déclarer incubation des Oeufs.
        </p>

        {/* Incubation Form */}
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div className="relative">
            <select
              id="espece"
              name="Espece"
              value={formData.Espece}
              required
              onChange={handleInputChange}
              onInvalid={(e) => {
                setFrenchValidationMessage(e.currentTarget);
              }}
              className="bg-white text-gray-900 bg-opacity-80 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-800"
            >
              <option value="">Sélectionnez une espèce</option>
              <option value="goliath">Goliath</option>
              <option value="cailles">Cailles</option>
              <option value="pintades">Pintades</option>
            </select>
          </div>

          <div className="relative">
            <p className="ml-2 text-black text-sm sm:text-base">
              Nombre d&apos;oeufs mis en incubation
            </p>
            <GiChicken className="absolute top-[48px] left-3 transform -translate-y-1/2 text-gray-900" />
            <input
              type="number"
              id="OeufsIncuber"
              name="oeufs_incuber"
              value={formData.oeufs_incuber}
              onChange={handleInputChange}
              placeholder={"Nombre d'oeufs mis en incubation"}
              required
              className="bg-white text-gray-900 bg-opacity-80 pl-10 mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-800"
            />
          </div>

          <div className="relative">
            <p className="ml-2 text-black text-sm sm:text-base">
              Nombre d&apos;oeufs non féconds
            </p>
            <TbEggs className="absolute top-[45px] left-3 transform -translate-y-1/2 text-gray-900" />
            <input
              type="number"
              id="OeufsNonFertiliser"
              name="oeufs_non_fertiliser"
              value={formData.oeufs_non_fertiliser}
              onChange={handleInputChange}
              placeholder={"Nombre d'oeufs non féconds"}
              required
              className="bg-white text-gray-900 bg-opacity-80 pl-10 border border-gray-300 w-full px-4 py-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-800"
            />
          </div>

          <div className="relative">
            <p className="ml-2 text-black text-sm sm:text-base">
              Nombre d&apos;oeufs féconds
            </p>
            <TbEggs className="absolute top-[45px] left-3 transform -translate-y-1/2 text-gray-900" />
            <input
              type="number"
              id="OeufsFertiliser"
              name="oeufs_fertiliser"
              value={formData.oeufs_fertiliser}
              onChange={handleInputChange}
              placeholder={"Nombre d'oeufs féconds"}
              required
              onInvalid={(e) => {
                setFrenchValidationMessage(e.currentTarget);
              }}
              className="bg-white text-gray-900 bg-opacity-80 pl-10 border border-gray-300 w-full px-4 py-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-800"
            />
          </div>

          <div>
            <p className="ml-2 text-black text-sm sm:text-base">
              Ajouter un commentaire si necessaire
            </p>
            <textarea
              id="Description"
              name="Description"
              value={formData.Description}
              onChange={handleInputChange}
              rows={2}
              className="bg-white text-gray-900 bg-opacity-80 mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-800"
              placeholder={"Ajouter un commentaire"}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gray-900 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-gray-800 hover:scale-105 transition-transform duration-200 focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
          >
            Enregistrer
          </button>
        </form>
      </div>
    </div>
  );
};
export default Incubation;
