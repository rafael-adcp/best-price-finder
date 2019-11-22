<html>
<header>
    <!-- Load D3.js -->
    <script src="../node_modules//d3/dist//d3.min.js"></script>

    <!-- Load billboard.js with style -->
    <script src="../node_modules/billboard.js/dist/billboard.js"></script>
    <link rel="stylesheet" href="../node_modules/billboard.js/dist/billboard.css">

    <!-- Load bootstrap style -->
    <link rel="stylesheet" href="../node_modules/bootstrap/dist/css/bootstrap.css">

    <style>



    </style>
</header>

<body>
            
                   <div class="row">
        <div class="col-sm-12">
            <div id="highlanderPerGeneration"></div>
            <script>
                var chart = bb.generate({
                    data: {
                        columns: 
                            {{{ highlanderPerGeneration }}}      
                    },

                    bindto: '#highlanderPerGeneration',
                    title: {
                        text: 'highlanderPerGeneration'
                    },
                                        axis: {
                        y: {
                            min: {{bestFitnessValue}}-30
                        }
                    },
                    grid: {
                        y: {
                            lines: [
                                { value: {{bestFitnessValue}}, text: 'Best possible value: ' + {{bestFitnessValue}} },
                            ]

                        }
                    }
                    , legend: {
                        show: false
                    }
                });



            </script>

        </div>
    </div>







                       <div class="row">
        <div class="col-sm-12">
            <div id="bestValuePerTestRound"></div>
            <script>
                var chart = bb.generate({
                    data: {
                        columns: 
                            {{{ bestValuePerTestRound }}}      
                    },

                    bindto: '#bestValuePerTestRound',
                    title: {
                        text: 'bestValuePerTestRound'
                    },
                    axis: {
                        y: {
                            min: {{bestFitnessValue}}-30
                        }
                    },
                    grid: {
                        y: {
                            lines: [
                                { value: {{bestFitnessValue}}, text: 'Best possible value: ' + {{bestFitnessValue}} },
                            ]

                        }
                    }
                    , legend: {
                        show: false
                    }
                });



            </script>

        </div>
    </div>
            

</body>

</html>