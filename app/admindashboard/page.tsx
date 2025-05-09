"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FaArrowLeft,
  FaBoxOpen,
  FaChartBar,
  FaDownload,
  FaFilter,
  FaSearch,
  FaTrash,
} from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from "next/navigation";
import {
  FiChevronUp,
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import * as XLSX from "xlsx";

interface DataItem {
  id: number;
  [key: string]: string | number; // Allow for dynamic fields based on form
}

const AdminDashboard = () => {
  const [selectedForm, setSelectedForm] = useState<string>("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [data, setData] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [expandedFilters, setExpandedFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [columns, setColumns] = useState<string[]>([]);
  const router = useRouter();

  // Map of forms to their respective endpoints and columns
  const formConfig: { [key: string]: { endpoint: string; columns: string[] } } =
    {
      "Ventes des oeufs de table": {
        endpoint: "https://fermeclement.site/api/eggsales",
        columns: [
          "nom_du_client",
          "type_oeufs",
          "nombre_de_plateaux",
          "prix_unitaire",
          "montant",
          "montant_recu",
          "montant_restant",
          "montant_rembourse",
          "description",
          "data_creation",
          "id",
        ],
      },
      "Suivis de mise en incubation": {
        endpoint: "https://fermeclement.site/api/geteggincubation",
        columns: [
          "espece",
          "date_incubation",
          "oeufs_incuber",
          "date_mirage",
          "date_eclosion",
          "mise_en_closoir",
          "description",
          "date_creation",
          "id",
        ],
      },
      "Oeufs de table par semaine": {
        endpoint: "https://fermeclement.site/api/tableeggs",
        columns: [
          "type_oeufs",
          "oeufs_collectes",
          "oeufs_casses",
          "oeufs_restants",
          "nombre_de_plateaux",
          "description",
          "date_creation",
          "id",
        ],
      },
      "Achats de la ferme": {
        endpoint: "https://fermeclement.site/api/farmneeds",
        columns: [
          "quantite",
          "prix_unitaire",
          "montant_total",
          "type_achat",
          "autre_type_achat",
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
          "nom_du_client",
          "type_de_vente",
          "quantite",
          "prix_unitaire",
          "montant_total",
          "montant_recu",
          "montant_restant",
          "montant_rembourse",
          "description",
          "date_creation",
          "id",
        ],
      },
    };

  // Filter data based on search term
  const filteredData = data.filter((item) =>
    Object.values(item).some((val) =>
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

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
    router.push("/homepage");
  };

  const handleExport = () => {
    if (data.length === 0) {
      alert("Aucune donnée à exporter");
      return;
    }

    // Get headers from the form configuration
    const headers = formConfig[selectedForm]?.columns || [];

    // Create worksheet data
    const worksheetData = [
      headers, // Header row
      ...data.map((item) => headers.map((header) => item[header] || "")), // Data rows
    ];

    // Create a new workbook and worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");

    // Generate Excel file and trigger download
    XLSX.writeFile(
      workbook,
      `${selectedForm.replace(/\s+/g, "_")}_${
        new Date().toISOString().split("T")[0]
      }.xlsx`
    );
  };

  // const handleRefresh = () => {
  //   if (selectedForm) {
  //     // Re-trigger the useEffect by forcing a re-render
  //     setLoading(true);
  //     const { endpoint, columns } = formConfig[selectedForm];
  //     let url = endpoint;

  //     if (startDate && endDate) {
  //       const start = startDate.toISOString().split("T")[0];
  //       const end = endDate.toISOString().split("T")[0];
  //       url += `?startDate=${start}&endDate=${end}`;
  //     }

  //     fetch(url)
  //       .then((response) => response.json())
  //       .then((data) => {
  //         if (!Array.isArray(data)) {
  //           setData([]);
  //         } else {
  //           setData(data);
  //         }
  //         setColumns(columns);
  //       })
  //       .catch((error) => {
  //         console.error("Error refreshing data:", error);
  //         setData([]);
  //       })
  //       .finally(() => {
  //         setLoading(false);
  //       });
  //   }
  // };

  return (
    <main className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <button
              onClick={handleBackClick}
              className="flex items-center gap-2 mb-4 px-4 py-2 border border-custom-green text-custom-green rounded-lg hover:bg-custom-green hover:text-white transition-colors"
            >
              <FaArrowLeft className="w-4 h-4" />
              Retour au menu principal
            </button>
            <div className="flex items-center gap-4">
              <Image
                src="/images/logo.png"
                alt="Farm Logo"
                width={100}
                height={100}
                className="rounded-lg"
              />
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-custom-green">
                Tableau de bord administrateur
              </h1>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-4 py-2 bg-custom-button text-white rounded-lg hover:bg-custom-green transition-colors"
            >
              <FaDownload className="w-4 h-4" />
              Exporter
            </button>
            {/* <button
              onClick={handleRefresh}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-custom-button text-custom-button rounded-lg hover:bg-gray-50 transition-colors"
            >
              <FaSync className="w-4 h-4" />
              Actualiser
            </button> */}
            <Link
              href="/userregistration"
              className="block w-full bg-custom-button hover:bg-custom-button-dark text-white font-semibold py-3 px-6 rounded-lg transition duration-300 text-center shadow-md hover:shadow-lg"
            >
              Inscrire un membre
            </Link>
          </div>
        </div>

        {/* Filters Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm mb-8 border border-gray-200">
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => setExpandedFilters(!expandedFilters)}
          >
            <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <FaFilter className="text-custom-button" />
              Filtres
            </h2>
            {expandedFilters ? (
              <FiChevronUp className="text-black" />
            ) : (
              <FiChevronDown className="text-black" />
            )}
          </div>

          {expandedFilters && (
            <div className="mt-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sélectionnez un formulaire
                  </label>
                  <select
                    value={selectedForm}
                    onChange={(e) => setSelectedForm(e.target.value)}
                    className="w-full p-3 text-custom-button border border-gray-300 rounded-lg focus:ring-2 focus:ring-custom-green focus:border-custom-button transition-all"
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

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Recherche
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaSearch className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Rechercher..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 p-3 text-custom-button border border-gray-300 rounded-lg focus:ring-2 focus:ring-custom-green focus:border-custom-button transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date de début
                  </label>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    className="w-full text-custom-button p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-custom-green focus:border-custom-button transition-all"
                    placeholderText="Sélectionnez une date"
                    dateFormat="dd/MM/yyyy"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date de fin
                  </label>
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    className="w-full p-3 text-custom-button border border-gray-300 rounded-lg focus:ring-2 focus:ring-custom-green focus:border-custom-button transition-all"
                    placeholderText="Sélectionnez une date"
                    dateFormat="dd/MM/yyyy"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-custom-green">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Total Entrées
                </p>
                <p className="text-2xl font-bold text-gray-800">
                  {data.length}
                </p>
              </div>
              <div className="p-2 bg-custom-green/10 rounded-full">
                <FaChartBar className="text-custom-green" />
              </div>
            </div>
            <p className="text-xs text-green-600 mt-1">Données actuelles</p>
          </div>
          {/* Add more stat cards as needed */}
        </div>

        {/* Data Display Section */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-custom-green mb-4"></div>
            <p className="text-lg text-custom-green">
              Chargement des données...
            </p>
          </div>
        ) : filteredData.length === 0 ? (
          <div className="bg-white p-8 rounded-xl shadow-sm text-center">
            <FaBoxOpen className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-700 mb-2">
              Aucun enregistrement trouvé
            </h3>
            <p className="text-gray-500">
              Essayez d&apos;ajuster vos filtres de recherche
            </p>
          </div>
        ) : (
          <>
            <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-4 border border-gray-200">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      {columns.map((column, index) => (
                        <th
                          key={`th-${index}`}
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          {column}
                        </th>
                      ))}
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredData.map((item) => (
                      <tr key={`row-${item.id}`} className="hover:bg-gray-50">
                        {columns.map((column, colIndex) => (
                          <td
                            key={`cell-${item.id}-${colIndex}`}
                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                          >
                            {item[column] || "-"}
                          </td>
                        ))}
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="text-red-600 hover:text-red-900 transition-colors"
                            title="Supprimer"
                          >
                            <FaTrash className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between bg-white px-4 py-3 rounded-b-lg border-t border-gray-200">
              <div className="flex-1 flex justify-between sm:hidden">
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  Précédent
                </button>
                <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  Suivant
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Affichage de <span className="font-medium">1</span> à{" "}
                    <span className="font-medium">
                      {Math.min(filteredData.length, 10)}
                    </span>{" "}
                    sur{" "}
                    <span className="font-medium">{filteredData.length}</span>{" "}
                    résultats
                  </p>
                </div>
                <div>
                  <nav
                    className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                    aria-label="Pagination"
                  >
                    <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                      <span className="sr-only">Précédent</span>
                      <FiChevronLeft className="h-5 w-5" aria-hidden="true" />
                    </button>
                    <button
                      aria-current="page"
                      className="z-10 bg-custom-green/10 border-custom-green text-custom-green relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                    >
                      1
                    </button>
                    <button className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                      2
                    </button>
                    <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                      <span className="sr-only">Suivant</span>
                      <FiChevronRight className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default AdminDashboard;
