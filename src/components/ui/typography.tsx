import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

/**
 * Typography Component Library
 * Implements monochromatic design system with Montserrat + Roboto fonts
 * WCAG AA compliant with proper contrast ratios (minimum 7:1)
 */

// ===== Heading Components =====

const h1Variants = cva(
  "font-heading font-bold tracking-tight scroll-m-20",
  {
    variants: {
      variant: {
        default: "text-foreground",
        muted: "text-muted-foreground",
        primary: "text-primary",
      },
      size: {
        default: "text-5xl md:text-6xl",
        sm: "text-4xl md:text-5xl",
        lg: "text-6xl md:text-7xl",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    }
  }
)

export interface H1Props
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof h1Variants> {}

const H1 = React.forwardRef<HTMLHeadingElement, H1Props>(
  ({ className, variant, size, ...props }, ref) => (
    <h1
      ref={ref}
      className={cn(h1Variants({ variant, size, className }))}
      {...props}
    />
  )
)
H1.displayName = "H1"

// ===== H2 =====

const h2Variants = cva(
  "font-heading font-semibold tracking-tight scroll-m-20",
  {
    variants: {
      variant: {
        default: "text-foreground",
        muted: "text-muted-foreground",
        primary: "text-primary",
      },
      size: {
        default: "text-4xl md:text-5xl",
        sm: "text-3xl md:text-4xl",
        lg: "text-5xl md:text-6xl",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    }
  }
)

export interface H2Props
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof h2Variants> {}

const H2 = React.forwardRef<HTMLHeadingElement, H2Props>(
  ({ className, variant, size, ...props }, ref) => (
    <h2
      ref={ref}
      className={cn(h2Variants({ variant, size, className }))}
      {...props}
    />
  )
)
H2.displayName = "H2"

// ===== H3 =====

const h3Variants = cva(
  "font-heading font-semibold tracking-tight scroll-m-20",
  {
    variants: {
      variant: {
        default: "text-foreground",
        muted: "text-muted-foreground",
        primary: "text-primary",
      },
      size: {
        default: "text-2xl md:text-3xl",
        sm: "text-xl md:text-2xl",
        lg: "text-3xl md:text-4xl",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    }
  }
)

export interface H3Props
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof h3Variants> {}

const H3 = React.forwardRef<HTMLHeadingElement, H3Props>(
  ({ className, variant, size, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn(h3Variants({ variant, size, className }))}
      {...props}
    />
  )
)
H3.displayName = "H3"

// ===== H4 =====

const h4Variants = cva(
  "font-heading font-medium tracking-tight scroll-m-20",
  {
    variants: {
      variant: {
        default: "text-foreground",
        muted: "text-muted-foreground",
        primary: "text-primary",
      },
      size: {
        default: "text-xl md:text-2xl",
        sm: "text-lg md:text-xl",
        lg: "text-2xl md:text-3xl",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    }
  }
)

export interface H4Props
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof h4Variants> {}

const H4 = React.forwardRef<HTMLHeadingElement, H4Props>(
  ({ className, variant, size, ...props }, ref) => (
    <h4
      ref={ref}
      className={cn(h4Variants({ variant, size, className }))}
      {...props}
    />
  )
)
H4.displayName = "H4"

// ===== H5 & H6 (Combined for brevity) =====

const h5Variants = cva(
  "font-heading font-medium tracking-tight scroll-m-20",
  {
    variants: {
      variant: {
        default: "text-foreground",
        muted: "text-muted-foreground",
        primary: "text-primary",
      },
    },
    defaultVariants: {
      variant: "default",
    }
  }
)

export interface H5Props
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof h5Variants> {}

const H5 = React.forwardRef<HTMLHeadingElement, H5Props>(
  ({ className, variant, ...props }, ref) => (
    <h5
      ref={ref}
      className={cn(h5Variants({ variant }), "text-lg md:text-xl", className)}
      {...props}
    />
  )
)
H5.displayName = "H5"

const H6 = React.forwardRef<HTMLHeadingElement, H5Props>(
  ({ className, variant, ...props }, ref) => (
    <h6
      ref={ref}
      className={cn(h5Variants({ variant }), "text-base md:text-lg", className)}
      {...props}
    />
  )
)
H6.displayName = "H6"

// ===== Body Text Components =====

const bodyVariants = cva(
  "font-body leading-relaxed",
  {
    variants: {
      variant: {
        default: "text-foreground",
        muted: "text-muted-foreground",
        primary: "text-primary",
        secondary: "text-secondary",
      },
      size: {
        default: "text-base",
        sm: "text-sm",
        lg: "text-lg",
      },
      weight: {
        normal: "font-normal",
        medium: "font-medium",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      weight: "normal",
    }
  }
)

export interface BodyProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof bodyVariants> {}

const Body = React.forwardRef<HTMLParagraphElement, BodyProps>(
  ({ className, variant, size, weight, ...props }, ref) => (
    <p
      ref={ref}
      className={cn(bodyVariants({ variant, size, weight, className }))}
      {...props}
    />
  )
)
Body.displayName = "Body"

// ===== Caption/Small Text =====

const captionVariants = cva(
  "font-body text-sm leading-normal",
  {
    variants: {
      variant: {
        default: "text-muted-foreground",
        muted: "text-muted-foreground/80",
        primary: "text-primary",
      },
    },
    defaultVariants: {
      variant: "default",
    }
  }
)

export interface CaptionProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof captionVariants> {}

const Caption = React.forwardRef<HTMLSpanElement, CaptionProps>(
  ({ className, variant, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(captionVariants({ variant, className }))}
      {...props}
    />
  )
)
Caption.displayName = "Caption"

// ===== Lead Text (Introductory paragraph) =====

const leadVariants = cva(
  "font-body text-lg md:text-xl leading-relaxed",
  {
    variants: {
      variant: {
        default: "text-muted-foreground",
        primary: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    }
  }
)

export interface LeadProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof leadVariants> {}

const Lead = React.forwardRef<HTMLParagraphElement, LeadProps>(
  ({ className, variant, ...props }, ref) => (
    <p
      ref={ref}
      className={cn(leadVariants({ variant, className }))}
      {...props}
    />
  )
)
Lead.displayName = "Lead"

// ===== Blockquote =====

const Blockquote = React.forwardRef<
  HTMLQuoteElement,
  React.HTMLAttributes<HTMLQuoteElement>
>(({ className, ...props }, ref) => (
  <blockquote
    ref={ref}
    className={cn(
      "mt-6 border-l-4 border-border pl-6 italic text-muted-foreground font-body",
      className
    )}
    {...props}
  />
))
Blockquote.displayName = "Blockquote"

// ===== Inline Code =====

const InlineCode = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
  <code
    ref={ref}
    className={cn(
      "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-medium text-foreground",
      className
    )}
    {...props}
  />
))
InlineCode.displayName = "InlineCode"

// ===== List Components =====

const List = React.forwardRef<
  HTMLUListElement,
  React.HTMLAttributes<HTMLUListElement>
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("my-6 ml-6 list-disc [&>li]:mt-2 font-body text-foreground", className)}
    {...props}
  />
))
List.displayName = "List"

const OrderedList = React.forwardRef<
  HTMLOListElement,
  React.HTMLAttributes<HTMLOListElement>
>(({ className, ...props }, ref) => (
  <ol
    ref={ref}
    className={cn("my-6 ml-6 list-decimal [&>li]:mt-2 font-body text-foreground", className)}
    {...props}
  />
))
OrderedList.displayName = "OrderedList"

const ListItem = React.forwardRef<
  HTMLLIElement,
  React.HTMLAttributes<HTMLLIElement>
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    className={cn("font-body text-base leading-relaxed", className)}
    {...props}
  />
))
ListItem.displayName = "ListItem"

// Export all components
export {
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  Body,
  Caption,
  Lead,
  Blockquote,
  InlineCode,
  List,
  OrderedList,
  ListItem,
}
