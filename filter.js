$(document).ready(function(){

    $('#reset_filter').click(function() {
        var rows = $('table tbody tr').each(function(i, row) {
            var row = $(row)
            row.show()
        })
    })

    function create_year_buttons() {
        var years = []
        $('table tr td:nth-child(3)').each(function(i, year) {
            var year_value = $(year).text()
            if (!years.includes(year_value)) {
                years.push(year_value)
            }
        })
        years.sort()
        years.forEach(year => {
            $('#filter_section').append($('<button class="filter_by_year">' + year + '</button>'))
        });
    }

    function create_keyword_buttons() {
        var keywords = []
        $('table tr td:nth-child(6)').each(function(i, keyword) {
            var keyword_value = $(keyword).text()
            var splitted_keywords = keyword_value.split(';')
            splitted_keywords.forEach(splitted_keyword => {
                splitted_keyword = splitted_keyword.replace(' ', '')
                if (!keywords.includes(splitted_keyword)) {
                    keywords.push(splitted_keyword)
                }
            })
            
            
        })
        /* keywords.sort() */ 
        keywords = ["behavior","brain_imaging","EEG","MEG", "fMRI", "electrophysiology", "human", "monkey", "rodent", "semantic", "visual", "backpropagation", "learning", "review"]
        /* i overwrite the nice keyword list by the function create_keyword-function here, to sort these keywords - maybe there is another way to do it better.. */
        keywords.forEach(year => {
            $('#filter_section').append($('<button class="filter_by_keyword">' + year + '</button>'))
        });
        $('#filter_section').append($('</br>'))
    }
    
    create_keyword_buttons()
    create_year_buttons()


    function filter_row(value, column_id) {
        var rows = $('table tbody tr').each(function(i, row) {
            var row = $(row)
            row.show()
            if(!row.find("td:eq(" + column_id + ")").text().includes(value)) {
                row.hide()
            }
        })

    }

    function filter_rows_year(value) {
        filter_row(value, 2)
    }

    function filter_rows_keyword(value) {
        filter_row(value, 5)
    }


    $(".filter_by_year").click(function(e){
      var year = $(e.target).text();
      filter_rows_year(year)
    });

    $(".filter_by_keyword").click(function(e){
        var keyword = $(e.target).text();
        filter_rows_keyword(keyword)
      });
});

/*try to only show 15 rows on each page */
    $('#table').DataTable( {
        responsive: true,
        "pageLength": 15
    } );
} );
