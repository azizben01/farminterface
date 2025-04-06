"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { GiMoneyStack } from "react-icons/gi";
import { GoNumber } from "react-icons/go";

type FormData = {
  nom_du_client: string;
  type_de_vente: string;
  Quantite: number | string;
  Prix_Unitaire: number | string;
  Montant_Total: number | string;
  montant_recu: number | string;
  montant_restant: number | string;
  montant_rembourse: number | string;
  Description: string;
};

export default function VentesDeLaFerme() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    nom_du_client: "",
    type_de_vente: "",
    Quantite: "",
    Prix_Unitaire: "",
    Montant_Total: "",
    montant_recu: "",
    montant_restant: "",
    montant_rembourse: "",
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
        name === "Description" ||
        name === "nom_du_client" ||
        name === "type_de_vente"
          ? value // Keep Description, nom_du_client, and type_de_vente as strings
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Convert numeric fields to numbers (or null if empty)
    const dataToSend = {
      nom_du_client: formData.nom_du_client,
      type_de_vente: formData.type_de_vente,
      Quantite: formData.Quantite === "" ? 0 : Number(formData.Quantite),
      Prix_Unitaire:
        formData.Prix_Unitaire === "" ? 0 : Number(formData.Prix_Unitaire),
      Montant_Total:
        formData.Montant_Total === "" ? 0 : Number(formData.Montant_Total),
      montant_recu:
        formData.montant_recu === "" ? 0 : Number(formData.montant_recu),
      montant_restant:
        formData.montant_restant === "" ? 0 : Number(formData.montant_restant),
      montant_rembourse:
        formData.montant_rembourse === ""
          ? 0
          : Number(formData.montant_rembourse),
      Description: formData.Description,
    };

    console.log("Payload sent to API:", dataToSend); // Debugging step

    try {
      const response = await fetch(
        "https://fermeclement.site/api/farmsellings",
        //"http://192.168.1.8:5050/farmsellings",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend),
        }
      );

      if (response.ok) {
        alert("La fiche a bien été envoyée !");
        setFormData({
          nom_du_client: "",
          type_de_vente: "",
          Quantite: "",
          Prix_Unitaire: "",
          Montant_Total: "",
          montant_recu: "",
          montant_restant: "",
          montant_rembourse: "",
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
      <div className="relative bg-white p-5 rounded-lg shadow-lg max-w-5xl w-full overflow-y-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-2 text-center">
          Fiche de vente de la ferme
        </h1>
        <p className="text-center text-black mb-3">
          Remplissez cette fiche en indiquant les ventes de la ferme.
        </p>

        {/* Service Request Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* First row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <p className="ml-2 text-black text-sm">Nom du client</p>
              <input
                type="text"
                id="NomDuClient"
                name="nom_du_client"
                value={formData.nom_du_client}
                onChange={handleInputChange}
                placeholder={"Nom du client"}
                required
                className="bg-white text-gray-900 bg-opacity-80 pl-3 mt-1 block w-full px-3 py-1.5 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-800"
              />
            </div>

            <div className="relative">
              <p className="ml-2 text-black text-sm">Type de vente</p>
              <select
                id="TypeDeVente"
                name="type_de_vente"
                value={formData.type_de_vente}
                onChange={handleInputChange}
                required
                className="bg-white text-gray-900 bg-opacity-80 pl-3 mt-1 block w-full px-3 py-1.5 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-800"
              >
                <option value="">Sélectionnez le type de vente</option>
                <option value="Goliath viande">Goliath viande</option>
                <option value="Œufs féconds Goliath">
                  Œufs féconds Goliath
                </option>
                <option value="Poussin Goliath">Poussin Goliath</option>
                <option value="Géniteurs Goliath">Géniteurs Goliath</option>
                <option value="Pintade viande">Pintade viande</option>
                <option value="Poussin Pintade">Poussin Pintade</option>
                <option value="Œufs Pintade">Œufs Pintade</option>
                <option value="Caille viande">Caille viande</option>
                <option value="Œufs Caille">Œufs Caille</option>
                <option value="Géniteurs Caille">Géniteurs Caille</option>
                <option value="Canard viande">Canard viande</option>
                <option value="Œufs Canard">Œufs Canard</option>
              </select>
            </div>
          </div>

          {/* Second row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <p className="ml-2 text-black text-sm">Quantité</p>
              <div className="relative">
                <GoNumber className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-900" />
                <input
                  type="number"
                  id="Quantite"
                  name="Quantite"
                  value={formData.Quantite}
                  onChange={handleInputChange}
                  placeholder={"Quantité"}
                  required
                  className="bg-white text-gray-900 bg-opacity-80 pl-8 mt-1 block w-full px-3 py-1.5 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-800"
                />
              </div>
            </div>

            <div className="relative">
              <p className="ml-2 text-black text-sm">Prix unitaire</p>
              <div className="relative">
                <GiMoneyStack className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-900" />
                <input
                  type="number"
                  id="PrixUnitaire"
                  name="Prix_Unitaire"
                  value={formData.Prix_Unitaire}
                  onChange={handleInputChange}
                  placeholder={"Prix unitaire"}
                  required
                  className="bg-white text-gray-900 bg-opacity-80 pl-8 mt-1 block w-full px-3 py-1.5 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-800"
                />
              </div>
            </div>

            <div className="relative">
              <p className="ml-2 text-black text-sm">Montant total</p>
              <div className="relative">
                <GiMoneyStack className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-900" />
                <input
                  type="number"
                  id="MontantTotal"
                  name="Montant_Total"
                  value={formData.Montant_Total}
                  onChange={handleInputChange}
                  placeholder={"Montant total"}
                  required
                  className="bg-white text-gray-900 bg-opacity-80 pl-8 mt-1 block w-full px-3 py-1.5 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-800"
                />
              </div>
            </div>
          </div>

          {/* Third row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <p className="ml-2 text-black text-sm">Montant récupéré</p>
              <div className="relative">
                <GiMoneyStack className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-900" />
                <input
                  type="number"
                  id="MontantRecu"
                  name="montant_recu"
                  value={formData.montant_recu}
                  onChange={handleInputChange}
                  placeholder={"Montant récupéré"}
                  required
                  className="bg-white text-gray-900 bg-opacity-80 pl-8 mt-1 block w-full px-3 py-1.5 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-800"
                />
              </div>
            </div>

            <div className="relative">
              <p className="ml-2 text-black text-sm">Reste à récupérer</p>
              <div className="relative">
                <GiMoneyStack className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-900" />
                <input
                  type="number"
                  id="MontantRestant"
                  name="montant_restant"
                  value={formData.montant_restant}
                  onChange={handleInputChange}
                  placeholder={"Reste à récupérer"}
                  required
                  className="bg-white text-gray-900 bg-opacity-80 pl-8 mt-1 block w-full px-3 py-1.5 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-800"
                />
              </div>
            </div>

            <div className="relative">
              <p className="ml-2 text-black text-sm">Montant remboursé</p>
              <div className="relative">
                <GiMoneyStack className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-900" />
                <input
                  type="number"
                  id="MontantRembourse"
                  name="montant_rembourse"
                  value={formData.montant_rembourse}
                  onChange={handleInputChange}
                  placeholder={"Montant remboursé"}
                  required
                  className="bg-white text-gray-900 bg-opacity-80 pl-8 mt-1 block w-full px-3 py-1.5 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-800"
                />
              </div>
            </div>
          </div>

          {/* Fourth row - Description/Comment */}
          <div>
            <p className="ml-2 text-black text-sm">
              Ajouter un commentaire si besoin
            </p>
            <textarea
              id="Description"
              name="Description"
              value={formData.Description}
              onChange={handleInputChange}
              rows={2}
              className="bg-white text-gray-900 bg-opacity-80 mt-1 block w-full px-3 py-1.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-800"
              placeholder={"Commentaire"}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-custom-green text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-custom-button hover:text-white hover:scale-105 transition-transform duration-200 focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
          >
            Enregistrer
          </button>
        </form>
      </div>
    </div>
  );
}
