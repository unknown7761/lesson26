const url="http://213.230.99.101:2027";
var student=null;
var studentId=null;

$(document).ready(function () {



  var table= $("#studentTable").DataTable({

      "language": {
          "lengthMenu": " _MENU_ ta qator",
          "zeroRecords": "Bo'sh",
          "info": "Jami   _PAGE_ dan _PAGES_ ko'rsatilmoqda",
          "infoEmpty": "No records available",
          "infoFiltered": "( _MAX_ tan )"
      },

       ajax:{
           url:`${url}/api/admin/students`,
           type:'get',
           dataType:'json',
           contentType: "application/json; charset=utf-8",
           dataSrc:''
       },
      columns:[
          {
              title:"Id",
              data:"id"
          },
          {
              title:"F.I.SH",
              data:"fullname"
          },
          {
              title:"Username",
              data:"username"
          },
          {
              title:"Manzil",
              data:"address"
          },
          {
              title:"Saqlangan vaqti",
              data:"createAt",
              render:function (createAt) {
                 var date=new Date(createAt);
                 var res=date.getDay()+'.'+(date.getMonth()+1)+'.'+date.getFullYear();
                 return res;
              }

          },

          {
              title:"Amallar",
              data:"id",
              render:id=>(
                  `<div>
             <button class="btn btn-primary " onclick="editStudent(${id})" >Tahrirlash</button>
             <button class="btn btn-danger" onclick="deleteStudent(${id})">O'chirish</button>
</div>`
              )

          },
      ]
    });

    $("#showModal").click(function () {
        $("#studentModal").modal("show");
        $("#password").show();

    });

    $("#addStudentBtn").click(function () {
        if (studentId){
            var fullname=$("#fullname").val();
            var username=$("#username").val();
            var password="jjjjjjjj";
            var address=$("#address").val();
            var studentData={
                fullname,
                username,
                password,
                address
            };
            $.ajax({
                url:`${url}/api/admin/student/edit/${studentId}`,
                type:'put',
                dataType:'JSON',
                contentType: "application/json; charset=utf-8",
                data:JSON.stringify(studentData),
                success:function (data) {
                    if (data){
                        $.toast({
                            heading: "Qo'shildi",
                            text: "O'zgartirildi",
                            showHideTransition: 'slide',
                            icon: 'success',
                            position:'top-right'
                        });
                        $("#studentModal").modal("hide");
                        document.querySelector("#studentForm").reset();
                        table.ajax.reload();
                        studentId=null;
                    }else {
                        $.toast({
                            heading: "O'zgarmadi",
                            text: "O'zgarmadi",
                            showHideTransition: 'fade',
                            icon: 'error',
                            position:'top-right'
                        });
                        $("#studentModal").modal("hide")
                        document.querySelector("#studentForm").reset();
                        studentId=null;
                    }
                }
            });
        }else {
            var fullname=$("#fullname").val();
            var username=$("#username").val();
            var password=$("#password").val();
            var address=$("#address").val();

            var student={
                fullname,
                username,
                password,
                address
            };

            $.ajax({
                url:`${url}/api/admin/student/save`,
                type:'post',
                dataType:'JSON',
                contentType: "application/json; charset=utf-8",
                data:JSON.stringify(student),
                success:function (data) {
                    if (data){
                        $.toast({
                            heading: "Qo'shildi",
                            text: "Yangi student qo'shildi",
                            showHideTransition: 'slide',
                            icon: 'success',
                            position:'top-right'
                        });
                        $("#studentModal").modal("hide");
                        document.querySelector("#studentForm").reset();
                        table.ajax.reload();
                    }else {
                        $.toast({
                            heading: 'Saqlanmadi',
                            text: "Qo'shilmadi",
                            showHideTransition: 'fade',
                            icon: 'error',
                            position:'top-right'
                        });
                        $("#studentModal").modal("hide")
                        document.querySelector("#studentForm").reset();
                    }
                }
            });
        }
    })
});
function deleteStudent(id) {
    $.ajax({
        url:`${url}/api/admin/student/delete/${id}`,
        type:'delete',
        dataType:'JSON',
        success:function (data) {
            if (data.success){
                $.toast({
                    heading: "O'chirildi",
                    text: "Student o'chirildi",
                    showHideTransition: 'slide',
                    icon: 'success',
                    position:'top-right'
                });
              $("#studentTable").DataTable().ajax.reload();
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

function editStudent(id) {
    var students=[];
    $.ajax({
        url:`${url}/api/admin/students`,
        type:'get',
        dataType:'json',
        async:false,
        contentType: "application/json; charset=utf-8",
        success:function (data) {
           if (Array.isArray(data)){
               students=data;
           }
        }
    })
        student=students.find(item=>item.id===id);
        if (student){
            studentId=student.id;
            $("#studentModal").modal("show");
            $("#fullname").val(student.fullname);
            $("#username").val(student.username);
            $("#password").hide();
            $("#address").val(student.address);
        }
    console.log(student)

}