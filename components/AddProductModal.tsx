"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

type Props = {
  onClose: () => void;
  onProductAdded: () => void;
};

export default function AddProductModal({
  onClose,
  onProductAdded,
}: Props) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [unit, setUnit] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddProduct = async () => {
    if (!name || !price) return;

    setLoading(true);

    const { error } = await supabase.from("produits").insert([
      {
        nom: name,
        categorie: category,
        unite: unit,
        prix: parseFloat(price),
      },
    ]);

    setLoading(false);

    if (error) {
      console.error(error);
      alert("Erreur lors de l'ajout");
      return;
    }

    onProductAdded();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl w-full max-w-md shadow-xl">
        <h2 className="text-2xl font-bold mb-4">
          Ajouter un produit
        </h2>

        <div className="space-y-4">

          <input
            type="text"
            placeholder="Nom"
            className="w-full border p-3 rounded-xl"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Catégorie"
            className="w-full border p-3 rounded-xl"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />

          <input
            type="text"
            placeholder="Unité"
            className="w-full border p-3 rounded-xl"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
          />

          <input
            type="number"
            placeholder="Prix"
            className="w-full border p-3 rounded-xl"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

        </div>

        <div className="flex justify-end gap-3 mt-6">

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border"
          >
            Annuler
          </button>

          <button
            onClick={handleAddProduct}
            disabled={loading}
            className="px-4 py-2 rounded-xl bg-black text-white"
          >
            {loading ? "Ajout..." : "Ajouter"}
          </button>

        </div>
      </div>
    </div>
  );
}