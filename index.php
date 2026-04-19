<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>COMPXA2</title>
        <link rel="stylesheet" href="style.css">
        <script src="script.js" defer></script>
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    </head>
    <body>
        <!-- This is the header section that contains the title -->
        <header>
            <h1>Population Chart</h1>
        </header>
        <main>
            <!-- This is the section that contains the button to add widgets along with text telling the user how to use the site -->
            <section class="widget-section">
                <button onClick="addWidget()" class="add-widget">Add Widget</button>
                <p>Click the button to add a new widget. Select a data type, country and chart type and the information will display in its own widget.</p>
            </section>
        </main>
    </body>
</html>