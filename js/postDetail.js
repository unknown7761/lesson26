$(document).ready(function () {
   var id=window.location.search.slice(1);
    $.ajax({
        url:`https://jsonplaceholder.typicode.com/posts/${id}`,
        type:'get',
        dataType:'JSON',
        success:function (data) {
            if (data){
              $(".post-title").text(data.title);
              $(".post-body").text(data.body);
            }
        }
    })
})