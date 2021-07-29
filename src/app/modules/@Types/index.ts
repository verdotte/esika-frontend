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
export interface IContext {
  [key: string]: any;
}

export interface CountryData {
  name: string;
  dialCode: string;
  countryCode: string;
  format: string;
}

export type formRefType = HTMLInputElement | null;
