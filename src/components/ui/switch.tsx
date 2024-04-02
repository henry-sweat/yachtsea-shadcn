'use client';

import * as React from 'react';
import * as SwitchPrimitives from '@radix-ui/react-switch';

import { cn } from '@/lib/utils';

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      'peer flex flex-col relative items-center cursor-pointer aspect-7/10 rounded-md border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-muted-foreground data-[state=unchecked]:bg-input',
      className
    )}
    {...props}
    ref={ref}
  >
    {/* <SwitchPrimitives.Thumb
      className={cn(
        'pointer-events-none h-16 w-16 rounded-md bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-y-11 data-[state=unchecked]:translate-y-0'
      )}
      {...props}
    /> */}
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
