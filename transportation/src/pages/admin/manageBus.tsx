import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import authSvc from "../../services/Auth.service";

interface Bus {
  _id: string;
  name: string;
  busNumber: string;
  busType: string;
  driverName: string;
  phone: string;
  totalSeats: number;
  isActive: string;
  image?: {
    secureUrl: string;
  };
}

const ManageBus: React.FC = () => {
  const navigate = useNavigate();
  const [buses, setBuses] = useState<Bus[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBuses = async () => {
    try {
      const response = await authSvc.getRequest("/bus");
      console.log("Full response:", response);

      setBuses(response.data || []);
      console.log("Bus data:", response.data);
    } catch (err) {
      setError("Failed to fetch buses");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBuses();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading buses...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Bus List</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => navigate("add-bus")} // change route as needed
        >
          Add Bus
        </button>
      </div>

      {buses.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">No buses available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {buses.map((bus) => (
            <div
              key={bus._id}
              className="bg-white border rounded-xl shadow-sm p-5 hover:shadow-md transition"
            >
              {bus.image?.secureUrl && (
                <img
                  src={bus.image.secureUrl}
                  alt={bus.name}
                  className="w-full h-40 object-cover rounded mb-3"
                />
              )}

              <h2 className="text-xl font-semibold mb-2">{bus.name}</h2>

              <p className="text-gray-600">
                <strong>Bus Number:</strong> {bus.busNumber}
              </p>

              <p className="text-gray-600">
                <strong>Type:</strong> {bus.busType}
              </p>

              <p className="text-gray-600">
                <strong>Driver:</strong> {bus.driverName}
              </p>

              <p className="text-gray-600">
                <strong>Phone:</strong> {bus.phone}
              </p>

              <p className="text-gray-600">
                <strong>Total Seats:</strong> {bus.totalSeats}
              </p>

              <p
                className={`mt-2 font-medium ${
                  bus.isActive === "active"
                    ? "text-green-600"
                    : "text-red-500"
                }`}
              >
                Status: {bus.isActive}
              </p>

              <div className="mt-4 flex justify-between">
                <button className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600">
                  View
                </button>

                <button className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600">
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageBus;