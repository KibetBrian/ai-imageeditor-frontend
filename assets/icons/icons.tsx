import type { SVGProps } from "react";

import React from "react";

export function ImageUploadIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg height={48} viewBox="0 0 24 24" width={48} xmlns="http://www.w3.org/2000/svg" {...props}>
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth={1.5}>
        <path d="M21.25 13V8.5a5 5 0 0 0-5-5h-8.5a5 5 0 0 0-5 5v7a5 5 0 0 0 5 5h6.26" strokeLinejoin="round" />
        <path
          d="m3.01 17l2.74-3.2a2.2 2.2 0 0 1 2.77-.27a2.2 2.2 0 0 0 2.77-.27l2.33-2.33a4 4 0 0 1 5.16-.43l2.47 1.91M8.01 10.17a1.66 1.66 0 1 0-.02-3.32a1.66 1.66 0 0 0 .02 3.32"
          strokeLinejoin="round"
        />
        <path d="M18.707 15v5" strokeMiterlimit={10} />
        <path d="m21 17.105l-1.967-1.967a.458.458 0 0 0-.652 0l-1.967 1.967" strokeLinejoin="round" />
      </g>
    </svg>
  );
}

export function HomeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg height={48} viewBox="0 0 14 14" width={48} xmlns="http://www.w3.org/2000/svg" {...props}>
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
    <svg height={48} viewBox="0 0 24 24" width={48} xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M15.25 13c.967 0 1.75.784 1.75 1.75v4.504a1.75 1.75 0 0 1-1.75 1.75H3.75A1.75 1.75 0 0 1 2 19.254V14.75c0-.966.784-1.75 1.75-1.75zm5.751 1.896v5.354a.75.75 0 0 1-1.494.102l-.007-.102v-5.343a3 3 0 0 0 1.501-.011m-.75-4.804a1.908 1.908 0 1 1 0 3.816a1.908 1.908 0 0 1 0-3.816m-5.005-7.095c.967 0 1.75.784 1.75 1.75V9.25a1.75 1.75 0 0 1-1.75 1.75h-11.5a1.75 1.75 0 0 1-1.75-1.75V4.747a1.75 1.75 0 0 1 1.607-1.744l.143-.006zM20.251 3a.75.75 0 0 1 .743.649l.007.101v5.346a3 3 0 0 0-1.5-.01V3.75a.75.75 0 0 1 .75-.75"
        fill="currentColor"
      />
    </svg>
  );
}

export function DrawIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg height={48} viewBox="0 0 24 24" width={48} xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M9.75 20.85c1.78-.7 1.39-2.63.49-3.85c-.89-1.25-2.12-2.11-3.36-2.94A9.8 9.8 0 0 1 4.54 12c-.28-.33-.85-.94-.27-1.06c.59-.12 1.61.46 2.13.68c.91.38 1.81.82 2.65 1.34l1.01-1.7C8.5 10.23 6.5 9.32 4.64 9.05c-1.06-.16-2.18.06-2.54 1.21c-.32.99.19 1.99.77 2.77c1.37 1.83 3.5 2.71 5.09 4.29c.34.33.75.72.95 1.18c.21.44.16.47-.31.47c-1.24 0-2.79-.97-3.8-1.61l-1.01 1.7c1.53.94 4.09 2.41 5.96 1.79m11.09-15.6c.22-.22.22-.58 0-.79l-1.3-1.3a.56.56 0 0 0-.78 0l-1.02 1.02l2.08 2.08M11 10.92V13h2.08l6.15-6.15l-2.08-2.08z"
        fill="currentColor"
      />
    </svg>
  );
}

