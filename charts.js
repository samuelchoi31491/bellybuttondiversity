function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    console.log(data);
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });



    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// 1. Create the buildCharts function.
function buildCharts(newSample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    // 3. Create a variable that holds the samples array. 
    var sampleData = data.samples;

    // 4. Create a variable that filters the samples for the object with the desired sample number.
    var sampleArray = sampleData.filter(newSampleObj => newSampleObj.id == newSample);

    //  5. Create a variable that holds the first sample in the array.
    var sampleResult = sampleArray[0];


    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    console.log(sampleResult);
    var otu_Ids = sampleResult.otu_ids;
    console.log(otu_Ids);
    var otu_Labels = sampleResult.otu_labels;
    var sample_Values = sampleResult.sample_values;


    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 

    //var yticks = 
    var top_Otu = sampleResult.otu_ids.slice(0,10).map(otu_Id =>`otu_Id ${otu_Id}`).reverse();

    // 8. Create the trace for the bar chart.
    var trace = {
      x: sample_Values.slice(0,10).reverse(),
      y: top_Otu,
      text: otu_Labels.slice(0,10).reverse(),
      type: "bar",
      orientation: "h"
    };

    var barData = [trace];

    // 9. Create the layout for the bar chart. 
    var barLayout = {
      title: "Top 10 Bacteria Cultures Found",
      yaxis: {title: "Top OTU"}
    };
    // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bar", barData, barLayout);

// // Bar and Bubble charts
// // Create the buildCharts function.
// function buildCharts(sample) {
//   // Use d3.json to load and retrieve the samples.json file 
//   d3.json("samples.json").then((data) => {

    // Deliverable 1 Step 10. Use Plotly to plot the data with the layout. 
    //Plotly.newPlot(); 

    // 1. Create the trace for the bubble chart.
    
    var trace2 = {
      x: otu_Ids,
      y: sample_Values,
      text: otu_Labels,
      mode: "markers",
      marker: {
        size: sample_Values,
        color:otu_Ids,
        colorscale: "Earth",
      },
    };    
    
    
    var bubbleData = [trace2];

    // 2. Create the layout for the bubble chart.
    var bubbleLayout = {
      xaxis:{title: "OTU ID"},
      height: 700,
      width: 1200
    };

    // 3. Use Plotly to plot the data with the layout.
    Plotly.newPlot("bubble", bubbleData, bubbleLayout); 


    // Create a variable that holds the samples array.
    var gaugeData = data.metadata;
    var gaugeResultArray = gaugeData.filter(sampleObj => sampleObj.id == newSample);
    var gaugeResult = gaugeResultArray[0];
    var wfreq = gaugeResult.wfreq;
  
    
    // 4. Create the trace for the gauge chart.
    
    
    // 5. Create the layout for the gauge chart.
    var chartDataGauge = [
      {
        type: "indicator",
        mode: "gauge",
        value: wfreq,
        title: { text: "Speed", font: { size: 24 } },
        gauge: {
          axis: { range: [null, 9], tickwidth: 1, tickcolor: "darkblue" },
          bar: { color: "black" },
          bgcolor: "white",
          borderwidth: 2,
          bordercolor: "gray",
          steps:  [
            { range: [0, 2], color: "#ff0000"},
            { range: [2, 4], color: "#ff9900"},
            { range: [4, 6], color: "#ffff00"},
            { range: [6, 8], color: "#00cc00"},
            { range: [8, 10], color: "#009900"},

          ],
          threshold: {
            line: { color: "red", width: 4 },
            thickness: 0.75,
            value: wfreq
          }
        }
      }
    ];
    
    var gaugeLayout = {
      width: 500,
      height: 400,
      margin: { t: 25, r: 25, l: 25, b: 25 },
      paper_bgcolor: "lavender",
      font: { color: "darkblue", family: "Arial" }
    };
    
    Plotly.newPlot('gauge', chartDataGauge, gaugeLayout);
  });
}
