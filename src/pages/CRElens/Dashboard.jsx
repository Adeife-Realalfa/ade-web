// src/pages/CRElens/Dashboard.jsx
export default function Dashboard({ data }) {
    if (!data) return <p className="text-center">No data to display</p>;
  
    return (
      <div className="max-w-4xl mx-auto p-4 space-y-4">
        <h2 className="text-3xl font-bold">Your Results</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(data).map(([key, value]) => (
            <div
              key={key}
              className="bg-white p-4 rounded shadow flex justify-between"
            >
              <span className="text-gray-600">{key}</span>
              <span className="font-medium">{value}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  