export function ApplyIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg height={48} viewBox="0 0 24 24" width={48} xmlns="http://www.w3.org/2000/svg" {...props}>
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
    <svg height={48} viewBox="0 0 24 24" width={48} xmlns="http://www.w3.org/2000/svg" {...props}>
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}>
        <path d="M16.24 3.5h-8.5a5 5 0 0 0-5 5v7a5 5 0 0 0 5 5h8.5a5 5 0 0 0 5-5v-7a5 5 0 0 0-5-5" />
        <path d="m2.99 17l2.75-3.2a2.2 2.2 0 0 1 2.77-.27a2.2 2.2 0 0 0 2.77-.27l2.33-2.33a4 4 0 0 1 5.16-.43l2.49 1.93M7.99 10.17a1.66 1.66 0 1 0 0-3.32a1.66 1.66 0 0 0 0 3.32" />
      </g>
    </svg>
  );
}

export function EraseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg height={48} viewBox="0 0 24 24" width={48} xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M14.952 3c-1.037 0-1.872.835-3.542 2.505l-4.91 4.91l7.085 7.085l4.91-4.91C20.165 10.92 21 10.085 21 9.048c0-1.038-.835-1.873-2.505-3.543C16.825 3.835 15.99 3 14.952 3"
        fill="currentColor"
        opacity={0.5}
      />
      <path
        d="M13.585 17.5L6.5 10.415l-.995.995C3.835 13.08 3 13.915 3 14.952c0 1.038.835 1.873 2.505 3.543C7.175 20.165 8.01 21 9.048 21c1.037 0 1.872-.835 3.542-2.505z"
        fill="currentColor"
      />
      <path d="M9.033 21H9zm.03 0c.796-.006 1.476-.506 2.51-1.5H21a.75.75 0 0 1 0 1.5z" fill="currentColor" opacity={0.5} />
    </svg>
  );
}

export function SelectCanvasItemIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg height={48} viewBox="0 0 24 24" width={48} xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M20 9a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v1H9V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h1v6H4a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-1h6v1a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-1V9zm-3-4h2v2h-2zM5 5h2v2H5zm2 14H5v-2h2zm12 0h-2v-2h2zm-2-4h-1a1 1 0 0 0-1 1v1H9v-1a1 1 0 0 0-1-1H7V9h1a1 1 0 0 0 1-1V7h6v1a1 1 0 0 0 1 1h1z"
        fill="currentColor"
      />
    </svg>
  );
}

export function BackIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg height={48} viewBox="0 0 24 24" width={48} xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="m4 10l-.707.707L2.586 10l.707-.707zm17 8a1 1 0 1 1-2 0zM8.293 15.707l-5-5l1.414-1.414l5 5zm-5-6.414l5-5l1.414 1.414l-5 5zM4 9h10v2H4zm17 7v2h-2v-2zm-7-7a7 7 0 0 1 7 7h-2a5 5 0 0 0-5-5z"
        fill="currentColor"
      />
    </svg>
  );
}

export function ForwardIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg height={48} viewBox="0 0 24 24" width={48} xmlns="http://www.w3.org/2000/svg" {...props}>
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
        <path d="m15 17l5-5l-5-5" />
        <path d="M4 18v-2a4 4 0 0 1 4-4h12" />
      </g>
    </svg>
  );
}

export function LineIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg height={48} viewBox="0 0 20 20" width={48} xmlns="http://www.w3.org/2000/svg" {...props}>
      <path clipRule="evenodd" d="M.5 10a.5.5 0 0 1 .5-.5h18a.5.5 0 0 1 0 1H1a.5.5 0 0 1-.5-.5" fill="currentColor" fillRule="evenodd" />
    </svg>
  );
}

