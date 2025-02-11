"use client";
import { useState } from "react";
import { GoNumber } from "react-icons/go";
import { GiMoneyStack } from "react-icons/gi";
import { useRouter } from "next/navigation";

type FormData = {
  Quantite: number | string;
  Prix_Unitaire: number | string;
  Montant_Total: number | string;
  Description: string;
};
const Besoins = () => {
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
    event.preventDefault();
    const dataToSend = {
      ...formData,
      Quantity: formData.Quantite === "" ? null : (formData.Quantite as number),
      Unitprice:
        formData.Prix_Unitaire === ""
          ? null
          : (formData.Prix_Unitaire as number),
      TotalAmount:
        formData.Montant_Total === ""
          ? null
          : (formData.Montant_Total as number),
    };

    try {
      const response = await fetch("http://195.35.28.233:5050/farmneeds", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });
      if (response.ok) {
        alert("La fiche a bien ete envoyee!");
        setFormData({
          Quantite: "",
          Prix_Unitaire: "",
          Montant_Total: "",
          Description: "",
        });
        router.push("/chooseform");
        console.log("la forme:", formData);
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
  const setFrenchValidationMessage = (
    element: HTMLInputElement | HTMLTextAreaElement
  ) => {
    element.setCustomValidity("Vous devez obligatoirement remplir ce champ.");
  };

  return (
    <div className="min-h-screen bg-gray-300 flex justify-center items-center p-2 sm:p-6 md:p-8">
      <div
        className="absolute inset-0 bg-cover bg-center md:bg-fixed"
        style={{ backgroundImage: "url('/images/money.avif')" }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-black opacity-70" />

      <div className="relative bg-white bg-opacity-60 p-5 rounded-lg shadow-lg max-w-xl w-full max-h-lg h-full">
        <h1 className="text-3xl font-bold text-custom-gray1 mb-3 text-center">
          Besoins de la ferme.
        </h1>
        <p className="text-center text-black mb-5">
          Remplissez cette fiche en indiquant les besoins necessaires de la
          ferme.
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
              onInvalid={(e) => {
                setFrenchValidationMessage(e.currentTarget);
              }}
              className="bg-white text-gray-900 bg-opacity-80 pl-10 mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-800"
            />
          </div>

          <div className="relative mt-1">
            <p className="ml-2 text-black">Prix Unitaire</p>
            <GiMoneyStack className="absolute top-[48px]  left-3 transform -translate-y-1/2 text-gray-900" />
            <input
              type="number"
              id="PrixUnitaire"
              name="Prix_Unitaire"
              value={formData.Prix_Unitaire}
              onChange={handleInputChange}
              placeholder={"Prix Unitaire"}
              required
              onInvalid={(e) => {
                setFrenchValidationMessage(e.currentTarget);
              }}
              className="bg-white text-gray-900 bg-opacity-80 pl-10 mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-800"
            />
          </div>

          <div className="relative mt-1">
            <p className="ml-2 text-black">Montant Total</p>
            <GiMoneyStack className="absolute top-[45px] left-3 transform -translate-y-1/2 text-gray-900" />
            <input
              type="number"
              id="MontantTotal"
              name="Montant_Total"
              value={formData.Montant_Total}
              onChange={handleInputChange}
              placeholder={"Montant total"}
              required
              onInvalid={(e) => {
                setFrenchValidationMessage(e.currentTarget);
              }}
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
            Enregister
          </button>
        </form>
      </div>
    </div>
  );
};
export default Besoins;
