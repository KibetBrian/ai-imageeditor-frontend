import type { SVGProps } from "react";

import React from "react";

export function ImageUploadIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      height={48}
      viewBox="0 0 24 24"
      width={48}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth={1.5}
      >
        <path
          d="M21.25 13V8.5a5 5 0 0 0-5-5h-8.5a5 5 0 0 0-5 5v7a5 5 0 0 0 5 5h6.26"
          strokeLinejoin="round"
        />
        <path
          d="m3.01 17l2.74-3.2a2.2 2.2 0 0 1 2.77-.27a2.2 2.2 0 0 0 2.77-.27l2.33-2.33a4 4 0 0 1 5.16-.43l2.47 1.91M8.01 10.17a1.66 1.66 0 1 0-.02-3.32a1.66 1.66 0 0 0 .02 3.32"
          strokeLinejoin="round"
        />
        <path d="M18.707 15v5" strokeMiterlimit={10} />
        <path
          d="m21 17.105l-1.967-1.967a.458.458 0 0 0-.652 0l-1.967 1.967"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}

export function HomeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      height={48}
      viewBox="0 0 14 14"
      width={48}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        clipRule="evenodd"
        d="M9.919.731c.178-.816 1.34-.821 1.527-.007l.008.038l.017.072a2.21 2.21 0 0 0 1.774 1.673c.852.149.852 1.372 0 1.52a2.212 2.212 0 0 0-1.778 1.687l-.021.096c-.186.815-1.349.81-1.527-.007L9.9 5.721a2.198 2.198 0 0 0-1.77-1.695c-.85-.148-.85-1.37 0-1.517A2.198 2.198 0 0 0 9.899.822l.013-.06l.007-.03ZM1.105.171a.977.977 0 0 0-.978.977V5.3c0 .54.438.977.978.977h4.153c.54 0 .977-.437.977-.977V1.148A.977.977 0 0 0 5.258.17zm-.978 8.57c0-.54.438-.977.978-.977h4.153c.54 0 .977.437.977.977v4.153c0 .54-.437.978-.977.978H1.105a.977.977 0 0 1-.978-.978V8.742Zm7.595 0c0-.54.437-.977.977-.977h4.153c.54 0 .978.437.978.977v4.153c0 .54-.438.978-.978.978H8.7a.977.977 0 0 1-.977-.978V8.742Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
}

export function PreviousGenerationsIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      height={48}
      viewBox="0 0 24 24"
      width={48}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M15.25 13c.967 0 1.75.784 1.75 1.75v4.504a1.75 1.75 0 0 1-1.75 1.75H3.75A1.75 1.75 0 0 1 2 19.254V14.75c0-.966.784-1.75 1.75-1.75zm5.751 1.896v5.354a.75.75 0 0 1-1.494.102l-.007-.102v-5.343a3 3 0 0 0 1.501-.011m-.75-4.804a1.908 1.908 0 1 1 0 3.816a1.908 1.908 0 0 1 0-3.816m-5.005-7.095c.967 0 1.75.784 1.75 1.75V9.25a1.75 1.75 0 0 1-1.75 1.75h-11.5a1.75 1.75 0 0 1-1.75-1.75V4.747a1.75 1.75 0 0 1 1.607-1.744l.143-.006zM20.251 3a.75.75 0 0 1 .743.649l.007.101v5.346a3 3 0 0 0-1.5-.01V3.75a.75.75 0 0 1 .75-.75"
        fill="currentColor"
      />
    </svg>
  );
}
