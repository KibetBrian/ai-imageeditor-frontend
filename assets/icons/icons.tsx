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

export function DrawIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      height={48}
      viewBox="0 0 24 24"
      width={48}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M9.75 20.85c1.78-.7 1.39-2.63.49-3.85c-.89-1.25-2.12-2.11-3.36-2.94A9.8 9.8 0 0 1 4.54 12c-.28-.33-.85-.94-.27-1.06c.59-.12 1.61.46 2.13.68c.91.38 1.81.82 2.65 1.34l1.01-1.7C8.5 10.23 6.5 9.32 4.64 9.05c-1.06-.16-2.18.06-2.54 1.21c-.32.99.19 1.99.77 2.77c1.37 1.83 3.5 2.71 5.09 4.29c.34.33.75.72.95 1.18c.21.44.16.47-.31.47c-1.24 0-2.79-.97-3.8-1.61l-1.01 1.7c1.53.94 4.09 2.41 5.96 1.79m11.09-15.6c.22-.22.22-.58 0-.79l-1.3-1.3a.56.56 0 0 0-.78 0l-1.02 1.02l2.08 2.08M11 10.92V13h2.08l6.15-6.15l-2.08-2.08z"
        fill="currentColor"
      />
    </svg>
  );
}

export function ApplyIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      height={48}
      viewBox="0 0 24 24"
      width={48}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        color="currentColor"
        d="M5 14.5s1.5 0 3.5 3.5c0 0 5.559-9.167 10.5-11"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
    </svg>
  );
}

export function ImageIcon(props: SVGProps<SVGSVGElement>) {
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
        strokeLinejoin="round"
        strokeWidth={1.5}
      >
        <path d="M16.24 3.5h-8.5a5 5 0 0 0-5 5v7a5 5 0 0 0 5 5h8.5a5 5 0 0 0 5-5v-7a5 5 0 0 0-5-5" />
        <path d="m2.99 17l2.75-3.2a2.2 2.2 0 0 1 2.77-.27a2.2 2.2 0 0 0 2.77-.27l2.33-2.33a4 4 0 0 1 5.16-.43l2.49 1.93M7.99 10.17a1.66 1.66 0 1 0 0-3.32a1.66 1.66 0 0 0 0 3.32" />
      </g>
    </svg>
  );
}

export function EraseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      height={48}
      viewBox="0 0 24 24"
      width={48}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M14.952 3c-1.037 0-1.872.835-3.542 2.505l-4.91 4.91l7.085 7.085l4.91-4.91C20.165 10.92 21 10.085 21 9.048c0-1.038-.835-1.873-2.505-3.543C16.825 3.835 15.99 3 14.952 3"
        fill="currentColor"
        opacity={0.5}
      />
      <path
        d="M13.585 17.5L6.5 10.415l-.995.995C3.835 13.08 3 13.915 3 14.952c0 1.038.835 1.873 2.505 3.543C7.175 20.165 8.01 21 9.048 21c1.037 0 1.872-.835 3.542-2.505z"
        fill="currentColor"
      />
      <path
        d="M9.033 21H9zm.03 0c.796-.006 1.476-.506 2.51-1.5H21a.75.75 0 0 1 0 1.5z"
        fill="currentColor"
        opacity={0.5}
      />
    </svg>
  );
}

export function SelectCanvasItemIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      height={48}
      viewBox="0 0 24 24"
      width={48}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M20 9a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v1H9V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h1v6H4a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-1h6v1a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-1V9zm-3-4h2v2h-2zM5 5h2v2H5zm2 14H5v-2h2zm12 0h-2v-2h2zm-2-4h-1a1 1 0 0 0-1 1v1H9v-1a1 1 0 0 0-1-1H7V9h1a1 1 0 0 0 1-1V7h6v1a1 1 0 0 0 1 1h1z"
        fill="currentColor"
      />
    </svg>
  );
}

export function BackIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      height={48}
      viewBox="0 0 24 24"
      width={48}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="m4 10l-.707.707L2.586 10l.707-.707zm17 8a1 1 0 1 1-2 0zM8.293 15.707l-5-5l1.414-1.414l5 5zm-5-6.414l5-5l1.414 1.414l-5 5zM4 9h10v2H4zm17 7v2h-2v-2zm-7-7a7 7 0 0 1 7 7h-2a5 5 0 0 0-5-5z"
        fill="currentColor"
      />
    </svg>
  );
}

export function ForwardIcon(props: SVGProps<SVGSVGElement>) {
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
        strokeLinejoin="round"
        strokeWidth={2}
      >
        <path d="m15 17l5-5l-5-5" />
        <path d="M4 18v-2a4 4 0 0 1 4-4h12" />
      </g>
    </svg>
  );
}

export function LineIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      height={48}
      viewBox="0 0 20 20"
      width={48}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        clipRule="evenodd"
        d="M.5 10a.5.5 0 0 1 .5-.5h18a.5.5 0 0 1 0 1H1a.5.5 0 0 1-.5-.5"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
}
