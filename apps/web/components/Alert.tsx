import { cva } from "class-variance-authority";
import { BadgeAlert, Info, TriangleAlert } from "lucide-react";

export const alertStyles = cva("rounded-[10px] p-3 px-4", {
  variants: {
    severity: {
      error: "bg-[#fee1e1] text-[#641717]",
      info: "bg-[#f1f7fe] text-[#0d1473]",
      warning: "bg-[#ffedd6] text-[#9b3412]",
      neutral: "border-[#e5e7eb] border text-default",
    },
  },
  defaultVariants: {
    severity: "error",
  },
});

interface AlertProps {
  severity?: "warning" | "error" | "info" | "neutral";
  message: string;
}

export const Alert = ({ severity = "error", message }: AlertProps) => {
  return (
    <div className={alertStyles({ severity })}>
      <div className="relative flex items-center md:flex-row">
        <div className="mr-2">
          {severity === "error" && <BadgeAlert width={20} />}
          {severity === "info" && <Info width={20} />}
          {severity === "warning" && <TriangleAlert width={20} />}
        </div>
        <div className="flex grow flex-col sm:flex-row">
          <h5 className="text-sm leading-5 ml-1 font-medium">{message}</h5>
        </div>
      </div>
    </div>
  );
};
