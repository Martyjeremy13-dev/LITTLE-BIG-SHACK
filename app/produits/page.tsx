"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import AddProductModal from "@/components/AddProductModal";
import EditProductModal from "@/components/EditProductModal";

export default function ProduitsPage() {
  const [produits, setProduits] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);

  const fetchProducts = async () => {
    const { data } = await supabase
      .from("produits")
      .select("*");

    if (data) {
      setProduits(data);
    }
  };

  const deleteProduct = async (id: number) => {
    const confirmDelete = confirm(
      "Supprimer ce produit ?"
    );

    if (!confirmDelete) return;

    const { error } = await supabase
      .from("produits")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(error);
      alert("Erreur suppression");
      return;
    }

    fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <main className="min-h-screen bg-zinc-100 p-8">

      <div className="max-w-7xl mx-auto">

        <div className="flex items-center justify-between mb-8">

          <div>
            <h1 className="text-4xl font-bold">
              Produits
            </h1>

            <p className="text-zinc-500 mt-2">
              Gestion des produits restaurant
            </p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="bg-black text-white rounded-2xl px-5 py-3"
          >
            Nouveau Produit
          </button>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

          {produits?.map((produit) => (
            <div
              key={produit.id}
              className="bg-white rounded-3xl p-6 shadow-sm"
            >

              <div className="flex items-start justify-between">

                <div>
                  <h2 className="text-xl font-bold">
                    {produit.nom}
                  </h2>

                  <p className="text-zinc-500 mt-2">
                    {produit.categorie}
                  </p>

                  <p className="text-black font-semibold mt-3">
                    {produit.prix} €
                  </p>
                </div>

                <div className="flex flex-col items-end gap-2">

                  <div className="bg-zinc-100 rounded-xl px-3 py-1 text-sm">
                    {produit.unite}
                  </div>

                  <button
                    onClick={() => setEditingProduct(produit)}
                    className="text-blue-500 text-sm"
                  >
                    Modifier
                  </button>

                  <button
                    onClick={() => deleteProduct(produit.id)}
                    className="text-red-500 text-sm"
                  >
                    Supprimer
                  </button>

                </div>

              </div>

            </div>
          ))}

        </div>

      </div>

      {showModal && (
        <AddProductModal
          onClose={() => setShowModal(false)}
          onProductAdded={() => fetchProducts()}
        />
      )}

      {editingProduct && (
        <EditProductModal
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onUpdated={() => fetchProducts()}
        />
      )}

    </main>
  );
}