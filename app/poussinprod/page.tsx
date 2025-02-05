"use client";
import React, { useState } from "react";
import { GiChicken } from "react-icons/gi";
import { TbEggs } from "react-icons/tb";
import { GiDeadHead } from "react-icons/gi";
import { useRouter } from "next/navigation";

type FormData = {
  Poussins_Recus: number | string; // Allow string during input
  Poussins_Perdus: number | string; // Allow string during input
  Oeufs_Eclos: number | string; // Allow string during input
  Oeufs_Non_Eclos: number | string; // Allow string during input
  Description: string;
};

const Poussinprod = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    Poussins_Recus: "",
    Poussins_Perdus: "",
    Oeufs_Eclos: "",
    Oeufs_Non_Eclos: "",
    Description: "",
  });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "Description" ? value : value ? parseInt(value, 10) : "",
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
    event.preventDefault(); // Prevent default form submission behavior

    // Prepare the data, ensuring all numeric values are integers
    const dataToSend = {
      ...formData, //JS spread operator used to copy all properties from the formData into dataToSend.
      PoussinsRecus:
        formData.Poussins_Recus === ""
          ? null
          : parseInt(formData.Poussins_Recus as string),
      Lostchicks:
        formData.Poussins_Perdus === ""
          ? null
          : parseInt(formData.Poussins_Perdus as string),
      Hatchedeggs:
        formData.Oeufs_Eclos === ""
          ? null
          : parseInt(formData.Oeufs_Eclos as string),
      Unhatchedeggs:
        formData.Oeufs_Non_Eclos === ""
          ? null
          : parseInt(formData.Oeufs_Non_Eclos as string),
    };

    try {
      const response = await fetch(
        "http://192.168.1.4:5050/chickproductionform",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend),
        }
      );

      if (response.ok) {
        alert("La fiche a bien ete envoyee!");
        setFormData({
          Poussins_Recus: "",
          Poussins_Perdus: "",
          Oeufs_Eclos: "",
          Oeufs_Non_Eclos: "",
          Description: "",
        });
        router.push("/chooseform");
        console.log("la forme envoyee:", formData);
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message || "Something went wrong"}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while submitting the form. Please try again.");
    }
  };
  const setFrenchValidationMessage = (
    element: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  ) => {
    element.setCustomValidity("Vous devez obligatoirement remplir ce champ.");
  };

  return (
    <div className="min-h-screen bg-gray-300 flex justify-center items-center sm:p-6 md:p-8">
      <div
        className="absolute inset-0 bg-cover bg-center md:bg-fixed"
        style={{ backgroundImage: "url('/images/eggs.jpg')" }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-black opacity-70" />
      <div className="relative bg-white bg-opacity-60 p-2 sm:p-6 md:p-8 rounded-lg shadow-lg max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl w-full max-h-lg h-full">
        <h1 className="text-2xl sm:text-3xl font-bold text-custom-gray1 mb-4 sm:mb-6 text-center">
          Production des poussins.
        </h1>
        <p className="text-center text-black mb-4 sm:mb-8">
          Remplissez cette fiche pour déclarer la production des poussins.
        </p>

        {/* Service Request Form */}
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div className="relative mt-1">
            <p className="text-black ml-2">Nombre de poussins recu</p>
            <GiChicken className="absolute top-[48px] left-3 transform -translate-y-1/2 text-gray-900" />
            <input
              type="number"
              id="PoussinsRecus"
              name="Poussins_Recus"
              value={formData.Poussins_Recus}
              onChange={handleInputChange}
              placeholder={"Nombre de poussins recu"}
              required
              onInvalid={(e) => {
                setFrenchValidationMessage(e.currentTarget);
              }}
              className="bg-white text-gray-900 bg-opacity-80 pl-10 mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-800"
            />
          </div>

          <div className="relative mt-1">
            <p className="text-black ml-2">Nombre de poussins perdu</p>
            <GiDeadHead className="absolute top-[48px] left-3 transform -translate-y-1/2 text-gray-900" />
            <input
              type="number"
              id="PoussinsPerdus"
              name="Poussins_Perdus"
              value={formData.Poussins_Perdus}
              onChange={handleInputChange}
              placeholder={"Nombre de poussins perdu"}
              required
              onInvalid={(e) => {
                setFrenchValidationMessage(e.currentTarget);
              }}
              className="bg-white text-gray-900 bg-opacity-80 pl-10 mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-800"
            />
          </div>

          <div className="relative mt-1">
            <p className="text-black ml-2">Nombre d&apos;oeufs éclos</p>
            <TbEggs className="absolute top-[45px] left-3 transform -translate-y-1/2 text-gray-900" />
            <input
              type="number"
              id="OeufsEclos"
              name="Oeufs_Eclos"
              value={formData.Oeufs_Eclos}
              onChange={handleInputChange}
              placeholder={"Nombre d'oeufs éclos"}
              required
              onInvalid={(e) => {
                setFrenchValidationMessage(e.currentTarget);
              }}
              className="bg-white text-gray-900 bg-opacity-80 pl-10 border border-gray-300 w-full px-4 py-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-800"
            />
          </div>

          <div className="relative mt-1">
            <p className="text-black ml-2">Nombre d&apos;oeufs non éclos</p>
            <TbEggs className="absolute top-[45px] left-3 transform -translate-y-1/2 text-gray-900" />
            <input
              type="number"
              id="OeufsNonEclos"
              name="Oeufs_Non_Eclos"
              value={formData.Oeufs_Non_Eclos}
              onChange={handleInputChange}
              placeholder={"Nombre d'oeufs non éclos"}
              required
              onInvalid={(e) => {
                setFrenchValidationMessage(e.currentTarget);
              }}
              className="bg-white text-gray-900 bg-opacity-80 pl-10 border border-gray-300 w-full px-4 py-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-800"
            />
          </div>

          <div>
            <p className="text-black ml-2">
              Ajouter un commentaire si nécessaire
            </p>
            <textarea
              id="Description"
              name="Description"
              rows={2}
              value={formData.Description}
              onChange={handleInputChange}
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

export default Poussinprod;
