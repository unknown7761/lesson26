const url="http://213.230.99.101:2027";
var tutorsArray=[];
var editTutorObject=null;
$(document).ready(function () {
getData();
    $("#addTutor").click(function () {
        $("#addTutorModal").modal("show");
        $(".password-label").show();
    });

    $("#saveTutor").click(function () {
    if (editTutorObject===null){
        var fullname=$("#fullname").val();
        var username=$("#username").val();
        var password=$("#password").val();
        var address=$("#address").val();

        var tutor={
            fullname:fullname,
            username:username,
            password:password,
            address:address
        }
        
        $.ajax({
            url:`${url}/api/admin/tutor/save`,
            type:'post',
            dataType:'JSON',
            contentType: "application/json; charset=utf-8",
            data:JSON.stringify(tutor),
            success:function (data) {
                if (data){
                    $.toast({
                        heading: "Qo'shildi",
                        text: "Yangi kuratr qo'shildi",
                        showHideTransition: 'slide',
                        icon: 'success',
                        position:'top-right'
                    });
                    $("#addTutorModal").modal("hide");
                    document.querySelector("#tutorForm").reset();
                    getData();

                }else {
                    $.toast({
                        heading: 'Saqlanmadi',
                        text: "Qo'shilmadi",
                        showHideTransition: 'fade',
                        icon: 'error',
                        position:'top-right'
                    });
                    $("#addTutorModal").modal("hide")
                    document.querySelector("#tutorForm").reset();
                }
            }
        });
    }else {
        var fullname=$("#fullname").val();
        var username=$("#username").val();
        var address=$("#address").val();

        var tutor={
            fullname:fullname,
            username:username,
            address:address
        }

        $(".password-label").hide();
        $.ajax({
            url:`${url}/api/admin/tutor/edit/${editTutorObject.id}`,
            type:'put',
            dataType:'JSON',
            contentType: "application/json; charset=utf-8",
            data:JSON.stringify(tutor),
            success:function (data) {
                if (data){
                    $.toast({
                        heading: "Qo'shildi",
                        text: "Yangi kuratr qo'shildi",
                        showHideTransition: 'slide',
                        icon: 'success',
                        position:'top-right'
                    });
                    $("#addTutorModal").modal("hide");
                    document.querySelector("#tutorForm").reset();
                    getData();

                }else {
                    $.toast({
                        heading: 'Saqlanmadi',
                        text: "Qo'shilmadi",
                        showHideTransition: 'fade',
                        icon: 'error',
                        position:'top-right'
                    });
                    $("#addTutorModal").modal("hide")
                    document.querySelector("#tutorForm").reset();
                }
            }
        })

    }


    })




});
function getData() {
    $.ajax({
        url:`${url}/api/admin/tutors`,
        type:'get',
        dataType:'JSON',
        // async:true,
        contentType: "application/json; charset=utf-8",
        success:function (data) {
            if (data && Array.isArray(data)){
                tutorsArray=data;
                var tutors= $(".tutors");
                tutors.html("");
                data.map(function (item) {
                    tutors.append($(`<tr>
            <th scope="row">${item.id}</th>
            <td>${item.fullname}</td>
            <td>${item.username}</td>
            <td>${item.address}</td>
            <td><button class="btn btn-danger" onclick="deleteTutor(${item.id})">Delete</button>
            <button class="btn btn-primary" onclick="editTutor(${item.id})" >Edit</button>
            </td>
        </tr>`));
                })
            }
        }
    });
}
function deleteTutor(id) {
    $.ajax({
        url:`${url}/api/admin/tutor/delete/${id}`,
        type:'delete',
        dataType:'JSON',
        success:function (data) {
            if (data.success){
                $.toast({
                    heading: "O'chirildi",
                    text: "Kuratr o'chirildi",
                    showHideTransition: 'slide',
                    icon: 'success',
                    position:'top-right'
                });
                getData();
            }else {
                $.toast({
                    heading: "O'chirilmadi",
                    text: "O'chirilmadi",
                    showHideTransition: 'fade',
                    icon: 'error',
                    position:'top-right'
                });
            }
        }
    })


}


function editTutor(id) {
    var tutor=tutorsArray.find(item=>item.id===id);
     editTutorObject=tutor;
    $("#addTutorModal").modal("show");

    $("#fullname").val(tutor.fullname);
    $("#username").val(tutor.username);
    $("#address").val(tutor.address);

    $(".password-label").hide();
}