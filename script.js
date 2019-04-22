$(document).ready(function(){

    const btnAdd = $('#add');
    const btnSub = $('#btnSub');
    const formAdd = $('#addForm');
    const inpName = $('#name');
    const inpCost = $('#cost');
    let tbody = $('#tbody');
    let btnsRemove = $('.btn--remove');
    let diagArray = $('.diagram');

// --- Функции --- //

    function refreshRemoveButtons() {
        Array.from(btnsRemove).each((btn) => {
            btn.click((event) => {
                event.preventDefault();
                let target = btn.parentElement.parentElement;
                target.remove();
                addDiagram();
            });
        });
    }

    function refreshDiagrams() {
        Array.from(diagArray).each((diag) => {
            diag.mouseover((event) => {
                $(diag + '.diagram__cost').css('display', 'block');
            });
            diag.mouseout((event) => {
                $(diag + '.diagram__cost').css('display','none')
            });
        });
    }

    function addDiagram() {
        let dataArray = [];
        let maxValue = [-9999,0];
        let index = 0;
        const elements = $('#tbody tr');
        elements.each(function () {
            const name = $(this).children('td:nth-child(2)').text();
            const cost = parseInt($(this).children('td:last-child').text());
            maxValue[0] < cost ? maxValue = [cost,index] : '';
            dataArray[index++] = [name,cost];
        });

        const diagramsArray = $('.diagram');
        diagramsArray.each((diag)=>{diag.remove()});

        dataArray.each(function(index) {
            let diagram = document.createElement('div');
            let diagName = document.createElement('p');
            let diagCost = document.createElement('p');
            let diagBlock = document.createElement('span');
            let diagrams = document.querySelector('.diagrams__list');

            diagName.innerText = $(this)[0];
            diagCost.innerText = $(this)[1];

            diagName.className = 'diagram__name';
            diagCost.className = 'diagram__cost';
            diagram.className = 'diagram diagram--' + index;
            diagBlock.className = 'diagram__block';

            diagCost.style.display = 'none';

            diagram.appendChild(diagName);
            let showDiag = diagram.appendChild(diagBlock);
            diagram.appendChild(diagCost);
            diagrams.appendChild(diagram);
            if(maxValue[1] === index) {
                showDiag.style.height = '0%';
                setTimeout(()=>{showDiag.style.height = '100%'} ,100+index*10);

            } else {
                showDiag.style.height = '0%';
                setTimeout(()=>{showDiag.style.height = el[1] / maxValue[0] * 100 + '%'} ,100+index*10);

            }
        });

        diagArray = document.querySelectorAll('.diagram');
    }

    function changeParam(elem) {
        const newParam = prompt('Задайте новое значение', '');
        elem.innerText = newParam;
        addDiagram();
    }

// --- END:Функции --- //

// --- События --- //


    btnAdd.click(() => {
        formAdd.classList.toggle('show');
    });

    btnSub.click((event) => {
        event.preventDefault();

        const newName = inpName.value;
        const newCost = inpCost.value;

        let record = document.createElement('tr');
        let btnDel = document.createElement('td');
        let name = document.createElement('td');
        let cost = document.createElement('td');
        let linkDel = document.createElement('a');

        linkDel.className = 'btn btn-danger btn--remove';
        linkDel.setAttribute('href','#');
        name.setAttribute('onclick','changeParam(this)');
        cost.setAttribute('onclick','changeParam(this)');


        linkDel.innerText = 'Удалить';
        name.innerText = newName;
        cost.innerText = newCost;

        btnDel.appendChild(linkDel);
        record.appendChild(btnDel);
        record.appendChild(name);
        record.appendChild(cost);
        tbody.appendChild(record);

        btnsRemove = tbody.querySelectorAll('.btn--remove');
        addDiagram();

        inpName.value = '';
        inpCost.value = '';
    });

    $('html').click(() => {
        refreshRemoveButtons();
        refreshDiagrams();
    });

// --- END:События --- //


    addDiagram();
    refreshDiagrams();
    refreshRemoveButtons();

});