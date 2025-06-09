"use server";

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export const getOrderById = async (orderId: string) => {
  const session = await auth();

  if (!session?.user) {
    return {
      ok: false,
      message: "User not authenticated",
    };
  }

  try {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        OrderAddress: true,
        OrderItem: {
          select: {
            price: true,
            quantity: true,
            size: true,
            product: {
              select: {
                title: true,
                slug: true,
                ProductImage: {
                  select: {
                    url: true,
                  },
                  take: 1, // Get only the first image
                },
              },
            },
          },
        },
      },
    });

    if (!order) throw `Order with ID ${orderId} not found`;

    if (session.user.role === "user" && order.userId !== session.user.id) {
      throw `Order with ID ${orderId} does not belong to the authenticated user`;
    }

    return {
      ok: true,
      order,
    };
  } catch (error) {
    console.error("Error fetching order:", error);
    return {
      ok: false,
      message: "An error occurred while fetching the order",
    };
  }
};
