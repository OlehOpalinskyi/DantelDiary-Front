$(function() {
   loadCity();
   var cityId = localStorage.getItem("city");
    var orderId;
    BuildTable();
    $.ajax({
            url: "http://localhost:50612/pricelist/bycity/" + cityId,
            method: "GET"
        }).done(function(data) {
            var str = "";
            for(var i=0; i<data.length; i++) {
                str+= '<option value="'+ data[i].id +'">' + data[i].name + "</option>";
            }
            $("#work").html(str);
            $("#editWork").html(str);
        });
    
    $.ajax({
                url: "http://localhost:50612/person/all",
                method: "GET"
            }).done(function(data) {
                var str = "";
                for(var i=0; i<data.length; i++) {
                     str+= '<option value="'+ data[i].id +'">' + data[i].fullName + "</option>"
                }
                $("#editUsers").html(str);
            });
    
    $(document).on("click", ".btn-success.btn-xs", function() {
        var id = $(this).data("id");
        orderId = id;
        that = $(this);
    });
    var that;
    $("#pay").click(function() {
        var priceOne = $("#pay1").val() * 1;
        var priceTwo = $("#pay2").val() * 1;
        if(priceTwo == "") {
            $.ajax({
                url: "http://localhost:50612/receptions/pay/" + orderId + "/" + priceOne,
                method: "GET"
            }).done(function(data) {
                $("#pay1").val("");
                $(".close").eq(1).click();
                that.closest("tr").remove();
            });
        }
        else {
            var priceId = $("#work").val() * 1;
            var obj = {
                idOrder: orderId,
                priceOne: priceOne,
                priceId: priceId,
                priceTwo: priceTwo
            };
            
            $.ajax({
                url: "http://localhost:50612/receptions/pay/withorder",
                method: "POST",
                data: obj
            }).done(function(data) {
                $("#pay1").val("");
                $("#pay2").val("");
                $(".close").eq(1).click();
                that.closest("tr").remove();
            });
        }
    });
    
    $(document).on("click", ".btn-primary.btn-xs", function() {
        var id = $(this).data("id");
        orderId = id;
    });
    
    $("#editDiary").click(function() {
        var date = $("#date");
        var time = $("#time");
        var dateTime = date.val() + "T" + time.val() + ":00.764";
        var obj = {
            date: dateTime,
            userId: $("#editUsers").val(),
            priceId: $("#editWork").val()
        };
        $.ajax({
            url: "http://localhost:50612/receptions/edit-diary/" + orderId,
            method: "PUT",
            data: obj
        }).done(function(data) {
            console.log(data);
            date.val("");
            time.val("");
            BuildTable();
            $("#close").click();
        })
    })
    
    $(document).on("click", ".btn-danger.btn-xs", function() {
        var id = $(this).data("id");
        var that = $(this);
        console.log(id);
        $.ajax({
            url: "http://localhost:50612/receptions/delete/" + id,
            method: "DELETE"
        }).done(function(data) {
            that.closest("tr").remove();
        });
    });
    
    function BuildTable() {
        $.ajax({
        url: "http://localhost:50612/receptions/diary/" + cityId,
        method: "GET"
    }).done(function(data) {
        var str = "";
        for(var i=0; i<data.length; i++) {
            var dateTime = new Date(data[i].date);
            var date = dateTime.toLocaleDateString();
            var time = dateTime.toLocaleTimeString();
            str += "<tr><td>" + data[i].customer + "</td><td>" + data[i].priceName + "</td><td>" + data[i].kindOfWork + 
                "</td><td>" + data[i].priceCount + "</td><td>" + date + "</td><td>" + time +"</td>" + 
                '<td class="text-center"><p data-placement="top" data-toggle="tooltip"><button class="btn btn-primary btn-xs" data-id="'+ data[i].id+ '" data-toggle="modal" data-target="#edit"><span class="glyphicon glyphicon-pencil"></span></button></p></td>' + 
                '<td class="text-center"><p data-placement="top" data-toggle="tooltip"><button class="btn btn-danger btn-xs" data-id="'+
                data[i].id+'"><span class="glyphicon glyphicon-trash"></span></button></p></td>' + '<td class="text-center"><p data-placement="top" data-toggle="tooltip"><button class="btn btn-success btn-xs" data-toggle="modal" data-target="#finish" data-id="'+ data[i].id + '"><span class="glyphicon glyphicon-plus"></span></button></p></td></tr>';
            }
        $("#table").html(str);
    });
    }
});