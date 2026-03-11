import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { ArrowUpNarrowWide, List, Search } from "lucide-react";
import { useState, type Dispatch, type ReactNode } from "react";
import { Checkbox } from "./ui/checkbox";
import { Field, FieldLabel } from "./ui/field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";

type FilterProps = {
  open: boolean;
  trigger: ReactNode;
  onOpenChange: Dispatch<boolean>;
};

export default function Filter(props: FilterProps) {
  const [type, setType] = useState<"sort" | "filter">("sort");
  const [search, setSearch] = useState<string>("");

  const sortOptions = [
    { label: "A - Z", value: "asc" },
    { label: "Z - A", value: "desc" },
  ];

  const filteredOptions = sortOptions.filter((opt) =>
    opt.label.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <Dialog open={props.open} onOpenChange={props.onOpenChange}>
      <DialogTrigger asChild>{props.trigger}</DialogTrigger>
      <DialogContent className="p-0 overflow-hidden" showCloseButton={false}>
        <DialogHeader hidden>
          <DialogTitle></DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-[48px_1fr] no-scrollbar min-h-40 max-h-[50vh] overflow-y-auto">
          <div className="flex flex-col">
            <Button
              variant="ghost"
              className={cn(
                "size-12 hover:bg-surface hover:text-primary rounded-none",
                type === "sort" && "bg-surface text-primary",
              )}
              onClick={() => setType("sort")}
            >
              <ArrowUpNarrowWide className="size-6" />
            </Button>
            <Button
              variant="ghost"
              className={cn(
                "size-12 hover:bg-surface hover:text-primary rounded-none",
                type === "filter" && "bg-surface text-primary",
              )}
              onClick={() => setType("filter")}
            >
              <List className="size-6" />
            </Button>
          </div>

          {type === "sort" ? (
            <div className="flex flex-col gap-1 p-1">
              {sortOptions.map((opt) => (
                <Button
                  key={opt.value}
                  variant="ghost"
                  className="justify-start h-10 rounded-md hover:bg-surface hover:border-primary"
                >
                  {opt.label}
                </Button>
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-2 p-1">
              <InputGroup className="h-9">
                <InputGroupInput
                  id="search"
                  placeholder="Search here..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <InputGroupAddon align="inline-start">
                  <Search />
                </InputGroupAddon>
              </InputGroup>
              {filteredOptions.map((opt) => (
                <Field
                  orientation="horizontal"
                  className="px-3 py-2 border border-transparent rounded-md text-neutral-400 hover:bg-surface hover:border-primary hover:text-black"
                >
                  <Checkbox id={opt.value} name={opt.value} />
                  <FieldLabel htmlFor={opt.value}>{opt.label}</FieldLabel>
                </Field>
              ))}
            </div>
          )}
        </div>

        <DialogFooter className="text-xs py-3 mb-1 mr-1">
          <Button variant="ghost" className="w-14 h-10">
            Reset
          </Button>
          <Button variant="default" className="w-14 h-10">
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
