// import { notFound } from "next/navigation";

import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";
import { Gender } from "@/generated/prisma/client";
import { redirect } from "next/navigation";

interface Props {
  params: {
    gender: string;
  };

  searchParams?: {
    page?: string;
  };
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { gender } = await params;

  const page = searchParams?.page ? parseInt(searchParams.page) : 1;
  const { products, totalPages } = await getPaginatedProductsWithImages({
    page,
    gender: gender as Gender,
  });

  if (products.length === 0) redirect(`/gender/${gender}`);

  const genderOption: Record<string, string> = {
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
        title={genderOption[gender]}
        subtitle={"Best Sellers"}
        className="mb-2"
      />
      <ProductGrid products={products} />
      <Pagination totalPages={totalPages} />
    </>
  );
}