export function UploadImageIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg height={48} viewBox="0 0 24 24" width={48} xmlns="http://www.w3.org/2000/svg" {...props}>
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth={1.5}>
        <path d="M21.25 13V8.5a5 5 0 0 0-5-5h-8.5a5 5 0 0 0-5 5v7a5 5 0 0 0 5 5h6.26" strokeLinejoin="round" />
        <path
          d="m3.01 17l2.74-3.2a2.2 2.2 0 0 1 2.77-.27a2.2 2.2 0 0 0 2.77-.27l2.33-2.33a4 4 0 0 1 5.16-.43l2.47 1.91M8.01 10.17a1.66 1.66 0 1 0-.02-3.32a1.66 1.66 0 0 0 .02 3.32"
          strokeLinejoin="round"
        />
        <path d="M18.707 15v5" strokeMiterlimit={10} />
        <path d="m21 17.105l-1.967-1.967a.458.458 0 0 0-.652 0l-1.967 1.967" strokeLinejoin="round" />
      </g>
    </svg>
  );
}

export function CreditsIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg height={48} viewBox="0 0 24 24" width={48} xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M12.005 4.003c6.075 0 11 2.686 11 6v4c0 3.314-4.925 6-11 6c-5.967 0-10.824-2.591-10.995-5.823l-.005-.177v-4c0-3.314 4.925-6 11-6m0 12c-3.72 0-7.01-1.008-9-2.55v.55c0 1.882 3.883 4 9 4c5.01 0 8.838-2.03 8.995-3.882l.005-.118l.001-.55c-1.99 1.542-5.28 2.55-9.001 2.55m0-10c-5.117 0-9 2.118-9 4c0 1.882 3.883 4 9 4s9-2.118 9-4c0-1.882-3.883-4-9-4"
        fill="currentColor"
      />
    </svg>
  );
}

export function CloseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg height={48} viewBox="0 0 24 24" width={48} xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M18.3 5.71a.996.996 0 0 0-1.41 0L12 10.59L7.11 5.7A.996.996 0 1 0 5.7 7.11L10.59 12L5.7 16.89a.996.996 0 1 0 1.41 1.41L12 13.41l4.89 4.89a.996.996 0 1 0 1.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4"
        fill="currentColor"
      />
    </svg>
  );
}

export function AddImageIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg height={48} viewBox="0 0 24 24" width={48} xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M23 4v2h-3v3h-2V6h-3V4h3V1h2v3zm-8.5 7a1.5 1.5 0 1 0-.001-3.001A1.5 1.5 0 0 0 14.5 11m3.5 3.234l-.513-.57a2 2 0 0 0-2.976 0l-.656.731L9 9l-3 3.333V6h7V4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7h-2z"
        fill="currentColor"
      />
    </svg>
  );
}

export function ProcessImageIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg height={48} viewBox="0 0 14 14" width={48} xmlns="http://www.w3.org/2000/svg" {...props}>
      <g fill="none">
        <path
          d="M7.391 10.677c-.35-.061-.35-.565 0-.626a3.176 3.176 0 0 0 2.556-2.437l.024-.11c.076-.347.57-.349.649-.003l.03.133a3.192 3.192 0 0 0 2.56 2.415c.353.062.353.568 0 .63a3.193 3.193 0 0 0-2.565 2.435l-.025.112c-.08.347-.573.344-.65-.002l-.02-.097a3.176 3.176 0 0 0-2.559-2.45"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7.391 10.677c-.35-.061-.35-.565 0-.626a3.176 3.176 0 0 0 2.556-2.437l.024-.11c.076-.347.57-.349.649-.003l.03.133a3.192 3.192 0 0 0 2.56 2.415c.353.062.353.568 0 .63a3.193 3.193 0 0 0-2.565 2.435l-.025.112c-.08.347-.573.344-.65-.002l-.02-.097a3.176 3.176 0 0 0-2.559-2.45"
          fill="currentColor"
        />
        <path
          clipRule="evenodd"
          d="M.025 8.798c0 .944.765 1.708 1.708 1.708h3.65a2.113 2.113 0 0 1 .479-1.5H1.775a.25.25 0 0 1-.25-.25V5.84l.203-.036a5.25 5.25 0 0 1 5.12 2.008l.368.487a1.423 1.423 0 0 0 1.022-1.065l.023-.104c.295-1.345 1.593-1.863 2.656-1.548V1.723c0-.943-.765-1.708-1.708-1.708H1.733C.79.015.025.78.025 1.723zm7.857-4.265a1.371 1.371 0 1 0 0-2.742a1.371 1.371 0 0 0 0 2.742"
          fill="currentColor"
          fillRule="evenodd"
        />
      </g>
    </svg>
  );
}

