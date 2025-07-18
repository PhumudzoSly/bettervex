import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cx(...args: ClassValue[]) {
  return twMerge(clsx(...args));
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
