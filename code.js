$(document).ready(function(){
    $('.todo-list').append(
        `
        <div class="date-header">
            <div class="date-display">
                <span class="date-${classArr[0]}">${datearr[0]}</span>
                <span class="date-aside">
                    <span class="date-${classArr[1]}">${datearr[1]}</span>
                    <span class="date-${classArr[2]}">${datearr[2]}</span>
                </span>
            </div>
            <span class="day-display-text">${datearr[3]}</span>
        </div>
        `
    )
})
let arr = [];
let counter = 0;
$('#add').on('click', function(){
    $('.input-shade').css('display','block')
    $('#addToList').on('click', function(){
        if($('input').val().length > 0) {
            updateList();
        }
    })
    $('input').bind('keypress', function(e) {
        let code = e.keyCode || e.which;
        if(code == 13 && $('input').val().length > 0) {
            updateList();
        }
    });
})

function updateList() {
    counter++;
    arr.push($('input').val())
    $('.list').append(`<li><span class="id-selector" id="id">${counter}</span>. <span class="input-value">${$('input').val()}</span> <span class="delete-button">X</span></li>`)
    $('input').val('')
    if($('.list').children().length > 8) {
        $('.list-wrapper').css('overflow-y', 'scroll');
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
            if(arr.length == 0) {
                counter = 0
            }
        }
    })(i);
    $('.input-shade').css('display','none')
    if($('.input-value').text().length > 15){
        $('.input-value')[$('.input-value').length - 1].innerText = $('.input-value')[$('.input-value').length - 1].textContent.slice(0, 14);
    };
}

let datearr = [];
let classArr = ['dd', 'mm', 'yyyy']
function currentDate(date) {
    date = new Date();
    let dd = String(date.getDate()).padStart(2, '0');
    let ddstr = String(date.toLocaleDateString('default', { weekday: 'long' }));
    let mm = String(date.toLocaleString('default', { month: 'short' }));
    let yyyy = date.getFullYear();
    datearr.push(dd,mm,yyyy,ddstr)
}
currentDate()