export function DownloadImageIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg height={48} viewBox="0 0 24 24" width={48} xmlns="http://www.w3.org/2000/svg" {...props}>
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth={1.5}>
        <path d="M21.25 13V8.5a5 5 0 0 0-5-5h-8.5a5 5 0 0 0-5 5v7a5 5 0 0 0 5 5h6.26" strokeLinejoin="round" />
        <path
          d="m3.01 17l2.74-3.2a2.2 2.2 0 0 1 2.77-.27a2.2 2.2 0 0 0 2.77-.27l2.33-2.33a4 4 0 0 1 5.16-.43l2.47 1.91M8.01 10.17a1.66 1.66 0 1 0-.02-3.32a1.66 1.66 0 0 0 .02 3.32"
          strokeLinejoin="round"
        />
        <path d="M18.707 20v-5" strokeMiterlimit={10} />
        <path d="m16.414 17.895l1.967 1.967a.459.459 0 0 0 .652 0L21 17.895" strokeLinejoin="round" />
      </g>
    </svg>
  );
}

export function GeneratePhotoIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg height={48} viewBox="0 0 14 14" width={48} xmlns="http://www.w3.org/2000/svg" {...props}>
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <path d="M.576 6.733a6.538 6.538 0 0 1 1.164-.104c1.58 0 3.027.563 4.154 1.5" />
        <path d="M5.076 10.629h-3.5a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3.5" />
        <path d="M6.326 5.629a1.25 1.25 0 1 0 0-2.5a1.25 1.25 0 0 0 0 2.5m1.014 4.934c-.351-.061-.351-.565 0-.626a3.176 3.176 0 0 0 2.558-2.45l.021-.097c.076-.347.57-.349.649-.003l.026.113a3.193 3.193 0 0 0 2.565 2.435c.353.062.353.568 0 .63A3.192 3.192 0 0 0 10.594 13l-.026.113c-.079.346-.573.344-.649-.003l-.021-.097a3.176 3.176 0 0 0-2.558-2.45" />
      </g>
    </svg>
  );
}

export function DownloadIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg height={48} viewBox="0 0 24 24" width={48} xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="m12 15.577l-3.539-3.538l.708-.72L11.5 13.65V5h1v8.65l2.33-2.33l.709.719zM5 19v-4.038h1V18h12v-3.038h1V19z" fill="currentColor" />
    </svg>
  );
}

