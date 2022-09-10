const getInputFieldById = (id) =>{
    const input = document.getElementById(id);
    const inputValue = input.value;
    input.value = '';
    return inputValue;
}
const addProduct = () =>{
    const productName = getInputFieldById("product-name");
    const productQuantity = getInputFieldById("product-quantity");
    //type check
    const numbers = Number(productQuantity);
    if(!isNaN(productName) || !Number.isInteger(numbers)){

        return alert('Please type a valid Input');
    };

    setDataInLocalStorage(productName, productQuantity)
    // console.table(getLocalStorageData())
    // window.location.reload();
    display();
};
const getLocalStorageData = () =>{
    const getProducts = localStorage.getItem("All Products");
    const parseProducts = JSON.parse(getProducts);
    return parseProducts
    
}
const setDataInLocalStorage = (name, quantity) =>{
    
    let products = getLocalStorageData();

    if(!products){
        products = {};
    }
    if(products[name]){
        products[name] = parseInt(products[name]) + parseInt(quantity);
        // if(quantity < 0){
        //     alert('Not possible')
        // }
        
        // else if(quantity >0){
        //     products[name] = parseInt(products[name]) + parseInt(quantity);
        // }
    }
    else{

        products[name] = quantity;
    }

    localStorage.setItem("All Products", JSON.stringify(products));
}
const display = () =>{

    const displayProduct = getLocalStorageData();

    const productSection = document.getElementById("all-products");
    productSection.textContent = '';
    for(const product in displayProduct){
        const name = product;
        const quantity = displayProduct[product];
        // console.log(product, displayProduct[product]);
        const createDiv = document.createElement('div');
        createDiv.innerHTML = `
        <div class="shadow-sm p-3 mb-2 bg-body rounded">
            <span class="fs-4">${name}</span>
            Quantity:<small class="fw-bold">${quantity}</small>
        </div> `;
        productSection.appendChild(createDiv);
    }
}
display();