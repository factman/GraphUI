const data1 = {
  "Mon": [-3,-4,-6],
  "Tue": [-2,-8,-1],
  "Wed": [-2,-4,-3],
  "Thu": "-12,-12",
  "Fri": -10,
  "Sat": "-14",
  "Sun": [-5,-4,-1,-2],
};

const data2 = {
  "Trip 1": 1,
  "Trip 2": 6,
  "Trip 3": 2,
  "Trip 4": 8,
  "Trip 5": 1,
  "Trip 6": 5,
  "Trip 7": 7,
};

const data3 = {
  "Mon": [50,40,60, 10000],
  "Tue": [40,80,10, 900],
  "Wed": [40,40,30, 800],
  "Thu": [100,20,90, 900],
  "Fri": [30,40,12, 800],
};

new GraphUI({
  data: data1,
  elementId: "graph1",
});

new GraphUI({
  data: data2,
  elementId: "graph2",
  backgroundColor: "darkgreen",
  precision: 0,
  suffix: "km/h",
  horizontalGrids: 8,
  showVerticalGrids: true,
  showTable: false,
});

new GraphUI({
  data: data3,
  elementId: "graph3",
  backgroundColor: "darkblue",
  prefix: "$",
  precision: 2,
  tableTextColor: "darkblue",
});

new GraphUI({
  data: data1,
  elementId: "graph4",
  backgroundColor: "yellow",
  horizontalGrids: 4,
  textColor: "black",
  lineColor: "black",
  gridColor: "rgba(0,0,0,0.1)",
  tableBackgroundColor: "black",
  tableTextColor: "yellow",
});

new GraphUI({
  data: data2,
  elementId: "graph5",
  backgroundColor: "darkorange",
  precision: 0,
  suffix: "km/h",
  showVerticalGrids: true,
});

new GraphUI({
  data: data3,
  elementId: "graph6",
  backgroundColor: "purple",
  prefix: "$",
  precision: 1,
});
