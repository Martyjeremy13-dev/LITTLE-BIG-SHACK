"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

type Props = {
  product: any;
  onClose: () => void;
  onUpdated: () => void;
};

export default function EditProductModal({
  product,
  onClose,
  onUpdated,
}: Props) {
  const [name, setName] = useState(product.nom);
  const [category, setCategory] = useState(product.categorie);
  const [unit, setUnit] = useState(product.unite);
  const [price, setPrice] = useState(product.prix);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    setLoading(true);

    const { error } = await supabase
      .from("produits")
      .update({
        nom: name,
        categorie: category,
        unite: unit,
        prix: price,
      })
      .eq("id", product.id);

    setLoading(false);

    if (error) {
      console.error(error);
      alert("Erreur modification");
      return;
    }

    onUpdated();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

      <div className="bg-white p-6 rounded-2xl w-full max-w-md shadow-xl">

        <h2 className="text-2xl font-bold mb-4">
          Modifier produit
        </h2>

        <div className="space-y-4">

          <input
            type="text"
            className="w-full border p-3 rounded-xl"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="text"
            className="w-full border p-3 rounded-xl"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />

          <input
            type="text"
            className="w-full border p-3 rounded-xl"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
          />

          <input
            type="number"
            className="w-full border p-3 rounded-xl"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />

        </div>

        <div className="flex justify-end gap-3 mt-6">

          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-xl"
          >
            Annuler
          </button>

          <button
            onClick={handleUpdate}
            disabled={loading}
            className="bg-black text-white px-4 py-2 rounded-xl"
          >
            {loading ? "Sauvegarde..." : "Sauvegarder"}
          </button>

        </div>

      </div>

    </div>
  );
}