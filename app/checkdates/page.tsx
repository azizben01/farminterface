"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Define the TypeScript interface for the egg incubation data
interface IncubationOeufs {
  oeufs_incuber: number;
  date_incubation: string;
  date_mirage: string;
  oeufs_fertiliser: number;
  oeufs_non_fertiliser: number;
  date_eclosion: string;
  mise_en_closoir: string;
  description: string;
  espece: string;
  id: number;
  date_creation: string;
}

export default function Checkdates() {
  const [data, setData] = useState<IncubationOeufs[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch("https://fermeclement.site/api/geteggincubation") // Replace with your API endpoint
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched Data:", data); // Debugging
        const currentDate = new Date();
        console.log("Current Date:", new Date().toISOString());

        // Check if data is an object instead of an array
        const records = Array.isArray(data) ? data : data.records;

        if (!Array.isArray(records)) {
          console.error("Unexpected data format:", data);
          setLoading(false); // Ensure loading is set to false
          return;
        }

        // Filter out records where date_eclosion has passed
        const filteredData = records.filter(
          (item: IncubationOeufs) => new Date(item.date_eclosion) >= currentDate
        );

        setData(filteredData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setLoading(false); // Ensure loading is set to false regardless of success or failure
      });
  }, []);

  const handleBackClick = () => {
    router.push("/");
  };

  if (loading) {
    return (
      <div className="text-center text-gray-600">Chargement des données...</div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Suivit des dates d&apos;incubation des Œufs
      </h1>
      <button
        onClick={handleBackClick}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
      >
        Retour
      </button>
      {data.length === 0 ? (
        <p className="text-center text-gray-500">
          Aucune date trouvée pour le moment.
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data.map((record) => (
            <div
              key={record.id}
              className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-transform transform hover:scale-105"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Espèces: {record.espece}
              </h2>
              <p className="text-lg text-black">
                Cette fiche a été créée le:{" "}
                {new Date(record.date_creation).toLocaleDateString()}
              </p>{" "}
              <br />
              <p className="text-sm text-custom-red">
                Considérer les dates suivantes à venir (format:
                jour/mois/année):
              </p>
              <div className="mt-4 text-sm text-gray-700">
                <p>
                  Date d&apos;incubation:{" "}
                  {new Date(record.date_incubation).toLocaleDateString()}
                </p>
                <br />
                <p>
                  Date de Mirage:{" "}
                  {new Date(record.date_mirage).toLocaleDateString()}
                </p>
                <br />
                <p>
                  Date de mise en éclosoir:{" "}
                  {new Date(record.mise_en_closoir).toLocaleDateString()}
                </p>
                <br />
                <p>
                  Date d&apos;éclosion:{" "}
                  {new Date(record.date_eclosion).toLocaleDateString()}
                </p>
                <br />
                <p>Lot numero: {record.id}</p>
                <br />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
