export default interface IRoute {
  path: string;
  name: string;
  exact: boolean;
  secured?: boolean;
  component: React.ElementType;
}
