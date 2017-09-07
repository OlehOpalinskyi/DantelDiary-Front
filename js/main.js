$(function() {
    loadCity();
    $(document).on("click", '#cities li', function() {
        var id = $(this).find('a').data("id");
        localStorage.setItem("city", id);
        $(".active").removeClass("active");
        $(this).addClass("active");
    });
    
    $("#reception").click(function() {
        var cityId = localStorage.getItem("city");
        $.ajax({
            url: "http://localhost:50612/pricelist/bycity/" + cityId,
            method: "GET"
        }).done(function(data) {
            var str = "";
            for(var i=0; i<data.length; i++) {
                str+= '<option data-id="'+ data[i].id +'">' + data[i].name + "</option>";
            }
            $("#namePrice").html(str);
        });
        
        $("#sub").click(function() {
            var date = $("#date").val();
            var time = $("#time").val();
            var dateTime = new Date(date + "T" + time + "Z");
            
        });
        
    });
})