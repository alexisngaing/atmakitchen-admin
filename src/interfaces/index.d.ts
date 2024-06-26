import { Column } from "@tanstack/react-table";

export interface IPost {
  id: number;
  title: string;
  content: string;
  status: "published" | "draft" | "rejected";
  category: { id: number };
}

export interface ICategory {
  id: string;
  name: string;
}

export * from "./relations/rolesRelations";
export interface IProduct {
  id: string;
  name: string;
  price: number;
  quantity: number;
  quota: number;
  category: { id: number };
}

export interface IRecipe {
  id: string;
  name: string;
}

export interface IIngredient {
  id: string;
  name: string;
  unit: string;
  amountAvailable: number;
}

export interface IEmployee {
  id: string;
  fullName: string;
  email: string;
  password: string;
  dob: Date;
}

export interface IHamper {
  id: string;
  name: string;
  image: string;
  price: number;
  product: { id: number };
}

export interface ColumnButtonProps {
  column: Column<any, any>; // eslint-disable-line
}

export interface FilterElementProps {
  value: any; // eslint-disable-line
  onChange: (value: any) => void; // eslint-disable-line
}
