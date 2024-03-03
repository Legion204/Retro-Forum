const allPostContainer = document.getElementById('all-post-container');
const watchListContainer = document.getElementById('watch-list-container');
let viewCountNum = 1;


// load all post data
const loadAllPosts = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/posts');
    const data = await res.json();
    const allPostData = data.posts;
    displayAllPost(allPostData);
}
loadAllPosts()

// display all post
const displayAllPost = (allPostData) => {

    allPostData.forEach(data => {
        const singlePost = document.createElement('div');
        singlePost.innerHTML = `
        <div class="flex justify-stretch gap-6 bg-[#F3F3F5] p-3 lg:p-10 rounded-3xl">
                        <div class="indicator">
                            <span class="indicator-item badge badge-secondary"></span>
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
                            <div class="flex flex-col lg:flex-row lg:justify-between font-normal text-[#12132D99] inter">
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
                                <button onclick="readBtn('${data.title.replace("'","")}','${data.view_count}');" class=""><img src="images/email 1.svg" alt=""></button>
                            </div>
                        </div>
                    </div>
        `
        allPostContainer.appendChild(singlePost);
    });
}

// add to watched list
const readBtn = (title,view)=>{
    const viewCount =document.getElementById('view-count');
    viewCount.innerText= viewCountNum++
    const watchList = document.createElement('div');
    watchList.innerHTML=`
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