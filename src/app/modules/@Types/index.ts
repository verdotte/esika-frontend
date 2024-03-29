/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Hit } from '@algolia/client-search';

export interface classNameInterface {
  className?: string;
}

export const defaultVectorProps: classNameInterface = {
  className: 'h-6 w-6',
};

export interface IData {
  data: Record<string, string | number | symbol | null | undefined>;
}
export interface IObject {
  [key: string]: any;
}

export type SetStateType<T> = React.Dispatch<React.SetStateAction<T>>;

export type alertType = 'success' | 'error' | 'warning';

export interface IProperty {
  title: string | null;
  description: string | null;
  price: string | null;
  unit: string;
  type: string;
  location: string | null;
  createdAt: string;
  category: string | null;
  city: string | null;
  currency: string;
  firstName: string | null;
  phoneNumber: string | null;
  picture: string | null;
  image: string | null;
  propertyId: number | string;
  userId: number | string;
  spec: IObject;
  slug: string;
  verified?: boolean;
}

export interface ICategory {
  active: boolean;
  categoryId: number | string;
  createdAt: string;
  description: string | null;
  title: string;
}

export type IAgent = {
  active: boolean;
  createdAt: string;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  bio: string | null;
  phoneNumber: string | null;
  picture: string | null;
  updatedAt: string;
  userId: string | number;
  userType: string;
  address: string;
  verified?: boolean;
};

export interface CountryData {
  name: string;
  dialCode: string;
  countryCode: string;
  format: string;
}

export type formRefType = HTMLInputElement | null;

export type AutocompleteItem = Hit<{
  image: string;
  title: string;
  description: string;
  price: string;
  objectID: string;
  location: string;
  resource: string;
}>;

export type ITouchEvent<T> =
  | React.TouchEvent<T>
  | React.TouchEvent<HTMLDivElement>;
