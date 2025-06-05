import prisma from "../lib/prisma";
import { initialData } from "./seed";

async function main() {
  // 1. Borrar registros existentes
  await Promise.all([
    prisma.productImage.deleteMany(),
    prisma.product.deleteMany(),
    prisma.category.deleteMany(),
  ]);

  const { categories, products } = initialData;
  // 2. Crear categorías
  const categoriesData = categories.map((name) => ({ name }));
  await prisma.category.createMany({
    data: categoriesData,
  });

  const categoriesDB = await prisma.category.findMany();
  const categoriesMap = categoriesDB.reduce((map, category) => {
    map[category.name.toLowerCase()] = category.id;
    return map;
  }, {} as Record<string, string>);

  products.forEach(async (product) => {
    const { type, images, ...rest } = product;
    const dbProduct = await prisma.product.create({
      data: {
        ...rest,
        categoryId: categoriesMap[type],
      },
    });
  });

  console.log("Categories map:", categoriesMap);
  // console.log("Categories created:", categoriesDB);
  // console.log(categoriesData);
  console.log("seed executed");
}

(() => {
  if (process.env.NODE_ENV === "production") return;
  main();
})();
