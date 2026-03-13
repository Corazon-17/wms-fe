import type { Dispatch, SetStateAction } from "react";

export type ValueState<T> = [value: T, setValue: Dispatch<SetStateAction<T>>];

export type Option = {
  label: string;
  value: string;
};
