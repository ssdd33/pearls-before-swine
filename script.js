const $input = document.getElementById('input');
const $btnTest = document.getElementById('test');
const $btnCheck = document.getElementById('check');
const $btnVocabulary = document.querySelector('#vocabulary');
const $btnBack = document.getElementById('back');
const $page = document.querySelector('#page');
let previous = document.querySelector('#page');



const storage = [];


$input.addEventListener('keydown', function (event) {

    if (event.key === 'Enter') {


        if ($input.value.includes('/')) {
            $input.value.split('/').forEach(voca => {
                storage.push(voca.split(','))
            })
        }
        else {
            storage.push($input.value.split(','))

        }
        $input.value = '';
        console.log(storage)
    }



})

$btnTest.addEventListener('click', function () {
    $input.classList.add('none');
    $btnCheck.classList.remove('none');
    $btnVocabulary.classList.remove('none');
    $page.innerHTML = '';

    for (let fromIdx = 0; fromIdx < storage.length; fromIdx++) {
        const toIdx = Math.floor(Math.random() * storage.length);
        let temp = storage[fromIdx];
        storage[fromIdx] = storage[toIdx];
        storage[toIdx] = temp;
    }

    storage.forEach((voca) => {
        let $voca = document.createElement('div');
        $voca.classList.add('voca');
        $voca.textContent = voca[0];
        let $blank = document.createElement('input');
        $blank.classList.add('blank');
        $voca.append($blank);
        $page.append($voca);

    })
})

$btnCheck.addEventListener('click', function () {

    const $vocas = document.querySelectorAll('.voca');

    for (let i = 0; i < $vocas.length; i++) {
        console.log($vocas[i].querySelector('input').value.split(','))
        console.log(storage[i].slice(1, storage[i].length))
        if (!($vocas[i].querySelector('input').value.split(',').every((voca) => {
            return storage[i].slice(1, storage[i].length).includes(voca)

        }))) {

            $vocas[i].querySelector('input').classList.add('uncorrect');
        }
        else {
            $vocas[i].querySelector('input').classList.remove('uncorrect');
        }
    }

})

$btnVocabulary.addEventListener('click', () => {
    previous = document.querySelector('#page');
    $page.innerHTML = '';
    $btnCheck.classList.add('none');
    // $btnBack.classList.remove('none');
    storage.forEach((voca) => {
        let [head, ...tail] = voca;
        let div = document.createElement('div');
        div.textContent = `${[head]}: ${[tail]}`
        $page.append(div);
    })
})

// $btnBack.addEventListener('click', () => {
//     $btnCheck.classList.remove('none');
//     $btnBack.classList.add('none');
//     $page.innerHTML = previous;
// })

    // if (!storage[i].slice(1, storage[i].length).includes(...$vocas[i].querySelector('input').value.split(',')))
