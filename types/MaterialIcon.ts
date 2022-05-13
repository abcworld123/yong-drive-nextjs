import { ReactElement, SVGProps } from 'react';

export interface MaterialIconProps extends SvgProps {
  children: ReactElement<SVGProps<SVGPathElement>>;
}

export interface SvgProps {
  size?: number;
  fill?: string;
}

export type MaterialIconFC = React.ReactElement<MaterialIconProps>;
export type SvgFC = React.ReactElement<SvgProps>;
