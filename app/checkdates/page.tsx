"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FaCalendarAlt,
  FaLightbulb,
  FaEgg,
  FaCheckCircle,
  FaArrowLeft,
  FaSpinner,
  FaBoxOpen,
} from "react-icons/fa";

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

const formatDate = (dateStr: string) => {
  if (!dateStr) return "Date non disponible";
  const [day, month, yearTime] = dateStr.split("-");
  const [year] = yearTime?.split(" ") || ["", ""];
  return `${day}-${month}-${year}`;
};

const calculateDaysRemaining = (dateStr: string) => {
  if (!dateStr) return null;

  try {
    const [day, month, yearTime] = dateStr.split("-");
    const [year, time] = yearTime?.split(" ") || ["", ""];
    const targetDate = new Date(
      `${year}-${month}-${day}T${time || "00:00:00"}`
    );
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const diffTime = targetDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays > 0 ? diffDays : 0;
  } catch {
    return null;
  }
};

export default function Checkdates() {
  const [data, setData] = useState<IncubationOeufs[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy] = useState<"date_eclosion" | "espece">("date_eclosion");
  const router = useRouter();

  useEffect(() => {
    fetch("https://fermeclement.site/api/geteggincubation")
      .then((response) => response.json())
      .then((data) => {
        const records = Array.isArray(data) ? data : data.records;

        if (!Array.isArray(records)) {
          console.error("Unexpected data format:", data);
          return;
        }

        const filteredData = records
          .filter((item: IncubationOeufs) => {
            const eclosionDate = calculateDaysRemaining(item.date_eclosion);
            return eclosionDate !== null && eclosionDate >= 0;
          })
          .sort((a, b) => {
            if (sortBy === "date_eclosion") {
              return (
                new Date(a.date_eclosion).getTime() -
                new Date(b.date_eclosion).getTime()
              );
            }
            return a.espece.localeCompare(b.espece);
          });

        setData(filteredData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [sortBy]);

  const handleBackClick = () => router.push("/homepage");

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <FaSpinner className="animate-spin h-12 w-12 text-custom-button mx-auto mb-4" />
          <p className="text-lg text-gray-600">Chargement des données...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-custom-button mb-2">
              Suivi des dates d&apos;incubation
            </h1>
            <p className="text-gray-600">
              Visualisez et suivez vos œufs en incubation
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-4 md:mt-0">
            {/* <button
              onClick={() => setSortBy("date_eclosion")}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                sortBy === "date_eclosion"
                  ? "bg-custom-button text-white"
                  : "bg-white text-custom-button border border-custom-button"
              }`}
            >
              <FiCalendar className="w-4 h-4" />
              Trier par date
            </button>
            <button
              onClick={() => setSortBy("espece")}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                sortBy === "espece"
                  ? "bg-custom-button text-white"
                  : "bg-white text-custom-button border border-custom-button"
              }`}
            >
              <FiEdit className="w-4 h-4" />
              Trier par espèce
            </button> */}
            <button
              onClick={handleBackClick}
              className="px-4 py-2 bg-custom-button text-white rounded-lg shadow hover:bg-white hover:text-custom-button transition flex items-center gap-2"
            >
              <FaArrowLeft className="w-4 h-4" />
              Retour
            </button>
          </div>
        </div>

        {data.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-8 text-center">
            <FaBoxOpen className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Aucune incubation en cours
            </h3>
            <p className="text-gray-500">
              Vous n&apos;avez pas d&apos;œufs en incubation ou les dates sont
              passées.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {data.map((record) => {
              const daysToHatch = calculateDaysRemaining(record.date_eclosion);
              const daysToCandling = calculateDaysRemaining(record.date_mirage);

              return (
                <div
                  key={record.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h2 className="text-xl font-bold text-custom-green">
                        {record.espece}
                      </h2>
                      <span className="bg-custom-button/10 text-custom-button text-sm font-medium px-3 py-1 rounded-full">
                        Lot #{record.id}
                      </span>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-blue-50 text-blue-600">
                          <FaCalendarAlt className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">
                            Début incubation
                          </p>
                          <p className="text-gray-500 font-medium">
                            {formatDate(record.date_creation)}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-yellow-50 text-yellow-600">
                          <FaLightbulb className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Mirage</p>
                          <p className="text-gray-500 font-medium">
                            {formatDate(record.date_mirage)}
                          </p>
                          {daysToCandling !== null && (
                            <p className="text-xs text-yellow-600">
                              {daysToCandling === 0
                                ? "Aujourd'hui"
                                : `Dans ${daysToCandling} jour${
                                    daysToCandling > 1 ? "s" : ""
                                  }`}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-purple-50 text-purple-600">
                          <FaEgg className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">
                            Mise en éclosoir
                          </p>
                          <p className="text-gray-500 font-medium">
                            {formatDate(record.mise_en_closoir)}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-green-50 text-green-600">
                          <FaCheckCircle className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">
                            Éclosion prévue
                          </p>
                          <p className="text-gray-500 font-medium">
                            {formatDate(record.date_eclosion)}
                          </p>
                          {daysToHatch !== null && (
                            <p className="text-xs font-semibold text-green-600">
                              {daysToHatch === 0
                                ? "Aujourd'hui !"
                                : `Dans ${daysToHatch} jour${
                                    daysToHatch > 1 ? "s" : ""
                                  }`}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-100">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">
                          Nombre d&apos;Œufs incubés
                        </span>
                        <span className="text-custom-button font-medium">
                          {record.oeufs_incuber}
                        </span>
                      </div>
                      {record.description && (
                        <div className="mt-3 text-sm text-gray-600">
                          <p className="font-medium text-gray-500">Notes:</p>
                          <p>{record.description}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
