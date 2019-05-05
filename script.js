$(document).ready(function(){
    $.ajax({
        type: 'GET',
        url: 'https://randomuser.me/api/?results=5&inc=name,picture&noinfo',
        timeout: 5000,
        dataType: 'json',
        success: (people) => {
            $createNewTab(people.results);
        },
        error: () => {
            console.log("Some Error");
        }
    });

    let $createNewTab = (people) => {
        $.each(people, (index, person)=>{
            $('#names').append(`<li><a href="#tabs-${index+1}">${person.name.first}</a></li>`)
            $('#tabs').append(`<div id="tabs-${index+1}"><img src="${person.picture.large}" alt="${person.name.first}"></div>`);
        });
        $('#tabs').tabs();
    };

});