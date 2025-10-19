import { Key } from "react";

export interface Service {
  noID: Key | null | undefined;
  id: number;
  name: string;
  serviceDesc: string;
  status: boolean;
}
