"use client";

import { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from "next/navigation";

interface DataItem {
  id: number;
  [key: string]: string | number; // Allow for dynamic fields based on form
}

const AdminDashboard = () => {
  const [selectedForm, setSelectedForm] = useState<string>("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [data, setData] = useState<DataItem[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false); // Add loading state
  const router = useRouter();

  // Map of forms to their respective endpoints and columns
  const formConfig: { [key: string]: { endpoint: string; columns: string[] } } =
    {
      "Ventes des oeufs de table": {
        endpoint: "https://fermeclement.site/api/eggsales",
        columns: [
          "nombre_de_plateaux",
          "prix_unitaire",
          "montant",
          "montant_recu",
          "montant_restant",
          "description",
          "data_creation",
          "id",
        ],
      },
      "Suivis de mise en incubation": {
        endpoint: "https://fermeclement.site/api/eggincubation",
        columns: [
          "espece",
          "date_incubation",
          "oeufs_incuber",
          "oeufs_fertiliser",
          "oeufs_non_fertiliser",
          "date_mirage",
          "date_eclosion",
          "mise_en_closoir",
          "description",
          "id",
        ],
      },
      "Oeufs de table par semaine": {
        endpoint: "https://fermeclement.site/api/tableeggs",
        columns: [
          "oeufs_collectes",
          "oeufs_casses",
          "oeufs_restants",
          "nombre_de_plateaux",
          "description",
          "date_creation",
          "id",
        ],
      },
      "Besoins de la ferme": {
        endpoint: "https://fermeclement.site/api/farmneeds",
        columns: [
          "quantite",
          "prix_unitaire",
          "montant_total",
          "description",
          "date_creation",
          "id",
        ],
      },
      "Production des poussins": {
        endpoint: "https://fermeclement.site/api/chickproduction",
        columns: [
          "poussins_recus",
          "poussins_perdus",
          "oeufs_eclos",
          "oeufs_non_eclos",
          "description",
          "date_creation",
          "id",
        ],
      },
      "Ventes de la ferme": {
        endpoint: "https://fermeclement.site/api/farmsellings",
        columns: [
          "quantite",
          "prix_unitaire",
          "montant_total",
          "description",
          "date_creation",
          "id",
        ],
      },
    };

  // Fetch data dynamically when the selected form changes
  useEffect(() => {
    if (selectedForm && formConfig[selectedForm]) {
      const { endpoint, columns } = formConfig[selectedForm];
      let url = endpoint;

      // Append query parameters for date filtering if both dates are selected
      if (startDate && endDate) {
        const start = startDate.toISOString().split("T")[0]; // Format to YYYY-MM-DD
        const end = endDate.toISOString().split("T")[0];
        url += `?startDate=${start}&endDate=${end}`;
      }

      setLoading(true); // Set loading to true before fetching data
      console.log(`Fetching data from ${url} for ${selectedForm}`);

      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          console.log("Fetched data:", data);

          // Ensure `data` is always an array
          if (!Array.isArray(data)) {
            setData([]); // If the response is null, undefined, or not an array, set an empty array
          } else {
            setData(data);
          }

          setColumns(columns);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setData([]); // Reset data in case of error
        })
        .finally(() => {
          setLoading(false); // Set loading to false after fetching data
        });
    }
  }, [selectedForm, startDate, endDate]);

  const handleDelete = (id: number) => {
    console.log(`Deleting record with ID: ${id}`);
    setData(data.filter((item) => item.id !== id));
  };

  const handleBackClick = () => {
    router.push("/");
  };

  return (
    <main className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <button
        onClick={handleBackClick}
        className="relative mb-4 px-4 py-2 bg-gray-700 text-white rounded-lg shadow hover:bg-gray-800 transition"
      >
        Retour au menu principal
      </button>
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Tableau de bord administrateur
      </h1>

      {/* Filters Section */}
      <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
        <div className="space-y-4">
          <label className="block text-lg font-medium text-gray-700">
            Sélectionnez un formulaire
          </label>
          <select
            value={selectedForm}
            onChange={(e) => setSelectedForm(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          >
            <option value="" disabled>
              Choisissez un formulaire
            </option>
            {Object.keys(formConfig).map((form, index) => (
              <option key={`form-${index}`} value={form}>
                {form}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-6 space-y-4">
          <label className="block text-lg font-medium text-gray-700">
            Sélectionnez une période
          </label>
          <div className="flex flex-col sm:flex-row gap-4">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              className="w-full p-3 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholderText="Date de début"
            />
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              className="w-full p-3 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholderText="Date de fin"
            />
          </div>
        </div>
      </div>

      {/* Data Display Section */}
      {loading ? (
        <div className="text-center text-gray-600">
          Chargement des données...
        </div>
      ) : data.length === 0 ? (
        <div className="col-span-full bg-white p-6 rounded-xl shadow-sm text-center text-gray-500 text-lg">
          Aucun enregistrement trouvé.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((item) => (
            <div
              key={`card-${item.id}`}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border-l-4 border-blue-500"
            >
              <div className="space-y-4">
                {columns.map((col, colIndex) => (
                  <div
                    key={`card-${item.id}-${colIndex}`}
                    className="space-y-1"
                  >
                    <p className="text-sm font-medium text-gray-500 uppercase">
                      {col}
                    </p>
                    <p className="text-lg font-semibold text-custom-green">
                      {item[col]}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  className="text-red-500 hover:text-red-700 transition-colors"
                  onClick={() => handleDelete(item.id)}
                >
                  <FaTrash size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};
export default AdminDashboard;
