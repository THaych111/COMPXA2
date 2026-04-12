class PopulationChart {

    //////////////////////////
    //Constructor: Used for initializing the data option and country for the widget along with its methods
    //////////////////////////
    constructor() {
        this.storageKey = "population-chart-status";
        this.dataType = "";
        this.country = "";
        this.chartType = "";


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
}