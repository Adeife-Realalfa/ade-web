// src/pages/CRElens/Landing.jsx
export default function Landing({ onStart }) {
    return (
      <div className="text-center max-w-2xl mx-auto mt-20 space-y-6">
        <h1 className="text-4xl font-bold">Demystify your financing process</h1>
        <p className="text-lg text-gray-600">
          Be a better-informed borrower with CRElens. Let’s break it down together.
        </p>
        <button
          onClick={onStart}
          className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
        >
          Try it out
        </button>
      </div>
    );
  }
  