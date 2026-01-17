import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

function StatusDot({ color, label, tooltip }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="flex items-center gap-2 cursor-default">
          <span
            className={`h-2.5 w-2.5 rounded-full ${color}`}
          />
          <span className="text-sm font-medium">
            {label}
          </span>
        </div>
      </TooltipTrigger>

      {tooltip && (
        <TooltipContent side="top">
          {tooltip}
        </TooltipContent>
      )}
    </Tooltip>
  );
}

export default StatusDot;
