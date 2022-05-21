import type { SvgFC, SvgProps } from 'types/svgIcon';

export default function Loader({ size, fill, show }: SvgProps & { show: boolean }): SvgFC {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={`absolute top-1/2 left-1/2 -ml-[75px] -mt-[75px] ${show ? '' : 'hidden'}`} width={size} height={size} viewBox="0 0 100 100" fill={fill} preserveAspectRatio="xMidYMid">
      <g transform="translate(20 50)">
        <circle cx="0" cy="0" r="6" fill="#222222">
          <animateTransform attributeName="transform" type="scale" begin="-0.3024193548387097s" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1" values="0;1;0" keyTimes="0;0.5;1" dur="0.8064516129032259s" repeatCount="indefinite"></animateTransform>
        </circle>
      </g><g transform="translate(40 50)">
        <circle cx="0" cy="0" r="6" fill="#222222">
          <animateTransform attributeName="transform" type="scale" begin="-0.20161290322580647s" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1" values="0;1;0" keyTimes="0;0.5;1" dur="0.8064516129032259s" repeatCount="indefinite"></animateTransform>
        </circle>
      </g><g transform="translate(60 50)">
        <circle cx="0" cy="0" r="6" fill="#222222">
          <animateTransform attributeName="transform" type="scale" begin="-0.10080645161290323s" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1" values="0;1;0" keyTimes="0;0.5;1" dur="0.8064516129032259s" repeatCount="indefinite"></animateTransform>
        </circle>
      </g><g transform="translate(80 50)">
        <circle cx="0" cy="0" r="6" fill="#222222">
          <animateTransform attributeName="transform" type="scale" begin="0s" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1" values="0;1;0" keyTimes="0;0.5;1" dur="0.8064516129032259s" repeatCount="indefinite"></animateTransform>
        </circle>
      </g>
    </svg>
  );
}
