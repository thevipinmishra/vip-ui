import { Message } from "@/components/ui/message";
import { Response, ResponseContent } from "@/components/ui/response";

const studio = "typography typography-studio";

const installCommand = `pnpm dlx shadcn@latest add @vip-ui/button
pnpm dlx shadcn@latest add @vip-ui/dialog`;

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
      <pre>
        <code>{installCommand}</code>
      </pre>
      <div className="markdown-alert markdown-alert-note">
        <p className="markdown-alert-title">Note</p>
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
            <pre>
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
      <h2>Three numbers</h2>
      <p>
        You can describe most of the rhythm of a page with three values. The{" "}
        <em>size</em> sets the body text. The <em>line height</em> sets the
        space inside a paragraph. The <em>flow</em> sets the space between
        blocks. Headings, lists, and rules use multiples of these values.
      </p>
      <blockquote>
        <p>
          Typography exists to honor content. Change the content, and the rhythm
          should follow without new rules.
        </p>
      </blockquote>
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
        <li>Lines stay between 60 and 75 characters.</li>
        <li>
          Headings sit closer to the text below them than to the text above.
        </li>
        <li>Code and tables use the same spacing as paragraphs.</li>
      </ul>
      <hr />
      <p>
        Read the <a href="/components/typography">typography guide</a> to add
        these styles to your app.
      </p>
    </article>
  );
}
