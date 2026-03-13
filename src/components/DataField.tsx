type DataFieldProps = {
  label: string;
  value?: string | number;
};

export function DataField(props: DataFieldProps) {
  return (
    <dl className="flex flex-col gap-0.5">
      <dt className="text-xs text-neutral-500">{props.label}</dt>
      <dd className="text-sm font-medium">{props.value || "-"}</dd>
    </dl>
  );
}
