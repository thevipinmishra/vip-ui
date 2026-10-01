import type { CSSProperties } from "react";
import { codeToTokensBase } from "shiki";

export type CodeLanguage = "tsx" | "css" | "bash";

export async function CodeSnippet({
  code,
  language = "tsx",
}: {
  code: string;
  language?: CodeLanguage;
}) {
  const [lightTokens, darkTokens] = await Promise.all([
    codeToTokensBase(code.trim(), {
      lang: language,
      theme: "github-light-default",
    }),
    codeToTokensBase(code.trim(), {
      lang: language,
      theme: "github-dark-default",
    }),
  ]);
  return (
    <div
      className="code-block min-w-0 text-code-foreground"
      data-language={language}
    >
      <pre className="shiki">
        <code>
          {lightTokens.map((line, lineIndex) => (
            <span
              className="line"
              key={`${lineIndex}-${line.map((token) => token.content).join("")}`}
            >
              {line.map((token, tokenIndex) => (
                <span
                  key={`${tokenIndex}-${token.content}`}
                  style={
                    {
                      "--code-token-light": token.color,
                      "--code-token-dark":
                        darkTokens[lineIndex]?.[tokenIndex]?.color ??
                        token.color,
                    } as CSSProperties
                  }
                >
                  {token.content}
                </span>
              ))}
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}
