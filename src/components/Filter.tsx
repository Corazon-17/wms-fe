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
import type { Option } from "@/types";
import { ArrowUpNarrowWide, List, Search } from "lucide-react";
import { useState, type Dispatch, type ReactNode } from "react";
import { Checkbox } from "./ui/checkbox";
import { Field, FieldLabel } from "./ui/field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";

const sortOptions = [
  { label: "A - Z", value: "asc" },
  { label: "Z - A", value: "desc" },
];

type SortDir = "asc" | "desc";
type FilterValue = {
  sort: SortDir;
  filter: string[];
};

type FilterProps = {
  open: boolean;
  trigger?: ReactNode;
  options?: Option[];
  onOpenChange: Dispatch<boolean>;
  onSave?: (value: FilterValue) => void;
};

export function Filter(props: FilterProps) {
  const [type, setType] = useState<"sort" | "filter">(
    props.options ? "filter" : "sort",
  );
  const [search, setSearch] = useState<string>("");
  const [sort, setSort] = useState<SortDir>("desc");
  const [selected, setSelected] = useState<string[]>([]);

  const handleClick = (value: string) => {
    const isSelected = selected.includes(value);
    if (isSelected) {
      setSelected((curr) => curr.filter((val) => val !== value));
    } else {
      setSelected((curr) => [...curr, value]);
    }
  };

  const handleReset = () => {
    setSelected([]);
  };

  const handleSave = () => {
    const value: FilterValue = {
      sort: sort,
      filter: selected,
    };

    if (props.onSave) {
      props.onSave(value);
      props.onOpenChange(false);
    }
  };

  const filteredOptions = props.options?.filter((opt) =>
    opt.label.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <Dialog
      open={props.open}
      onOpenChange={(isOpen) => {
        props.onOpenChange(isOpen);
        if (!isOpen) {
          handleReset();
        }
      }}
    >
      {props.trigger && <DialogTrigger asChild>{props.trigger}</DialogTrigger>}
      <DialogContent
        className="p-0 overflow-hidden"
        showCloseButton={false}
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
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
              defaultChecked={false}
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
                  className={cn(
                    "justify-start h-10 rounded-md hover:bg-surface hover:border-primary",
                    sort === opt.value && "bg-surface border-primary",
                  )}
                  onClick={() => setSort(opt.value as SortDir)}
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
              {filteredOptions && filteredOptions.length > 0 ? (
                filteredOptions?.map((opt) => {
                  const isSelected = selected.includes(opt.value);

                  return (
                    <Field
                      key={opt.value}
                      orientation="horizontal"
                      className={cn(
                        "relative px-3 py-2 border border-transparent rounded-md transition-all", // Added 'relative'
                        "text-neutral-400 hover:bg-surface hover:border-primary hover:text-black",
                        isSelected && "bg-surface border-primary text-black",
                      )}
                    >
                      <div
                        className="absolute inset-0 z-10 cursor-pointer"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleClick(opt.value);
                        }}
                      />

                      <div className="flex items-center gap-3 pointer-events-none">
                        <Checkbox
                          id={opt.value}
                          checked={isSelected}
                          aria-readonly
                        />
                        <FieldLabel
                          htmlFor={opt.value}
                          className="cursor-pointer"
                        >
                          {opt.label}
                        </FieldLabel>
                      </div>
                    </Field>
                  );
                })
              ) : (
                <span className="text-center my-2">No data found.</span>
              )}
            </div>
          )}
        </div>

        <DialogFooter className="text-xs py-3 mb-1 mr-1">
          <Button variant="ghost" className="w-14 h-10" onClick={handleReset}>
            Reset
          </Button>
          <Button variant="default" className="w-14 h-10" onClick={handleSave}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
