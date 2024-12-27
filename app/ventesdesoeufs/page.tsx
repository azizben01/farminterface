"use client";
import { useState } from "react";
import { GiDeadHead } from "react-icons/gi";
import { TbEggs } from "react-icons/tb";

type FormData = {
  Platenumber: string | number;
  Unitprice: string | number;
  Amount: string | number;
  Receivedamount: string | number;
  Remainingamount: string | number;
  Description: string;
};
export default function VentesDesOeufs() {
  const [formData, setFormData] = useState<FormData>({
    Platenumber: "",
    Unitprice: "",
    Amount: "",
    Receivedamount: "",
    Remainingamount: "",
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

    // prepare all data, ensuring all numeric values are integers
    const dataToSend = {
      ...formData,
      Platenumber:
        formData.Platenumber === ""
          ? null
          : parseInt(formData.Platenumber as string),
      Unitprice:
        formData.Unitprice === ""
          ? null
          : parseInt(formData.Unitprice as string),
      Amount:
        formData.Amount === "" ? null : parseInt(formData.Amount as string),
      Receivedamount:
        formData.Receivedamount === ""
          ? null
          : parseInt(formData.Receivedamount as string),
      Remainingamount:
        formData.Remainingamount === ""
          ? null
          : parseInt(formData.Remainingamount as string),
    };
    try {
      const response = await fetch("http://192.168.1.87:5050/eggsales", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });
      if (response.ok) {
        alert("La fiche a bien ete envoyee!");
        setFormData({
          Platenumber: "",
          Unitprice: "",
          Amount: "",
          Receivedamount: "",
          Remainingamount: "",
          Description: "",
        });
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

  return (
    <div className="min-h-screen bg-gray-300 flex justify-center items-center p-8">
      <div
        className="absolute inset-0 bg-cover bg-center md:bg-fixed"
        style={{ backgroundImage: "url('/images/eggtable.jpg')" }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-black opacity-70" />
      <div className="relative bg-white bg-opacity-60 p-8 rounded-lg shadow-lg max-w-xl w-full max-h-lg h-full">
        <h1 className="text-3xl font-bold text-custom-gray1 mb-6 text-center">
          Fiche recapitulatif de la vente des oeufs.
        </h1>
        <p className="text-center text-black mb-8">
          Remplissez cette fiche pour enregister la vente des oeufs de table.
        </p>

        {/* Service Request Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative mt-1">
            <TbEggs className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-900" />
            <input
              type="number"
              id="Platenumber"
              name="Platenumber"
              value={formData.Platenumber}
              onChange={handleInputChange}
              placeholder={"Nombre de plateaux"}
              required
              className="bg-white text-gray-900 bg-opacity-80 pl-10 mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-800"
            />
          </div>

          <div className="relative mt-1">
            <GiDeadHead className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-900" />
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
            <TbEggs className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-900" />
            <input
              type="number"
              id="Amount"
              name="Amount"
              value={formData.Amount}
              onChange={handleInputChange}
              placeholder={"Montant"}
              required
              className="bg-white text-gray-900 bg-opacity-80 pl-10 border border-gray-300 w-full px-4 py-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-800"
            />
          </div>
          <div className="relative mt-1">
            <TbEggs className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-900" />
            <input
              type="number"
              id="Receivedamount"
              name="Receivedamount"
              value={formData.Receivedamount}
              onChange={handleInputChange}
              placeholder={"Montant recuperer"}
              required
              className="bg-white text-gray-900 bg-opacity-80 pl-10 border border-gray-300 w-full px-4 py-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-800"
            />
          </div>
          <div className="relative mt-1">
            <TbEggs className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-900" />
            <input
              type="number"
              id="Remainingamount"
              name="Remainingamount"
              value={formData.Remainingamount}
              onChange={handleInputChange}
              placeholder={"Reste a encaisser"}
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
            Enregister
          </button>
        </form>
      </div>
    </div>
  );
}
