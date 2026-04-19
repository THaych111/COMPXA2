class PopulationChart {
    // ----------------------
    //Constructor: Used for initializing the data along with its methods
    // ----------------------
    constructor() {
        this.apiKey = "fGlYFBMaBzr4RpZmPA6HxsFOlW4BpqEtIpjji6ey";
        this.myChart = null;
        
        this.createContainer();
        this.render();
        this.attachEvents();
    }

    // -------------------------
    // This Method is used to create the Main Container for the Widget
    // -------------------------
    createContainer() {
        this.container = document.createElement("div");
        this.container.id = "population-widget-container";
        document.body.appendChild(this.container);

        this.injectStyles();
    }

    // -------------------------
    // This method is used to inject a stylesheet for the widget (Once)
    // -------------------------
    injectStyles() {
        if (document.getElementById("population-widget-styles")) return;

        const style = document.createElement("style");
        style.id = "population-widget-styles";
        style.textContent = `

            #population-widget-container {
                    font-family: Arial, sans-serif;
                    max-width: 320px;
                    border: 1px solid #ccc;
                    padding: 15px;
                    border-radius: 8px;
                    background: #f9f9f9;
                    display: inline-block;
                }
            
            .data-type {
                padding: ;
            }

            .close {
                padding: 6px 8px;
                margin: auto;
                align-items: center;
                display: flex;
                justify-content: center;
                background: #FA003F;
            }

            .close:hover {
                background: #FF0000;
                cursor: pointer;
            }
        `;
        
        document.head.appendChild(style);
        }

    // -------------------------
    // This method is used to render the Widget's HTML
    // -------------------------
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


    // -------------------------
    // This method is used to render the chart based on the data type, country and chart type
    // -------------------------

    renderGraph() {
        this.chart = this.chartDropbox.value;

        //This is needed to destroy the previous chart before creating a new one
        if(this.myChart) {
            this.myChart.destroy();
        }

        //This part creates the chart based on the information given
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

    // -------------------------
    // This method is used to fetch the given data from the api
    // -------------------------
    addGraph() {
        this.data = this.dataDropbox.value;
        this.country = this.countryDropbox.value;
        this.chart = this.chartDropbox.value;

        if(!this.data || !this.country || !this.chart) return;

        const url = "https://api.api-ninjas.com/v1/population?country=" + this.country;
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

    // -------------------------
    // This method is used to attach event listeners to the dropdowns and the close button
    // -------------------------
    attachEvents() {
        this.dataDropbox.addEventListener("change", () => this.addGraph());
        this.countryDropbox.addEventListener("change", () => this.addGraph());
        this.chartDropbox.addEventListener("change", () => this.renderGraph());
        this.closeButton.addEventListener("click", () => this.closeWidget());
    }

    closeWidget() {
        this.container.remove();
    }
}

function addWidget() {
    new PopulationChart();
}

