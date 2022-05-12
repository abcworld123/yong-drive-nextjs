import { ReactElement, SVGProps } from 'react';

export interface MaterialIcon extends Svg {
  children: ReactElement<SVGProps<SVGPathElement>>;
}

export interface Svg {
  size?: number;
  fill?: string;
}
