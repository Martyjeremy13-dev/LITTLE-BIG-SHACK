"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function DetailFiche({
  params,
}: {
  params: { id: string };
}) {
  const [fiche, setFiche] = useState<any>(null);
  const [produits, setProduits] = useState<any[]>([]);
  const [ingredients, setIngredients] = useState<any[]>([]);

  const [selectedProduit, setSelectedProduit] = useState("");
  const [quantite, setQuantite] = useState("");

  const fetchData = async () => {

    const { data: ficheData } = await supabase
      .from("fiches_techniques")
      .select("*")
      .eq("id", params.id)
      .single();

    setFiche(ficheData);

    const { data: produitsData } = await supabase
      .from("produits")
      .select("*");

    setProduits(produitsData || []);

    const { data: ingredientsData } = await supabase
      .from("fiche_ingredients")
      .select(`
        *,
        produits (*)
      `)
      .eq("fiche_id", params.id);

    setIngredients(ingredientsData || []);
  };

  const addIngredient = async () => {
    if (!selectedProduit || !quantite) return;

    const { error } = await supabase
      .from("fiche_ingredients")
      .insert([
        {
          fiche_id: params.id,
          produit_id: selectedProduit,
          quantite: parseFloat(quantite),
        },
      ]);

    if (error) {
      console.error(error);
      return;
    }

    setSelectedProduit("");
    setQuantite("");

    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  const totalCost = ingredients.reduce(
    (acc, ingredient) =>
      acc +
      ingredient.quantite *
        (ingredient.produits?.prix || 0),
    0
  );

  const foodCost =
    fiche?.prix_vente
      ? ((totalCost / fiche.prix_vente) * 100).toFixed(1)
      : 0;

  return (
    <main className="min-h-screen bg-zinc-100 p-8">

      <div className="max-w-6xl mx-auto">

        {fiche && (
          <div className="mb-8">

            <h1 className="text-4xl font-bold">
              {fiche.nom}
            </h1>

            <p className="text-zinc-500 mt-2">
              Prix de vente : {fiche.prix_vente} €
            </p>

          </div>
        )}

        <div className="grid grid-cols-3 gap-4 mb-8">

          <select
            className="border rounded-2xl p-3 bg-white"
            value={selectedProduit}
            onChange={(e) =>
              setSelectedProduit(e.target.value)
            }
          >

            <option value="">
              Choisir produit
            </option>

            {produits.map((produit) => (
              <option
                key={produit.id}
                value={produit.id}
              >
                {produit.nom}
              </option>
            ))}

          </select>

          <input
            type="number"
            placeholder="Quantité"
            className="border rounded-2xl p-3"
            value={quantite}
            onChange={(e) =>
              setQuantite(e.target.value)
            }
          />

          <button
            onClick={addIngredient}
            className="bg-black text-white rounded-2xl px-5"
          >
            Ajouter ingrédient
          </button>

        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm mb-8">

          <h2 className="text-2xl font-bold mb-6">
            Ingrédients
          </h2>

          <div className="space-y-4">

            {ingredients.map((ingredient) => (
              <div
                key={ingredient.id}
                className="flex items-center justify-between border-b pb-3"
              >

                <div>
                  <p className="font-semibold">
                    {ingredient.produits?.nom}
                  </p>

                  <p className="text-zinc-500 text-sm">
                    Quantité : {ingredient.quantite}
                  </p>
                </div>

                <p className="font-bold">
                  {(
                    ingredient.quantite *
                    (ingredient.produits?.prix || 0)
                  ).toFixed(2)} €
                </p>

              </div>
            ))}

          </div>

        </div>

        <div className="grid grid-cols-2 gap-6">

          <div className="bg-white rounded-3xl p-6 shadow-sm">

            <p className="text-zinc-500">
              Coût Matière
            </p>

            <h2 className="text-4xl font-bold mt-3">
              {totalCost.toFixed(2)} €
            </h2>

          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm">

            <p className="text-zinc-500">
              Food Cost
            </p>

            <h2 className="text-4xl font-bold mt-3">
              {foodCost} %
            </h2>

          </div>

        </div>

      </div>

    </main>
  );
}