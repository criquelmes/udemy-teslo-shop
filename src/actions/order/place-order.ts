"use server";

import { auth } from "@/auth.config";
import type { Address, Size } from "@/interfaces";
import prisma from "@/lib/prisma";
import { size } from "zod/v4";

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

  // Crear la transaccion de la orden
  const prismaTx = await prisma.$transaction(async (tx) => {
    //1. Actualizar el stock de los productos
    //2. Crear la orden - Encabezado - Detalles
    const order = await tx.order.create({
      data: {
        userId: userId,
        itemsInOrder: itemsInOrder,
        subtotal: subTotal,
        tax: tax,
        total: total,

        OrderItem: {
          createMany: {
            data: productsIds.map((p) => ({
              quantity: p.quantity,
              size: p.size,
              productId: p.productId,
              price:
                products.find((product) => product.id === p.productId)?.price ||
                0,
            })),
          },
        },
      },
    });
    // validar si price es 0 entonces lanzar un error
    //3. Crear la direccion de envio

    return {
      order,
      updatedProducts: [],
      orderAddress: {},
    };
  });

  // return {
  //   ok: true,
  //   message: "Order placed successfully",
  // };
};
