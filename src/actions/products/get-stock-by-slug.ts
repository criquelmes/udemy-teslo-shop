"use server";

import prisma from "@/lib/prisma";

export const getStockBySlug = async (slug: string): Promise<number> => {
  try {
    const stock = await prisma.product.findFirst({
      where: {
        slug: slug,
      },
      select: {
        inStock: true,
      },
    });

    if (!stock) return 0;

    return stock.inStock;
  } catch (error) {
    console.error("Error fetching stock by slug:", error);
    return 0;
  }
};
