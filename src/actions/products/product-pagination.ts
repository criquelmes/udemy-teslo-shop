"use server";

import { Gender } from "@/generated/prisma/client";
import prisma from "@/lib/prisma";

interface PaginationOptions {
  page?: number;
  take?: number;
  gender?: Gender;
}
export const getPaginatedProductsWithImages = async ({
  page = 1,
  take = 12,
  gender,
}: PaginationOptions) => {
  if (isNaN(Number(page))) page = 1;
  if (page < 1) page = 1;

  try {
    // Obtener todos los productos
    const products = await prisma.product.findMany({
      take: take,
      skip: (page - 1) * take,
      include: {
        ProductImage: {
          take: take,
          select: {
            url: true,
          },
        },
      },
      where: {
        gender: gender,
      },
    });

    // Obtener el total de paginas
    const totalProducts = await prisma.product.count({
      where: {
        gender: gender,
      },
    });
    const totalPages = Math.ceil(totalProducts / take);
    return {
      currentPage: page,
      totalPages: totalPages,
      products: products.map((product) => ({
        ...product,
        images: product.ProductImage.map((image) => image.url),
      })),
    };
  } catch (error) {
    throw new Error("Error fetching products: " + error);
  }
};
