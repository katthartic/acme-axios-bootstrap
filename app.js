const API = 'https://acme-users-api-rev.herokuapp.com/api/'

const dataPromise = Promise.all([axios.get(`${API}products`), axios.get(`${API}companies`)])
    .then(responses => {
        return {Products: responses[0].data, Companies: responses[1].data}
    })

let hash = window.location.hash.slice(1)


function render() {
    dataPromise.then(result => {
        
        if (!(hash in result)) {
            window.location.hash = '#Products' //default hash
        }
        hash = window.location.hash.slice(1)
        
        renderNav(result, hash)
        renderTable(result, hash)
    })
}

function renderNav (data, hash) {
    let navTabs = Object.entries(data).map(entry => {
        [tabName, tabList] = entry

        return `
            <li class="nav-item ${hash === tabName ? 'active' : ''}">
                <a class="nav-link" href="#${tabName}">${tabName} (${tabList.length})</a>
            </li>`

    }).join('')

    document.querySelector('ul').innerHTML = navTabs
}

function renderTable (data, hash) {
    let tableData = data[hash]

    //render table header
    let header = Object.keys(tableData[0]).map(key => {
        return `<th>${key}</th>`
    }).join('')

    header = `<tr>${header}</tr>`
    document.querySelector('thead').innerHTML = header

    //render table rows
    let rows = tableData.map(obj => {
        const row = Object.values(obj).map(value => {
            return `<td>${value}</td>`
        }).join('')
        return `<tr>${row}</tr>`
    }).join('')

    document.querySelector('tbody').innerHTML = rows
}

window.addEventListener('hashchange', () => {
    render()
})

render()


//Attempted code
// let active = ''
// if (hash === tabName) active = 'active'
// return `
// <li class="nav-item ${active}">
//     <a class="nav-link" href="#${tabName}">${tabName} (${tabList.length})</a>
// </li>`