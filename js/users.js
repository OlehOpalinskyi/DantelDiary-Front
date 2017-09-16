$(function() {
    loadCity();
    BuildTable();
    
    $(document).on("click", ".btn-danger.btn-xs", function() {
        var id = $(this).data("id");
        var that = $(this);
        $.ajax({
            url: "http://localhost:50612/person/delete/" + id,
            method: "DELETE"
        }).done(function(data) {
            that.closest("tr").remove();
        });
    });
    
    $(document).on("click", ".btn-info", function() {
            var id = $(this).data("id");
            $.ajax({
                url: "http://localhost:50612/person/" + id,
                method: "get"
            }).done(function(data) {
                var dob = new Date(data.dateOfBirth).toLocaleDateString();
                var fVisit = new Date(data.firstVisit).toLocaleDateString();
                var lVisit = new Date(data.lastVisit).toLocaleDateString();
                $("#name").val(data.fullName);
                $("#phone").val(data.phoneNumber);
                $("#email").val(data.email);
                $("#address").val(data.address);
                $("#dob").val(dob);
                $("#fVisit").val(fVisit);
                $("#lVisit").val(lVisit);
                $("#debt").val(data.debt);
                $("#complaints").val(data.complaints);
                $("#lastTreatment").val(data.lastTreatment);
                $("#lastDiagnosis").val(data.lastDiagnosis);
                $("#finishDiagnosis").val(data.finalDiagnosis);
                $("#advice").val(data.anotherOpinion);
                $("#treatment").val(data.treatment);
            });
        });
    
    $("#save").click(function() {
        var obj = {
            
        }
    });
    
    function BuildTable() {
        $.ajax({
            url: "http://localhost:50612/person/all",
            method: "GET"
        }).done(function(data) {
            var count = data.length;
            $("#count").html(count);
            var str = "";
            for(var i=0; i<count; i++) {
                str += "<tr><td>" + data[i].fullName + "</td><td>" + data[i].address + "</td><td>" + data[i].email + "</td><td>" + data[i].phoneNumber + '</td><td><p data-placement="top" data-toggle="tooltip"><button class="btn btn-danger btn-xs" data-id="'+ data[i].id + '"><span class="glyphicon glyphicon-trash"></span></button></p></td>' + '<td><button data-toggle="modal" data-target="#pacient" type="button" class="btn-info" data-id="'+ data[i].id + '">Карточка</button></td></tr>';
                $("#table").html(str);
            }
        });
    }
})