import Link from "next/link";
import { chartCategories } from "./catalog";

interface CoverageRow {
  label: string;
  files: readonly string[];
}

const coverage: readonly CoverageRow[] = [
  {
    label: "Lines, areas, and difference",
    files: [
      "chart-area-default",
      "chart-area-horizontal",
      "chart-line-difference",
    ],
  },
  {
    label: "Bars, bands, and rankings",
    files: ["chart-bar-default", "chart-bar-multiple", "chart-bar-rank"],
  },
  {
    label: "Distributions",
    files: [
      "chart-histogram",
      "chart-box-plot",
      "chart-beeswarm",
      "chart-violin",
      "chart-ridgeline",
      "chart-ecdf",
    ],
  },
  {
    label: "Spatial and geographic",
    files: [
      "chart-hexbin",
      "chart-density",
      "chart-contour",
      "chart-voronoi",
      "chart-geo",
    ],
  },
  {
    label: "Composition and hierarchy",
    files: [
      "chart-mosaic",
      "chart-streamgraph",
      "chart-treemap",
      "chart-sunburst",
      "chart-tree",
      "chart-force",
      "chart-sankey",
    ],
  },
  {
    label: "Intervals and financial",
    files: [
      "chart-error-bars",
      "chart-bollinger",
      "chart-candlestick",
      "chart-waterfall",
    ],
  },
  {
    label: "Polar and radial",
    files: ["chart-pie-default", "chart-radial-gauge", "chart-radar-default"],
  },
  {
    label: "Views and facets",
    files: ["chart-facet"],
  },
  {
    label: "Interaction and tooltips",
    files: [
      "chart-crosshair",
      "chart-zoom",
      "chart-brush",
      "chart-selection-table",
      "chart-tooltip",
      "chart-color-legend",
      "chart-scrubber",
      "chart-linked",
    ],
  },
  {
    label: "Annotations",
    files: ["chart-annotations"],
  },
  {
    label: "Rendering and export",
    files: ["chart-scatter-canvas", "chart-export"],
  },
  {
    label: "Scales and transforms",
    files: [
      "chart-crosshair",
      "chart-time-bins",
      "chart-bar-rank",
      "chart-ridgeline",
      "chart-ecdf",
      "chart-color-legend",
      "chart-mosaic",
      "chart-bollinger",
      "chart-heatmap-binxy",
      "chart-waterfall",
    ],
  },
];

export function ChartCoverage() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-2xl border-collapse text-left text-[13px] leading-6">
        <thead>
          <tr className="border-b border-border/70 text-xs text-muted-foreground">
            <th scope="col" className="w-56 py-2 pe-4 font-medium">
              Surface
            </th>
            <th scope="col" className="py-2 font-medium">
              Examples
            </th>
          </tr>
        </thead>
        <tbody>
          {coverage.map((row) => (
            <tr
              key={row.label}
              className="border-b border-border/50 align-top last:border-0"
            >
              <th scope="row" className="py-3 pe-4 font-medium">
                {row.label}
              </th>
              <td className="py-3">
                <ul className="flex flex-wrap gap-x-3 gap-y-1">
                  {row.files.map((file) => {
                    const category = chartCategories.find((item) =>
                      item.examples.some((example) => example.file === file),
                    );
                    const example = category?.examples.find(
                      (item) => item.file === file,
                    );
                    if (!category || !example) return null;
                    return (
                      <li key={file}>
                        <Link
                          href={`/charts?chart=${category.slug}#${file}`}
                          className="text-primary underline underline-offset-4"
                        >
                          {example.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
