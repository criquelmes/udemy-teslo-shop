// import { notFound } from "next/navigation";

import { ProductGrid, Title } from "@/components";
import { Category } from "@/interfaces";
import { initialData } from "@/seed/seed";

interface Props {
  params: {
    id: Category;
  };
}

const seedProducts = initialData.products;

export default async function CategoryPage({ params }: Props) {
  const { id } = await params;
  const products = seedProducts.filter((producto) => producto.gender === id);

  const genderOption: Record<Category, string> = {
    men: "Mens",
    women: "Womens",
    kid: "Kids",
    unisex: "Unisex",
  };
  // if (id === "kid") {
  //   notFound();
  // }
  return (
    <>
      <Title
        title={genderOption[id]}
        subtitle={"Best Sellers"}
        className="mb-2"
      />
      <ProductGrid products={products} />
    </>
  );
}
