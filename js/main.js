$(document).ready(function () {
    var postsDiv=$(".posts");
    $.ajax({
        url:'https://jsonplaceholder.typicode.com/posts',
        type:'get',
        dataType:'JSON',
        success:function (data) {
           if (data && Array.isArray(data)){
               data.map(function (item) {
                 postsDiv.append($(`<div class="col-4">
    <h3><a href="post_detail.html?${item.id}">${item.title}</a></h3>
<hr>
<p>${item.body.slice(0,36)} ... </p>
</div>`))
               })
           }
        },
        error:function (error) {
           alert("Server bn bog'lanishda xatolik")
        }
    })
})


