"use client";

import { useState } from "react";
import { storage } from "@/lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function UploadImage() {
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState("");

  const handleUpload = async () => {
  if (!file) return;

  const fileName = `${Date.now()}-${file.name}`;
  const fileRef = ref(storage, `images/${fileName}`);

  await uploadBytes(fileRef, file);

  const url = await getDownloadURL(fileRef);
  setImageUrl(url);
};


  return (
    <div className="p-6 space-y-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold">📤 Firebase Image Upload <a href="/"> <button
        className="bg-gray-500 text-white px-4 py-2 rounded">
          Add name
      </button></a>
      </h1>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="w-full border p-2"
      />

      <button
        onClick={handleUpload}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Upload Image
      </button>

      {imageUrl && (
        <div className="pt-4">
          <h2 className="font-semibold">✅ Uploaded Image:</h2>
          <img
            src={imageUrl}
            alt="Uploaded"
            className="w-64 mt-2 rounded shadow"
          />
          <a
            href={imageUrl}
            target="_blank"
            className="block mt-2 text-blue-500 underline"
          >
            Download Link
          </a>
        </div>
      )}
    </div>
  );
}