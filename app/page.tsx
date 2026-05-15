"use client";

import Link from "next/link";

import {
  LayoutDashboard,
  Package,
  Truck,
  ChefHat,
  Receipt,
  BarChart3
} from "lucide-react";

export default function Home() {

  return (
    <main className="min-h-screen bg-zinc-100 flex">

      {/* SIDEBAR */}

      <aside className="w-72 bg-black text-white p-6 flex flex-col justify-between">

        <div>

          <div className="mb-10">
            <h1 className="text-3xl font-bold">
              Little Big Shack
            </h1>

            <p className="text-zinc-400 mt-2 text-sm">
              Gestion Restaurant
            </p>
          </div>

          <nav className="space-y-3">

            <Link
              href="/"
              className="w-full flex items-center gap-3 bg-white text-black rounded-2xl px-4 py-3 font-medium"
            >
              <LayoutDashboard size={20} />
              Dashboard
            </Link>

            <Link
              href="/produits"
              className="w-full flex items-center gap-3 hover:bg-zinc-900 rounded-2xl px-4 py-3 transition"
            >
              <Package size={20} />
              Produits
            </Link>

            <Link
              href="/mercuriale"
              className="w-full flex items-center gap-3 hover:bg-zinc-900 rounded-2xl px-4 py-3 transition"
            >
              <Truck size={20} />
              Mercuriale
            </Link>

            <Link
              href="/fiches-techniques"
              className="w-full flex items-center gap-3 hover:bg-zinc-900 rounded-2xl px-4 py-3 transition"
            >
              <ChefHat size={20} />
              Fiches Techniques
            </Link>

            <Link
              href="/factures"
              className="w-full flex items-center gap-3 hover:bg-zinc-900 rounded-2xl px-4 py-3 transition"
            >
              <Receipt size={20} />
              Factures
            </Link>

            <Link
              href="/rentabilite"
              className="w-full flex items-center gap-3 hover:bg-zinc-900 rounded-2xl px-4 py-3 transition"
            >
              <BarChart3 size={20} />
              Rentabilité
            </Link>

          </nav>

        </div>

        <div className="bg-zinc-900 rounded-3xl p-5">
          <p className="text-zinc-400 text-sm">
            Food Cost Moyen
          </p>

          <p className="text-4xl font-bold mt-3">
            29%
          </p>
        </div>

      </aside>

      {/* CONTENU */}

      <section className="flex-1 p-8 overflow-auto">

        <div className="grid grid-cols-4 gap-5 mb-6">

          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <p className="text-zinc-500 text-sm">
              Produits
            </p>

            <h2 className="text-3xl font-bold mt-3">
              1248
            </h2>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <p className="text-zinc-500 text-sm">
              Fournisseurs
            </p>

            <h2 className="text-3xl font-bold mt-3">
              14
            </h2>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <p className="text-zinc-500 text-sm">
              Fiches Techniques
            </p>

            <h2 className="text-3xl font-bold mt-3">
              82
            </h2>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <p className="text-zinc-500 text-sm">
              Factures Mois
            </p>

            <h2 className="text-3xl font-bold mt-3">
              84
            </h2>
          </div>

        </div>

        <div className="bg-white rounded-3xl p-8 shadow-sm">

          <div className="flex items-center justify-between mb-6">

            <div>
              <h2 className="text-3xl font-bold">
                Dashboard
              </h2>

              <p className="text-zinc-500 mt-2">
                Vue globale du restaurant
              </p>
            </div>

            <button className="bg-black text-white rounded-2xl px-5 py-3">
              Nouvelle Facture
            </button>

          </div>

          <div className="grid grid-cols-2 gap-6">

            <div className="border border-zinc-200 rounded-3xl p-6">

              <h3 className="font-bold text-xl mb-4">
                Dernières variations prix
              </h3>

              <div className="space-y-4">

                <div className="flex items-center justify-between">

                  <div>
                    <p className="font-medium">
                      Cheddar
                    </p>

                    <p className="text-sm text-zinc-500">
                      SYSCO
                    </p>
                  </div>

                  <p className="text-red-500 font-bold">
                    +8%
                  </p>

                </div>

                <div className="flex items-center justify-between">

                  <div>
                    <p className="font-medium">
                      Steak haché
                    </p>

                    <p className="text-sm text-zinc-500">
                      Metro
                    </p>
                  </div>

                  <p className="text-green-600 font-bold">
                    -2%
                  </p>

                </div>

              </div>

            </div>

            <div className="border border-zinc-200 rounded-3xl p-6">

              <h3 className="font-bold text-xl mb-4">
                Alertes Food Cost
              </h3>

              <div className="space-y-4">

                <div className="bg-red-50 border border-red-200 rounded-2xl p-4">

                  <p className="font-semibold text-red-600">
                    Cheeseburger
                  </p>

                  <p className="text-sm text-red-500 mt-1">
                    Food cost supérieur à 30%
                  </p>

                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">

                  <p className="font-semibold text-amber-600">
                    Bacon Burger
                  </p>

                  <p className="text-sm text-amber-500 mt-1">
                    Hausse matière première détectée
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}