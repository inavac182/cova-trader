import { RouteComponentProps } from 'react-router';

export interface MatchParams {
  name: string;
}

export interface ParamsObj {
  book?: string;
}

export interface MatchProps extends RouteComponentProps<MatchParams> {
  params: ParamsObj;
}
