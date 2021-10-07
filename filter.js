$(document).ready(function(){

    function show_all_rows() {
        var rows = $('table tbody tr').each(function(i, row) {
            var row = $(row)
            row.show()
        })
    }
    
    function uncheck_buttons() {
	    $('input[type=checkbox]').each(function(button) {
	    	this.checked = false
	    })
    }
    
    $('#reset_filter').click(function() {
        show_all_rows()
        uncheck_buttons()
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
            $('#filter_section').append($('<label><input type="checkbox" class="years" id="'+ year + '" value="' + year + '"><span class="filter_by_year">' + year + '</span></label>'))
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
        keywords.forEach(keyword => {
            $('#filter_section').append($('<label><input type="checkbox" class="keywords" id="'+ keyword + '" value="' + keyword + '"><span class="filter_by_keyword">' + keyword + '</span></label>'))
        });
        $('#filter_section').append($('</br>'))
    }
    
    create_keyword_buttons()
    create_year_buttons()


    function filter_rows(years, keywords) {
        show_all_rows()
        var rows = $('table tbody tr').each(function(i, row) {
            var row = $(row)
            var year_text = row.find("td:eq(2)").text() 
            var keyword_text = row.find("td:eq(5)").text() 
            var row_has_year_value = false;
            var row_has_keyword_value = false;

            years.forEach(function(year) {
		if(year_text == year) {
		      row_has_year_value = true
		}
            })
            
            keywords.forEach(function(keyword) {
		if(keyword_text.includes(keyword)) {
		      row_has_keyword_value = true
		        	
		}
            })
            
            if(!row_has_keyword_value && keywords.length != 0) {
            	row.hide()
            } else if (!row_has_year_value && years.length != 0) {
                row.hide()
            }
        })

    }
 

    $("input").change(function(e){
      var years = []
      $('input[type=checkbox].years').each(function(button) {
        if(this.checked) {
            years.push(this.value)
        }
      })
      
      var keywords = []
      $('input[type=checkbox].keywords').each(function(button) {
        if(this.checked) {
            keywords.push(this.value)
        }
      })
      filter_rows(years, keywords)

    });

});
