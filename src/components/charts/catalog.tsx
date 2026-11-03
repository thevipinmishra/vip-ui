import type { ReactNode } from "react";
import { ChartAnnotations } from "./examples/chart-annotations";
import { ChartAreaDefault } from "./examples/chart-area-default";
import { ChartAreaExpanded } from "./examples/chart-area-expanded";
import { ChartAreaHorizontal } from "./examples/chart-area-horizontal";
import { ChartAreaInteractive } from "./examples/chart-area-interactive";
import { ChartAreaRange } from "./examples/chart-area-range";
import { ChartAreaStacked } from "./examples/chart-area-stacked";
import { ChartBarDefault } from "./examples/chart-bar-default";
import { ChartBarHorizontal } from "./examples/chart-bar-horizontal";
import { ChartBarInteractive } from "./examples/chart-bar-interactive";
import { ChartBarMultiple } from "./examples/chart-bar-multiple";
import { ChartBarNegative } from "./examples/chart-bar-negative";
import { ChartBarRank } from "./examples/chart-bar-rank";
import { ChartBarStacked } from "./examples/chart-bar-stacked";
import { ChartBeeswarm } from "./examples/chart-beeswarm";
import { ChartBollinger } from "./examples/chart-bollinger";
import { ChartBoxPlot } from "./examples/chart-box-plot";
import { ChartBrush } from "./examples/chart-brush";
import { ChartCandlestick } from "./examples/chart-candlestick";
import { ChartColorLegend } from "./examples/chart-color-legend";
import { ChartCrosshair } from "./examples/chart-crosshair";
import { ChartDensity } from "./examples/chart-density";
import { ChartEcdf } from "./examples/chart-ecdf";
import { ChartErrorBars } from "./examples/chart-error-bars";
import { ChartFacet } from "./examples/chart-facet";
import { ChartForce } from "./examples/chart-force";
import { ChartFunnel } from "./examples/chart-funnel";
import { ChartGeo } from "./examples/chart-geo";
import { ChartHeatmapBinxy } from "./examples/chart-heatmap-binxy";
import { ChartHeatmapCalendar } from "./examples/chart-heatmap-calendar";
import { ChartHeatmapMatrix } from "./examples/chart-heatmap-matrix";
import { ChartHexbin } from "./examples/chart-hexbin";
import { ChartHistogram } from "./examples/chart-histogram";
import { ChartLineDefault } from "./examples/chart-line-default";
import { ChartLineDifference } from "./examples/chart-line-difference";
import { ChartLineDots } from "./examples/chart-line-dots";
import { ChartLineInteractive } from "./examples/chart-line-interactive";
import { ChartLineMultiple } from "./examples/chart-line-multiple";
import { ChartLineStep } from "./examples/chart-line-step";
import { ChartMosaic } from "./examples/chart-mosaic";
import { ChartPieDefault } from "./examples/chart-pie-default";
import { ChartPieDonut } from "./examples/chart-pie-donut";
import { ChartPieRounded } from "./examples/chart-pie-rounded";
import { ChartRadarDefault } from "./examples/chart-radar-default";
import { ChartRadarDots } from "./examples/chart-radar-dots";
import { ChartRadarMultiple } from "./examples/chart-radar-multiple";
import { ChartRadialGauge } from "./examples/chart-radial-gauge";
import { ChartRadialProgress } from "./examples/chart-radial-progress";
import { ChartRadialRings } from "./examples/chart-radial-rings";
import { ChartRadialRose } from "./examples/chart-radial-rose";
import { ChartRidgeline } from "./examples/chart-ridgeline";
import { ChartSankey } from "./examples/chart-sankey";
import { ChartScatterBubble } from "./examples/chart-scatter-bubble";
import { ChartScatterCanvas } from "./examples/chart-scatter-canvas";
import { ChartScatterDefault } from "./examples/chart-scatter-default";
import { ChartScatterTrend } from "./examples/chart-scatter-trend";
import { ChartSelectionTable } from "./examples/chart-selection-table";
import { ChartStreamgraph } from "./examples/chart-streamgraph";
import { ChartSunburst } from "./examples/chart-sunburst";
import { ChartTooltip } from "./examples/chart-tooltip";
import { ChartTree } from "./examples/chart-tree";
import { ChartTreemap } from "./examples/chart-treemap";
import { ChartViolin } from "./examples/chart-violin";
import { ChartVoronoi } from "./examples/chart-voronoi";
import { ChartWaffle } from "./examples/chart-waffle";
import { ChartWaterfall } from "./examples/chart-waterfall";
import { ChartZoom } from "./examples/chart-zoom";

export interface ChartExample {
  file: string;
  name: string;
  preview: ReactNode;
}

