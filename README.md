# GraphUI

[![NPM version][GraphUI-image]](https://github.com/factman/GraphUI#readme)

[Website](https://github.com/factman/GraphUI#readme) |
[Installation](https://github.com/factman/GraphUI#installation) |
[Usage](https://github.com/factman/GraphUI#usage) |
[Live Demo](https://github.com/factman/GraphUI#live-demo) |
[Options](https://github.com/factman/GraphUI#options) |
[Team](https://github.com/factman/GraphUI#team) |
[Sponsor](https://github.com/factman/GraphUI#sponsor)

GraphUI is a JavaScript extension for plotting graphs for any website project.

* Lightweight.
* Zero dependencies.
* Plot with SVG and not Canvas.
* No SVG knowledge is required for implementation.
* Designed for beauty.
* Responsive Design.
* Highly customizable.
* Easy implementation.

## Installation

There are two ways to download or install GraphUI in any website project.

### Download or Clone From GitHub

Download from Github:

[Download Zip File](https://github.com/factman/GraphUI/archive/master.zip)

Clone from Github:

```bash
git clone https://github.com/factman/GraphUI.git
```

### Install from NPM

Install from NPM:

```bash
npm install graph-ui
```

Note: use the CSS and JS files in the `dist` folder.

## Usage

Import the CSS stylesheet in the `<head>` section of your `<html>` document.

```html
<link rel="stylesheet" href="css/GraphUI.min.css" />
```

Import the JavaScript extension as the last child of the `<body>` tag.

```html
<script src="js/GraphUI.min.js"></script>
```

After that, create an empty `<div>` tag with an `#id` (default: `"graph"`) within the container where you need the graph to be plotted.

```html
<div class="container card">
    <div id="graph"></div>
</div>
```

Initialize GraphUI in a JavaScript file or within a `<script>` tag below GraphUI extension.

```html
<script src="https://cnd.com"></script>
<script>
  var data = {
    "Mon": [3,4,6],
    "Tue": [2,8,1],
    "Wed": [2,4,3],
    "Thu": [2,1,5],
    "Fri": [1,6,3],
    "Sat": [1,4,3],
    "Sun": [5,4,1],
  };

  new GraphUI({
    data: data,
    elementId: "graph"
  });
</script>
```

Option `elementId` is optional if you used the default `#id` `"graph"` read more about GraphUI [Options](https://github.com/factman/GraphUI#options)

## Live Demo

View
[Live Demo](https://github.com/factman/GraphUI#live-demo)
and examples.

## Options

<table>
  <thead>
    <tr>
      <th>Options</th>
      <th>Defaults</th>
      <th>Usage</th>
      <th>Descriptions</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>data</th>
      <td>
        {}<small>(required)</small>
      </td>
      <td>
        <pre>{
  "Label 1": [1,2,...],
  "Label 2": "1,2,...",
  "Label 3": 3,
  "Label 4": "3"
}</pre>
      </td>
      <td>
        Supply an object using the graph labels as the properties of the object in quotes "Label 1", and supply (<b>array</b> or <b>string</b> or <b>number</b>) as the value of each label.
      </td>
    </tr>
    <tr>
      <th>elementId</th>
      <td>"graph"</td>
      <td>{elementId: "graphId"}</td>
      <td>Element #id to plot the graph.</td>
    </tr>
    <tr>
      <th>height</th>
      <td>300</td>
      <td>{height: 300}</td>
      <td>Height of the graph in px.</td>
    </tr>
    <tr>
      <th>backgroundColor</th>
      <td>"#111111"</td>
      <td>{backgroundColor: "#111111"}</td>
      <td>Background color of the graph in as (<b>Hex</b>: "#111111" or <b>Color Name</b>: "darkblue" or <b>RGB|RGBA</b>: "rgba(0,0,0,0.5)").</td>
    </tr>
    <tr>
      <th>gridColor</th>
      <td>"rgba(255,255,255,0.1)"</td>
      <td>{gridColor: "rgba(255,255,255,0.1)"}</td>
      <td>Color for the grid lines in the graph.</td>
    </tr>
    <tr>
      <th>textColor</th>
      <td>"rgba(255,255,255,0.8)"</td>
      <td>{textColor: "rgba(255,255,255,0.8)"}</td>
      <td>Color for the texts in the graph.</td>
    </tr>
    <tr>
      <th>lineColor</th>
      <td>"rgb(255,255,255)"</td>
      <td>{lineColor: "rgb(255,255,255)"}</td>
      <td>Color for the plotted line in the graph.</td>
    </tr>
    <tr>
      <th>nodeColor</th>
      <td>{backgroundColor}</td>
      <td>{nodeColor: "black"}</td>
      <td>Color for each node on the plotted line in the graph.</td>
    </tr>
    <tr>
      <th>nodeStroke</th>
      <td>{lineColor}</td>
      <td>{nodeStroke: "white"}</td>
      <td>Stroke Color for each node on the plotted line in the graph.</td>
    </tr>
    <tr>
      <th>precision</th>
      <td>1</td>
      <td>{precision: 2}</td>
      <td>Number of decimals of each value plotted.</td>
    </tr>
    <tr>
      <th>prefix</th>
      <td>""</td>
      <td>{prefix: "$"}</td>
      <td>A string to prepends at the beginning of each value plotted.</td>
    </tr>
    <tr>
      <th>suffix</th>
      <td>""</td>
      <td>{suffix: "km/h"}</td>
      <td>A string to append at the end of each value plotted.</td>
    </tr>
    <tr>
      <th>horizontalGrids</th>
      <td>5</td>
      <td>{horizontalGrids: 10}</td>
      <td>Number of horizontal grid lines to display.</td>
    </tr>
    <tr>
      <th>showHorizontalGrids</th>
      <td>true</td>
      <td>{showHorizontalGrids: true}</td>
      <td>Show or hide horizontal grid lines on the graph.</td>
    </tr>
    <tr>
      <th>showVerticalGrids</th>
      <td>false</td>
      <td>{showVerticalGrids: true}</td>
      <td>Show or hide vertical grid lines on the graph.</td>
    </tr>
    <tr>
      <th>showYAxisLabel</th>
      <td>true</td>
      <td>{showYAxisLabel: true}</td>
      <td>Show or hide YAxis Labels on the graph.</td>
    </tr>
    <tr>
      <th>showXAxisLabel</th>
      <td>true</td>
      <td>{showXAxisLabel: true}</td>
      <td>Show or hide XAxis Labels on the graph.</td>
    </tr>
    <tr>
      <th>showInlineLabel</th>
      <td>false</td>
      <td>{showInlineLabel: true}</td>
      <td>Show or hide inline Labels on each node of the graph.</td>
    </tr>
    <tr>
      <th>inlineLabelColor</th>
      <td>{textColor}</td>
      <td>{inlineLabelColor: "gray"}</td>
      <td>Color of the inline Labels on each node of the graph.</td>
    </tr>
    <tr>
      <th>showInlineLabelValueOnly</th>
      <td>false</td>
      <td>{showInlineLabelValueOnly: true}</td>
      <td>Show or hide graph labels for inline Label values (<b>false</b> Label 1: $20.00 | <b>true</b> $20.00).</td>
    </tr>
    <tr>
      <th>enableOptionDropdown</th>
      <td>true</td>
      <td>{enableOptionDropdown: true}</td>
      <td>Enable or disable the graph option dropdown menu.</td>
    </tr>
    <tr>
      <th>dropdownOptions</th>
      <td>"ALL"</td>
      <td>
        <pre>{
  dropdownOptions: [
    "IMAGE | Download as PNG image",
    "JSON | Download as Json file",
    "CSV | Download as CSV file"
  ]
}
      </td>
      <td>Enable specific option in the dropdown menu by specifying it in an array of string (["IMAGE","JSON","CSV"]) the label after the pipe character (|) is optional.</td>
    </tr>
    <tr>
      <th>showTable</th>
      <td>true</td>
      <td>{showTable: true}</td>
      <td>Show or hide the graph table.</td>
    </tr>
    <tr>
      <th>tableBackgroundColor</th>
      <td>"white"</td>
      <td>{tableBackgroundColor: "white"}</td>
      <td>Background color for the graph table.</td>
    </tr>
    <tr>
      <th>tableTextColor</th>
      <td>"#444444"</td>
      <td>{tableTextColor: "#444444"}</td>
      <td>Text color for the graph table.</td>
    </tr>
  </tbody>
</table>

## License

MIT

## Team

These folks keep the project moving and are resources for help.

### Author

The guy who manage releases, review feature requests, and ensure GraphUI is properly maintained.

<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="11%">
        <a href="https://github.com/factman">
          <img src="https://avatars2.githubusercontent.com/u/11985531?s=460&v=4" alt="factman" width="75" height="75">
          <br />
          Mohammed Odunayo
        </a>
      </td>
    </tr>
  </tbody>
</table>

## Sponsor

The following company support GraphUI ongoing maintenance and development. [Become a Sponsor](mailto:factman60@gmail.com) to get your logo on our README and website.

<h3>Sponsor</h3>
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="11%">
        <a href="https://github.com/eTEAM-Technology/">
          <img src="https://avatars1.githubusercontent.com/u/34057414?s=200&v=4" alt="eTEAM Technology" height="96" />
          <br />
          E-Team Technology
        </a>
      </td>
    </tr>
  </tbody>
</table>

[GraphUI-image]: https://img.shields.io/badge/GraphUI-v1.0.0-blue.svg
