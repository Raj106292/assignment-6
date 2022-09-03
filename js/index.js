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
    .then(data => DisplayCatagoriesData(data.data))
}
const DisplayCatagoriesData = (catagories) => {
    const catagoryDetailsContainer = document.getElementById('catagory-details');
    catagoryDetailsContainer.innerHTML = ' ';
    catagories.forEach(catagory => {
        console.log(catagory);
        const detailsDiv = document.createElement('div');
        detailsDiv.innerHTML=`
            <div class="card mb-3">
                <div class="row g-0">
                    <div class="col-md-4 col-lg-4 col-sm-12 p-3">
                        <img src=${catagory.thumbnail_url} class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-md-8 col-sm-12 my-auto">
                        <div class="card-body">
                            <h5 class="card-title">${catagory.title}</h5>
                            <p class="card-text">${catagory.details.slice(0, 300) + '...'}</p>
                            <section class="card-text mt-5">
                                    <div class="d-flex justify-content-between">
                                        <div class="d-flex">
                                            <div>
                                                <img src=${catagory.author.img} class="img-fluid rounded-circle" style="width: 50px">
                                            </div>
                                            <div class="ms-2">
                                                <span class="d-block">${catagory.author.name}<span>
                                                <span class="d-block">${catagory.author.published_date}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <p><i class="fa-regular fa-eye"></i>${catagory.total_view}</p>
                                        </div>
                                        <div>
                                            <button class="btn text-primary"><i class="fa-solid fa-arrow-right-long"></i></button>
                                        </div>
                                    </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        `
        catagoryDetailsContainer.appendChild(detailsDiv);
    })
}

loadCatagories();