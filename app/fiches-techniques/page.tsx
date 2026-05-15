"use client";
export const dynamic = "force-dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function FichesTechniquesPage() {
  const [fiches, setFiches] = useState<any[]>([]);
  const [nom, setNom] = useState("");
  const [prixVente, setPrixVente] = useState("");

  const fetchFiches = async () => {
    const { data } = await supabase
      .from("fiches_techniques")
      .select("*");

    if (data) {
      setFiches(data);
    }
  };

  const addFiche = async () => {
    if (!nom || !prixVente) return;

    const { error } = await supabase
      .from("fiches_techniques")
      .insert([
        {
          nom,
          prix_vente: parseFloat(prixVente),
        },
      ]);

    if (error) {
      alert(JSON.stringify(error));
      console.log(error);
      return;
    }

    setNom("");
    setPrixVente("");

    fetchFiches();
  };

  useEffect(() => {
    fetchFiches();
  }, []);

  return (
    <main className="min-h-screen bg-zinc-100 p-8">

      <div className="max-w-7xl mx-auto">

        <div className="flex items-center justify-between mb-8">

          <div>
            <h1 className="text-4xl font-bold">
              Fiches Techniques
            </h1>

            <p className="text-zinc-500 mt-2">
              Gestion des recettes
            </p>
          </div>

        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm mb-8">

          <h2 className="text-2xl font-bold mb-4">
            Nouvelle fiche
          </h2>

          <div className="grid grid-cols-2 gap-4">

            <input
              type="text"
              placeholder="Nom recette"
              className="border rounded-2xl p-3"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
            />

            <input
              type="number"
              placeholder="Prix de vente"
              className="border rounded-2xl p-3"
              value={prixVente}
              onChange={(e) => setPrixVente(e.target.value)}
            />

          </div>

          <button
            onClick={addFiche}
            className="mt-4 bg-black text-white px-5 py-3 rounded-2xl"
          >
            Ajouter Fiche
          </button>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

          {fiches.map((fiche) => (
            <Link
              href={`/fiches-techniques/${fiche.id}`}
              key={fiche.id}
              className="bg-white rounded-3xl p-6 shadow-sm block hover:scale-[1.02] transition"
            >

              <h2 className="text-2xl font-bold">
                {fiche.nom}
              </h2>

              <p className="text-zinc-500 mt-2">
                Prix de vente
              </p>

              <p className="text-3xl font-bold mt-2">
                {fiche.prix_vente} €
              </p>

            </Link>
          ))}

        </div>

      </div>

    </main>
  );
}