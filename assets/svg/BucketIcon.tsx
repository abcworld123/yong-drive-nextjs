import { SvgFC, SvgProps } from 'types/SvgIcon';

export default function BucketIcon({ size }: SvgProps): SvgFC {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 100 100">
      <path
        d="M22.812 35.714a1.726 1.726 0 0 1-.17-.715l.17.715zM77.188 35.714l.17-.715c0 .24-.058.479-.17.715z"
        fill="#8C3323"
      />
      <path
        fill="#8C3323"
        d="M77.358 32.671v2.328l-.17.715v-2.326zM22.812 33.388v2.326l-.17-.715v-2.328z"
      />
      <clipPath id="a" />
      <g clipPath="url(#a)" fill="#8C3323">
        <path d="M77.358 28.229v2.327c0 .084-.01.167-.023.251v-2.324c.014-.084.023-.17.023-.254M77.335 28.483v2.324c-.014.1-.041.197-.076.295v-2.328c.035-.095.062-.193.076-.291M77.259 28.774v2.328a1.946 1.946 0 0 1-.193.399v-2.325c.081-.13.148-.265.193-.402M77.065 29.177v2.325c-1.943 3.112-13.32 5.483-27.07 5.483-15.105 0-27.354-2.868-27.354-6.429v-2.327c0 3.562 12.248 6.431 27.354 6.431 13.75 0 25.127-2.372 27.07-5.483" />
      </g>
      <path
        d="M49.995 21.806c15.113 0 27.363 2.877 27.363 6.424 0 3.562-12.25 6.431-27.363 6.431-15.105 0-27.354-2.868-27.354-6.431.001-3.547 12.249-6.424 27.354-6.424z"
        fill="#E15343"
      />
      <path
        fill="#8C3323"
        d="M77.188 33.388v2.326l-8.947 38.195v-2.322zM31.761 71.587v2.322l-8.949-38.195v-2.326z"
      />
      <clipPath id="b" />
      <g clipPath="url(#b)" fill="#8C3323">
        <path d="M68.241 71.587v2.322c0 .06-.006.115-.018.172v-2.329a.765.765 0 0 0 .018-.165" />
        <path d="M68.224 71.752v2.329c-.006.063-.027.129-.047.193v-2.325c.019-.067.041-.13.047-.197M68.177 71.949v2.325c-.033.09-.078.179-.131.268v-2.329c.053-.085.098-.174.131-.264M68.046 72.213v2.329c-1.295 2.072-8.879 3.652-18.051 3.652-10.07 0-18.234-1.911-18.234-4.285v-2.322c0 2.372 8.164 4.28 18.234 4.28 9.172 0 16.756-1.581 18.051-3.654" />
      </g>
      <path
        d="M49.995 39.095c14.088 0 25.684-2.49 27.193-5.707l-8.947 38.199c0 2.372-8.166 4.28-18.246 4.28-10.07 0-18.234-1.908-18.234-4.28l-8.949-38.199c1.511 3.216 13.105 5.707 27.183 5.707z"
        fill="#E15343"
      />
      <path
        d="M77.42 32.668c.014.036.021.073.036.109l-.014-.063c-.006-.016-.016-.031-.022-.046zM77.391 32.579a2.179 2.179 0 0 1-.059-.201c.014.067.037.135.059.201z"
        fill="#146EB4"
      />
    </svg>
  );
}