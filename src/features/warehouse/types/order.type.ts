type AllowedActions = "pickup" | "pack" | "ship";

export type Order = {
  orderSN: string;
  wmsStatus: string;
  marketplaceStatus: string;
  shippingStatus: string;
  trackingNumber?: string;
  totalAmount: number;
  allowedActions: AllowedActions;
  createdAt: string;
  updatedAt: string;
};

export type OrderItem = {
  sku: string;
  quantity: number;
  price: number;
};

export type OrderDetail = Order & {
  items: OrderItem[];
};

export type OrderListResponse = {
  data: Order[];
  meta: {
    page: number;
    pageSize: number;
    totalPages: number;
    totalItems: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    prevPage: number;
    nextPage: number;
  };
};

export type OrderQueryParams = {
  page?: number;
  pageSize?: number;
  search?: string;
  filterField?: string;
  filterValues?: string;
  sortField?: string;
  sortDir?: "asc" | "desc";
};

export type WMSStatusResponse = {
  id: string;
  name: string;
};
