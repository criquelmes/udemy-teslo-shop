"use client";

import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import {
  CreateOrderActions,
  CreateOrderData,
  OnApproveActions,
  OnApproveData,
} from "@paypal/paypal-js";
import { paypalCheckPayment, setTransactionId } from "@/actions";

interface Props {
  orderId: string;
  amount: number;
}

export const PayPalButton = ({ orderId, amount }: Props) => {
  const [{ isPending }] = usePayPalScriptReducer();

  if (isPending) {
    return (
      <div className="animate-pulse gap-2 mb-10">
        <div className="h-12 bg-gray-300 rounded" />
        <div className="h-12 bg-gray-300 rounded mt-3" />
      </div>
    );
  }

  const roundedAmount = amount.toFixed(2).toString();

  const createOrder = async (
    data: CreateOrderData,
    actions: CreateOrderActions
  ): Promise<string> => {
    const transactionId = await actions.order.create({
      intent: "CAPTURE",
      purchase_units: [
        {
          // reference_id: 'order_id,
          invoice_id: orderId,
          amount: {
            value: roundedAmount, // Use the amount you want to charge
            currency_code: "USD",
          },
        },
      ],
    });

    // TODO: Guardar el id de la orden en nuestra base de datos
    const { ok } = await setTransactionId(orderId, transactionId);

    if (!ok) {
      throw new Error("Failed to process the order");
    }

    return transactionId;
  };

  const onApprove = async (data: OnApproveData, actions: OnApproveActions) => {
    const details = await actions.order?.capture();
    if (!details) return;

    await paypalCheckPayment(details.id || "");
  };

  return <PayPalButtons createOrder={createOrder} onApprove={onApprove} />;
};
