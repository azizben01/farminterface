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
  Type_Achat: string;
  Autre_Type_Achat: string;
};

const Besoins = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    Quantite: "",
    Prix_Unitaire: "",
    Montant_Total: "",
    Description: "",
    Type_Achat: "",
    Autre_Type_Achat: "",
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
        name === "Description" ||
        name === "Type_Achat" ||
        name === "Autre_Type_Achat"
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
      const response = await fetch(
        "https://fermeclement.site/api/farmneeds",
        //  "http://192.168.1.8:5050/farmneeds",
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
          Quantite: "",
          Prix_Unitaire: "",
          Montant_Total: "",
          Description: "",
          Type_Achat: "",
          Autre_Type_Achat: "",
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

      <div className="relative bg-white p-5 rounded-lg shadow-lg max-w-2xl w-full max-h-lg h-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-3 text-center">
          Achats de la ferme
        </h1>
        <p className="text-center text-black mb-5">
          Remplissez cette fiche en indiquant les achats de la ferme
          necessaires.
        </p>

        {/* Service Request Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Type d'achat */}
          <div className="relative mt-1">
            <p className="ml-2 text-black">Type d&apos;achat</p>
            <select
              id="TypeAchat"
              name="Type_Achat"
              value={formData.Type_Achat}
              onChange={handleInputChange}
              required
              onInvalid={(e) => {
                const target = e.currentTarget;
                if (
                  target instanceof HTMLInputElement ||
                  target instanceof HTMLTextAreaElement
                ) {
                  setFrenchValidationMessage(target);
                } else {
                  target.setCustomValidity("Veuillez sélectionner une option.");
                }
              }}
              onInput={(e) => e.currentTarget.setCustomValidity("")} // Reset validation on input change
              className="bg-white text-gray-900 bg-opacity-80 pl-10 mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-800"
            >
              <option value="">Sélectionnez le type d&apos;achat</option>
              <option value="Provende">Provende</option>
              <option value="Produits vétérinaires">
                Produits vétérinaires
              </option>
              <option value="Petits matériels">Petits matériels</option>
              <option value="Carburant">Carburant</option>
              <option value="Electricité">Electricité</option>
              <option value="Autres">Autres (à préciser)</option>
            </select>
          </div>

          {/* Conditional input for "Autres" */}
          {formData.Type_Achat === "Autres" && (
            <div className="relative mt-1">
              <p className="ml-2 text-black">Précisez le type d&apos;achat</p>
              <input
                type="text"
                id="AutreTypeAchat"
                name="Autre_Type_Achat"
                value={formData.Autre_Type_Achat}
                onChange={handleInputChange}
                placeholder="Précisez le type d'achat"
                required
                onInvalid={(e) => {
                  setFrenchValidationMessage(e.currentTarget);
                }}
                className="bg-white text-gray-900 bg-opacity-80 pl-10 mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-800"
              />
            </div>
          )}

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
            <p className="ml-2 text-black">Entrer un commentaire si besoin.</p>
            <textarea
              id="Description"
              name="Description"
              value={formData.Description}
              onChange={handleInputChange}
              rows={2}
              onInvalid={(e) => {
                setFrenchValidationMessage(e.currentTarget);
              }}
              className="bg-white text-gray-900 bg-opacity-80 mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-800"
              placeholder={"Description"}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-custom-green text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-custom-button hover:text-white hover:scale-105 transition-transform duration-200 focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
          >
            Enregister
          </button>
        </form>
      </div>
    </div>
  );
};
export default Besoins;
