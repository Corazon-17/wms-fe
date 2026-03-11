type TitleProps = {
  title: string;
  subTitle?: string;
};

export default function Title(props: TitleProps) {
  return (
    <div className="flex flex-col gap-1">
      <h1 className="text-2xl font-bold">{props.title}</h1>
      {props.subTitle && <h2 className="text-neutral-500">{props.subTitle}</h2>}
    </div>
  );
}
