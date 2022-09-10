const addProduct = () => {
    const pName = getValueById("product-name")
    const pQuantity = parseInt(getValueById("product-quantity"))

    // console.log(typeof)
    if (!isNaN(pName) || !Number.isInteger(pQuantity)) {
        alert('Input proper name and quantity')
        return
    }


    setLSData(pName, pQuantity)
    display()

}

const getValueById = (id) => {
    const inputField = document.getElementById(id)
    const inputValue = inputField.value
    inputField.value = ""
    return inputValue
}

const getLSData = () => {
    const data = localStorage.getItem("products")
    const parseData = JSON.parse(data)
    return parseData
}

const setLSData = (name, quantity) => {
    let products = getLSData()

    if (!products) {
        products = {}
    }
    if (products[name]) {
        products[name] = products[name] + quantity


        if (products[name] < 0) {
            alert('quantities can not be negative')
            return
        }
    }

    else { products[name] = quantity }


    localStorage.setItem("products", JSON.stringify(products))
}

const display = () => {
    const productSection = document.getElementById("all-products")
    const allProducts = getLSData()
    productSection.textContent = ``
    for (const product in allProducts) {
        // console.log(product, allProducts[product])
        const div = document.createElement("div")

        div.innerHTML = `
<div class="shadow-sm p-3 mb-2 bg-body rounded" id="test" onclick="deleteProduct('${product}')">
            <span class="fs-1">${product}</span>
            Quantity:<small class="fw-bold">
                ${allProducts[product]}
            </small>
            <p>${allProducts[product] === 0 ? "Stock Out" : ""}</p>
        </div>
        `
        productSection.appendChild(div)
    }

}

const deleteProduct = (data) => {
    let products = getLSData()
    delete products[data]

    localStorage.setItem("products", JSON.stringify(products))
    // console.log(products)
    display()
}

function showMsg(event) {
    console.log(event)
}

display()