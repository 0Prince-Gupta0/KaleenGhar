import * as React from "react";
import { cn } from "@/lib/utils";

/* ================= TABLE ================= */
const Table = React.forwardRef(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-x-auto rounded-xl border border-[#E6DED1] bg-[#FFFCF7]">
    <table
      ref={ref}
      className={cn(
        "w-full caption-bottom text-sm text-[#1F2933]",
        className
      )}
      {...props}
    />
  </div>
));
Table.displayName = "Table";

/* ================= HEADER ================= */
const TableHeader = React.forwardRef(({ className, ...props }, ref) => (
  <thead
    ref={ref}
    className={cn(
      "bg-[#F5EFD8] border-b border-[#E6DED1]",
      className
    )}
    {...props}
  />
));
TableHeader.displayName = "TableHeader";

/* ================= BODY ================= */
const TableBody = React.forwardRef(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn(
      "[&_tr:last-child]:border-0",
      className
    )}
    {...props}
  />
));
TableBody.displayName = "TableBody";

/* ================= FOOTER ================= */
const TableFooter = React.forwardRef(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      "border-t border-[#E6DED1] bg-[#FBF7F1] font-medium",
      className
    )}
    {...props}
  />
));
TableFooter.displayName = "TableFooter";

/* ================= ROW ================= */
const TableRow = React.forwardRef(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      `
      border-b border-[#E6DED1]/60
      transition-colors
      hover:bg-[#F5EFD8]/60
      data-[state=selected]:bg-[#F5EFD8]
      `,
      className
    )}
    {...props}
  />
));
TableRow.displayName = "TableRow";

/* ================= HEAD CELL ================= */
const TableHead = React.forwardRef(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      `
      h-14 px-6
      text-left align-middle
      text-xs font-semibold
      tracking-wide uppercase
      text-[#6B7280]
      [&:has([role=checkbox])]:pr-0
      `,
      className
    )}
    {...props}
  />
));
TableHead.displayName = "TableHead";

/* ================= CELL ================= */
const TableCell = React.forwardRef(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn(
      "px-6 py-4 align-middle text-sm [&:has([role=checkbox])]:pr-0",
      className
    )}
    {...props}
  />
));
TableCell.displayName = "TableCell";

/* ================= CAPTION ================= */
const TableCaption = React.forwardRef(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn(
      "mt-4 text-sm text-[#6B7280]",
      className
    )}
    {...props}
  />
));
TableCaption.displayName = "TableCaption";

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};
