// fix list fontsizes
// input field should hide when clicked outside of it

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
    $('input').focus()
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
    $('.input-shade').mouseup(function(e){
        let container = $('.input-wrapper');
        if (!container.is(e.target) && container.has(e.target).length === 0){
            $('.input-shade').css('display','none');
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
    for(let i = 0; i < dbox.length; i++)(function(i){ 
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
    let lbox = $('.input-value');
    for(let i = 0; i < lbox.length; i++){ 
        lbox[i].onclick = function(){
            $('.todo-section').append(
                `
                <div class="list-detailed">
                    <span>${arr[i].toString()}</span>
                    <button id="editButton">edit</button>
                    <button id="deleteButton">delete</button>
                </div>
                `
            )
            $('#deleteButton').on('click', function(){
                lbox[i].parentNode.remove();
                arr.splice(parseInt(lbox[i].parentNode.children[0].innerText) - 1, 1)
                for(let a = 0; a < arr.length; a++) {
                    $('.id-selector')[a].innerText =(`${a+1}`);
                    counter = arr.length;
                }
                if(arr.length == 0) {
                    counter = 0
                }
                $('.list-detailed').remove();
            })
            $('#editButton').on('click', function(){
                $(this).parent().find('span').attr('contentEditable', true);
                $(this).parent().find('span').focus();
                $('#editButton').text('apply');
                $('#editButton').on('click', function(){
                    if($(this).parent().find('span').text().length > 13) {
                        lbox[i].innerText = `${$(this).parent().find('span').text().slice(0, 13)}...`;
                    } else {
                        lbox[i].innerText = $(this).parent().find('span').text();
                    }
                    if($('#editButton').text() == 'apply') {
                        $('.list-detailed').remove();
                    }
                })
                arr.splice(i, 1, `${$(this).parent().find('span').text()}`);
            })
        }
    }
    $(document).mouseup(function(e){
        let container = $('.list-detailed');
        if (!container.is(e.target) && container.has(e.target).length === 0){
            $('.list-detailed').remove();
        }
    });
    $('.input-shade').css('display','none')
    if($('.input-value')[$('.input-value').length - 1].innerText.length > 13){
        $('.input-value')[$('.input-value').length - 1].innerText = `${$('.input-value')[$('.input-value').length - 1].textContent.slice(0, 13)}...`;
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