const url="http://213.230.99.101:2027";
var group=null;
var groupId=null;

$(document).ready(function () {



  var table= $("#groupTable").DataTable({

      "language": {
          "lengthMenu": " _MENU_ ta qator",
          "zeroRecords": "Bo'sh",
          "info": "Jami   _PAGE_ dan _PAGES_ ko'rsatilmoqda",
          "infoEmpty": "No records available",
          "infoFiltered": "( _MAX_ tan )"
      },

       ajax:{
           url:`${url}/api/admin/groups`,
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
              title:"Nomi",
              data:"name"
          },
          {
              title:"Kurator",
              data:"tutor"
          },
         

          {
              title:"Amallar",
              data:"id",
              render:id=>(
                  `<div>
             <button class="btn btn-primary " onclick="editGroup(${id})" >Tahrirlash</button>
             <button class="btn btn-danger" onclick="deleteGroup(${id})">O'chirish</button>
</div>`
              )

          },
      ]
    });

   $.ajax({
    url: `${url}/api/admin/tutors`,
    type: 'get',
    dataType:'json',
    success: function(data){
      if (Array.isArray(data)){
               tutors=data;
           }
   
   tutors.fullname(data,function(key, tutorName){
        var option= new Option(tutorName,tutorName);
        $(option).html(tutorName);
        $(".tutorSelect").append(option); 
      });
   }
   })   
   


    $("#showModal").click(function () {
        $("#groupModal").modal("show");
        $("#password").show();

    });

    $("#addGroupBtn").click(function () {
        if (groupId){
            var name=$("#name").val();
            var tutor=$("#tutor").val();
            var groupData={
                name,
                tutor,
            };
            $.ajax({
                url:`${url}/api/admin/group/edit/${groupId}`,
                type:'put',
                dataType:'JSON',
                contentType: "application/json; charset=utf-8",
                data:JSON.stringify(groupData),
                success:function (data) {
                    if (data){
                        $.toast({
                            heading: "Qo'shildi",
                            text: "O'zgartirildi",
                            showHideTransition: 'slide',
                            icon: 'success',
                            position:'top-right'
                        });
                        $("#groupModal").modal("hide");
                        document.querySelector("#groupForm").reset();
                        table.ajax.reload();
                        groupId=null;
                    }else {
                        $.toast({
                            heading: "O'zgarmadi",
                            text: "O'zgarmadi",
                            showHideTransition: 'fade',
                            icon: 'error',
                            position:'top-right'
                        });
                        $("#groupModal").modal("hide")
                        document.querySelector("#groupForm").reset();
                        groupId=null;
                    }
                }
            });
        }else {
            var name=$("#name").val();
            var tutor=$("#tutor").val();

            var group={
                name,
                tutor,
            };

            $.ajax({
                url:`${url}/api/admin/group/save`,
                type:'post',
                dataType:'JSON',
                contentType: "application/json; charset=utf-8",
                data:JSON.stringify(group),
                success:function (data) {
                    if (data){
                        $.toast({
                            heading: "Qo'shildi",
                            text: "Yangi gruppa qo'shildi",
                            showHideTransition: 'slide',
                            icon: 'success',
                            position:'top-right'
                        });
                        $("#groupModal").modal("hide");
                        document.querySelector("#groupForm").reset();
                        table.ajax.reload();
                    }else {
                        $.toast({
                            heading: 'Saqlanmadi',
                            text: "Qo'shilmadi",
                            showHideTransition: 'fade',
                            icon: 'error',
                            position:'top-right'
                        });
                        $("#groupModal").modal("hide")
                        document.querySelector("#groupForm").reset();
                    }
                }
            });
        }
    })
});
function deleteGroup(id) {
    $.ajax({
        url:`${url}/api/admin/group/delete/${id}`,
        type:'delete',
        dataType:'JSON',
        success:function (data) {
            if (data.success){
                $.toast({
                    heading: "O'chirildi",
                    text: "Gruppa o'chirildi",
                    showHideTransition: 'slide',
                    icon: 'success',
                    position:'top-right'
                });
              $("#groupTable").DataTable().ajax.reload();
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

function editGroup(id) {
    var groups=[];
    $.ajax({
        url:`${url}/api/admin/groups`,
        type:'get',
        dataType:'json',
        async:false,
        contentType: "application/json; charset=utf-8",
        success:function (data) {
           if (Array.isArray(data)){
               groups=data;
           }
        }
    })
        group=groups.find(item=>item.id===id);
        if (group){
            groupId=group.id;
            $("#groupModal").modal("show");
            $("#name").val(group.name);
            $("#tutor").val(group.tutor);
        }
    console.log(group)

}