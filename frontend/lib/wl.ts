'use client'
import { cva } from 'class-variance-authority'

type WlVariantsOptions = 'brand' | 'exampleBlue'

type WlVariants = {
  bg?: WlVariantsOptions
  text?: WlVariantsOptions
  hover?: WlVariantsOptions
  hoverOutline?: WlVariantsOptions
  bgOutline?: WlVariantsOptions
  border?: WlVariantsOptions
  focusVisibleRing?: WlVariantsOptions
  fill?: WlVariantsOptions
  groupDataActiveBg?: WlVariantsOptions
  groupDataActiveBg10?: WlVariantsOptions
  groupDataActiveText?: WlVariantsOptions
  bg10?: WlVariantsOptions
  bg15?: WlVariantsOptions
  hoverBg15?: WlVariantsOptions
  stroke?: WlVariantsOptions
  dataActiveText?: WlVariantsOptions
}

type Props = {
  className?: string
  variants?: WlVariants
}

function wlv({ className, variants }: Props) {
  const variantClasses = cva(className, {
    variants: {
      text: {
        none: '',
        brand: 'text-brand',
        exampleBlue: 'text-blue-500',
      },
      bg: {
        brand: 'bg-brand',
        exampleBlue: 'bg-blue-500',
        none: '',
      },
      bg10: {
        brand: 'bg-brand/10',
        exampleBlue: 'bg-blue-500/10',
        none: '',
      },
      bg15: {
        brand: 'bg-brand/15',
        exampleBlue: 'bg-blue-500/15',
        none: '',
      },
      hover: {
        none: '',
        brand: 'hover:bg-brand/80',
        exampleBlue: 'hover:bg-blue-500/80',
      },
      hoverOutline: {
        none: '',
        brand: 'hover:bg-brand/10 hover:border-brand',
        exampleBlue: 'hover:bg-blue-500/10 hover:border-blue-500',
      },
      hoverBg15: {
        none: '',
        brand: 'hover:bg-brand/15',
        exampleBlue: 'hover:bg-blue-500/15',
      },
      bgOutline: {
        none: '',
        brand: 'bg-brand/5',
        exampleBlue: 'bg-blue-500/5',
      },
      border: {
        none: '',
        brand: 'border-brand',
        exampleBlue: 'border-blue-500',
      },
      focusVisibleRing: {
        none: '',
        brand: 'focus-visible:ring-brand',
        exampleBlue: 'focus-visible:ring-blue-500',
      },
      fill: {
        none: '',
        brand: 'fill-brand',
        exampleBlue: 'fill-blue-500',
      },
      stroke: {
        none: '',
        brand: 'stroke-brand',
        exampleBlue: 'stroke-blue-500',
      },
      groupDataActiveBg: {
        none: '',
        brand: 'group-data-[active=true]:bg-brand',
        exampleBlue: 'group-data-[active=true]:bg-blue-500',
      },
      groupDataActiveBg10: {
        none: '',
        brand: 'group-data-[active=true]:bg-brand/10',
        exampleBlue: 'group-data-[active=true]:bg-blue-500/10',
      },
      dataActiveText: {
        none: '',
        brand:
          'data-[active=true]:text-brand data-[state=active]:text-brand data-[state=open]:text-brand',
        exampleBlue:
          'data-[active=true]:text-blue-500 data-[state=active]:text-blue-500 data-[state=open]:text-blue-500',
      },
      groupDataActiveText: {
        none: '',
        brand: 'group-data-[active=true]:text-brand',
        exampleBlue: 'group-data-[active=true]:text-blue-500',
      },
    },
    defaultVariants: {
      bg: 'none',
      text: 'none',
      hover: 'none',
      hoverOutline: 'none',
      bgOutline: 'none',
      border: 'none',
      fill: 'none',
      groupDataActiveBg: 'none',
      groupDataActiveBg10: 'none',
      groupDataActiveText: 'none',
      focusVisibleRing: 'none',
      bg10: 'none',
      bg15: 'none',
      hoverBg15: 'none',
      stroke: 'none',
      dataActiveText: 'none',
    },
  })

  return variantClasses({
    className,
    bg: variants?.bg,
    text: variants?.text,
    hover: variants?.hover,
    hoverOutline: variants?.hoverOutline,
    bgOutline: variants?.bgOutline,
    border: variants?.border,
    focusVisibleRing: variants?.focusVisibleRing,
    fill: variants?.fill,
    groupDataActiveBg: variants?.groupDataActiveBg,
    groupDataActiveBg10: variants?.groupDataActiveBg10,
    groupDataActiveText: variants?.groupDataActiveText,
    bg10: variants?.bg10,
    bg15: variants?.bg15,
    hoverBg15: variants?.hoverBg15,
    stroke: variants?.stroke,
    dataActiveText: variants?.dataActiveText,
  })
}

type VariantPropperties =
  | 'text'
  | 'bg'
  | 'hover'
  | 'hoverOutline'
  | 'bgOutline'
  | 'border'
  | 'focusVisibleRing'
  | 'fill'
  | 'stroke'
  | 'groupDataActiveBg'
  | 'groupDataActiveBg10'
  | 'groupDataActiveText'
  | 'bg10'
  | 'bg15'
  | 'hoverBg15'
  | 'dataActiveText'

type DomainVarianceProps = {
  className?: string
  uses?: VariantPropperties[]
}

export function wl({ className, uses = [] }: DomainVarianceProps) {
  const variantData: Map<string, WlVariantsOptions> = new Map()
  variantData.set('localhost:3001', 'brand')

  let url = ''

  if (typeof window !== 'undefined') {
    url = (window?.location?.origin)
      .replace('http://', '')
      .replace('https://', '')
  }

  const appliedVariant = variantData.get(url) || 'brand'
  const variants: { [key: string]: string } = {}

  uses.forEach((key) => {
    variants[key] = appliedVariant
  })

  return wlv({ className, variants })
}
