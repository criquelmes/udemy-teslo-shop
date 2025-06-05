import { getPaginatedProductsWithImages } from "@/actions";
import { ProductGrid, Title } from "@/components";
import { redirect } from "next/navigation";

interface Props {
  searchParams?: {
    page?: string;
  };
}
export default async function Home({ searchParams }: Props) {
  const searchParamsProps = await searchParams;
  const page = searchParamsProps?.page ? parseInt(searchParamsProps.page) : 1;
  console.log("Search Params:", searchParamsProps);
  const { products, currentPage, totalPages } =
    await getPaginatedProductsWithImages({ page });

  console.log({ currentPage, totalPages });

  if (products.length === 0) redirect("/");

  return (
    <>
      <Title title="Tienda" subtitle="Todos los productos" className="mb-2" />
      <ProductGrid products={products} />
    </>
  );
}
