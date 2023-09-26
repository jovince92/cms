import { ModeofPayment } from "@/Components/types";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const ModeOfPayments:ModeofPayment[] = [
  'Cash',
  'Check',
  'Credit Card',
  'Bank Transaction',
];
