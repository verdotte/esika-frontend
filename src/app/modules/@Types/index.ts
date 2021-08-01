/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-explicit-any */
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

export type stateSetterType<T> = React.Dispatch<
  React.SetStateAction<T>
>;

export type alertType = 'success' | 'error';

export type IAgent = {
  active: boolean;
  createdAt: string;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  phoneNumber: string | null;
  picture: string | null;
  updatedAt: string;
  userId: string | number;
  userType: string;
  verified?: boolean;
};
export interface CountryData {
  name: string;
  dialCode: string;
  countryCode: string;
  format: string;
}

export type formRefType = HTMLInputElement | null;
