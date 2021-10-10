export default interface IRoute {
  path: string;
  name: string;
  exact: boolean;
  secured?: boolean;
  isRestricted?: boolean;
  component: React.ElementType;
}
