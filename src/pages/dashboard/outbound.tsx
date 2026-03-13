import { Filter, PageTitle } from "@/components";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { OrderCard } from "@/features/warehouse/components/OrderCard";
import { OrderDetailDialog } from "@/features/warehouse/components/OrderDetailDialog";
import OrderStatus from "@/features/warehouse/components/OrderStatus";
import useMarketplaceStatusOptions from "@/features/warehouse/hooks/useMarketplaceStatusOptions";
import useShippingStatusOptions from "@/features/warehouse/hooks/useShippingStatusOptions";
import useWMSStatusOptions from "@/features/warehouse/hooks/useWMSStatusOptions";
import {
  useOrders,
  useOrderSummary,
} from "@/features/warehouse/queries/order.query";
import type {
  FilterFieldType,
  Order,
  OrderQueryParams,
} from "@/features/warehouse/types/order.type";
import useDebounce from "@/hooks/useDebounce";
import { useQueryParams } from "@/hooks/useQueryParams";
import { formatFullDate } from "@/lib/utils";
import type { ColumnDef } from "@tanstack/react-table";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

export default function Outbound() {
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [filterField, setFilterField] = useState<FilterFieldType>(null);

  const [openOrderDetail, setOpenOrderDetail] = useState<boolean>(false);
  const [orderSN, setOrderSN] = useState<string>("");

  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebounce(search, 1500);

  const { data: orderSummary } = useOrderSummary();

  const { params, updateParams } = useQueryParams<OrderQueryParams>({
    page: 1,
    pageSize: 10,
    search: "",
  });
  const { data: orders, isLoading: ordersLoading } = useOrders(params);

  const marketplaceStatusOptions = useMarketplaceStatusOptions(
    filterField === "marketplace_status",
  );
  const shippingStatusOptions = useShippingStatusOptions(
    filterField === "shipping_status",
  );
  const wmsStatusOptions = useWMSStatusOptions(filterField === "wms_status_id");

  const filterOptionMap = {
    marketplace_status: marketplaceStatusOptions,
    shipping_status: shippingStatusOptions,
    wms_status_id: wmsStatusOptions,
  };
  type FilterOptionKey = keyof typeof filterOptionMap;

  const filterOptions = filterOptionMap[filterField as FilterOptionKey];

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
        return <OrderStatus id={cell.row.original.marketplaceStatus} />;
      },
      meta: {
        align: "center",
        allowFilter: true,
        onHeaderClick: () => {
          setFilterField("marketplace_status");
          setOpenFilter(true);
        },
      },
    },
    {
      accessorKey: "shippingStatus",
      header: "Shipping Status",
      cell: (cell) => {
        return <OrderStatus id={cell.row.original.shippingStatus} />;
      },
      meta: {
        align: "center",
        allowFilter: true,
        onHeaderClick: () => {
          setFilterField("shipping_status");
          setOpenFilter(true);
        },
      },
    },
    {
      accessorKey: "wmsStatus",
      header: "WMS Status",
      cell: (cell) => {
        return <OrderStatus id={cell.row.original.wmsStatus} />;
      },
      meta: {
        align: "center",
        allowFilter: true,
        onHeaderClick: () => {
          setFilterField("wms_status_id");
          setOpenFilter(true);
        },
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
      meta: {
        align: "center",
        allowFilter: true,
        onHeaderClick: () => {
          setOpenFilter(true);
        },
      },
    },
    {
      id: "action",
      header: "Action",
      cell: (cell) => {
        return (
          <Button
            className="w-16 h-8"
            onClick={() => {
              setOrderSN(cell.row.original.orderSN);
              setOpenOrderDetail(true);
            }}
          >
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

  useEffect(() => {
    updateParams({ search: debouncedSearch.toLowerCase() });
  }, [debouncedSearch]);

  return (
    <div className="flex flex-col gap-8 mb-20">
      <PageTitle title="Outbound" subTitle="Manage all outbound process" />

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        <OrderCard
          title="Total order"
          value={orderSummary?.totalOrders}
          description="12% this month"
          status="up"
        />
        <OrderCard
          title="Cancelled"
          value={orderSummary?.cancelledOrders}
          description="5% this month"
          status="down"
        />
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 p-2 rounded-md border">
        <InputGroup>
          <InputGroupInput
            id="search"
            placeholder="Search here..."
            onChange={(e) => setSearch(e.target.value)}
          />
          <InputGroupAddon align="inline-start">
            <Search />
          </InputGroupAddon>
        </InputGroup>
        <div className="border-l hidden sm:block"></div>
      </div>

      <DataTable
        columns={columns}
        data={orders?.data}
        meta={orders?.meta}
        onPaginationChange={updateParams}
        isFetching={ordersLoading}
      />

      <Filter
        open={openFilter}
        onOpenChange={setOpenFilter}
        options={filterOptions}
        onSave={(value) =>
          updateParams({
            filterField: filterField ? (filterField as string) : undefined,
            filterValues: value.filter.join(","),
            sortDir: value.sort,
          })
        }
      />

      <OrderDetailDialog
        open={openOrderDetail}
        orderSN={orderSN}
        onOpenChange={setOpenOrderDetail}
      />
    </div>
  );
}
