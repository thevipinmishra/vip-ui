import {
  InfoIcon,
  WarningDiamondIcon,
  WarningIcon,
} from "@phosphor-icons/react/ssr";
import { Message } from "@/components/ui/message";
import { Response, ResponseContent } from "@/components/ui/response";

const studio = "typography typography-studio";

const sampleCode =
  "focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-ring";

const installCommand = `pnpm dlx shadcn@latest add @vip-ui/button
pnpm dlx shadcn@latest add @vip-ui/dialog`;

const migrateCommand = `studio migrate --from 3.1
studio export --format v1`;

export function DocsSample() {
  return (
    <article className={studio}>
      <h1>Add components</h1>
      <p className="lead">
        Copy a component into your project and change it like your own code.
      </p>
      <p>
        Each component is one file in <code>components/vip-ui</code>. The CLI
        adds the file, the packages it imports, and the theme variables it
        reads.
      </p>
      <h2>Run the CLI</h2>
      <ol>
        <li>
          Open a terminal in the folder that has <code>components.json</code>.
        </li>
        <li>Run the command for each component.</li>
        <li>
          Import the component from <code>@/components/vip-ui</code>.
        </li>
      </ol>
      {/* biome-ignore lint/a11y/noNoninteractiveTabindex: the sample scrolls horizontally and needs a keyboard stop */}
      <pre tabIndex={0} className={sampleCode}>
        <code>{installCommand}</code>
      </pre>
      <div className="markdown-alert markdown-alert-note">
        <p className="markdown-alert-title">
          <InfoIcon aria-hidden="true" />
          Note
        </p>
        <p>The CLI does not change files that you edited.</p>
      </div>
      <h3>Options</h3>
      <table>
        <thead>
          <tr>
            <th scope="col">Flag</th>
            <th scope="col">Effect</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>--yes</code>
            </td>
            <td>Skips the confirmation prompt.</td>
          </tr>
          <tr>
            <td>
              <code>--overwrite</code>
            </td>
            <td>Replaces files that already exist.</td>
          </tr>
          <tr>
            <td>
              <code>--path</code>
            </td>
            <td>Writes the files to a different folder.</td>
          </tr>
        </tbody>
      </table>
    </article>
  );
}

export function ChatSample() {
  return (
    <div className="grid gap-6">
      <Message sender="You" side="outgoing">
        Why does the export fail after I rotate the API token?
      </Message>
      <Response status="complete">
        <ResponseContent>
          <div className={studio}>
            <p>
              The export job keeps the old token until it restarts. A rotated
              token is <strong>revoked at once</strong>, so the next request
              fails with <code>401</code>.
            </p>
            <p>Do these steps:</p>
            <ol>
              <li>
                Set the new token as <code>STUDIO_TOKEN</code>.
              </li>
              <li>Restart the export worker.</li>
              <li>Run the export again.</li>
            </ol>
            {/* biome-ignore lint/a11y/noNoninteractiveTabindex: the sample scrolls horizontally and needs a keyboard stop */}
            <pre tabIndex={0} className={sampleCode}>
              <code>studio export --project brand-refresh</code>
            </pre>
            <p>
              To stop this in the future, rotate tokens with a{" "}
              <a href="#grace-period">grace period</a> of one hour.
            </p>
          </div>
        </ResponseContent>
      </Response>
    </div>
  );
}

export function ArticleSample() {
  return (
    <article className={studio}>
      <h1>The quiet work of a type system</h1>
      <p className="lead">
        Good text styles disappear. Readers notice the words, not the spacing
        between them.
      </p>
      <p>
        Most interfaces show text in many places: help pages, release notes,
        chat answers, and empty states. Each place gets its own sizes and
        margins, and over time they drift apart. A shared type system keeps them
        in step.
      </p>
      <figure>
        <blockquote>
          <p>Typography exists to honor content.</p>
        </blockquote>
        <figcaption>
          Robert Bringhurst, <cite>The Elements of Typographic Style</cite>
        </figcaption>
      </figure>
      <h2>Three numbers</h2>
      <p>
        You can describe most of the rhythm of a page with three values.
        Headings, lists, and rules use multiples of them.
      </p>
      <dl>
        <dt>Size</dt>
        <dd>The size of the body text.</dd>
        <dt>Line height</dt>
        <dd>The space between the lines of a paragraph.</dd>
        <dt>Flow</dt>
        <dd>
          The space between blocks, such as paragraphs, lists, and images.
        </dd>
      </dl>
      <figure>
        {/* biome-ignore lint/performance/noImgElement: The sample shows plain HTML output. */}
        <img
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=675&fit=crop"
          alt="An open office with long desks and large windows"
          width={1200}
          height={675}
        />
        <figcaption>
          A studio where the team writes the release notes.
        </figcaption>
      </figure>
      <h2>What to check</h2>
      <ul>
        <li>
          Lines stay between <mark>60 and 75 characters</mark>.
        </li>
        <li>
          Headings sit closer to the text below them than to the text above.
        </li>
        <li>Code and tables use the same spacing as paragraphs.</li>
      </ul>
    </article>
  );
}

