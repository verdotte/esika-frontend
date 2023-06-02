import { FC } from 'react';
import { isAgent } from 'app/modules/utils/helpers/currentUser';
import ShowWidget from '../ShowWidget';

interface IProps {
  to?: 'agent' | 'normal';
  children?: JSX.Element | JSX.Element[] | null;
}

const defaultProps: IProps = {
  to: 'agent',
  children: null,
};

const Restricted: FC<IProps> = ({ to, children }: IProps) => {
  const isAgentRole = to === 'agent' && isAgent();

  return <ShowWidget condition={isAgentRole}>{children}</ShowWidget>;
};

Restricted.defaultProps = defaultProps;

export default Restricted;
