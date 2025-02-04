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
        endpoint: "http://192.168.1.87:5050/eggsales",
        columns: [
          "id",
          "nombre_de_plateaux",
          "prix_unitaire",
          "montant",
          "montant_recu",
          "montant_restant",
          "description",
          "data_creation",
        ],
      },
      "Suivis de mise en incubation": {
        endpoint: "http://192.168.1.87:5050/eggincubation",
        columns: [
          "id",
          "espece",
          "date_incubation",
          "oeufs_incuber",
          "oeufs_fertiliser",
          "oeufs_non_fertiliser",
          "date_mirage",
          "date_eclosion",
          "mise_en_closoir",
          "description",
        ],
      },
      "Oeufs de table par semaine": {
        endpoint: "http://192.168.1.87:5050/tableeggs",
        columns: [
          "id",
          "oeufs_collectes",
          "oeufs_casses",
          "oeufs_restants",
          "nombre_de_plateaux",
          "description",
          "date_creation",
        ],
      },
      "Besoins de la ferme": {
        endpoint: "http://192.168.1.87:5050/farmneeds",
        columns: [
          "id",
          "quantite",
          "prix_unitaire",
          "montant_total",
          "description",
          "date_creation",
        ],
      },
      "Production des poussins": {
        endpoint: "http://192.168.1.87:5050/chickproduction",
        columns: [
          "id",
          "poussins_recus",
          "poussins_perdus",
          "oeufs_eclos",
          "oeufs_non_eclos",
          "description",
          "date_creation",
        ],
      },
      "Ventes de la ferme": {
        endpoint: "http://192.168.1.87:5050/farmsellings",
        columns: [
          "id",
          "quantite",
          "prix_unitaire",
          "montant_total",
          "description",
          "date_creation",
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
    <main className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Tableau de bord administrateur
      </h1>

      <div className="flex flex-col lg:flex-row justify-between items-center gap-4 bg-white p-4 rounded-lg shadow">
        <select
          value={selectedForm}
          onChange={(e) => setSelectedForm(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 text-black focus:ring-2 focus:ring-blue-500"
        >
          <option value="" disabled>
            Sélectionnez un formulaire
          </option>
          {Object.keys(formConfig).map((form, index) => (
            <option key={`form-${index}`} value={form}>
              {form}
            </option>
          ))}
        </select>

        <div className="flex items-center gap-4">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            className="border text-black border-gray-300 rounded-lg px-4 py-2"
            placeholderText="Date de début"
          />
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            className="border text-black border-gray-300 rounded-lg px-4 py-2"
            placeholderText="Date de fin"
          />
        </div>
      </div>

      <div className="mt-6 bg-white rounded-lg shadow">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-500">
            <tr>
              {columns.map((col, index) => (
                <th key={`col-${index}`} className="p-4 border-b">
                  {col}
                </th>
              ))}
              <th className="p-4 border-b text-center">Delete</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + 1}
                  className="p-4 text-center text-gray-500"
                >
                  Aucun enregistrement trouvé.
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <tr key={`row-${item.id}`}>
                  {columns.map((col, colIndex) => (
                    <td
                      key={`cell-${item.id}-${colIndex}`}
                      className="p-4 border-b text-black"
                    >
                      {item[col]}
                    </td>
                  ))}
                  <td className="p-4 border-b text-center">
                    <button
                      className="text-red-500 hover:text-red-700 mx-2"
                      onClick={() => handleDelete(item.id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default AdminDashboard;