export interface ChartCategory {
  slug: string;
  label: string;
  title: string;
  examples: ChartExample[];
}

export const chartCategories: ChartCategory[] = [
  {
    slug: "area",
    label: "Area",
    title: "Area charts",
    examples: [
      {
        file: "chart-area-default",
        name: "Area",
        preview: <ChartAreaDefault />,
      },
      {
        file: "chart-area-stacked",
        name: "Stacked area",
        preview: <ChartAreaStacked />,
      },
      {
        file: "chart-area-expanded",
        name: "100% stacked area",
        preview: <ChartAreaExpanded />,
      },
      {
        file: "chart-area-range",
        name: "Range area",
        preview: <ChartAreaRange />,
      },
      {
        file: "chart-area-interactive",
        name: "Interactive area",
        preview: <ChartAreaInteractive />,
      },
      {
        file: "chart-area-horizontal",
        name: "Horizontal area",
        preview: <ChartAreaHorizontal />,
      },
      {
        file: "chart-streamgraph",
        name: "Streamgraph",
        preview: <ChartStreamgraph />,
      },
    ],
  },
  {
    slug: "bar",
    label: "Bar",
    title: "Bar charts",
    examples: [
      { file: "chart-bar-default", name: "Bar", preview: <ChartBarDefault /> },
      {
        file: "chart-bar-horizontal",
        name: "Horizontal bar",
        preview: <ChartBarHorizontal />,
      },
      {
        file: "chart-bar-multiple",
        name: "Grouped bar",
        preview: <ChartBarMultiple />,
      },
      {
        file: "chart-bar-stacked",
        name: "Stacked bar",
        preview: <ChartBarStacked />,
      },
      {
        file: "chart-bar-negative",
        name: "Negative bar",
        preview: <ChartBarNegative />,
      },
      {
        file: "chart-bar-interactive",
        name: "Interactive bar",
        preview: <ChartBarInteractive />,
      },
      {
        file: "chart-bar-rank",
        name: "Ranked bar",
        preview: <ChartBarRank />,
      },
    ],
  },
  {
    slug: "line",
    label: "Line",
    title: "Line charts",
    examples: [
      {
        file: "chart-line-default",
        name: "Line",
        preview: <ChartLineDefault />,
      },
      {
        file: "chart-line-multiple",
        name: "Multiple lines",
        preview: <ChartLineMultiple />,
      },
      {
        file: "chart-line-dots",
        name: "Line with dots",
        preview: <ChartLineDots />,
      },
      {
        file: "chart-line-step",
        name: "Step line",
        preview: <ChartLineStep />,
      },
      {
        file: "chart-line-interactive",
        name: "Interactive line",
        preview: <ChartLineInteractive />,
      },
      {
        file: "chart-line-difference",
        name: "Difference",
        preview: <ChartLineDifference />,
      },
      {
        file: "chart-annotations",
        name: "Annotated line",
        preview: <ChartAnnotations />,
      },
    ],
  },
  {
    slug: "pie",
    label: "Pie",
    title: "Pie and donut charts",
    examples: [
      { file: "chart-pie-default", name: "Pie", preview: <ChartPieDefault /> },
      {
        file: "chart-pie-donut",
        name: "Donut with total",
        preview: <ChartPieDonut />,
      },
      {
        file: "chart-pie-rounded",
        name: "Rounded donut",
        preview: <ChartPieRounded />,
      },
    ],
  },
  {
    slug: "radar",
    label: "Radar",
    title: "Radar charts",
    examples: [
      {
        file: "chart-radar-default",
        name: "Radar",
        preview: <ChartRadarDefault />,
      },
      {
        file: "chart-radar-multiple",
        name: "Multiple radar",
        preview: <ChartRadarMultiple />,
      },
      {
        file: "chart-radar-dots",
        name: "Radar dots",
        preview: <ChartRadarDots />,
      },
    ],
  },
  {
    slug: "radial",
    label: "Radial",
    title: "Radial charts",
    examples: [
      {
        file: "chart-radial-progress",
        name: "Radial progress",
        preview: <ChartRadialProgress />,
      },
      {
        file: "chart-radial-rose",
        name: "Radial bars",
        preview: <ChartRadialRose />,
      },
      {
        file: "chart-radial-rings",
        name: "Radial rings",
        preview: <ChartRadialRings />,
      },
      {
        file: "chart-radial-gauge",
        name: "Gauge",
        preview: <ChartRadialGauge />,
      },
    ],
  },
  {
    slug: "scatter",
    label: "Scatter",
    title: "Scatter charts",
    examples: [
      {
        file: "chart-scatter-default",
        name: "Scatter",
        preview: <ChartScatterDefault />,
      },
      {
        file: "chart-scatter-bubble",
        name: "Bubble",
        preview: <ChartScatterBubble />,
      },
      {
        file: "chart-scatter-trend",
        name: "Scatter with trend",
        preview: <ChartScatterTrend />,
      },
      {
        file: "chart-scatter-canvas",
        name: "Canvas scatter",
        preview: <ChartScatterCanvas />,
      },
    ],
  },
  {
    slug: "distribution",
    label: "Distribution",
    title: "Distribution charts",
    examples: [
      {
        file: "chart-histogram",
        name: "Histogram",
        preview: <ChartHistogram />,
      },
      { file: "chart-box-plot", name: "Box plot", preview: <ChartBoxPlot /> },
      { file: "chart-beeswarm", name: "Beeswarm", preview: <ChartBeeswarm /> },
      {
        file: "chart-violin",
        name: "Violin",
        preview: <ChartViolin />,
      },
      {
        file: "chart-ridgeline",
        name: "Ridgeline",
        preview: <ChartRidgeline />,
      },
      {
        file: "chart-ecdf",
        name: "Cumulative distribution",
        preview: <ChartEcdf />,
      },
      {
        file: "chart-error-bars",
        name: "Error bars",
        preview: <ChartErrorBars />,
      },
    ],
  },
  {
    slug: "heatmap",
    label: "Heatmap",
    title: "Heatmaps",
    examples: [
      {
        file: "chart-heatmap-calendar",
        name: "Calendar heatmap",
        preview: <ChartHeatmapCalendar />,
      },
      {
        file: "chart-heatmap-matrix",
        name: "Heatmap matrix",
        preview: <ChartHeatmapMatrix />,
      },
      {
        file: "chart-heatmap-binxy",
        name: "Binned heatmap",
        preview: <ChartHeatmapBinxy />,
      },
    ],
  },
  {
    slug: "spatial",
    label: "Spatial",
    title: "Spatial charts",
    examples: [
      {
        file: "chart-hexbin",
        name: "Hexbin",
        preview: <ChartHexbin />,
      },
      {
        file: "chart-density",
        name: "Density contours",
        preview: <ChartDensity />,
      },
      {
        file: "chart-voronoi",
        name: "Voronoi",
        preview: <ChartVoronoi />,
      },
      {
        file: "chart-geo",
        name: "Floor plan",
        preview: <ChartGeo />,
      },
    ],
  },
  {
    slug: "composition",
    label: "Composition",
    title: "Composition charts",
    examples: [
      { file: "chart-treemap", name: "Treemap", preview: <ChartTreemap /> },
      { file: "chart-sunburst", name: "Sunburst", preview: <ChartSunburst /> },
      { file: "chart-waffle", name: "Waffle", preview: <ChartWaffle /> },
      {
        file: "chart-mosaic",
        name: "Mosaic",
        preview: <ChartMosaic />,
      },
      {
        file: "chart-facet",
        name: "Small multiples",
        preview: <ChartFacet />,
      },
    ],
  },
  {
    slug: "flow",
    label: "Flow",
    title: "Flow charts",
    examples: [
      { file: "chart-sankey", name: "Sankey", preview: <ChartSankey /> },
      { file: "chart-funnel", name: "Funnel", preview: <ChartFunnel /> },
      {
        file: "chart-tree",
        name: "Tree",
        preview: <ChartTree />,
      },
      {
        file: "chart-force",
        name: "Network",
        preview: <ChartForce />,
      },
    ],
  },
  {
    slug: "financial",
    label: "Financial",
    title: "Financial charts",
    examples: [
      {
        file: "chart-candlestick",
        name: "Candlestick",
        preview: <ChartCandlestick />,
      },
      {
        file: "chart-waterfall",
        name: "Waterfall",
        preview: <ChartWaterfall />,
      },
      {
        file: "chart-bollinger",
        name: "Bollinger bands",
        preview: <ChartBollinger />,
      },
    ],
  },
  {
    slug: "interactive",
    label: "Interactive",
    title: "Interactive charts",
    examples: [
      {
        file: "chart-crosshair",
        name: "Crosshair",
        preview: <ChartCrosshair />,
      },
      {
        file: "chart-zoom",
        name: "Zoom",
        preview: <ChartZoom />,
      },
      {
        file: "chart-brush",
        name: "Brush",
        preview: <ChartBrush />,
      },
      {
        file: "chart-selection-table",
        name: "Selection",
        preview: <ChartSelectionTable />,
      },
      {
        file: "chart-tooltip",
        name: "Custom tooltip",
        preview: <ChartTooltip />,
      },
      {
        file: "chart-color-legend",
        name: "Interactive legend",
        preview: <ChartColorLegend />,
      },
    ],
  },
];
