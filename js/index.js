const loadCatagories = () => {
    const url = 'https://openapi.programming-hero.com/api/news/categories';
    fetch(url)
    .then(resp => resp.json())
    .then(data => displayCatagories(data.data.news_category));
}

const displayCatagories = (catagories) => {
    const catagoriesContainer = document.getElementById('catagory-container')
    catagories.forEach(catagory => {
        console.log(catagory);
        const catagoryDiv = document.createElement('div');
        catagoryDiv.classList.add('col-lg-3', 'col-sm-6', 'fw-bold' , 'hoveron');
        catagoryDiv.innerHTML = `
            <div onclick="loadCatagoriesData('${catagory.category_id}')">
                ${catagory.category_name}
            </div>  
        `
        catagoriesContainer.appendChild(catagoryDiv);
    })
}

const loadCatagoriesData = (catagoryId) => {
    console.log('clicked');
    const url = `https://openapi.programming-hero.com/api/news/category/${catagoryId}`;
    fetch(url)
    .then(resp => resp.json())
    .then(data => console.log(data.data))
}
const DisplayCatagoriesData = (catagories) => {
    
}

loadCatagories();