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
    var chartdata = data.metadata;

    // 4. Create a variable that filters the samples for the object with the desired sample number.
    var chartArray = chartdata.filter(newSampleObj => newSampleObj.id == newSample);

    //  5. Create a variable that holds the first sample in the array.
    var chartResult = chartArray[0];


    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    var otu_Ids = chartResult.metadata[0].otu_ids;
    console.log(otu_Ids);
    var otu_Labels = chartResult.metadata[0].otu_labels.slice(0,10);
    var sample_Values = chartResult.metadata[0].sample_values.slice(0,10).reverse();


    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 

    //var yticks = 
    var top_Otu = chartResult.metadata[0].otu_ids.slice(0,10);

    // 8. Create the trace for the bar chart.

    var trace = {
      x: sample_Values,
      y: top_Otu,
      type: "bar",
      orientation: "h",
    };

    var barData = [trace];

    // 9. Create the layout for the bar chart. 
    var barLayout = {
      title: "Top 10 Bacteria Cultures Found",
      yaxis: {title: "Top OTU"}
    };
    // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bar", barData, barLayout);
  });
}

// Bar and Bubble charts
// Create the buildCharts function.
function buildCharts(sample) {
  // Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    

    // Deliverable 1 Step 10. Use Plotly to plot the data with the layout. 
    //Plotly.newPlot(); 

    // 1. Create the trace for the bubble chart.
    
    var trace2 = {
      x: otu_Ids,
      y: chartResult.chart[0].sample_values,
      mode: "markers",
      marker: {
        size: chartResult.chart[0].sample_values,
        color: chartResult.chart[0].otu_ids,
      },
      text: chartResult.chart[0].otu_labels
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
  });
}

// // Create the buildChart function. Gauge Chart
// function buildCharts(sample) {
//   // Use d3.json to load the samples.json file 
//   d3.json("samples.json").then((data) => {
//     console.log(data);

//     // Create a variable that holds the samples array.
//     var chartdata = data.metadata; 

    //Duplicate Instructions
    // Create a variable that filters the samples for the object with the desired sample number.

    // 1. Create a variable that filters the metadata array for the object with the desired sample number.

    // Create a variable that holds the first sample in the array.
  

    // 2. Create a variable that holds the first sample in the metadata array.
    

    // Create variables that hold the otu_ids, otu_labels, and sample_values.


    // 3. Create a variable that holds the washing frequency.
   
    // Create the yticks for the bar chart.

    // Use Plotly to plot the bar data and layout.
    //Plotly.newPlot();
    
    // Use Plotly to plot the bubble data and layout.
    //Plotly.newPlot();
   
    
//     // 4. Create the trace for the gauge chart.
    
//     var trace = {
//       x: sample_Values,
//       y: top_Otu,
//       type: "bar",
//       orientation: "h",
//     };    
    
//     var gaugeData = [
     
//     ];
    
//     // 5. Create the layout for the gauge chart.
//     var gaugeLayout = {
//       shapes: [{
//         type: 'path',
//         'path':  path,
//         'fillcolor': 'rgba(44, 160, 101, 0.5)'
//         }
//       }];
//       title: 'Belly Button Washing Frequency'
//     };




//     // 6. Use Plotly to plot the gauge data and layout.
//     Plotly.newPlot("gauge", gaugeData, gaugeLayout);
//   });
// }
