const allPostContainer = document.getElementById('all-post-container');
const watchListContainer = document.getElementById('watch-list-container');
const latestPostContainer = document.getElementById('latest-post-container');
let viewCountNum = 1;


// load all post data
const loadAllPosts = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/posts');
    const data = await res.json();
    const allPostData = data.posts;
    displayAllPost(allPostData);
}
loadAllPosts()

// load post data by search
const loadSearchPosts = async (category, allPostData) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${category}`);
    const data = await res.json();
    const allSearchData = data.posts;
    displaySearchPost(allSearchData);

}
loadSearchPosts()

// load latest post
const loadLatestPost = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts');
    const data = await res.json();
    const latestPostData = data;
    displayLatestPost(data);
}
loadLatestPost();

// display all post
const displayAllPost = (allPostData) => {
    allPostData.forEach(data => {

        const singlePost = document.createElement('div');
        singlePost.innerHTML = `
        <div class="flex flex-col lg:flex-row items-center lg:items-start lg:justify-stretch gap-6 bg-[#F3F3F5] p-3 lg:p-10 rounded-3xl">
                        <div class="indicator">
                            <span id="active-indicator" class="indicator-item ${data.isActive? 'bg-green-500 , border-green-500':'bg-red-500 , border-red-500'} badge badge-secondary"></span>
                            <div class="grid w-20 h-20 bg-base-300 place-items-center rounded-2xl"><img class ="rounded-2xl" src="${data.image}" alt="Shoes"
                            class="" /></div>
                        </div>
                        <div class="space-y-5">
                            <div class=" flex gap-5 font-medium inter">
                                <small># ${data.category}</small>
                                <small>Author : <span>${data.author.name}</span></small>
                            </div>
                            <h3 class="font-bold text-xl mulish text-[#12132D]">${data.title}</h3>
                            <p class="font-normal inter text-[#12132D99]">${data.description}</p>
                            <hr class="border-dashed border-2 text-[#12132D40]">
                            <div class="flex flex-row justify-between font-normal text-[#12132D99] inter">
                                <div class="flex space-x-6">
                                    <small class="flex justify-center items-center gap-3"><i
                                            class="fa-regular fa-message"></i><span>${data.comment_count}</span>
                                    </small>
                                    <small class="flex justify-center items-center gap-3"><i
                                            class="fa-regular fa-eye"></i><span>${data.view_count}</span>
                                    </small>
                                    <small class="flex justify-center items-center gap-3"><i
                                            class="fa-regular fa-clock"></i><span>${data.posted_time} min</span>
                                    </small>
                                </div>
                                <button onclick="readBtn('${data.title.replace("'", "")}','${data.view_count}');" class=""><img src="images/email 1.svg" alt=""></button>
                            </div>
                        </div>
                    </div>
        `
        allPostContainer.appendChild(singlePost);

    });
    toggleLoadingBar(false);
};
// display search post
const displaySearchPost = (allSearchData) => {
    allSearchData.forEach(data => {
        const singlePost = document.createElement('div');
        singlePost.innerHTML = `
        <div class="flex flex-col lg:flex-row items-center lg:items-start lg:justify-stretch gap-6 bg-[#F3F3F5] p-3 lg:p-10 rounded-3xl">
                        <div class="indicator">
                            <span id="active-indicator" class="indicator-item ${data.isActive? 'bg-green-500 , border-green-500':'bg-red-500 , border-red-500'} badge badge-secondary"></span>
                            <div class="grid w-20 h-20 bg-base-300 place-items-center rounded-2xl"><img class ="rounded-2xl" src="${data.image}" alt="Shoes"
                            class="" /></div>
                        </div>
                        <div class="space-y-5">
                            <div class=" flex gap-5 font-medium inter">
                                <small># ${data.category}</small>
                                <small>Author : <span>${data.author.name}</span></small>
                            </div>
                            <h3 class="font-bold text-xl mulish text-[#12132D]">${data.title}</h3>
                            <p class="font-normal inter text-[#12132D99]">${data.description}</p>
                            <hr class="border-dashed border-2 text-[#12132D40]">
                            <div class="flex flex-row justify-between font-normal text-[#12132D99] inter">
                                <div class="flex space-x-6">
                                    <small class="flex justify-center items-center gap-3"><i
                                            class="fa-regular fa-message"></i><span>${data.comment_count}</span>
                                    </small>
                                    <small class="flex justify-center items-center gap-3"><i
                                            class="fa-regular fa-eye"></i><span>${data.view_count}</span>
                                    </small>
                                    <small class="flex justify-center items-center gap-3"><i
                                            class="fa-regular fa-clock"></i><span>${data.posted_time} min</span>
                                    </small>
                                </div>
                                <button onclick="readBtn('${data.title.replace("'", "")}','${data.view_count}');" class=""><img src="images/email 1.svg" alt=""></button>
                            </div>
                        </div>
                    </div>
        `
        setTimeout(() => {
            allPostContainer.appendChild(singlePost);
        }, 2000);
    });
    toggleLoadingBar(false);
};


// add to watched list
const readBtn = (title, view) => {
    const viewCount = document.getElementById('view-count');
    viewCount.innerText = viewCountNum++
    const watchList = document.createElement('div');
    watchList.innerHTML = `
    <div class="bg-[#FFFFFF] p-4 rounded-2xl mb-4">
                        <div class="flex justify-between gap-5">
                            <h2 class="font-semibold mulish text-[#12132D]">${title}</h2>
                            <small class="flex justify-center items-center gap-3 font-normal inter"><i
                                    class="fa-regular fa-eye"></i><span>${view}</span>
                            </small>
                        </div>
                    </div>
    `
    watchListContainer.appendChild(watchList);
}


// display latest post
const displayLatestPost = (latestPostData) => {
    latestPostData.forEach(data => {

        const card = document.createElement('div');
        card.innerHTML = `
        <div class="card lg:w-96 lg:h-[550px] bg-base-100 shadow-xl border-[#12132D26] border-2">
                    <figure class="px-6 pt-6">
                        <img src="${data.cover_image}" alt="Shoes"
                            class="rounded-xl" />
                    </figure>
                    <div class="card-body">
                        <small class="flex items-center gap-3 text-[#12132D99] font-normal"><i
                                class="fa-solid fa-calendar-days"></i><span>${data.author?.posted_date || 'No publish date'}</span>
                        </small>
                        <p class="font-extrabold text-lg mulish ">${data.title}</p>
                        <p class="font-normal text-[#12132D99]">${data.description}</p>
                        <div class="flex items-center gap-4">
                            <img class = "w-11 h-11 rounded-full" src="${data.profile_image}" alt="">
                            <div>
                                <h3 class="font-bold mulish text-[#12132D]">${data.author.name}</h3>
                                <small class="font-normal text-sm text-[#12132D99]">${data.author?.designation || 'Unknown'}</small>
                            </div>
                        </div>
                    </div>
                </div>
        `
        latestPostContainer.appendChild(card);
    });
};


// handel search
const handelSearch = (category) => {
    toggleLoadingBar(true);
    const inputField = document.getElementById('input-field').value;
    if (inputField === 'all') {
        allPostContainer.innerHTML = '';
        loadAllPosts();
    }
    else {
        allPostContainer.innerHTML = '';
        loadSearchPosts(inputField);
    }

};

// loading bars
const toggleLoadingBar = (isLoading) => {
    const loadingBar = document.getElementById('loading');
    if (isLoading) {
        loadingBar.classList.remove('hidden');
    }
    else {
        setTimeout(() => {
            loadingBar.classList.add('hidden');
        }, 2000);
    }
};