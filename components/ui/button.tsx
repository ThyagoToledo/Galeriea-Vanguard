import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '@/lib/utils';

type ButtonElement = HTMLButtonElement;

const buttonVariants = cva(
    'inline-flex items-center justify-center rounded-full text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 disabled:pointer-events-none disabled:opacity-50',
    {
        variants: {
            variant: {
                default: 'bg-primary-500 text-white hover:bg-primary-600 shadow-primary-500/30 shadow-lg',
                outline: 'border border-white/20 bg-transparent text-white hover:border-primary-500',
                ghost: 'text-white/80 hover:text-white'
            },
            size: {
                default: 'h-11 px-6',
                sm: 'h-9 px-4',
                lg: 'h-12 px-7 text-base'
            }
        },
        defaultVariants: {
            variant: 'default',
            size: 'default'
        }
    }
);

export interface ButtonProps extends React.ButtonHTMLAttributes<ButtonElement>, VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

const Button = React.forwardRef<ButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : 'button';
        return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
    }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
