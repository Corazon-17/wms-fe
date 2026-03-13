export const getStatusStyle = (status: string) => {
  switch (status.toLowerCase()) {
    case "delivered":
    case "approved":
    case "label_created":
      return "bg-[#C6FBDC] text-[#27AE60]";
    case "shipping":
    case "shipped":
    case "ready_to_pick":
      return "bg-[#FFF9F2] text-[#CD7B2E]";
    case "processing":
    case "packed":
      return "bg-[#F3E7FC] text-[#BF7EEF]";
    case "paid":
    case "awaiting_pickup":
    case "picking":
      return "bg-[#F0F3FFF3] text-[#3267E3]";
    case "cancelled":
      return "bg-[#FFF4F2] text-[#CB3A31]";
  }
};

export const formatStatusLabel = (status?: string): string => {
  if (!status) return "";

  return status
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};
