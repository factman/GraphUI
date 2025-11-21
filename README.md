# Welcome to the GraphUI

[![NPM version][GraphUI-image]](https://github.com/factman/GraphUI#readme)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Ffactman%2FGraphUI.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Ffactman%2FGraphUI?ref=badge_shield)

[Website](https://factman.github.io/GraphUI/) |
[Installation](#installation) |
[Usage](#usage) |
[Live Demo](https://factman.github.io/GraphUI/docs/) |
[Options](#options) |
[Team](#team) |
[Sponsor](#sponsor)

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
npm install @factman/graph-ui
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

Option `elementId` is optional if you used the default `#id` `"graph"` read more about GraphUI [Options](#options)

## Live Demo

View
[Live Demo](https://factman.github.io/GraphUI/docs/)
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
      <td>data</td>
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
      <td>elementId</td>
      <td>"graph"</td>
      <td>{elementId: "graphId"}</td>
      <td>Element #id to plot the graph.</td>
    </tr>
    <tr>
      <td>height</td>
      <td>300</td>
      <td>{height: 300}</td>
      <td>Height of the graph in px.</td>
    </tr>
    <tr>
      <td>backgroundColor</td>
      <td>"#111111"</td>
      <td>{backgroundColor: "#111111"}</td>
      <td>Background color of the graph in as (<b>Hex</b>: "#111111" or <b>Color Name</b>: "darkblue" or <b>RGB|RGBA</b>: "rgba(0,0,0,0.5)").</td>
    </tr>
    <tr>
      <td>gridColor</td>
      <td>"rgba(255,255,255,0.1)"</td>
      <td>{gridColor: "rgba(255,255,255,0.1)"}</td>
      <td>Color for the grid lines in the graph.</td>
    </tr>
    <tr>
      <td>textColor</td>
      <td>"rgba(255,255,255,0.8)"</td>
      <td>{textColor: "rgba(255,255,255,0.8)"}</td>
      <td>Color for the texts in the graph.</td>
    </tr>
    <tr>
      <td>lineColor</td>
      <td>"rgb(255,255,255)"</td>
      <td>{lineColor: "rgb(255,255,255)"}</td>
      <td>Color for the plotted line in the graph.</td>
    </tr>
    <tr>
      <td>nodeColor</td>
      <td>{backgroundColor}</td>
      <td>{nodeColor: "black"}</td>
      <td>Color for each node on the plotted line in the graph.</td>
    </tr>
    <tr>
      <td>nodeStroke</td>
      <td>{lineColor}</td>
      <td>{nodeStroke: "white"}</td>
      <td>Stroke Color for each node on the plotted line in the graph.</td>
    </tr>
    <tr>
      <td>precision</td>
      <td>1</td>
      <td>{precision: 2}</td>
      <td>Number of decimals of each value plotted.</td>
    </tr>
    <tr>
      <td>prefix</td>
      <td>""</td>
      <td>{prefix: "$"}</td>
      <td>A string to prepends at the beginning of each value plotted.</td>
    </tr>
    <tr>
      <td>suffix</td>
      <td>""</td>
      <td>{suffix: "km/h"}</td>
      <td>A string to append at the end of each value plotted.</td>
    </tr>
    <tr>
      <td>horizontalGrids</td>
      <td>5</td>
      <td>{horizontalGrids: 10}</td>
      <td>Number of horizontal grid lines to display.</td>
    </tr>
    <tr>
      <td>showHorizontalGrids</td>
      <td>true</td>
      <td>{showHorizontalGrids: true}</td>
      <td>Show or hide horizontal grid lines on the graph.</td>
    </tr>
    <tr>
      <td>showVerticalGrids</td>
      <td>false</td>
      <td>{showVerticalGrids: true}</td>
      <td>Show or hide vertical grid lines on the graph.</td>
    </tr>
    <tr>
      <td>showYAxisLabel</td>
      <td>true</td>
      <td>{showYAxisLabel: true}</td>
      <td>Show or hide YAxis Labels on the graph.</td>
    </tr>
    <tr>
      <td>showXAxisLabel</td>
      <td>true</td>
      <td>{showXAxisLabel: true}</td>
      <td>Show or hide XAxis Labels on the graph.</td>
    </tr>
    <tr>
      <td>showInlineLabel</td>
      <td>false</td>
      <td>{showInlineLabel: true}</td>
      <td>Show or hide inline Labels on each node of the graph.</td>
    </tr>
    <tr>
      <td>inlineLabelColor</td>
      <td>{textColor}</td>
      <td>{inlineLabelColor: "gray"}</td>
      <td>Color of the inline Labels on each node of the graph.</td>
    </tr>
    <tr>
      <td>showInlineLabelValueOnly</td>
      <td>false</td>
      <td>{showInlineLabelValueOnly: true}</td>
      <td>Show or hide graph labels for inline Label values (<b>false</b> Label 1: $20.00 | <b>true</b> $20.00).</td>
    </tr>
    <tr>
      <td>enableOptionDropdown</td>
      <td>true</td>
      <td>{enableOptionDropdown: true}</td>
      <td>Enable or disable the graph option dropdown menu.</td>
    </tr>
    <tr>
      <td>dropdownOptions</td>
      <td>"ALL"</td>
      <td>
        <pre>{
  dropdownOptions: [
    "IMAGE | Download as PNG image",
    "JSON | Download as Json file",
    "CSV | Download as CSV file"
  ]
}</pre>
      </td>
      <td>Enable specific option in the dropdown menu by specifying it in an array of string (["IMAGE","JSON","CSV"]) the label after the pipe character (|) is optional.</td>
    </tr>
    <tr>
      <td>showTable</td>
      <td>true</td>
      <td>{showTable: true}</td>
      <td>Show or hide the graph table.</td>
    </tr>
    <tr>
      <td>tableBackgroundColor</td>
      <td>"white"</td>
      <td>{tableBackgroundColor: "white"}</td>
      <td>Background color for the graph table.</td>
    </tr>
    <tr>
      <td>tableTextColor</td>
      <td>"#444444"</td>
      <td>{tableTextColor: "#444444"}</td>
      <td>Text color for the graph table.</td>
    </tr>
  </tbody>
</table>

## License

<a href="https://app.fossa.com/projects/git%2Bgithub.com%2Ffactman%2FGraphUI?ref=badge_large">
  <img src="https://app.fossa.com/api/projects/git%2Bgithub.com%2Ffactman%2FGraphUI.svg?type=large" alt="licence" />
</a>


[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Ffactman%2FGraphUI.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Ffactman%2FGraphUI?ref=badge_large)

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
