import { Fragment } from "react";
import { type ApiPart, showsPartHeadings } from "@/lib/component-api";

function unionMembers(type: string) {
  const members: string[] = [];
  let depth = 0;
  let start = 0;
  for (let index = 0; index < type.length; index++) {
    const char = type[index];
    if ("([{<".includes(char)) depth++;
    else if (")]}".includes(char) || (char === ">" && type[index - 1] !== "="))
      depth--;
    else if (char === "|" && depth === 0) {
      members.push(type.slice(start, index).trim());
      start = index + 1;
    }
  }
  members.push(type.slice(start).trim());
  return members;
}

function TypeSignature({ type }: { type: string }) {
  return unionMembers(type).map((member, index) => (
    <Fragment key={member}>
      {index > 0 && " | "}
      <span className={member.startsWith('"') ? "text-foreground" : undefined}>
        {member}
      </span>
    </Fragment>
  ));
}

export function ApiReference({
  parts,
  slug,
}: {
  parts: readonly ApiPart[];
  slug: string;
}) {
  const headings = showsPartHeadings(parts, slug);
  return (
    <div className="space-y-8">
      {parts.map((part) => (
        <div key={part.name}>
          {headings && (
            <h3 className="mb-3 font-mono text-sm font-semibold text-foreground">
              {part.name}
            </h3>
          )}
          {part.description && (
            <p className="mb-3 text-[13px] leading-5 text-muted-foreground">
              {part.description}
            </p>
          )}
          <dl className="divide-y divide-border/70 rounded-xl border border-border/70 bg-card/50">
            {part.props.map((prop) => (
              <div key={prop.name} className="px-4 py-3 sm:px-5">
                <dt className="font-mono text-[13px] leading-6 text-muted-foreground wrap-anywhere">
                  <span className="font-medium text-foreground">
                    {prop.name}
                  </span>
                  {": "}
                  <TypeSignature type={prop.type} />
                  {prop.default && (
                    <>
                      {" = "}
                      <span className="text-foreground">{prop.default}</span>
                    </>
                  )}
                  {prop.required && (
                    <span className="ms-2 inline-block rounded-sm bg-muted px-1.5 font-sans text-[11px] font-medium leading-5 text-muted-foreground">
                      Required
                    </span>
                  )}
                </dt>
                <dd className="mt-0.5 text-[13px] leading-5 text-muted-foreground">
                  {prop.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      ))}
    </div>
  );
}
