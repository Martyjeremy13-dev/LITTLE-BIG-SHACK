import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

async function getProducts() {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}

export default async function ProduitsPage() {
  const products = await getProducts();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        Produits
      </h1>

      <div className="space-y-4">
        {products.map((product: any) => (
          <div
            key={product.id}
            className="border rounded-xl p-4"
          >
            <h2 className="font-semibold text-xl">
              {product.name}
            </h2>

            <p>Catégorie : {product.category}</p>
            <p>Fournisseur : {product.supplier}</p>
            <p>Prix : {product.price} €</p>
            <p>Unité : {product.unit}</p>
          </div>
        ))}

        {products.length === 0 && (
          <p>Aucun produit pour le moment.</p>
        )}
      </div>
    </div>
  );
}