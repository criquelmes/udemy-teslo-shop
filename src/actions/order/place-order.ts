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

  // Crear la transaccion de la orden
  try {
    const prismaTx = await prisma.$transaction(async (tx) => {
      //1. Actualizar el stock de los productos
      const updatedProductsPromises = products.map((product) => {
        //Acumular los valores
        const productQuantity = productsIds
          .filter((p) => p.productId === product.id)
          .reduce((acc, item) => item.quantity + acc, 0);

        if (productQuantity === 0)
          throw new Error(`${product.id} does not have quantity - 500`);

        return tx.product.update({
          where: { id: product.id },
          data: { inStock: { decrement: productQuantity } },
        });
      });

      const updatedProducts = await Promise.all(updatedProductsPromises);
      // Verificar valores negativos en el stock
      updatedProducts.forEach((product) => {
        if (product.inStock < 0) {
          throw new Error(
            `Product ${product.title} does not have sufficient stock - 500`
          );
        }
      });

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
                  products.find((product) => product.id === p.productId)
                    ?.price || 0,
              })),
            },
          },
        },
      });
      // validar si price es 0 entonces lanzar un error
      //3. Crear la direccion de envio
      const { country, ...restAddress } = address;
      const orderAddress = await tx.orderAddress.create({
        data: {
          firstName: restAddress.firstName,
          lastName: restAddress.lastName,
          address: restAddress.address,
          address2: restAddress.address2,
          postalCode: restAddress.postalCode,
          city: restAddress.city,
          phone: restAddress.phone,
          countryId: country,
          orderId: order.id,
        },
      });

      return {
        updatedProducts: updatedProducts,
        order,
        orderAddress: orderAddress,
      };
    });

    return {
      ok: true,
      order: prismaTx.order,
      prismaTx: prismaTx,
    };
  } catch (error) {
    console.error("Error placing order:", error);
    return {
      ok: false,
      message: "Error placing order",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};
