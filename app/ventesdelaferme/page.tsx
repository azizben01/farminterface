"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { GiMoneyStack } from "react-icons/gi";
import { GoNumber } from "react-icons/go";

type FormData = {
  Quantite: number | string;
  Prix_Unitaire: number | string;
  Montant_Total: number | string;
  Description: string;
};

export default function VentesDeLaFerme() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    Quantite: "",
    Prix_Unitaire: "",
    Montant_Total: "",
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
        name === "Description"
          ? value // Keep Description as string
          : value === "" // For numeric fields, handle empty values properly
          ? ""
          : parseFloat(value), // Use parseFloat for decimal values
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
  // PrixUnitaire
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Convert numeric fields to numbers (or null if empty)
    const dataToSend = {
      Quantite: formData.Quantite === "" ? 0 : Number(formData.Quantite),
      Prix_Unitaire:
        formData.Prix_Unitaire === "" ? 0 : Number(formData.Prix_Unitaire),
      Montant_Total:
        formData.Montant_Total === "" ? 0 : Number(formData.Montant_Total),
      Description: formData.Description,
    };

    console.log("Payload sent to API:", dataToSend); // Debugging step

    try {
      const response = await fetch("https://fermeclement.site/farmsellings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        alert("La fiche a bien été envoyée !");
        setFormData({
          Quantite: "",
          Prix_Unitaire: "",
          Montant_Total: "",
          Description: "",
        });
        router.push("/chooseform");
        console.log("la forme envoyee:", formData);
      } else {
        const errorData = await response.json();
        alert(`Erreur : ${errorData.message || "Une erreur s'est produite."}`);
      }
    } catch (error) {
      console.error("Erreur lors de la soumission du formulaire", error);
      alert(
        "Une erreur s'est produite pendant la soumission de la fiche. Réessayez à nouveau."
      );
    }
  };

  const setFrenchValidationMessage = (
    element: HTMLInputElement | HTMLTextAreaElement
  ) => {
    element.setCustomValidity("Vous devez obligatoirement remplir ce champ.");
  };

  return (
    <div className="min-h-screen bg-gray-300 flex justify-center items-center p-4">
      <div
        className="absolute inset-0 bg-cover bg-center md:bg-fixed"
        style={{ backgroundImage: "url('/images/money.avif')" }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-black opacity-70" />
      <div className="relative bg-white bg-opacity-60 p-4 rounded-lg shadow-lg max-w-xl w-full max-h-lg h-full">
        <h1 className="text-3xl font-bold text-custom-gray1 mb-3 text-center">
          Fiche de vente de la ferme
        </h1>
        <p className="text-center text-black mb-4">
          Remplissez cette fiche en indiquant les ventes de la ferme.
        </p>

        {/* Service Request Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="relative mt-1">
            <p className="ml-2 text-black">Quantité</p>
            <GoNumber className="absolute top-[48px] left-3 transform -translate-y-1/2 text-gray-900" />
            <input
              type="number"
              id="Quantite"
              name="Quantite"
              value={formData.Quantite}
              onChange={handleInputChange}
              placeholder={"Quantité"}
              required
              className="bg-white text-gray-900 bg-opacity-80 pl-10 mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-800"
            />
          </div>

          <div className="relative mt-1">
            <p className="ml-2 text-black">Prix Unitaire</p>
            <GiMoneyStack className="absolute top-[48px] left-3 transform -translate-y-1/2 text-gray-900" />
            <input
              type="number"
              id="PrixUnitaire"
              name="Prix_Unitaire"
              value={formData.Prix_Unitaire}
              onChange={handleInputChange}
              placeholder={"Prix unitaire"}
              required
              className="bg-white text-gray-900 bg-opacity-80 pl-10 mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-800"
            />
          </div>

          <div className="relative mt-1">
            <p className="text-black ml-2">Montant Total</p>
            <GiMoneyStack className="absolute top-[45px] left-3 transform -translate-y-1/2 text-gray-900" />
            <input
              type="number"
              id="MontantTotal"
              name="Montant_Total"
              value={formData.Montant_Total}
              onChange={handleInputChange}
              placeholder={"Montant total"}
              required
              className="bg-white text-gray-900 bg-opacity-80 pl-10 border border-gray-300 w-full px-4 py-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-800"
            />
          </div>

          <div>
            <p className="ml-2 text-black">
              Vous devez décrire le besoin d&apos;achat
            </p>
            <textarea
              id="Description"
              name="Description"
              value={formData.Description}
              onChange={handleInputChange}
              rows={2}
              required
              onInvalid={(e) => {
                setFrenchValidationMessage(e.currentTarget);
              }}
              className="bg-white text-gray-900 bg-opacity-80 mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-800"
              placeholder={"Description"}
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
}
