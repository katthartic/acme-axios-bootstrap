const API = 'https://acme-users-api-rev.herokuapp.com/api/'

const dataPromise = Promise.all([axios.get(`${API}products`), axios.get(`${API}companies`)])
    .then(responses => {
        return {Products: responses[0].data, Companies: responses[1].data}
    })

let hash = window.location.hash.slice(1)


function render() {
    dataPromise.then(data => {

        if (!(hash in data)) { //check if hash is a key in data
            window.location.hash = '#Products' //default hash to first tab
        }
        hash = window.location.hash.slice(1) //retrieve hash again (in case it was corrected above)
        
        renderNav(data, hash)
        renderTable(data, hash)
    })
}

function renderNav (data, hash) {
    //render nav tabs using keys from data (ie. Products and Companies)
    let navTabs = Object.entries(data).map(entry => {
        [tabName, tabList] = entry
        return `
            <li class="nav-item">
                <a class="nav-link ${hash === tabName ? 'active' : ''}" href="#${tabName}">${tabName} (${tabList.length})</a>
            </li>`                                 // ^ ternary operator makes tab active if it matchs the hash

    }).join('')

    document.querySelector('ul').innerHTML = navTabs
}

function renderTable (data, hash) {
    let tableData = data[hash] //use hash to match data to the list of products or companies

    //render table header using first item in array as a template
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