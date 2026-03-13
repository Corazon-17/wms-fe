import type { Dispatch, SetStateAction } from "react";

export type ValueSetter<T> = Dispatch<SetStateAction<T>>;

export type ValueState<T> = [value: T, setValue: ValueSetter<T>];

export type Option = {
  label: string;
  value: string;
};
