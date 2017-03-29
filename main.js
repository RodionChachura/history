const container = document.querySelector('.gallery');
const content = document.querySelector('.content');
const defaultTitle = 'KISS'

let data = {};
$.getJSON('data.json', (parsed) => {
    data = parsed;
})


container.addEventListener('click', (e) => {
    if (e.target != e.currentTarget) {
        e.preventDefault();

        const key = e.target.id;
        const url = '#' + key;
        history.pushState(key, null, url);

        select(key);
    }
});


function select(key){
    content.textContent = data[key].bio;
    const name = data[key].name
    const bio = data[key].bio;

    document.title = name;
    Object.keys(data).forEach((v) => {
        $(`#${v}`).addClass('faded');
    });
    $(`#${key}`).removeClass('faded');

    $('p:contains('+name+')').html((_, html) => {
        return html.replace(new RegExp(name, 'g'), '<span class=selected>'+name+'</span>');
        console.log('alert')
    });
}

window.addEventListener('popstate', (e) => {
    const key = e.state;

    if (key === null) {
        content.innerHTML = '';
        document.title = defaultTitle;
    } else {
        select(key);
    }
});




