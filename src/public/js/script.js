console.log("Client side javascript is loaded")
const loginTesting = document.getElementById('loginTesting')
const querryTesting = document.getElementById('querryTesting')

loginTesting.addEventListener('click', (e) => {
    e.preventDefault()
    fetch("/loginTesting", {
        method: 'GET',
    }).then((response) => {
        console.log(response)
    })
})

querryTesting.addEventListener('click', (e) => {
    e.preventDefault()
    fetch("/querryDB", {
        method: 'GET',
    }).then((response) => {
        console.log(response)
    })
})