"use client";
import { useState } from "react";
import { GiMoneyStack } from "react-icons/gi";
import { GoNumber } from "react-icons/go";

type FormData = {
  Quantity: number | string;
  Unitprice: number | string;
  Totalamount: number | string;
  Description: string;
};
export default function VentesDeLaFerme() {
  const [formData, setFormData] = useState<FormData>({
    Quantity: "",
    Unitprice: "",
    Totalamount: "",
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
      [name]: name === "Description" ? value : value ? parseInt(value, 10) : "",
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const dataToSend = {
      ...formData,
      Quantity: formData.Quantity === "" ? null : (formData.Quantity as string),
      Unitprice:
        formData.Unitprice === "" ? null : (formData.Unitprice as string),
      TotalAmount:
        formData.Totalamount === "" ? null : (formData.Totalamount as string),
    };

    try {
      const response = await fetch(
        "https://farmapi-jimn.onrender.com/farmsellings",
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
          Quantity: "",
          Unitprice: "",
          Totalamount: "",
          Description: "",
        });
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message || "Une erreur s'est produite."}`);
      }
    } catch (error) {
      console.error("Error submitting form", error);
      alert(
        "Une erreur s'est produite pendant la soumission de la fiche. Reessayez a nouveau."
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-300 flex justify-center items-center p-8">
      <div
        className="absolute inset-0 bg-cover bg-center md:bg-fixed"
        style={{ backgroundImage: "url('/images/money.avif')" }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-black opacity-70" />
      <div className="relative bg-white bg-opacity-60 mt-8 p-8 rounded-lg shadow-lg max-w-xl w-full max-h-lg h-full">
        <h1 className="text-3xl font-bold text-custom-gray1 mb-6 text-center">
          Fiche de vente de la ferme.
        </h1>
        <p className="text-center text-black mb-8">
          Remplissez cette fiche en indiquant les ventes de la ferme/
        </p>

        {/* Service Request Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative mt-1">
            <GoNumber className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-900" />
            <input
              type="number"
              id="Quantity"
              name="Quantity"
              value={formData.Quantity}
              onChange={handleInputChange}
              placeholder={"Quantite"}
              required
              className="bg-white text-gray-900 bg-opacity-80 pl-10 mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-800"
            />
          </div>

          <div className="relative mt-1">
            <GiMoneyStack className="absolute top-1/2  left-3 transform -translate-y-1/2 text-gray-900" />
            <input
              type="number"
              id="Unitprice"
              name="Unitprice"
              value={formData.Unitprice}
              onChange={handleInputChange}
              placeholder={"Prix unitaire"}
              required
              className="bg-white text-gray-900 bg-opacity-80 pl-10 mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-800"
            />
          </div>
          <div className="relative mt-1">
            <GiMoneyStack className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-900" />
            <input
              type="number"
              id="Totalamount"
              name="Totalamount"
              value={formData.Totalamount}
              onChange={handleInputChange}
              placeholder={"Montant total"}
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
              required
              className="bg-white text-gray-900 bg-opacity-80 mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-800"
              placeholder={"Description"}
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
}
