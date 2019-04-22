$(document).ready(function(){
    let img = $('#img');
    let width = $('#width');
    let height = $('#height');
    let borderWeight = $('#borderWeight');
    let borderColor= $('#borderColor');
    let alt = $('#text');
    let form = $('.validate').validate();
    const btn = $('#change');

    width.val(parseInt(img.css('width')));
    height.val(parseInt(img.css('height')));
    borderWeight.val(parseInt(img.css('borderWidth')));
    borderColor.val(img.css('borderColor'));
    alt.val(img.attr('alt'));


    $.validator.addClassRules({
        width : {
            required: true,
            minlength: 2
        }
    });

    $('.validate').change(()=>{form.form();})


    btn.click((event)=>{
        event.preventDefault();

        console.log(width.val());
        img.css('width', width.val());
        img.css('height', height.val());
        img.css('border', `${borderWeight.val()}px solid ${borderColor.val()}`);
        img.prop('alt', alt.val());
        form.form();
    });


});