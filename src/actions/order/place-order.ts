"use server";

import { auth } from "@/auth.config";
import type { Address, Size } from "@/interfaces";
import prisma from "@/lib/prisma";

interface ProductToOrder {
  productId: string;
  quantity: number;
  size: Size;
}
export const placeOrder = async (
  productsIds: ProductToOrder[],
  address: Address
) => {
  const session = await auth();
  const userId = session?.user.id;

  //Verificacion de usuario autenticado
  if (!userId) {
    return {
      ok: false,
      message: "User not authenticated",
    };
  }

  // Obtencion de la informacion de los productos
  // Nota: recordar que podemos llevar 2+ productos con el mismo id

  const products = await prisma.product.findMany({
    where: {
      id: { in: productsIds.map((item) => item.productId) },
    },
  });

  //Calcular los montos // Encabezado
  const itemsInOrder = productsIds.reduce((count, p) => count + p.quantity, 0);

  //Calculo de valores de taxes, subtotal y total
  const { subTotal, tax, total } = productsIds.reduce(
    (totals, item) => {
      const productQuantity = item.quantity;
      const product = products.find((product) => product.id === item.productId);

      if (!product) throw new Error(`${item.productId} no existe - 500`);

      const subTotal = product.price * productQuantity;

      totals.subTotal += subTotal;
      totals.tax += subTotal * 0.19;
      totals.total += subTotal * 1.19;

      return totals;
    },
    { subTotal: 0, tax: 0, total: 0 }
  );
};
