import { DataField } from "@/components/DataField";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import { useOrder } from "@/features/warehouse/queries/order.query";
import { formatStatusLabel } from "@/features/warehouse/utils/utils";
import { formatFullDate } from "@/lib/utils";
import type { ValueSetter } from "@/types";
import {
  usePackOrder,
  usePickupOrder,
  useShipOrder,
} from "../queries/order.mutation";
import type { ActionType } from "../types/order.type";

type OrderDetailDialogProps = {
  open: boolean;
  orderSN: string;
  onOpenChange: ValueSetter<boolean>;
};

export function OrderDetailDialog(props: OrderDetailDialogProps) {
  const { data: order } = useOrder(props.orderSN);

  const handleSuccess = () => {
    props.onOpenChange(false);
  };

  return (
    <Dialog open={props.open} onOpenChange={props.onOpenChange}>
      <DialogContent className="md:p-5 md:min-w-120">
        <DialogHeader>
          <DialogTitle>Detail</DialogTitle>
        </DialogHeader>
        <div className=" flex flex-col gap-4 min-h-40 max-h-[80vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-4">
            <DataField label="Order SN" value={order?.orderSN} />
            <DataField
              label="Marketplace Status"
              value={formatStatusLabel(order?.marketplaceStatus)}
            />
            <DataField
              label="Shipping Status"
              value={formatStatusLabel(order?.shippingStatus)}
            />
            <DataField
              label="WMS Status"
              value={formatStatusLabel(order?.wmsStatus)}
            />
            <DataField
              label="Tracking Number"
              value={formatStatusLabel(order?.trackingNumber)}
            />
            <DataField label="Total Amount" value={`Rp${order?.totalAmount}`} />
            <DataField
              label="Created At"
              value={formatFullDate(order?.createdAt)}
            />
            <DataField
              label="Updated At"
              value={formatFullDate(order?.updatedAt)}
            />
          </div>
        </div>

        <div className="grid border rounded-md text-xs">
          <table>
            <thead className="border-b">
              <tr className="[&_th]:text-start [&_th]:font-normal [&_th]:p-3">
                <th>SKU</th>
                <th>QTY</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {order?.items.map((item, idx) => {
                return (
                  <tr
                    key={idx}
                    className="[&_td]:text-start [&_td]:font-normal [&_td]:p-3"
                  >
                    <td>{item.sku}</td>
                    <td>{item.quantity}</td>
                    <td>Rp{item.price}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <OrderActionButton
          action={order?.allowedAction}
          orderSN={order?.orderSN as string}
          onSuccess={handleSuccess}
        />
      </DialogContent>
    </Dialog>
  );
}

type ActionButtonProps = {
  orderSN: string;
  action?: ActionType;
  onSuccess?: () => void;
};

const OrderActionButton = (props: ActionButtonProps) => {
  const pickupMutation = usePickupOrder();
  const packMutation = usePackOrder();
  const shipMutation = useShipOrder();

  const labelMap = {
    pick: "Pickup",
    pack: "Pack",
    ship: "Ship",
  };
  type LabelMapKey = keyof typeof labelMap;

  const mutationMap = {
    pick: pickupMutation,
    pack: packMutation,
    ship: shipMutation,
  };
  type MutationMapKey = keyof typeof mutationMap;

  const mutation = mutationMap[props.action as MutationMapKey];
  const isPending = mutation?.isPending;

  const handleClick = () => {
    mutation.mutate(props?.orderSN, {
      onSuccess: () => {
        props.onSuccess?.();
      },
    });
  };

  if (!props.action) {
    return null;
  }

  return (
    <Button className="h-10" onClick={handleClick} disabled={isPending}>
      {isPending ? <Spinner /> : labelMap[props.action as LabelMapKey]}
    </Button>
  );
};
