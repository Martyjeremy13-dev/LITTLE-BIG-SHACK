import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

async function getProducts() {
  const { data, error } = await supabase
    .from("products")
    .select("*");

  if (error) {
    console.error("SUPABASE ERROR:", error);
    return [];
  }

  console.log("PRODUCTS:", data);

  console.log("DATA:", data);
console.log("ERROR:", error);

return data || [];
}

export default async function ProduitsPage() {
  const products = await getProducts();

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8">
        Produits
      </h1>

      {products.length === 0 ? (
        <p>Aucun produit pour le moment.</p>
      ) : (
        <div className="space-y-4">
          {products.map((product: any) => (
            <div
              key={product.id}
              className="border rounded-xl p-4"
            >
              <h2 className="text-xl font-semibold">
                {product.name}
              </h2>

              <p>Catégorie : {product.category}</p>
              <p>Fournisseur : {product.supplier}</p>
              <p>Prix : {product.price} €</p>
              <p>Unité : {product.unit}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}