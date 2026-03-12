import Card from "@/components/Card";
import { DataTable } from "@/components/data-table";
import Filter from "@/components/Filter";
import Title from "@/components/Title";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import Status from "@/features/warehouse/components/Status";
import { useOrders } from "@/features/warehouse/queries/order.query";
import type {
  Order,
  OrderQueryParams,
} from "@/features/warehouse/types/order.type";
import { useQueryParams } from "@/hooks/useQueryParams";
import { formatFullDate } from "@/lib/utils";
import type { ColumnDef } from "@tanstack/react-table";
import { Search } from "lucide-react";
import { useState, type Dispatch } from "react";

export default function Outbound() {
  const [open, setOpen] = useState<boolean>(false);
  const [openOrderdetail, setOpenOrderDetail] = useState<boolean>(false);

  const { params, updateParams } = useQueryParams<OrderQueryParams>({
    page: 1,
    pageSize: 10,
  });
  const { data: ordersData } = useOrders(params);

  const columns: ColumnDef<Order>[] = [
    {
      accessorKey: "orderSN",
      header: "Order SN",
      minSize: 200,
    },
    {
      accessorKey: "marketplaceStatus",
      header: "Marketplace Status",
      cell: (cell) => {
        return <Status id={cell.row.original.marketplaceStatus} />;
      },
      meta: {
        align: "center",
      },
    },
    {
      accessorKey: "shippingStatus",
      header: "Shipping Status",
      cell: (cell) => {
        return <Status id={cell.row.original.shippingStatus} />;
      },
      meta: {
        align: "center",
      },
    },
    {
      accessorKey: "wmsStatus",
      header: "WMS Status",
      cell: (cell) => {
        return <Status id={cell.row.original.wmsStatus} />;
      },
      meta: {
        align: "center",
      },
    },
    {
      accessorKey: "trackingNumber",
      header: "Tracking Number",
      meta: {
        align: "center",
      },
    },
    {
      accessorKey: "updatedAt",
      header: "Update At",
      cell: (cell) => <p>{formatFullDate(cell.row.original.updatedAt)}</p>,
    },
    {
      id: "action",
      header: "Action",
      cell: () => {
        return (
          <Button className="w-16 h-8" onClick={() => setOpenOrderDetail(true)}>
            Detail
          </Button>
        );
      },
      maxSize: 110,
      meta: {
        align: "center",
      },
    },
  ];

  return (
    <div className="flex flex-col gap-8 mb-20">
      <Title title="Outbound" subTitle="Manage all outbound process" />
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        <Card
          title="Total order"
          value={1284}
          description="12% this month"
          status="up"
        />
        <Card
          title="Cancelled"
          value={269}
          description="5% this month"
          status="down"
        />
      </div>
      <div className="grid grid-cols-3 gap-4 p-2 rounded-md border">
        <InputGroup>
          <InputGroupInput id="search" placeholder="Search here..." />
          <InputGroupAddon align="inline-start">
            <Search />
          </InputGroupAddon>
        </InputGroup>
        <div className="border-l"></div>
      </div>
      <DataTable
        columns={columns}
        data={ordersData?.data}
        meta={ordersData?.meta}
        onPaginationChange={updateParams}
      />
      <Filter open={open} onOpenChange={setOpen} trigger={"Hello"} />
      <OrderDetailDialog
        open={openOrderdetail}
        onOpenChange={setOpenOrderDetail}
      />
    </div>
  );
}

type OrderDetailDialogProps = {
  open: boolean;
  data?: Order;
  onOpenChange: Dispatch<boolean>;
};

const OrderDetailDialog = (props: OrderDetailDialogProps) => {
  return (
    <Dialog open={props.open} onOpenChange={props.onOpenChange}>
      <DialogContent className="md:p-5 md:min-w-120">
        <DialogHeader>
          <DialogTitle>Detail</DialogTitle>
        </DialogHeader>
        <div className=" flex flex-col gap-4 min-h-40 max-h-[80vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-4">
            <DataField label="Order SN" value="SHP001" />
            <DataField label="Marketplace Status" value="SHP001" />
            <DataField label="Shipping Status" value="SHP001" />
            <DataField label="WMS Status" value="SHP001" />
            <DataField label="Tracking Number" value="SHP001" />
            <DataField label="Total Amount" value="SHP001" />
            <DataField label="Created At" value="SHP001" />
            <DataField label="Updated At" value="SHP001" />
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
              <tr className="[&_td]:text-start [&_td]:font-normal [&_td]:p-3">
                <td>SKU</td>
                <td>QTY</td>
                <td>Price</td>
              </tr>
            </tbody>
          </table>
        </div>

        <Button className="h-10">Pickup</Button>
      </DialogContent>
    </Dialog>
  );
};

type DataFieldProps = {
  label: string;
  value?: string;
};

const DataField = (props: DataFieldProps) => {
  return (
    <dl className="flex flex-col gap-0.5">
      <dt className="text-xs text-neutral-500">{props.label}</dt>
      <dd className="text-sm font-medium">{props.value || "-"}</dd>
    </dl>
  );
};
