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
                str+= '<option value="'+ data[i].id +'">' + data[i].name + "</option>";
            }
            $("#namePrice").html(str);
        });
        
        $("#sub").click(function() {
             var cityId = localStorage.getItem("city");
            var date = $("#date").val();
            var time = $("#time").val();
            var dateTime = date + "T" + time + "Z";
            var name = $("#name").val();
            var tel = $("#tel").val();
            var address = $("#adress").val();
            var recivier = $("#adress").val();
            var price = $("#namePrice").val();
            var obj = {
                person: {
                    fulName: name,
                    address: address,
                    phoneNumber: tel,
                    recivier: recivier,
                    dateOfBirth: new Date()
                },
                recInfo: {
                    date: "2017-09-07T14:36:42.823Z",
                    cityId: cityId,
                    priceId: price
                }
            };
            $.ajax({
                url: "http://localhost:50612/receptions/create",
                method: "POST",
                data: obj
            }).done(function(data) {
                console.log(data);
            })
        });
        
    });
})