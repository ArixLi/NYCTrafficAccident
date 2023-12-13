// add your JavaScript/D3 to this file

    const w = 600;
    const h = 400;
    const margin = {top: 25, right: 10, bottom: 80,
        left: 40};
    const innerWidth = w - margin.left - margin.right;
    const innerHeight = h - margin.top - margin.bottom;

    const svg = d3.select("div#plot")
        .append("svg")
        .attr("width", w)
        .attr("height", h);

    svg.append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", w)
        .attr("height", h)
        .attr("fill", "lightblue");


    let counter = 0;
    let max = 0;


    d3.csv("https://raw.githubusercontent.com/ArixLi/NYCTrafficAccident/main/preprocess/d3_data.csv").then(function(data) {

      let newData = [];
      let name = [];
      for (let key in data[counter]){
        if (key != "Month"){
          newData.push(+data[counter][key]);
          name.push(key);
        }
      }

      for (let i=0; i < data.length;i++){
        for (let key in data[i]){
            if (key != "Month"){
              if(+data[i][key] > max){
                max = +data[i][key];
              }
          }
        }
      }

      let titleString = data[counter]["Month"];

      console.log(data)

      const xScale = d3.scaleBand()
          .domain(name)
          .range([0, innerWidth])
          .paddingInner(.1);

      const yScale = d3.scaleLinear()
          .domain([0, max])
          .range([innerHeight, 0]);

      const xAxis = d3.axisBottom()
          .scale(xScale);

      const yAxis = d3.axisLeft()
          .scale(yScale);

      const bars = svg.append("g")
          .attr("id", "plot")
          .attr("transform", `translate (${margin.left}, ${margin.top})`)
        .selectAll("rect")
          .data(newData);

      bars.enter().append("rect")
          .attr("x", d => xScale(name[newData.indexOf(d)]))
          .attr("y", d => yScale(d))
          .attr("width", xScale.bandwidth())
          .attr("height", d => innerHeight - yScale(d))
          .attr("fill", "green");

      svg.append("g")
          .attr("class", "xAxis")
          .attr("transform", `translate (${margin.left}, ${h - margin.bottom})`)
          .call(xAxis)
        .selectAll("text")
          .attr("transform", "rotate(30)")
          .style("text-anchor", "start");

      svg.append("g")
          .attr("class", "yAxis")
          .attr("transform", `translate (${margin.left}, ${margin.top})`)
          .call(yAxis);

      svg.append("text")
          .attr("class", "title")
          .attr("x", 350)
          .attr("y", 50)
          .attr("text-anchor", "middle")
          .attr("fill", "black")
          .text(titleString);


    });



// General Update Pattern

function update(counter) {

      svg.selectAll("rect").remove();
      svg.selectAll(".title").remove();

      svg.append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", w)
        .attr("height", h)
        .attr("fill", "lightblue");

      d3.csv("https://raw.githubusercontent.com/ArixLi/NYCTrafficAccident/main/preprocess/d3_data.csv").then(function(data) {
          let newData = [];
          let name = [];
          for (let key in data[counter]){
            if (key != "Month"){
              newData.push(+data[counter][key])
              name.push(key)
            }
      }

      let titleString = data[counter]["Month"];

      const xScale = d3.scaleBand()
          .domain(name)
          .range([0, innerWidth])
          .paddingInner(.1);

      const yScale = d3.scaleLinear()
          .domain([0, max])
          .range([innerHeight, 0]);

      const xAxis = d3.axisBottom()
          .scale(xScale);

      const yAxis = d3.axisLeft()
          .scale(yScale);

      const bars = svg.append("g")
          .attr("id", "plot")
          .attr("transform", `translate (${margin.left}, ${margin.top})`)
          .selectAll("rect")
          .data(newData);

      bars.enter().append("rect")
          .attr("x", d => xScale(name[newData.indexOf(d)]))
          .attr("y", d => yScale(d))
          .attr("width", xScale.bandwidth())
          .attr("height", d => innerHeight - yScale(d))
          .attr("fill", "green");

      svg.append("g")
          .attr("class", "xAxis")
          .attr("transform", `translate (${margin.left}, ${h - margin.bottom})`)
          .call(xAxis)
          .selectAll("text")
          .attr("transform", "rotate(30)")
          .style("text-anchor", "start");

      svg.append("g")
          .attr("class", "yAxis")
          .attr("transform", `translate (${margin.left}, ${margin.top})`)
          .call(yAxis);

      svg.append("text")
          .attr("class", "title")
          .attr("x", 350)
          .attr("y", 50)
          .attr("text-anchor", "middle")
          .attr("fill", "black")
          .text(titleString);


    });

};




function add() {
  counter += 1;
  if(counter > 11){
    counter = 0;
  }
  update(counter);
};

function remove() {
  counter -= 1;
  if(counter < 0){
    counter = 11;
  }
  update(counter);
};
