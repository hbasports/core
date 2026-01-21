import classNames from "classnames";
import React from "react";

interface SectionProps {
  children?: React.ReactNode;
  className?: string;
}

export function Section(props: SectionProps) {
  return (
    <section
      className={classNames(
        props.className,
        "shadow-lg rounded-lg border border-[hsl(0,0%,80%)] flex"
      )}
    >
      {props.children}
    </section>
  );
}

function CricketView() {
  return (
    <main className="flex flex-col min-h-screen h-full">
      <div className="h-full flex-1 p-4">
        <Section>
          <div className="flex w-full">
            <div className="flex-1">
              <div>
                <b>Dallas Cowboys</b>
                <small>8-6, Home 4-2, Away 4-4</small>
              </div>
            </div>
            <div className="py-4 px-6 group text-center">
              <div className="font-semibold">18 Jan</div>
              <div className="text-sm">8:30 AM</div>
            </div>
            <div className="flex-1">
              <b>Dallas Cowboys</b>
              <small>8-6, Home 4-2, Away 4-4</small>
            </div>
          </div>
        </Section>
      </div>
      <div className="bg-black text-white font-medium text-sm p-2 px-5 flex min-w-screen w-full">
        <span className="flex-1">Stumps: Australia lead by 201 runs</span>
      </div>
    </main>
  );
}

export default CricketView;
