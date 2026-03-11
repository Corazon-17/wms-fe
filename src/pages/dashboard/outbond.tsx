import Card from "@/components/Card";
import Filter from "@/components/Filter";
import Title from "@/components/Title";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Search } from "lucide-react";
import { useState } from "react";

export default function Outbond() {
  const [open, setOpen] = useState<boolean>(true);

  return (
    <div className="flex flex-col gap-8">
      <Title title="Outbond" subTitle="Manage all outbond process" />
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
      <Filter open={open} onOpenChange={setOpen} trigger={"Hello"} />
    </div>
  );
}
