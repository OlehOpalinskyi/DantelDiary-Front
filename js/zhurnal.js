$(function() {
   loadCity();
   var cityId = localStorage.getItem("city");
    $.ajax({
        url: "http://localhost:50612/receptions/bycity/" + cityId,
        method: "GET"
    }).done(function(data) {
        console.log(data);
        for(var i=0; i<data.length; i++) {
            var dateTime = new Date(data[i].date);
            console.log(dateTime.getDate());
        }
    });
});