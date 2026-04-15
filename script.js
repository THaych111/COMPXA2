fetch("https://api.api-ninjas.com/v1/population?country=New Zealand", {
    headers: {
        "X-Api-Key": "fGlYFBMaBzr4RpZmPA6HxsFOlW4BpqEtIpjji6ey"
    }
})
.then(res => res.json())
.then(data => console.log(data));
 

class PopulationChart {
    

    //////////////////////////
    //Constructor: Used for initializing the data option and country for the widget along with its methods
    //////////////////////////
    constructor() {
        this.apiKey = "fGlYFBMaBzr4RpZmPA6HxsFOlW4BpqEtIpjji6ey";
        this.myChart = null;
        

        this.createContainer();
        this.render();
        this.attachEvents();
    }

    createContainer() {
        this.container = document.createElement("div");
        this.container.id = "population-widget-container";
        document.body.appendChild(this.container);

        this.injectStyles();
    }

    injectStyles() {
        if (document.getElementById("population-widget-styles")) return;

        const style = document.createElement("style");
        style.id = "todo-widget-styles";
        style.textContent = `
            
        `;
        
        document.head.appendChild(style);
        }

    render() {
        this.container.innerHTML = `
            <h3>Population Chart</h3>
            <select class="data-type" name="data-type">
                <option value="population">Population</option>
                <option value="density">Density</option>
                <option value="median_age">Median-Age</option>
                <option value="migrants">Migrants</option>
            </select>

            <select class="country" name="country">
                <option value="New Zealand">New Zealand</option>
                <option value="Burundi">Burundi</option>
                <option value="China">China</option>
                <option value="Australia">Australia</option>
                <option value="Barbados">Barbados</option>
            </select>

            <select class="chart-type" name="chart-type">
                <option value="bar">Bar</option>
                <option value="line">Line</option>
                <option value="radar">Radar</option>
            </select>

            <div>
                <canvas id="myChart"></canvas>
            </div>
            
            <button class="close">Close</button>
        `;

        this.dataDropbox = this.container.querySelector(".data-type");
        this.countryDropbox = this.container.querySelector(".country");
        this.chartDropbox = this.container.querySelector(".chart-type");
        this.closeButton = this.container.querySelector(".close");
        this.ctx = this.container.querySelector("#myChart");
    }

    renderGraph() {
        //This is needed to destroy the previous chartbefore creating a new one
        if(this.myChart) {
            this.myChart.destroy();
        }

        this.myChart = new Chart(this.ctx, {
        type: this.chart,
        data: {
            labels: this.years, 
            datasets: [{
                label: this.data,
                data: this.values,
                borderWidth: 1
            }]
        },
            options: {
                scales: {
                    y: { 
                    beginAtZero: true 
                    }
                }
            }
        
        }
        )
    }

    addGraph() {
        console.log("dsad");
        this.data = this.dataDropbox.value;
        this.country = this.countryDropbox.value;
        this.chart = this.chartDropbox.value;

        if(!this.data || !this.country || !this.chart) return;

        const url = "https://api.api-ninjas.com/v1/population?country=" + this.country;
        console.log(url);
        fetch(url , {
            headers: {
                "X-Api-Key": this.apiKey
            }
        })
        .then(res => res.json())
        .then(data =>  {
            this.years = [];
            this.values = [];

            data.historical_population.forEach(item => {
                this.years.push(item.year);
                this.values.push(item[this.data]);
            });
            this.renderGraph();
        })
    
            
    }

    attachEvents() {
        this.dataDropbox.addEventListener("change", () => this.addGraph());
        this.countryDropbox.addEventListener("change", () => this.addGraph());
        this.chartDropbox.addEventListener("change", () => this.addGraph());
        this.closeButton.addEventListener("click", () => this.closeWidget());
    }

    closeWidget() {
        this.container.remove();
    }
}

function addWidget() {
    new PopulationChart();
}

