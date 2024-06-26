$(document).ready(function() {
      $('.sortable').click(function() {
        var table = $(this).parents('table').eq(0);
        var rows = table.find('tr:gt(0)').toArray().sort(comparer($(this).index()));
        this.asc = !this.asc;
        if (!this.asc) {
          rows = rows.reverse();
        }
        table.children('tbody').empty().html(rows);
      });

       $("#update_params").click(function(){
       var checked_rows = [];
        var checked = $("#PortfolioTable tr").filter(':has(:checkbox:checked)').find('td:eq(1)');
        checked.each(function() {
            checked_rows.push(this.textContent);
        });
        $('#portfolios').val(checked_rows);
        console.log($('#portfolios').val);
        $('#updateValues').submit();

    });

    });

function comparer(index) {
    return function(a, b) {
        var valA = getCellValue(a, index), valB = getCellValue(b, index)
        return $.isNumeric(valA) && $.isNumeric(valB) ? valA - valB : valA.toString().localeCompare(valB)
    }
}

function getCellValue(row, index) {
  return $(row).children('td').eq(index).text();
}


function getCheckedRows() {
    var checked_rows = [];
        var checked = $("#PortfolioTable tr").filter(':has(:checkbox:checked)').find('td:eq(1)');
        checked.each(function() {
            checked_rows.push(this.textContent);
        });
       return checked_rows
}