const loadCatagories = () => {
    const url = 'https://openapi.programming-hero.com/api/news/categories';
    fetch(url)
    .then(resp => resp.json())
    .then(data => displayCatagories(data.data.news_category))
    .catch(error => console.log(error))
}

const displayCatagories = (catagories) => {
    const catagoriesContainer = document.getElementById('catagory-container')
    catagories.forEach(catagory => {
        // console.log(catagory);
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
    // console.log('clicked');
    toggleSpinner(true)
    const url = `https://openapi.programming-hero.com/api/news/category/${catagoryId}`;
    fetch(url)
    .then(resp => resp.json())
    .then(data => DisplayCatagoriesData(data.data))
    .catch(error => console.log(error))
}
const DisplayCatagoriesData = (catagories) => {
    console.log(catagories);
    const catagoryDetailsContainer = document.getElementById('catagory-details');
    catagoryDetailsContainer.innerHTML = ' ';
    const newsNumberField = document.getElementById('news-number');
    if(catagories.length === 0){
        newsNumberField.value = 'No Data Found';
    }
    else{
        newsNumberField.value = catagories.length + ' Data Found';
    }
    toggleSpinner(false);
    catagories.forEach(catagory => {
        // console.log(catagory);
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
                                                <span class="d-block">${catagory.author.name ? catagory.author.name : 'No data found'}<span>
                                                <span class="d-block">${catagory.author.published_date}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <p><i class="fa-regular fa-eye"></i>${catagory.total_view ? catagory.total_view : 'No View'}</p>
                                        </div>
                                        <div>
                                            <button onclick="loadDetailsNews('${catagory._id}')" class="btn text-primary" data-bs-toggle="modal" data-bs-target="#newsdetailmodal"><i class="fa-solid fa-arrow-right-long"></i></button>
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

const loadDetailsNews = (news_id) =>{
    const url = `https://openapi.programming-hero.com/api/news/${news_id}`;
    fetch(url)
    .then(resp => resp.json())
    .then(data => displayDetailsNews(data.data[0]))
    .catch(error => console.log(error))
}

const displayDetailsNews = (theNews) => {
    console.log(theNews);
    const newsDetailModal = document.getElementById('newsDetail');
    newsDetailModal.innerHTML = `
    <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="newsdetailmodalLabel">${theNews.title}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <img src=${theNews.thumbnail_url}>
            <p>${theNews.details}</p>
            <div class="d-flex">
                <img src=${theNews.author.img} class="rounded-circle" style="width:50px">
                <div>
                    <span class="d-block">Name: ${theNews.author.name ? theNews.author.name : 'No Data Found'}
                    <span class="d-block">Time: ${theNews.author.published_date}
                </div>
            </div>
            <div class="d-flex justify-content-between mt-3">
                <p><i class="fa-regular fa-eye"></i>${theNews.total_view ? theNews.total_view : 'No view'}</p>
                <p>ratings: ${theNews.rating.number}
            <div>
        </div>
        <div class="modal-footer mt-5 text-end">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
    </div>
    `
}

const toggleSpinner = isLoading => {
    const spinnerSection = document.getElementById('spinner');
    if(isLoading){
        spinnerSection.classList.remove('d-none');
    }
    else{
        spinnerSection.classList.add('d-none');
    }
};

loadCatagories();