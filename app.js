const API = 'https://acme-users-api-rev.herokuapp.com/api/'

const dataPromise = Promise.all([axios.get(`${API}companies`), axios.get(`${API}products`)])
    .then(responses => {
        return {Companies: responses[0].data, Products: responses[1].data}
    })


dataPromise.then(result => {
    window.location.hash = '#Companies'
    renderNav(result)
    renderTable(result)
})

// const hash = window.location.hash.slice(1)

function renderNav (data) {
    const hash = window.location.hash.slice(1)
    let navTabs = Object.entries(data).map(entry => {
        [tabName, tabList] = entry
        return `
        <li class="nav-item ${hash === tabName ? 'active' : ''}">
            <a class="nav-link" href="#${tabName}">${tabName} (${tabList.length})</a>
        </li>`
    }).join('')

    document.querySelector('ul').innerHTML = navTabs
}

function renderTable (data) {
    const hash = window.location.hash.slice(1)
    let tableData = data[hash]

    let header = Object.keys(tableData[0]).map(key => {
        return `<th>${key}</th>`
    }).join('')

    header = `<tr>${header}</tr>`
    document.querySelector('thead').innerHTML = header

    console.log(tableData)
}

