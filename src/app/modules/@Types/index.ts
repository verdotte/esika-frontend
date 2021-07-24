export interface classNameInterface {
  className?: string;
}

export const defaultVectorProps: classNameInterface = {
  className: 'h-6 w-6',
};

export interface IData {
  data: Record<string, string | number | symbol | null | undefined>;
}
