// src/pages/Vlog.jsx
export default function Vlog() {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Video Updates</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Example embed */}
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              className="w-full h-full rounded shadow"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Vlog Video"
              allowFullScreen
            />
          </div>
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              className="w-full h-full rounded shadow"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Vlog Video 2"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    );
  }