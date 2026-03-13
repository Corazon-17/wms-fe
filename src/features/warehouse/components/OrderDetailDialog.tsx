import { DataField } from "@/components/DataField";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useOrder } from "@/features/warehouse/queries/order.query";
import { formatStatusLabel } from "@/features/warehouse/utils/utils";
import { formatFullDate } from "@/lib/utils";
import { type Dispatch } from "react";

type OrderDetailDialogProps = {
  open: boolean;
  orderSN: string;
  onOpenChange: Dispatch<boolean>;
};

export function OrderDetailDialog(props: OrderDetailDialogProps) {
  const { data: order } = useOrder(props.orderSN);

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
              value={order?.marketplaceStatus}
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
            <DataField
              label="Total Amount"
              value={`Rp ${order?.totalAmount}`}
            />
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
                    <td>Rp {item.price}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <Button className="h-10">Pickup</Button>
      </DialogContent>
    </Dialog>
  );
}
