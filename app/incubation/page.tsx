"use client";
import { useState } from "react";
import { GiChicken } from "react-icons/gi";
import { TbEggs } from "react-icons/tb";

type FormData = {
  Incubatedeggs: number | string;
  Fertilizedeggs: number | string;
  Unfertilizedeggs: number | string;
  Description: string;
  Species: string;
};

const Incubation = () => {
  const [formData, setFormData] = useState<FormData>({
    Incubatedeggs: "",
    Fertilizedeggs: "",
    Unfertilizedeggs: "",
    Description: "",
    Species: "", // Default species
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
        name === "Species" || name === "Description"
          ? value
          : parseInt(value, 10) || "",
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const dataToSend = {
      ...formData,
      Incubatedeggs:
        formData.Incubatedeggs === ""
          ? null
          : parseInt(formData.Incubatedeggs as string),
      Fertilizedeggs:
        formData.Fertilizedeggs === ""
          ? null
          : parseInt(formData.Fertilizedeggs as string),
      Unfertilizedeggs:
        formData.Unfertilizedeggs === ""
          ? null
          : parseInt(formData.Unfertilizedeggs as string),
    };

    try {
      const response = await fetch(
        "https://farmapi-jimn.onrender.com/eggincubation",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend),
        }
      );

      if (response.ok) {
        alert("La fiche a bien été envoyée!");
        setFormData({
          Incubatedeggs: "",
          Fertilizedeggs: "",
          Unfertilizedeggs: "",
          Description: "",
          Species: "goliath",
        });
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

  return (
    <div className="min-h-screen bg-gray-300 flex justify-center items-center">
      <div
        className="absolute inset-0 bg-cover bg-center md:bg-fixed"
        style={{ backgroundImage: "url('/images/incubation.jpg')" }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-black opacity-70" />
      <div className="relative bg-white bg-opacity-60 p-8 rounded-lg shadow-lg max-w-xl w-full max-h-lg h-full">
        <h1 className="text-3xl font-bold text-custom-gray1 mb-4 text-center">
          Incubation des poussins.
        </h1>
        <p className="text-center text-black mb-4">
          Remplissez cette fiche pour déclarer incubation des poussins.
        </p>

        {/* Incubation Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative mt-1">
            <select
              id="Species"
              name="Species"
              value={formData.Species}
              onChange={handleInputChange}
              className="bg-white text-gray-900 bg-opacity-80 mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-800"
            >
              <option value="goliath">Goliath</option>
              <option value="cailles">Cailles</option>
              <option value="pintades">Pintades</option>
            </select>
          </div>

          <div className="relative mt-1">
            <GiChicken className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-900" />
            <input
              type="number"
              id="Incubatedeggs"
              name="Incubatedeggs"
              value={formData.Incubatedeggs}
              onChange={handleInputChange}
              placeholder={"Nombre d'oeufs mis en incubation"}
              required
              className="bg-white text-gray-900 bg-opacity-80 pl-10 mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-800"
            />
          </div>

          <div className="relative mt-1">
            <TbEggs className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-900" />
            <input
              type="number"
              id="Unfertilizedeggs"
              name="Unfertilizedeggs"
              value={formData.Unfertilizedeggs}
              onChange={handleInputChange}
              placeholder={"Nombre d'oeufs non féconds"}
              required
              className="bg-white text-gray-900 bg-opacity-80 pl-10 border border-gray-300 w-full px-4 py-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-800"
            />
          </div>

          <div className="relative mt-1">
            <TbEggs className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-900" />
            <input
              type="number"
              id="Fertilizedeggs"
              name="Fertilizedeggs"
              value={formData.Fertilizedeggs}
              onChange={handleInputChange}
              placeholder={"Nombre d'oeufs féconds"}
              required
              className="bg-white text-gray-900 bg-opacity-80 pl-10 border border-gray-300 w-full px-4 py-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-800"
            />
          </div>

          <div>
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
