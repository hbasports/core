interface Props {
  footerText?: string | React.ReactNode;
  showLogo?: boolean;
  heading?: string;
}

export default function AuthContainer(props: React.PropsWithChildren<Props>) {
  return (
    <div className="bg-[hsl(0,0%,95%)] flex flex-col justify-center items-center min-h-screen">
      <div className="text-center text-[22px] font-semibold">
        {props.heading && <h2>{props.heading}</h2>}
      </div>

      <div className="w-min-screen w-full sm:max-w-md">
        <div className="w-full bg-white border border-[hsl(0,0%,90%)] sm:mx-2 rounded-md px-4 py-10 sm:px-10 mt-8">{props.children}</div>
        <div className="mt-8 text-center text-sm">{props.footerText}</div>
      </div>
    </div>
  );
}
