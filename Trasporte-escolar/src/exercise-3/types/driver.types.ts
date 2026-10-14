import type { Route } from "./route.types.js";

export interface Driver {
  id: number;
  name: string;
  licenseNumber: string;
  phone: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export type DriverWithRoutes = Driver & {
  routes: Route[];
};