export function GoogleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg height={48} viewBox="0 0 128 128" width={48} xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M44.59 4.21a63.28 63.28 0 0 0 4.33 120.9a67.6 67.6 0 0 0 32.36.35a57.13 57.13 0 0 0 25.9-13.46a57.44 57.44 0 0 0 16-26.26a74.3 74.3 0 0 0 1.61-33.58H65.27v24.69h34.47a29.72 29.72 0 0 1-12.66 19.52a36.2 36.2 0 0 1-13.93 5.5a41.3 41.3 0 0 1-15.1 0A37.2 37.2 0 0 1 44 95.74a39.3 39.3 0 0 1-14.5-19.42a38.3 38.3 0 0 1 0-24.63a39.25 39.25 0 0 1 9.18-14.91A37.17 37.17 0 0 1 76.13 27a34.3 34.3 0 0 1 13.64 8q5.83-5.8 11.64-11.63c2-2.09 4.18-4.08 6.15-6.22A61.2 61.2 0 0 0 87.2 4.59a64 64 0 0 0-42.61-.38"
        fill="#fff"
      />
      <path
        d="M44.59 4.21a64 64 0 0 1 42.61.37a61.2 61.2 0 0 1 20.35 12.62c-2 2.14-4.11 4.14-6.15 6.22Q95.58 29.23 89.77 35a34.3 34.3 0 0 0-13.64-8a37.17 37.17 0 0 0-37.46 9.74a39.25 39.25 0 0 0-9.18 14.91L8.76 35.6A63.53 63.53 0 0 1 44.59 4.21"
        fill="#e33629"
      />
      <path d="M3.26 51.5a63 63 0 0 1 5.5-15.9l20.73 16.09a38.3 38.3 0 0 0 0 24.63q-10.36 8-20.73 16.08a63.33 63.33 0 0 1-5.5-40.9" fill="#f8bd00" />
      <path
        d="M65.27 52.15h59.52a74.3 74.3 0 0 1-1.61 33.58a57.44 57.44 0 0 1-16 26.26c-6.69-5.22-13.41-10.4-20.1-15.62a29.72 29.72 0 0 0 12.66-19.54H65.27c-.01-8.22 0-16.45 0-24.68"
        fill="#587dbd"
      />
      <path
        d="M8.75 92.4q10.37-8 20.73-16.08A39.3 39.3 0 0 0 44 95.74a37.2 37.2 0 0 0 14.08 6.08a41.3 41.3 0 0 0 15.1 0a36.2 36.2 0 0 0 13.93-5.5c6.69 5.22 13.41 10.4 20.1 15.62a57.13 57.13 0 0 1-25.9 13.47a67.6 67.6 0 0 1-32.36-.35a63 63 0 0 1-23-11.59A63.7 63.7 0 0 1 8.75 92.4"
        fill="#319f43"
      />
    </svg>
  );
}

export function ReloadIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg height={48} viewBox="0 0 512 512" width={48} xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="m400 148l-21.12-24.57A191.43 191.43 0 0 0 240 64C134 64 48 150 48 256s86 192 192 192a192.09 192.09 0 0 0 181.07-128"
        fill="none"
        stroke="currentColor"
        strokeLinecap="square"
        strokeMiterlimit={10}
        strokeWidth={32}
      />
      <path d="M464 68.45V220a4 4 0 0 1-4 4H308.45a4 4 0 0 1-2.83-6.83L457.17 65.62a4 4 0 0 1 6.83 2.83" fill="currentColor" />
    </svg>
  );
}

export function WarningExclamation(props: SVGProps<SVGSVGElement>) {
  return (
    <svg height={48} viewBox="0 0 48 48" width={48} xmlns="http://www.w3.org/2000/svg" {...props}>
      <path clipRule="evenodd" d="M24 10a2 2 0 0 1 2 2v18a2 2 0 1 1-4 0V12a2 2 0 0 1 2-2m0 28a2 2 0 1 0 0-4a2 2 0 0 0 0 4" fill="currentColor" fillRule="evenodd" />
    </svg>
  );
}

export function EditIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg height={48} viewBox="0 0 24 24" width={48} xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75zM21.41 6.34l-3.75-3.75l-2.53 2.54l3.75 3.75z" fill="currentColor" />
    </svg>
  );
}

export function CompareImageIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg height={48} viewBox="0 0 24 24" width={48} xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        clipRule="evenodd"
        d="M13 2a1 1 0 1 0-2 0v1H6a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h5v1a1 1 0 0 0 2 0v-1a1 1 0 0 0 0-2V5a1 1 0 1 0 0-2zm4 1a1 1 0 1 0 0 2h1a1 1 0 0 1 1 1v1a1 1 0 1 0 2 0V6a3 3 0 0 0-3-3zm4 8a1 1 0 1 0-2 0v2a1 1 0 0 0 2 0zm0 6a1 1 0 1 0-2 0v1a1 1 0 0 1-1 1h-1a1 1 0 1 0 0 2h1a3 3 0 0 0 3-3z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
}
