import Image from "next/image";

export default function Home() {
  return (
     <main className="min-h-screen p-10">
      <h1 className="text-5xl text-center font-bold text-blue-600">
        AI Smart Search
      </h1>

      <input
        type="text"
        placeholder="Search..."
        className="w-full border p-3 rounded-lg"
      />
    </main>
  );
}
