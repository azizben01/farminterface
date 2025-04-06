"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

type FormData = {
  nom_du_client: string;
  type_oeufs: string;
  nombre_de_plateaux: string | number;
  prix_unitaire: string | number;
  Montant: string | number;
  montant_recu: string | number;
  montant_restant: string | number;
  montant_rembourse: string | number;
  Description: string;
};

export default function VentesDesOeufs() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    nom_du_client: "",
    type_oeufs: "",
    nombre_de_plateaux: "",
    prix_unitaire: "",
    Montant: "",
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
        name === "nom_du_client" ||
        name === "type_oeufs" ||
        name === "Description"
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

    // prepare all data, ensuring all numeric values are integers
    const dataToSend = {
      ...formData,
      nom_du_client: formData.nom_du_client,
      type_oeufs: formData.type_oeufs,
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
      montant_rembourse:
        formData.montant_rembourse === ""
          ? null
          : parseInt(formData.montant_rembourse as string),
    };
    try {
      const response = await fetch("https://fermeclement.site/api/eggsales", {
        // const response = await fetch("http://192.168.1.8:5050/eggsales", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });
      if (response.ok) {
        alert("La fiche a bien ete envoyee!");
        setFormData({
          nom_du_client: "",
          type_oeufs: "",
          nombre_de_plateaux: "",
          prix_unitaire: "",
          Montant: "",
          montant_recu: "",
          montant_restant: "",
          montant_rembourse: "",
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
    <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-gray-100 relative">
      {/* Background Image - Now Covers Full Height */}
      <div
        className="absolute inset-0 bg-cover bg-center md:bg-fixed h-full w-full"
        style={{ backgroundImage: "url('/images/eggtable.jpg')" }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black opacity-50" />

      {/* Form Container */}
      <div className="relative bg-white p-6 rounded-xl shadow-lg max-w-4xl w-full md:max-h-[85vh] overflow-y-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Fiche récapitulative de la vente des œufs
        </h1>
        <p className="text-center text-md text-gray-600 mb-6">
          Remplissez cette fiche pour enregistrer la vente des œufs de table.
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {/* Nom du client */}
          <div>
            <p className="text-black">Nom du client</p>
            <input
              type="text"
              name="nom_du_client"
              value={formData.nom_du_client}
              onChange={handleInputChange}
              placeholder="Nom du client"
              required
              className="w-full text-gray-800 px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-gray-800"
            />
          </div>

          {/* Type d'œufs */}
          <div>
            <p className="text-black">Type d&apos;œufs</p>
            <select
              name="type_oeufs"
              value={formData.type_oeufs}
              onChange={handleInputChange}
              required
              className="w-full px-4 text-gray-800 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-gray-800"
            >
              <option value="">Sélectionnez un type</option>
              <option value="Goliath">Goliath</option>
              <option value="Pintade">Pintade</option>
              <option value="Caille">Caille</option>
              <option value="Canard">Canard</option>
            </select>
          </div>

          {/* Nombre de plateaux & Prix unitaire */}
          <div>
            <p className="text-black">Nombre de plateaux</p>
            <input
              type="number"
              name="nombre_de_plateaux"
              value={formData.nombre_de_plateaux}
              onChange={handleInputChange}
              placeholder="Nombre de plateaux"
              required
              className="w-full px-4 py-2 text-gray-800 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-gray-800"
            />
          </div>

          <div>
            <p className="text-black">Prix Unitaire</p>
            <input
              type="number"
              name="prix_unitaire"
              value={formData.prix_unitaire}
              onChange={handleInputChange}
              placeholder="Prix unitaire"
              required
              className="w-full px-4 py-2 text-gray-800 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-gray-800"
            />
          </div>

          {/* Montant total & Montant récupéré */}
          <div>
            <p className="text-black">Montant total</p>
            <input
              type="number"
              name="Montant"
              value={formData.Montant}
              onChange={handleInputChange}
              placeholder="Montant total"
              required
              className="w-full px-4 py-2 text-gray-800 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-gray-800"
            />
          </div>

          <div>
            <p className="text-black">Montant récupéré</p>
            <input
              type="number"
              name="montant_recu"
              value={formData.montant_recu}
              onChange={handleInputChange}
              placeholder="Montant récupéré"
              required
              className="w-full px-4 py-2 text-gray-800 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-gray-800"
            />
          </div>

          {/* Reste à récupérer & Montant remboursé */}
          <div>
            <p className="text-black">Reste à récupérer</p>
            <input
              type="number"
              name="montant_restant"
              value={formData.montant_restant}
              onChange={handleInputChange}
              placeholder="Reste à encaisser"
              required
              className="w-full px-4 py-2 text-gray-800 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-gray-800"
            />
          </div>

          <div>
            <p className="text-black">Montant remboursé après</p>
            <input
              type="number"
              name="montant_rembourse"
              value={formData.montant_rembourse}
              onChange={handleInputChange}
              placeholder="Montant remboursé"
              required
              className="w-full px-4 py-2 text-gray-800 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-gray-800"
            />
          </div>

          {/* Commentaire */}
          <div className="md:col-span-2">
            <p className="text-black">Ajouter un commentaire si besoin</p>
            <textarea
              name="Description"
              value={formData.Description}
              onChange={handleInputChange}
              rows={2}
              className="w-full px-4 py-2 text-gray-800 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-gray-800"
              placeholder="Ajoutez un commentaire..."
            />
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-green-700 hover:scale-105 transition-transform duration-200 focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
            >
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
