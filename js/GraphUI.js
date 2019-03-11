/**
 * Copyright: 2019 - GraphUI
 *
 * License: MIT
 *
 * long description for the file
 *
 * @summary short description for the file
 * @author Mohammed Odunayo <factman60@gmail.com>
 *
 * Created at     : 2019-03-10 23:12:28 
 * Last modified  : 2019-03-11 02:15:24
 */


!(function (root) {
  "use strict";

  /**
   * The utility class for GraphUI which contain static functions.
   * @class GraphUIUtilities
   */
  class GraphUIUtilities {

    /**
     * Generates a download link for files and perform a click function to start the file download.
     * @param {String} link Object URL from Window.URL.createObjectURL()
     * @param {String} name Filename.
     * @returns {void}
     */
    static downloadFile(link, name) {
      const downloadLink = document.createElement("a");
      downloadLink.download = name;
      downloadLink.href = link;
      downloadLink.innerHTML = name;
      downloadLink.target = "_blank";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      downloadLink.remove();
    }

    /**
     * Convert string of data into a file blob and return the object url of the blob.
     * @param {String} data String from a stream of data.
     * @param {String} mimeType File mime-type.
     * @returns {String}
     */
    static convertToObjectURL(data, mimeType) {
      window.URL = window.URL || window.webkitURL;
      const fileBlob = new Blob([data], { type: mimeType });
      return URL.createObjectURL(fileBlob);
    }

    /**
     * Generates tooltip DOM template and append it to the html document body tag.
     * @returns {void}
     */
    static renderToolTips() {
      if (document.getElementById("GraphUI-toolTips-con") === null) {
        const ele = document.createElement("div");
        ele.innerHTML = `
          <div id="GraphUI-toolTips-con">
            <p id="GraphUI-toolTips-head"></p>
            <p id="GraphUI-toolTips-text"></p>
          </div>
        `;
        document.body.appendChild(ele);
      }
    }

    /**
     * Increase numbers.
     * @param {Number} val Number to be increase.
     * @returns {Number}
     */
    static getIncrement(val) {
      let num = 1;

      if (val > 10) num = 1;
      if (val > 100) num = 10;
      if (val > 1000) num = 100;
      if (val > 10000) num = 1000;
      if (val > 100000) num = 10000;
      if (val > 1000000) num = 100000;
      if (val > 10000000) num = 1000000;

      return num;
    }

    /**
     * Decrease Numbers.
     * @param {Number} val Number to decrease.
     * @returns {Number}
     */
    static getDecrement(val) {
      let num = -1;

      if (val < -10) num = -1;
      if (val < -100) num = -10;
      if (val < -1000) num = -100;
      if (val < -10000) num = -1000;
      if (val < -100000) num = -10000;
      if (val < -1000000) num = -100000;
      if (val < -10000000) num = -1000000;

      return num;
    }

    /**
     * Add thousand separator (,) to string of numbers greater than or equals a thousand.
     * @param {String} val String of number to add the thousand separator.
     * @returns {String}
     */
    static thousandSeparator(val) {
      const values = val.split(".");
      const valLength = values[0].length;
      const a = (valLength / 3);
      let b = Math.floor(valLength / 3);

      if ((a >= 1 && a > b) || (a >= 1 && a === b)) {
        if (a === b) b -= 1;
        let end = valLength;
        let start = 0;
        let str = "";
        for (let x = 0; x < b; x += 1) {
          start = end - 3;
          str = `,${values[0].substring(start, end)}${str}`;
          end -= 3;
        }
        if (b > 0) values[0] = values[0].substring(0, start) + str;
      }

      return values.join(".");
    }

    /**
     * Increase the length of an array to the specified length.
     * @param {Array<Number>} val Array of integers to pad to equal length.
     * @param {Number} length New Length for the array.
     * @returns {Array<Number>}
     */
    static padArray(val, length) {
      if (typeof val === "object") {
        if (val.length < length) {
          const pad = length - val.length;
          for (let x = 1; x <= pad; x += 1) {
            val.push(0);
          }
        }
      } else if (typeof val === "number" || typeof val === "string") {
        return [val];
      }
      return val;
    }

    /**
     * Add all value of an array and return the sum
     * @param {Array<Number>} arr Array of integer to sum.
     * @returns {Number}
     */
    static sumArray(arr) {
      let sum = 0;
      arr.forEach((val) => {
        sum += val;
      });
      return sum;
    }

    /**
     * Get and return the length of the array with the greatest length.
     * @param {Array<Array>} arrs Array of arrays
     * @returns {Number}
     */
    static getMaxLength(arrs) {
      let length = 0;
      arrs.forEach((arr) => {
        if (typeof arr === "object") {
          if (length < arr.length) {
            length = arr.length;
          }
        }
      });
      return length;
    }

    /**
     * Parse the value of object and return a correctly formatted data.
     * @param {Object} data Object of data to parse.
     * @returns {Object}
     */
    static parseData(data) {
      const labels = Object.keys(data);
      const newData = {};

      labels.forEach((val) => {
        switch (typeof data[val]) {
        case "object":
          if (data[val].length !== undefined) {
            newData[val] = data[val];
          } else {
            newData[val] = [0];
          }
          break;
        case "number":
          newData[val] = [data[val]];
          break;
        case "string":
          if (data[val].includes(",")) {
            newData[val] = data[val].split(",").map(d => Number(d.trim()) || 0);
          } else {
            newData[val] = [Number(data[val]) || 0];
          }
          break;
        default:
          newData[val] = [Number(data[val]) || 0];
        }
      });

      const values = Object.values(newData);
      const length = GraphUIUtilities.getMaxLength(values);
      values.map(val => GraphUIUtilities.padArray(val, length));

      return newData;
    }

    /**
     * Display the tooltip element.
     * @param {MouseEvent} $ev Mouse event object.
     * @returns {void}
     */
    static showToolTips($ev) {
      if (this.timer) clearTimeout(this.timer);

      const label = $ev.target.getAttribute("data-label");
      const value = $ev.target.getAttribute("data-value");
      const type = $ev.target.getAttribute("data-type");
      const x = $ev.clientX;
      const y = $ev.clientY;

      const tipCon = document.getElementById("GraphUI-toolTips-con");
      document.getElementById("GraphUI-toolTips-head").innerHTML = label;
      document.getElementById("GraphUI-toolTips-text").innerHTML = type ? value : `Value: ${value}`;

      tipCon.style.top = `${y + -35}px`;
      tipCon.style.left = `${x + 25}px`;
      tipCon.style.opacity = "0.7";
    }

    /**
     * Hide the tooltip element.
     * @returns {void}
     */
    static hideToolTips() {
      this.timer = setTimeout(() => {
        const tipCon = document.getElementById("GraphUI-toolTips-con");
        tipCon.style.opacity = "0";
        tipCon.style.left = "-100px";
        document.getElementById("GraphUI-toolTips-head").innerHTML = "";
        document.getElementById("GraphUI-toolTips-text").innerHTML = "";
      }, 500);
    }

    /**
     * Get and return the greatest value of an array.
     * @param {Array<Number>} vals Array of numbers.
     * @returns {Number}
     */
    static getMaxValue(vals) {
      const values = Array.apply([], vals);
      values.sort((a, b) => a - b);
      const increment = GraphUIUtilities.getIncrement(values[values.length - 1]);
      return values[values.length - 1] + increment;
    }

    /**
     * Get and return the smallest value of an array.
     * @param {Array<Number>} vals Array of numbers.
     * @returns {Number}
     */
    static getMinValue(vals) {
      const values = Array.apply([], vals);
      values.sort((a, b) => a - b);
      const decrement = GraphUIUtilities.getDecrement(values[0]);
      return (values[0] < 0) ? values[0] + decrement : 0;
    }

    /**
     * Convert negative numbers to positive integers.
     * @param {Number} NegativeValue A negative number.
     * @returns {Number}
     */
    static toPositive(NegativeValue) {
      if (NegativeValue < 0) {
        const positiveString = NegativeValue.toString().replace("-", "");
        return Number(positiveString);
      }
      return NegativeValue;
    }

  }

  /**
   * The factory class for GraphUI which contain all the logic for plotting the graph.
   * @class GraphUIFactory
   */
  class GraphUIFactory {

    /**
     * GraphUIFactory constructor.
     * @param {Object} param0 Options object for plotting the graph.
     * @constructor
     */
    constructor({
      elementId, height, backgroundColor, gridColor, textColor, lineColor,
      nodeColor, nodeStroke, precision, prefix, suffix, data, horizontalGrids,
      showHorizontalGrids, showVerticalGrids, showYAxisLabel, showXAxisLabel,
      showInlineLabel, inlineLabelColor, showInlineLabelValueOnly, enableLiveEdit,
      enableOptionDropdown, dropdownOptions, showTable, tableBackgroundColor, tableTextColor
    } = {}) {

      this.utility = GraphUIUtilities;

      this.element = document.getElementById(elementId || "graph");

      if (!this.element) {
        // eslint-disable-next-line no-console
        console.error("GraphUI: Invalid \"elementId\" option specified.");
        return Error("GraphUI: Invalid \"elementId\" option specified.");
      }

      if (typeof data === "object" && data.length === undefined) {
        this.data = this.utility.parseData(data);
      } else {
        // eslint-disable-next-line no-console
        console.error("GraphUI: Invalid \"data\" option specified.");
        return Error("GraphUI: Invalid \"data\" option specified.");
      }

      this.height = height;

      this.backgroundColor = backgroundColor;
      this.gridColor = gridColor;
      this.textColor = textColor;
      this.lineColor = lineColor;
      this.nodeColor = nodeColor || this.backgroundColor;
      this.nodeStroke = nodeStroke || this.lineColor;
      this.precision = precision;
      this.prefix = prefix;
      this.suffix = suffix;
      this.horizontalGrids = horizontalGrids;
      this.showHorizontalGrids = showHorizontalGrids;
      this.showVerticalGrids = showVerticalGrids;
      this.showYAxisLabel = showYAxisLabel;
      this.showXAxisLabel = showXAxisLabel;
      this.showInlineLabel = showInlineLabel;
      this.showInlineLabelValueOnly = showInlineLabelValueOnly;
      this.inlineLabelColor = inlineLabelColor || this.textColor;
      this.enableLiveEdit = enableLiveEdit;
      this.enableOptionDropdown = enableOptionDropdown;
      this.showTable = showTable;
      this.tableBackgroundColor = tableBackgroundColor;
      this.tableTextColor = tableTextColor;

      this.yLabel = { start: 80, offset: 5 };
      this.xLabel = { start: 50, offset: 30 };
      this.node = { radius: 6, stroke: 1.2 };
      this.padding = {
        top: 50, bottom: 50, left: 90, right: 20
      };
      this.canvasHeight = null;
      this.tableHeight = 0;
      this.graphOptionsObject = {
        IMAGE: { label: "Export Image", action: this.graphExport.bind(this, "IMAGE") },
        CSV: { label: "Export CSV", action: this.graphExport.bind(this, "CSV") },
        JSON: { label: "Export JSON", action: this.graphExport.bind(this, "JSON") }
      };

      this.element.style.display = "flex";
      this.dropdownOptions = this.parseOptions(dropdownOptions);

      window.addEventListener("resize", this.render.bind(this));

      this.utility.renderToolTips();
      this.render();

      return {
        elementId: this.element.id,
        height: this.height,
        backgroundColor: this.backgroundColor,
        gridColor: this.gridColor,
        textColor: this.textColor,
        lineColor: this.lineColor,
        nodeColor: this.nodeColor,
        nodeStroke: this.nodeStroke,
        precision: this.precision,
        prefix: this.prefix,
        suffix: this.suffix,
        data: this.data,
        horizontalGrids: this.horizontalGrids,
        showHorizontalGrids: this.showHorizontalGrids,
        showVerticalGrids: this.showVerticalGrids,
        showYAxisLabel: this.showYAxisLabel,
        showXAxisLabel: this.showXAxisLabel,
        showInlineLabel: this.showInlineLabel,
        inlineLabelColor: this.inlineLabelColor,
        showInlineLabelValueOnly: this.showInlineLabelValueOnly,
        enableLiveEdit: this.enableLiveEdit,
        enableOptionDropdown: this.enableOptionDropdown,
        dropdownOptions: dropdownOptions === undefined
          ? Object.keys(this.graphOptionsObject)
          : dropdownOptions,
        showTable: this.showTable,
        tableBackgroundColor: this.tableBackgroundColor,
        tableTextColor: this.tableTextColor
      };

    }

    /**
     * Convert an object to a CSV string.
     * @param {Object} data Object to convert to CSV.
     * @returns {String}
     */
    convertToCSV(data) {
      const values = Object.values(data);
      const columnLength = this.utility.getMaxLength(values);
      const labels = Object.keys(data);
      let head = "";
      const rows = [];

      if (columnLength > 1) {
        head += "\"Labels\"";
        for (let x = 1; x <= columnLength; x += 1) {
          head += `,"Data ${x}"`;
        }
        head += ",\"Total\"";
        values.forEach((row, index) => {
          let str = `"${labels[index]}"`;
          row.forEach((col) => {
            str += `,"${this.formatValue(col)}"`;
          });
          str += `,"${this.formatValue(this.utility.sumArray(row))}"`;
          rows.push(str);
        });
      } else {
        head += "\"Labels\"";
        labels.forEach((item) => {
          head += `,"${item}"`;
        });
        let str = "\"Data\"";
        values.forEach((col) => {
          str += `,"${this.formatValue(col)}"`;
        });
        rows.push(str);
      }

      head += "\r\n";
      const body = rows.join("\r\n");

      return head + body;
    }

    /**
     * Generate a PNG image file from the graph data using SVG image and canvas object.
     * @returns {void}
     */
    exportImage() {
      const oldHeight = this.height;
      const oldWidth = this.width;
      const oldShowTable = this.showTable;
      const ratio = oldWidth / oldHeight;
      const width = 1000;
      const height = Number((width / ratio).toFixed(2));
      this.width = width;
      this.height = height;
      this.showTable = true;
      const canvasRatio = this.width / (this.height + this.tableHeight + (this.tableHeight / 4.5));
      this.canvasHeight = (this.width / canvasRatio).toFixed(2);
      const svg = this.render(false);
      const canvas = document.createElement("canvas");
      const canvasStage = canvas.getContext("2d");
      const image = new Image();

      canvas.width = this.width;
      canvas.height = this.canvasHeight;

      image.onload = () => {
        canvasStage.drawImage(image, 0, 0);
        canvas.toBlob((blob) => {
          const url = URL.createObjectURL(blob);
          this.utility.downloadFile(url, `Export-GraphUI-ImageFile-${new Date().getTime()}.png`);
        }, "image/png", 100);
      };

      image.src = `data:image/svg+xml,${encodeURIComponent(svg.outerHTML)}`;

      this.height = oldHeight;
      this.width = oldWidth;
      this.canvasHeight = null;
      this.showTable = oldShowTable;
      this.render();
    }

    /**
     * Generate a CSV text file from graph data.
     * @returns {void}
     */
    exportCSV() {
      const csvString = this.convertToCSV(this.data);
      const url = this.utility.convertToObjectURL(csvString, "text/csv");
      this.utility.downloadFile(url, `Export-GraphUI-CSVFile-${new Date().getTime()}.csv`);
    }

    /**
     * Generate a JSON file from graph data.
     * @returns {void}
     */
    exportJSON() {
      const jsonString = JSON.stringify(this.data, (key, value) => {
        if (typeof value === "number") return this.formatValue(value);
        return value;
      }, 2);
      const url = this.utility.convertToObjectURL(jsonString, "application/json");
      this.utility.downloadFile(url, `Export-GraphUI-JSONFile-${new Date().getTime()}.json`);
    }

    /**
     * Generate a file base on the supplied type using the graph data.
     * @param {String} type File type to export to.
     * @param {MouseEvent} $event MouseEvent.
     * @returns {void}
     */
    graphExport(type, $event) {
      switch (type) {
      case "IMAGE":
        this.exportImage();
        break;
      case "JSON":
        this.exportJSON();
        break;
      case "CSV":
        this.exportCSV();
        break;
      default:
        // eslint-disable-next-line no-console
        console.warn(`Invalid option '${$event.target.innerHTML}' in ${this.element.id.toUpperCase()}`);
      }
    }

    /**
     * Parse the array of supplied dropdown options and return a dropdown option object.
     * @param {Array<String> | String} options Array of options to parse.
     * @returns {Array<Object>}
     */
    parseOptions(options) {
      const output = [];
      const optionList = Object.keys(this.graphOptionsObject);

      if (typeof options === "string" && options.toUpperCase().trim() === "ALL") {
        return Object.values(this.graphOptionsObject);
      }
      if (typeof options === "object") {
        options.forEach((item) => {
          const arr = item.trim().split("|").map(a => a.trim());
          const key = arr[0].toUpperCase();

          if (arr.length === 1) {
            if (optionList.includes(key)) {
              output.push(this.graphOptionsObject[key]);
            }
          } else if (arr.length > 1) {
            if (optionList.includes(key)) {
              const val = Object.assign({}, this.graphOptionsObject[key]);
              val.label = arr[1];
              output.push(val);
            }
          }
        });

        return output;
      }

      return Object.values(this.graphOptionsObject);
    }

    /**
     * Return the values of the graph data object.
     * @returns {Array<Number>}
     */
    getValues() {
      const values = [];
      Object.keys(this.data).forEach((key) => {
        if (typeof this.data[key] === "object") {
          values.push(this.utility.sumArray(this.data[key]));
        } else {
          values.push(this.data[key]);
        }
      });
      return values;
    }

    /**
     * Formats a giving value based on the graph options.
     * @param {Number} val Number value to format.
     * @returns {String}
     */
    formatValue(val) {
      return (
        this.prefix + this.utility.thousandSeparator(val.toFixed(this.precision)) + this.suffix
      );
    }

    /**
     * Return the YAxis Label of the graph.
     * @returns {{values: Array<Number>, texts: Array<String>}}
     */
    getYLabels() {
      const values = this.getValues();
      const max = this.utility.getMaxValue(values);
      const min = this.utility.getMinValue(values);
      const unit = Number(((max - min) / this.horizontalGrids).toFixed(2));
      let currentLabel = min;
      const labels = {
        values: [],
        texts: []
      };
      labels.texts.push(this.formatValue(currentLabel));
      labels.values.push(currentLabel);

      for (let x = 1; x <= this.horizontalGrids; x += 1) {
        currentLabel += unit;
        labels.values.push(currentLabel);
        labels.texts.push(this.formatValue(currentLabel));
      }

      return labels;
    }

    /**
     * Return the labels of the graph XAxis.
     * @returns {Array<String>}
     */
    getXLabels() {
      return Object.keys(this.data);
    }

    /**
     * Return the the accurate point on the YAxis the current value should be plotted.
     * @param {Number} height Total height to plot.
     * @param {Number} maxValue Highest Value in the graph.
     * @param {Number} value The current value to plot.
     * @returns {Number}
     */
    getPointYAxis(height, maxValue, value) {
      const valuePercentage = (value / maxValue) * 100;
      const percentageValue = (valuePercentage / 100) * height;
      return height + this.padding.top - percentageValue;
    }

    /**
     * Return the the accurate point on the XAxis the current value should be plotted.
     * @param {Number} width Total width to plot.
     * @param {Number} maxValue Highest Value in the graph.
     * @param {Number} value The current value to plot.
     * @returns {Number}
     */
    getPointXAxis(width, maxValue, value) {
      const valuePercentage = (value / maxValue) * 100;
      const percentageValue = (valuePercentage / 100) * width;
      return this.padding.left + percentageValue + this.padding.right;
    }

    /**
     * Generate the group of SVG elements for the graph YAxis grids.
     * @returns {SVGGElement}
     */
    generateYGrids() {
      const labels = this.getYLabels();
      const labelCount = labels.values.length;
      const usableHeight = this.height - this.padding.bottom - this.padding.top;
      const max = this.utility.getMaxValue(this.getValues());
      const min = this.utility.getMinValue(this.getValues());
      const positiveMin = min < 0 ? this.utility.toPositive(min) : min;
      const grid = document.createElement("g");
      grid.setAttribute("class", "graph-svg-group");
      const rect = document.createElement("rect");
      rect.setAttribute("x", "0");
      rect.setAttribute("y", "0");
      rect.setAttribute("fill", this.backgroundColor);
      rect.setAttribute("width", "100%");
      rect.setAttribute("height", "100%");
      rect.setAttribute("stroke-width", "0");
      grid.appendChild(rect);

      for (let x = 0; x < labelCount; x += 1) {
        const pointY = this.getPointYAxis(usableHeight, (max + positiveMin), (labels.values[x] + positiveMin));
        if (this.showHorizontalGrids) {
          const line = document.createElement("line");
          line.setAttribute("x1", `${this.padding.left}px`);
          line.setAttribute("y1", `${pointY}px`);
          line.setAttribute("x2", `${this.width - this.padding.right}px`);
          line.setAttribute("y2", `${pointY}px`);
          line.setAttribute("stroke", `${this.gridColor}`);
          line.setAttribute("stroke-width", "2");
          grid.appendChild(line);
        }

        if (this.showYAxisLabel) {
          const text = document.createElement("text");
          text.setAttribute("x", `${this.yLabel.start}`);
          text.setAttribute("y", `${pointY + this.yLabel.offset}px`);
          text.setAttribute("fill", `${this.textColor}`);
          text.setAttribute("text-anchor", "end");
          text.innerHTML = x > 0 ? labels.texts[x] : "";
          grid.appendChild(text);
        }
      }

      return grid;
    }

    /**
     * Generate the group of SVG elements for the graph XAxis grids.
     * @returns {SVGGElement}
     */
    generateXGrids() {
      const labels = this.getXLabels();
      const labelCount = labels.length;
      const usableWidth = this.width - this.padding.left - this.padding.right;
      const max = labelCount;
      const grid = document.createElement("g");
      grid.setAttribute("class", "graph-svg-group");

      for (let x = 0; x < labelCount; x += 1) {
        const pointX = this.getPointXAxis(usableWidth, max, x);
        if (this.showVerticalGrids) {
          const line = document.createElement("line");
          line.setAttribute("x1", `${pointX}px`);
          line.setAttribute("y1", `${this.padding.top}px`);
          line.setAttribute("x2", `${pointX}px`);
          line.setAttribute("y2", `${this.height - this.padding.bottom}px`);
          line.setAttribute("stroke", `${this.gridColor}`);
          line.setAttribute("stroke-width", "2");
          grid.appendChild(line);
        }

        this.xCoords.push(pointX);

        if (this.showXAxisLabel) {
          const text = document.createElement("text");
          text.setAttribute("x", `${pointX}`);
          text.setAttribute("y", `${this.height - this.xLabel.start + this.xLabel.offset}px`);
          text.setAttribute("fill", `${this.textColor}`);
          text.setAttribute("text-anchor", "middle");
          text.innerHTML = labels[x];
          grid.appendChild(text);
        }
      }

      return grid;
    }

    /**
     * Plots the graph data and return the SVG group of lines plotted.
     * @returns {SVGGElement}
     */
    drawGraph() {
      const grid = document.createElement("g");
      grid.setAttribute("class", "graph-svg-group");
      const values = this.getValues();
      const usableHeight = this.height - this.padding.bottom - this.padding.top;
      const max = this.utility.getMaxValue(values);
      const min = this.utility.getMinValue(values);
      const positiveMin = min < 0 ? this.utility.toPositive(min) : min;

      values.forEach((val, index) => {
        const line = document.createElement("line");
        const pointY = this.getPointYAxis(usableHeight, (max + positiveMin), (val + positiveMin));
        if (index < 1) {
          line.setAttribute("x1", `${this.xCoords[index]}px`);
          line.setAttribute("y1", `${pointY}px`);
          line.setAttribute("x2", `${this.xCoords[index]}px`);
          line.setAttribute("y2", `${pointY}px`);
        } else {
          line.setAttribute("x1", `${this.xCoords[index - 1]}px`);
          line.setAttribute("y1", `${this.yCoords[index - 1]}px`);
          line.setAttribute("x2", `${this.xCoords[index]}px`);
          line.setAttribute("y2", `${pointY}px`);
        }
        line.setAttribute("stroke", `${this.lineColor}`);
        line.setAttribute("stroke-width", "3");
        grid.appendChild(line);
        this.yCoords.push(pointY);
      });

      return grid;
    }

    /**
     * Generate the node element for the graph, indicating every plotted point on the graph.
     * @param {Boolean} output 
     * @returns {SVGGElement}
     */
    drawNodes(output) {
      const grid = document.createElement("g");
      grid.setAttribute("class", "graph-svg-group graph-node-group");
      const label = this.getXLabels();
      this.getValues().forEach((val, index) => {
        const group = document.createElement("g");
        group.setAttribute("class", "node-group");

        const vLine = document.createElement("line");
        vLine.setAttribute("x1", `${this.xCoords[index]}px`);
        vLine.setAttribute("y1", `${0}px`);
        vLine.setAttribute("x2", `${this.xCoords[index]}px`);
        vLine.setAttribute("y2", `${this.height}px`);
        vLine.setAttribute("stroke", `${this.nodeStroke}`);
        vLine.setAttribute("stroke-width", "0.8");
        vLine.setAttribute("class", "node-grid-v");
        if (output) group.appendChild(vLine);

        const hLine = document.createElement("line");
        hLine.setAttribute("x1", `${0}px`);
        hLine.setAttribute("y1", `${this.yCoords[index]}px`);
        hLine.setAttribute("x2", `${this.width}px`);
        hLine.setAttribute("y2", `${this.yCoords[index]}px`);
        hLine.setAttribute("stroke", `${this.nodeStroke}`);
        hLine.setAttribute("stroke-width", "0.8");
        hLine.setAttribute("class", "node-grid-h");
        if (output) group.appendChild(hLine);

        if (this.showInlineLabel) {
          const text = document.createElement("text");
          text.setAttribute("x", `${this.xCoords[index]}px`);
          text.setAttribute("y", `${this.yCoords[index] - 15}px`);
          text.setAttribute("fill", `${this.inlineLabelColor}`);
          if (index === 0) {
            text.setAttribute("text-anchor", "start");
          } else if (index === label.length - 1) {
            text.setAttribute("text-anchor", "end");
          } else {
            text.setAttribute("text-anchor", "middle");
          }
          text.setAttribute("class", "graph-inline-label");
          text.innerHTML = `${this.showInlineLabelValueOnly ? "" : `${label[index]}:`} ${this.formatValue(val)}`;
          group.appendChild(text);
        }

        const node = document.createElement("circle");
        node.setAttribute("cx", this.xCoords[index]);
        node.setAttribute("cy", this.yCoords[index]);
        node.setAttribute("r", this.node.radius);
        node.setAttribute("stroke", this.nodeStroke);
        node.setAttribute("fill", this.nodeColor);
        node.setAttribute("stroke-width", this.node.stroke);
        node.setAttribute("class", "circle-node");
        node.setAttribute("data-label", label[index]);
        node.setAttribute("data-value", this.formatValue(val));
        group.appendChild(node);

        grid.appendChild(group);
      });

      return grid;
    }

    /**
     * Set the properties and attributes of a node element based on its current state.
     * @param {String} state Current node state.
     * @param {MouseEvent} $event MouseEvent.
     * @returns {void}
     */
    setNodeState(state, $event) {
      if (state === "over") {
        $event.target.style.fill = this.lineColor;
        $event.target.style.stroke = this.backgroundColor;
      } else if (state === "out") {
        $event.target.style.fill = this.nodeColor;
        $event.target.style.stroke = this.nodeStroke;
      }
    }

    /**
     * Initialize every node element of a graph by setting event listeners on each node.
     * @returns {void}
     */
    initToolTips() {
      const groups = Object.values(this.element.getElementsByClassName("circle-node"));
      groups.forEach((group) => {
        group.addEventListener("mouseover", (e) => {
          this.utility.showToolTips(e);
          this.setNodeState("over", e);
        });
        group.addEventListener("mouseout", (e) => {
          this.utility.hideToolTips(e);
          this.setNodeState("out", e);
        });
      });
    }

    /**
     * Generate the graph dropdown HTML element based on the provided option.
     * @returns {HTMLDivElement}
     */
    generateOptionPanel() {
      const options = document.createElement("div");
      const button = document.createElement("button");
      const dropdown = document.createElement("ul");

      button.setAttribute("type", "button");
      button.setAttribute("data-label", "Graph Menu");
      button.setAttribute("data-value", "Click to select an option.");
      button.setAttribute("data-type", "Button");
      button.addEventListener("mouseover", this.utility.showToolTips);
      button.addEventListener("mouseout", this.utility.hideToolTips);
      button.innerHTML = "&Congruent;";

      this.dropdownOptions.forEach((item) => {
        const dropdownItem = document.createElement("li");
        dropdownItem.innerHTML = item.label;
        dropdownItem.addEventListener("click", item.action);
        dropdown.appendChild(dropdownItem);
      });

      options.setAttribute("class", "graph-panel-options");
      options.appendChild(button);
      if (this.dropdownOptions.length >= 1) options.appendChild(dropdown);
      return options;
    }

    /**
     * Generate the graph live editor HTML element based on provided options.
     * @todo: Complete the live editor for the graph in the next version.
     * @returns {HTMLDivElement}
     */
    generateLivePanel() {
      const live = document.createElement("div");
      const button = document.createElement("button");

      button.setAttribute("type", "button");
      button.setAttribute("data-label", "Live Edit");
      button.setAttribute("data-value", "Click to edit graph in real time.");
      button.setAttribute("data-type", "Button");
      button.addEventListener("mouseover", this.utility.showToolTips);
      button.addEventListener("mouseout", this.utility.hideToolTips);
      button.innerHTML = "&bigvee;";

      live.setAttribute("class", "graph-panel-live");
      live.appendChild(button);
      return live;
    }

    /**
     * Initialize the graph option dropdown HTML element.
     * @returns {HTMLDivElement}
     */
    initOptionsPanel() {
      const panel = document.createElement("div");
      panel.setAttribute("class", "graph-panel");
      panel.style.width = `${this.width}px`;
      if (this.enableLiveEdit) panel.appendChild(this.generateLivePanel());
      if (this.enableOptionDropdown) panel.appendChild(this.generateOptionPanel());
      return panel;
    }

    /**
     * Generate multiple tags based on the parameters supplied.
     * @param {Array<Number> | Number} vals Values to generate a tag for.
     * @param {String} tagName Name of the HTML tag to generate.
     * @param {Array<String>} styles Array of CSS properties for styling the generated tag.
     * @param {String} prefix A string to prepend to the beginning of the tag value.
     * @param {String} suffix A string to append to the end of the tag value.
     * @param {Boolean} format Option if to format the value of the tag based on the provided option.
     * @returns {String}
     */
    generateMultipleTags(vals, tagName, styles = [], prefix = "", suffix = "", format = false) {
      let tags = "";

      if (typeof vals === "number") {
        for (let x = 1; x <= vals; x += 1) {
          tags += `<${tagName} style="${styles.join("; ")}">${prefix}${format ? this.formatValue(x) : x}${suffix}</${tagName}>`;
        }
      } else if (typeof vals === "object") {
        vals.forEach((val) => {
          tags += `<${tagName} style="${styles.join("; ")}">${prefix}${format ? this.formatValue(val) : val}${suffix}</${tagName}>`;
        });
      }

      return tags;
    }

    /**
     * Generate the head section of the graph table.
     * @returns {String}
     */
    generateTableHead() {
      const columnLength = this.utility.getMaxLength(Object.values(this.data));
      let head = "";

      if (columnLength > 1) {
        head += `
          <thead>
            <tr>
              <th style="border-color: ${this.backgroundColor}">Labels</th>
              ${this.generateMultipleTags(columnLength, "th", [`border-color: ${this.backgroundColor}`], "Data ")}
              <th style="border-color: ${this.backgroundColor}">Total</th>
            </tr>
          </thead>
        `;
      } else {
        head += `
          <thead>
            <tr>
              <th style="border-color: ${this.backgroundColor}">Labels</th>
              ${this.generateMultipleTags(Object.keys(this.data), "th", [`border-color: ${this.backgroundColor}`])}
            </tr>
          </thead>
        `;
      }

      return head;
    }

    /**
     * Generate the rows in the graph table body.
     * @param {Array<Array<Number>>} vals Array of arrays to be drawn as a table.
     * @param {Array<String>} labels The labels of each row or column.
     * @param {Boolean} total Option to determine if the table will be totalled or not.
     * @returns {String}
     */
    generateTableBodyRows(vals, labels, total) {
      let rows = "";

      if (total) {
        vals.forEach((val, index) => {
          rows += `
          <tr>
            <th>${labels[index]}</th>
            ${this.generateMultipleTags(val, "td", [], "", "", true)}
            <th>${this.formatValue(this.utility.sumArray(val))}</th>
          </tr>`;
        });
      } else {
        rows += `
          <tr>
            <th>Data</th>
            ${this.generateMultipleTags(vals.map(val => val[0]), "td", [], "", "", true)}
          </tr>
        `;
      }

      return rows;
    }

    /**
     * Generate the body of the graph table.
     * @returns {String}
     */
    generateTableBody() {
      const columnLength = this.utility.getMaxLength(Object.values(this.data));
      const labels = Object.keys(this.data);
      const values = Object.values(this.data);
      return `
        <tbody>
          ${this.generateTableBodyRows(values, labels, columnLength > 1)}
        </tbody>
      `;
    }

    /**
     * Generate the graph table.
     * @returns {String}
     */
    generateTable() {
      return `
        <svg xmlns="http://www.w3.org/2000/svg" width="${this.width}" height="${this.canvasHeight || this.height}">
          <style>
            .graph-table-wrapper {
              overflow-x: auto;
            }
            
            .graph-table-wrapper > table {
              width: 100%;
              border-collapse: collapse;
              font-family: Arial, Helvetica, sans-serif;
            }
            
            .graph-table-wrapper > table, .graph-table-wrapper > table > thead > tr > th, .graph-table-wrapper > table > tbody > tr > th, .graph-table-wrapper > table > tbody > tr > td {
              border-bottom: 1px solid #efefef;
              text-align: left;
              padding: 0.5em 1em;
            }
            
            .graph-table-wrapper > table > thead > tr > th {
              height: 25px;
              border-width: 3px;
            }
            
            .graph-table-wrapper > table > tbody > tr:nth-child(odd) {
              background-color: rgba(0,0,0,0.1);
            }
          </style>
          <foreignObject x="0" y="${this.height}" width="100%" height="100%">
            <div class="graph-table-wrapper" xmlns="http://www.w3.org/1999/xhtml">
              <table style="color: ${this.tableTextColor}; background-color: ${this.tableBackgroundColor}; width: ${this.width}">
                ${this.generateTableHead()}
                ${this.generateTableBody()}
              </table>
            </div>
          </foreignObject>
        </svg>
      `;
    }

    /**
     * Generate and Render the SVG graph into DOM.
     * @param {Boolean} output
     * @returns {void | SVGElement}
     */
    render(output = true) {
      this.element.innerHTML = "";
      if (output) this.width = this.element.clientWidth;
      this.yCoords = [];
      this.xCoords = [];

      const dom = new DOMParser();
      const tableElement = dom.parseFromString(this.generateTable(), "image/svg+xml").children[0];
      this.element.appendChild(tableElement);
      this.tableHeight = this.element.getElementsByTagName("table")[0].clientHeight;
      tableElement.remove();

      const svg = document.createElement("svg");
      svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
      svg.setAttribute("width", `${this.width}px`);
      svg.setAttribute("height", `${this.canvasHeight || this.height}px`);
      svg.appendChild(this.generateYGrids());
      svg.appendChild(this.generateXGrids());
      svg.appendChild(this.drawGraph());
      svg.appendChild(this.drawNodes(output));

      if (this.showTable) svg.appendChild(tableElement);
      this.graph = dom.parseFromString(svg.outerHTML, "image/svg+xml").children[0];

      if (this.enableLiveEdit || this.enableOptionDropdown) this.element.append(this.initOptionsPanel());
      this.element.appendChild(this.graph);

      if (this.showTable) {
        const svgElements = this.element.getElementsByTagName("svg");
        svgElements[0].setAttribute("height", this.canvasHeight || (`${this.height + this.tableHeight}px`));
        svgElements[1].setAttribute("height", this.canvasHeight || (`${this.height + this.tableHeight}px`));
        this.graph = this.element.lastElementChild;
      }

      this.initToolTips();
      return this.graph;
    }
  }

  /**
   * GraphUI class.
   * @class GraphUI
   * @example new GraphUI({ data, elementId });
   */
  class GraphUI {
    /**
     * GraphUI constructor.
     * @param {{}} param0 GraphUI options.
     * @returns {GraphUI}
     */
    constructor({
      elementId = "graph", height = 300, backgroundColor = "#111",
      gridColor = "rgba(255,255,255,0.1)", textColor = "rgba(255,255,255,0.8)",
      lineColor = "rgb(255,255,255)", nodeColor, nodeStroke, precision = 1,
      prefix = "", suffix = "", data = {}, horizontalGrids = 5,
      showHorizontalGrids = true, showVerticalGrids = false, showYAxisLabel = true,
      showXAxisLabel = true, showInlineLabel = false, inlineLabelColor,
      showInlineLabelValueOnly = false, enableOptionDropdown = true, dropdownOptions = "ALL",
      showTable = true, tableBackgroundColor = "white", tableTextColor = "#444"
    } = {}) {

      return new GraphUIFactory({
        elementId, height, backgroundColor, gridColor, textColor, lineColor,
        nodeColor, nodeStroke, precision, prefix, suffix, data, horizontalGrids,
        showHorizontalGrids, showVerticalGrids, showYAxisLabel, showXAxisLabel,
        showInlineLabel, inlineLabelColor, showInlineLabelValueOnly, enableLiveEdit: false,
        enableOptionDropdown, dropdownOptions, showTable, tableBackgroundColor, tableTextColor
      });
    }
  }

  GraphUI.toSource = () => "[class GraphUI]";
  GraphUI.toString = () => "class GraphUI { object GraphUI }";
  GraphUI.prototype.toSource = GraphUI.toSource;
  GraphUI.prototype.toString = GraphUI.toString;

  if (typeof root.module !== "undefined" && root.module.exports) {
    root.module.exports = GraphUI;
  } else {
    root.GraphUI = GraphUI;
  }
})(this);