const exportTimes = [
  { project: "Marketing site", pages: "48", before: "4.2", after: "1.6" },
  { project: "Help center", pages: "320", before: "18.0", after: "6.1" },
  { project: "API reference", pages: "1,240", before: "71.4", after: "22.8" },
];

const roadmap = [
  { label: "Shared presets", done: true },
  { label: "Faster exports", done: true },
  { label: "Offline mode", done: false },
  { label: "Comments on exports", done: false },
];

export function ChangelogSample() {
  return (
    <article className={studio}>
      <h1>Studio 3.2</h1>
      <p className="lead">
        Shared presets, faster exports, and a shortcut for search.
      </p>
      <div className="markdown-alert markdown-alert-important">
        <p className="markdown-alert-title">
          <WarningDiamondIcon aria-hidden="true" />
          Important
        </p>
        <p>This release needs Node.js 20 or later.</p>
      </div>
      <h2>New features</h2>
      <ul>
        <li>
          <strong>Shared presets.</strong> Save a preset one time and use it in
          all projects.
        </li>
        <li>
          <strong>Quick search.</strong> Push{" "}
          <kbd>
            <kbd>Ctrl</kbd> + <kbd>K</kbd>
          </kbd>{" "}
          to search all pages and settings.
        </li>
        <li>
          <strong>Faster exports.</strong> Large projects export three times
          faster.
          <sup>
            <a
              href="#changelog-fn-1"
              id="changelog-fnref-1"
              data-footnote-ref
              aria-describedby="changelog-footnotes"
            >
              1
            </a>
          </sup>
        </li>
      </ul>
      <h2>Export times</h2>
      <table>
        <caption>Median time for one export, in seconds.</caption>
        <thead>
          <tr>
            <th scope="col">Project</th>
            <th scope="col" align="right">
              Pages
            </th>
            <th scope="col" align="right">
              3.1
            </th>
            <th scope="col" align="right">
              3.2
            </th>
          </tr>
        </thead>
        <tbody>
          {exportTimes.map((row) => (
            <tr key={row.project}>
              <td>{row.project}</td>
              <td align="right">{row.pages}</td>
              <td align="right">{row.before}</td>
              <td align="right">{row.after}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Breaking changes</h2>
      <div className="markdown-alert markdown-alert-warning">
        <p className="markdown-alert-title">
          <WarningIcon aria-hidden="true" />
          Warning
        </p>
        <p>
          The <code>--legacy</code> flag is removed. Use{" "}
          <code>--format v1</code> instead.
        </p>
      </div>
      <details>
        <summary>Update a project from 3.1</summary>
        <p>
          Back up <code>studio.config.json</code>, then run these commands in
          the project folder.
        </p>
        {/* biome-ignore lint/a11y/noNoninteractiveTabindex: the sample scrolls horizontally and needs a keyboard stop */}
        <pre tabIndex={0} className={sampleCode}>
          <code>{migrateCommand}</code>
        </pre>
      </details>
      <h2>Roadmap</h2>
      <ul className="contains-task-list">
        {roadmap.map((item, index) => (
          <li key={item.label} className="task-list-item">
            <input
              type="checkbox"
              defaultChecked={item.done}
              disabled
              aria-labelledby={`changelog-task-${index}`}
            />{" "}
            <span id={`changelog-task-${index}`}>{item.label}</span>
          </li>
        ))}
      </ul>
      <section data-footnotes className="footnotes">
        <h2 id="changelog-footnotes" className="sr-only">
          Footnotes
        </h2>
        <ol>
          <li id="changelog-fn-1">
            <p>
              Median of 20 exports of the API reference project.{" "}
              <a
                href="#changelog-fnref-1"
                data-footnote-backref
                aria-label="Back to reference 1"
              >
                ↩
              </a>
            </p>
          </li>
        </ol>
      </section>
    </article>
  );
}
