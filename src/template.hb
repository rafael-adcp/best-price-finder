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
    {{#each graphs}}
        <div class="row">
        <div class="col-sm-12">
            <div id="{{id}}"></div>
            <script>
                var chart = bb.generate({
                    data: {
                        columns:
                            {{{ data }}}      
                    },

                bindto: '#{{id}}',
                    title: {
                    text: '{{title}}'
                },
                tooltip: {
                    order: 'ASC'
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
    {{/each}}







</body>

</html>