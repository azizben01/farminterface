"use client";

import { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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

  // Map of forms to their respective endpoints and columns
  const formConfig: { [key: string]: { endpoint: string; columns: string[] } } =
    {
      "Ventes des oeufs de table": {
        endpoint: "http://192.168.1.4:5050/eggsales",
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
        endpoint: "http://192.168.1.4:5050/eggincubation",
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
        endpoint: "http://192.168.1.4:5050/tableeggs",
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
        endpoint: "http://192.168.1.4:5050/farmneeds",
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
        endpoint: "http://192.168.1.4:5050/chickproduction",
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
        endpoint: "http://192.168.1.4:5050/farmsellings",
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

      console.log(`Fetching data from ${url} for ${selectedForm}`);
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          console.log("Fetched data:", data);
          setData(data);
          setColumns(columns);
        })
        .catch((error) => console.error("Error fetching data:", error));
    }
  }, [selectedForm, startDate, endDate]);

  const handleDelete = (id: number) => {
    console.log(`Deleting record with ID: ${id}`);
    setData(data.filter((item) => item.id !== id));
  };

  return (
    <main className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.length === 0 ? (
          <div className="col-span-full bg-white p-6 rounded-xl shadow-sm text-center text-gray-500 text-lg">
            Aucun enregistrement trouvé.
          </div>
        ) : (
          data.map((item) => (
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
                    <p className="text-lg font-semibold text-blue-700">
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
          ))
        )}
      </div>
    </main>
  );
};

export default AdminDashboard;
