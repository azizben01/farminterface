"use client";
import React, { useState } from "react";
import { GiChicken } from "react-icons/gi";
import { TbEggs } from "react-icons/tb";
import { GiDeadHead } from "react-icons/gi";

type FormData = {
  Receivedchicks: number | string; // Allow string during input
  Lostchicks: number | string; // Allow string during input
  Hatchedeggs: number | string; // Allow string during input
  Unhatchedeggs: number | string; // Allow string during input
  Description: string;
};

const Poussinprod = () => {
  const [formData, setFormData] = useState<FormData>({
    Receivedchicks: "",
    Lostchicks: "",
    Hatchedeggs: "",
    Unhatchedeggs: "",
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
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Prepare the data, ensuring all numeric values are integers
    const dataToSend = {
      ...formData, //JS spread operator used to copy all properties from the formData into dataToSend.
      Receivedchicks:
        formData.Receivedchicks === ""
          ? null
          : parseInt(formData.Receivedchicks as string),
      Lostchicks:
        formData.Lostchicks === ""
          ? null
          : parseInt(formData.Lostchicks as string),
      Hatchedeggs:
        formData.Hatchedeggs === ""
          ? null
          : parseInt(formData.Hatchedeggs as string),
      Unhatchedeggs:
        formData.Unhatchedeggs === ""
          ? null
          : parseInt(formData.Unhatchedeggs as string),
    };

    try {
      const response = await fetch(
        "https://farmapi-jimn.onrender.com:5050/chickproductionform",
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
          Receivedchicks: "",
          Lostchicks: "",
          Hatchedeggs: "",
          Unhatchedeggs: "",
          Description: "",
        });
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message || "Something went wrong"}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while submitting the form. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-300 flex justify-center items-center p-8">
      <div
        className="absolute inset-0 bg-cover bg-center md:bg-fixed"
        style={{ backgroundImage: "url('/images/eggs.jpg')" }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-black opacity-70" />
      <div className="relative bg-white bg-opacity-60 mt-8 p-8 rounded-lg shadow-lg max-w-xl w-full max-h-lg h-full">
        <h1 className="text-3xl font-bold text-custom-gray1 mb-6 text-center">
          Production des poussins.
        </h1>
        <p className="text-center text-black mb-8">
          Remplissez cette fiche pour declarer la production des poussins.
        </p>

        {/* Service Request Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative mt-1">
            <GiChicken className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-900" />
            <input
              type="number"
              id="Receivedchicks"
              name="Receivedchicks"
              value={formData.Receivedchicks}
              onChange={handleInputChange}
              placeholder={"Nombre de poussins recu"}
              required
              className="bg-white text-gray-900 bg-opacity-80 pl-10 mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-800"
            />
          </div>

          <div className="relative mt-1">
            <GiDeadHead className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-900" />
            <input
              type="number"
              id="Lostchicks"
              name="Lostchicks"
              value={formData.Lostchicks}
              onChange={handleInputChange}
              placeholder={"Nombre de poussins perdu"}
              required
              className="bg-white text-gray-900 bg-opacity-80 pl-10 mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-800"
            />
          </div>
          <div className="relative mt-1">
            <TbEggs className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-900" />
            <input
              type="number"
              id="Hatchedeggs"
              name="Hatchedeggs"
              value={formData.Hatchedeggs}
              onChange={handleInputChange}
              placeholder={"Nombre d'oeufs eclos"}
              required
              className="bg-white text-gray-900 bg-opacity-80 pl-10 border border-gray-300 w-full px-4 py-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-800"
            />
          </div>

          <div className="relative mt-1">
            <TbEggs className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-900" />
            <input
              type="number"
              id="Unhatchedeggs"
              name="Unhatchedeggs"
              value={formData.Unhatchedeggs}
              onChange={handleInputChange}
              placeholder={"Nombre d'oeufs non eclos"}
              required
              className="bg-white text-gray-900 bg-opacity-80 pl-10 border border-gray-300 w-full px-4 py-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-800"
            />
          </div>

          <div>
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
            Enregister
          </button>
        </form>
      </div>
    </div>
  );
};

export default Poussinprod;
