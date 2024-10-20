type Props = {
  className?: string
}
function HomeIcon({ className }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="none"
      viewBox="0 0 16 16"
    >
      <g clipPath="url(#clip0_19_168)">
        <path
          className={className}
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M14.667 14.667v-8L8 1.333 1.333 6.667v8h4v-6h5.334v6h4z"
        ></path>
      </g>
      <defs>
        <clipPath id="clip0_19_168">
          <path fill="#fff" d="M0 0H16V16H0z"></path>
        </clipPath>
      </defs>
    </svg>
  )
}

export default HomeIcon
