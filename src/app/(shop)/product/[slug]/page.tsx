export const revalidate = 604800;

import { getProductSlug } from "@/actions";
import {
  ProductMobileSlideshow,
  ProductSlideshow,
  QuantitySelector,
  SizeSelector,
} from "@/components";
import { titleFont } from "@/config/fonts";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductSlug(slug);

  console.log("Product:", product);

  if (!product) {
    notFound();
  }

  return (
    <div className="mt-5 mb-20 grid grid-cols-1 lg:grid-cols-4  gap-3">
      {/* Slideshow */}
      <div className="col-span-1 lg:col-span-3 ">
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
        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
          {product.title}
        </h1>
        <p className="text-lg mb-5">${product.price}</p>

        {/* Selector de tallas */}
        <SizeSelector
          selectedSize={product.sizes[0]}
          availableSizes={product.sizes}
        />

        {/* Selector de cantidad */}
        <QuantitySelector quantity={2} />

        {/* Button */}
        <button className="btn-primary my-5 w-full rounded">
          Agregar al carrito
        </button>

        {/* Descripcion */}
        <h3 className="font-bold text-sm">Descripcion</h3>
        <p className="font-light">{product.description}</p>
      </div>
    </div>
  );
}
