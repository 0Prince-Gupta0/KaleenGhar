import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { Check, ChevronRight, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

const DropdownMenu = DropdownMenuPrimitive.Root;
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
const DropdownMenuGroup = DropdownMenuPrimitive.Group;
const DropdownMenuPortal = DropdownMenuPrimitive.Portal;
const DropdownMenuSub = DropdownMenuPrimitive.Sub;
const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

/* ================= SUB TRIGGER ================= */
const DropdownMenuSubTrigger = React.forwardRef(
  ({ className, inset, children, ...props }, ref) => (
    <DropdownMenuPrimitive.SubTrigger
      ref={ref}
      className={cn(
        `
        flex cursor-default select-none items-center
        rounded-md px-3 py-2 text-sm
        text-[#1F2933]
        outline-none
        transition-colors
        focus:bg-[#F5EFE6]
        data-[state=open]:bg-[#F5EFE6]
        `,
        inset && "pl-8",
        className
      )}
      {...props}
    >
      {children}
      <ChevronRight className="ml-auto h-4 w-4 text-[#6B7280]" />
    </DropdownMenuPrimitive.SubTrigger>
  )
);
DropdownMenuSubTrigger.displayName =
  DropdownMenuPrimitive.SubTrigger.displayName;

/* ================= SUB CONTENT ================= */
const DropdownMenuSubContent = React.forwardRef(
  ({ className, ...props }, ref) => (
    <DropdownMenuPrimitive.SubContent
      ref={ref}
      className={cn(
        `
        z-50 min-w-[10rem] overflow-hidden
        rounded-xl border border-[#E6DED1]
        bg-[#FFFCF7]
        p-1
        text-[#1F2933]
        shadow-xl
        transition-all duration-300

        data-[state=open]:animate-in
        data-[state=closed]:animate-out
        data-[state=open]:fade-in-0
        data-[state=closed]:fade-out-0
        data-[state=open]:zoom-in-95
        data-[state=closed]:zoom-out-95
        `,
        className
      )}
      {...props}
    />
  )
);
DropdownMenuSubContent.displayName =
  DropdownMenuPrimitive.SubContent.displayName;

/* ================= CONTENT ================= */
const DropdownMenuContent = React.forwardRef(
  ({ className, sideOffset = 6, ...props }, ref) => (
    <DropdownMenuPortal>
      <DropdownMenuPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        className={cn(
          `
          z-50 min-w-[12rem] overflow-hidden
          rounded-xl
          border border-[#E6DED1]
          bg-[#FFFCF7]
          p-1
          text-[#1F2933]
          shadow-xl
          transition-all duration-300

          data-[state=open]:animate-in
          data-[state=closed]:animate-out
          data-[state=open]:fade-in-0
          data-[state=closed]:fade-out-0
          data-[state=open]:zoom-in-95
          data-[state=closed]:zoom-out-95
          `,
          className
        )}
        {...props}
      />
    </DropdownMenuPortal>
  )
);
DropdownMenuContent.displayName =
  DropdownMenuPrimitive.Content.displayName;

/* ================= ITEM ================= */
const DropdownMenuItem = React.forwardRef(
  ({ className, inset, ...props }, ref) => (
    <DropdownMenuPrimitive.Item
      ref={ref}
      className={cn(
        `
        relative flex cursor-default select-none items-center
        rounded-md px-3 py-2 text-sm
        text-[#1F2933]
        outline-none
        transition-colors

        focus:bg-[#F5EFE6]
        focus:text-[#1F2933]
        data-[disabled]:pointer-events-none
        data-[disabled]:opacity-50
        `,
        inset && "pl-8",
        className
      )}
      {...props}
    />
  )
);
DropdownMenuItem.displayName =
  DropdownMenuPrimitive.Item.displayName;

/* ================= CHECKBOX ITEM ================= */
const DropdownMenuCheckboxItem = React.forwardRef(
  ({ className, children, checked, ...props }, ref) => (
    <DropdownMenuPrimitive.CheckboxItem
      ref={ref}
      checked={checked}
      className={cn(
        `
        relative flex cursor-default select-none items-center
        rounded-md py-2 pl-9 pr-3 text-sm
        text-[#1F2933]
        outline-none
        transition-colors

        focus:bg-[#F5EFE6]
        data-[disabled]:pointer-events-none
        data-[disabled]:opacity-50
        `,
        className
      )}
      {...props}
    >
      <span className="absolute left-3 flex h-4 w-4 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <Check className="h-4 w-4 text-[#C9A24D]" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  )
);
DropdownMenuCheckboxItem.displayName =
  DropdownMenuPrimitive.CheckboxItem.displayName;

/* ================= RADIO ITEM ================= */
const DropdownMenuRadioItem = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <DropdownMenuPrimitive.RadioItem
      ref={ref}
      className={cn(
        `
        relative flex cursor-default select-none items-center
        rounded-md py-2 pl-9 pr-3 text-sm
        text-[#1F2933]
        outline-none
        transition-colors

        focus:bg-[#F5EFE6]
        data-[disabled]:pointer-events-none
        data-[disabled]:opacity-50
        `,
        className
      )}
      {...props}
    >
      <span className="absolute left-3 flex h-4 w-4 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <Circle className="h-2.5 w-2.5 fill-[#C9A24D]" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  )
);
DropdownMenuRadioItem.displayName =
  DropdownMenuPrimitive.RadioItem.displayName;

/* ================= LABEL ================= */
const DropdownMenuLabel = React.forwardRef(
  ({ className, inset, ...props }, ref) => (
    <DropdownMenuPrimitive.Label
      ref={ref}
      className={cn(
        `
        px-3 py-2 text-xs font-semibold uppercase
        tracking-wider
        text-[#6B7280]
        `,
        inset && "pl-8",
        className
      )}
      {...props}
    />
  )
);
DropdownMenuLabel.displayName =
  DropdownMenuPrimitive.Label.displayName;

/* ================= SEPARATOR ================= */
const DropdownMenuSeparator = React.forwardRef(
  ({ className, ...props }, ref) => (
    <DropdownMenuPrimitive.Separator
      ref={ref}
      className={cn(
        "my-1 h-px bg-[#E6DED1]",
        className
      )}
      {...props}
    />
  )
);
DropdownMenuSeparator.displayName =
  DropdownMenuPrimitive.Separator.displayName;

/* ================= SHORTCUT ================= */
const DropdownMenuShortcut = ({ className, ...props }) => (
  <span
    className={cn(
      "ml-auto text-xs tracking-widest text-[#9CA3AF]",
      className
    )}
    {...props}
  />
);
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
};
