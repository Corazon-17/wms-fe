export type Order = {
  orderSN: string;
  wmsStatus: string;
  marketplaceStatus: string;
  shippingStatus: string;
  trackingNumber?: string;
  totalAmount: number;
  allowed_actions: string[];
  updatedAt: string;
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
  wmsStatus?: string;
  sort?: string;
  order?: "asc" | "desc";
};

export type OrderItem = {
  sku: string;
  quantity: number;
  price: number;
};
