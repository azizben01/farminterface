"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { GiDeadHead } from "react-icons/gi";
import { TbEggs } from "react-icons/tb";

type FormData = {
  nombre_de_plateaux: string | number;
  prix_unitaire: string | number;
  Montant: string | number;
  montant_recu: string | number;
  montant_restant: string | number;
  Description: string;
};
export default function VentesDesOeufs() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    nombre_de_plateaux: "",
    prix_unitaire: "",
    Montant: "",
    montant_recu: "",
    montant_restant: "",
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

    // prepare all data, ensuring all numeric values are integers
    const dataToSend = {
      ...formData,
      nombre_de_plateaux:
        formData.nombre_de_plateaux === ""
          ? null
          : parseInt(formData.nombre_de_plateaux as string),
      prix_unitaire:
        formData.prix_unitaire === ""
          ? null
          : parseInt(formData.prix_unitaire as string),
      Amount:
        formData.Montant === "" ? null : parseInt(formData.Montant as string),
      montant_recu:
        formData.montant_recu === ""
          ? null
          : parseInt(formData.montant_recu as string),
      montant_restant:
        formData.montant_restant === ""
          ? null
          : parseInt(formData.montant_restant as string),
    };
    try {
      const response = await fetch("https://fermeclement.site/api/eggsales", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });
      if (response.ok) {
        alert("La fiche a bien ete envoyee!");
        setFormData({
          nombre_de_plateaux: "",
          prix_unitaire: "",
          Montant: "",
          montant_recu: "",
          montant_restant: "",
          Description: "",
        });
        router.push("/chooseform");
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
  const setFrenchValidationMessage = (
    element: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  ) => {
    element.setCustomValidity("Vous devez obligatoirement remplir ce champ.");
  };

  return (
    <div className="h-full flex justify-center items-center p-1">
      <div
        className="absolute inset-0 bg-cover bg-center md:bg-fixed"
        style={{ backgroundImage: "url('/images/eggtable.jpg')" }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-black opacity-70" />
      <div className="relative bg-white bg-opacity-50 p-2 rounded-lg shadow-lg max-w-xl w-full max-h-lg h-full">
        <h1 className="text-2xl font-bold text-custom-gray1 mb-4 text-center">
          Fiche recapitulatif de la vente des oeufs.
        </h1>
        <p className="text-center text-md text-black mb-8">
          Remplissez cette fiche pour enregister la vente des oeufs de table.
        </p>

        {/* Service Request Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative mt-1">
            <p className="ml-2 text-black">Nombre de plateaux</p>
            <TbEggs className="absolute top-[48px] left-3 transform -translate-y-1/2 text-gray-900" />
            <input
              type="number"
              id="Nombedeplateaux"
              name="nombre_de_plateaux"
              value={formData.nombre_de_plateaux}
              onChange={handleInputChange}
              placeholder={"Nombre de plateaux"}
              required
              onInvalid={(e) => {
                setFrenchValidationMessage(e.currentTarget);
              }}
              className="bg-white text-gray-900 bg-opacity-80 pl-10 mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-800"
            />
          </div>

          <div className="relative mt-1">
            <p className="ml-2 text-black">Prix Unitaire</p>
            <GiDeadHead className="absolute top-[48px] left-3 transform -translate-y-1/2 text-gray-900" />
            <input
              type="number"
              id="PrixUnitaire"
              name="prix_unitaire"
              value={formData.prix_unitaire}
              onChange={handleInputChange}
              placeholder={"Prix unitaire"}
              required
              onInvalid={(e) => {
                setFrenchValidationMessage(e.currentTarget);
              }}
              className="bg-white text-gray-900 bg-opacity-80 pl-10 mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-800"
            />
          </div>
          <div className="relative mt-1">
            <p className="ml-2 text-black">Montant total</p>
            <TbEggs className="absolute top-[45px] left-3 transform -translate-y-1/2 text-gray-900" />
            <input
              type="number"
              id="Montant"
              name="Montant"
              value={formData.Montant}
              onChange={handleInputChange}
              placeholder={"Montant total"}
              required
              onInvalid={(e) => {
                setFrenchValidationMessage(e.currentTarget);
              }}
              className="bg-white text-gray-900 bg-opacity-80 pl-10 border border-gray-300 w-full px-4 py-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-800"
            />
          </div>
          <div className="relative mt-1">
            <p className="ml-2 text-black">Montant récupéré</p>
            <TbEggs className="absolute top-[45px] left-3 transform -translate-y-1/2 text-gray-900" />
            <input
              type="number"
              id="MontantRecu"
              name="montant_recu"
              value={formData.montant_recu}
              onChange={handleInputChange}
              placeholder={"Montant récupéré"}
              required
              onInvalid={(e) => {
                setFrenchValidationMessage(e.currentTarget);
              }}
              className="bg-white text-gray-900 bg-opacity-80 pl-10 border border-gray-300 w-full px-4 py-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-800"
            />
          </div>
          <div className="relative mt-1">
            <p className="ml-2 text-black">Reste a encaisser</p>
            <TbEggs className="absolute top-[45px] left-3 transform -translate-y-1/2 text-gray-900" />
            <input
              type="number"
              id="MontantRestant"
              name="montant_restant"
              value={formData.montant_restant}
              onChange={handleInputChange}
              placeholder={"Reste a encaisser"}
              required
              onInvalid={(e) => {
                setFrenchValidationMessage(e.currentTarget);
              }}
              className="bg-white text-gray-900 bg-opacity-80 pl-10 border border-gray-300 w-full px-4 py-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-800"
            />
          </div>

          <div>
            <p className="ml-2 text-black">
              Ajouter un commentaire par rapport a la vente
            </p>
            <textarea
              id="Description"
              name="Description"
              value={formData.Description}
              onChange={handleInputChange}
              required
              onInvalid={(e) => {
                setFrenchValidationMessage(e.currentTarget);
              }}
              rows={2}
              className="bg-white text-gray-900 bg-opacity-80 mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-800"
              placeholder={"Ajouter un commentaire par rapport a la vente"}
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
