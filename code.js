let arr = [];
let counter = 0;
$('#add').on('click', function(){
    if($('input').val().length > 0) {
        counter++;
        arr.push($('input').val())
        $('.list').append(`<li><span class="id-selector" id="id">${counter}</span>. ${$('input').val()} <span class="delete-button">X</span></li>`)
        $('input').val('')
    }
    let dbox = $('.delete-button');
    for ( var i = 0; i < dbox.length; i++)(function(i){ 
        dbox[i].onclick = function() {
            arr.splice(parseInt($(this).parent().find('#id').text()) - 1, 1)
            this.closest('li').remove();
            for(let a = 0; a < arr.length; a++) {
                $('.id-selector')[a].innerText =(`${a+1}`);
                counter = arr.length;
            }
        }
    })(i);
})
