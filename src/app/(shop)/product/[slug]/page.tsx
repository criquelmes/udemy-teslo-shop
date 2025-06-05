export const revalidate = 604800;

import { getProductSlug } from "@/actions";
import {
  ProductMobileSlideshow,
  ProductSlideshow,
  StockLabel,
} from "@/components";
import { titleFont } from "@/config/fonts";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { AddToCart } from "./ui/AddToCart";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;

  const product = await getProductSlug(slug);

  return {
    title: product?.title ?? "Product not found",
    description:
      product?.description ?? "No description available for this product.",
    openGraph: {
      title: product?.title ?? "Product not found",
      description:
        product?.description ?? "No description available for this product.",
      images: [`/products/${product?.images[1]}`],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductSlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3  gap-3">
      {/* Slideshow */}
      <div className="col-span-1 md:col-span-2 ">
        {/* Mobile Slideshow */}
        <ProductMobileSlideshow
          className="block md:hidden"
          images={product.images}
          title={product.title}
        />
        {/* Desktop Slideshow */}
        <ProductSlideshow
          className="hidden md:block"
          images={product.images}
          title={product.title}
        />
      </div>

      {/* Detalles */}
      <div className="col-span-1 px-5 ">
        <StockLabel slug={product.slug} />
        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
          {product.title}
        </h1>
        <p className="text-lg mb-5">${product.price}</p>

        <AddToCart product={product} />

        {/* Descripcion */}
        <h3 className="font-bold text-sm">Descripcion</h3>
        <p className="font-light">{product.description}</p>
      </div>
    </div>
  );
}
