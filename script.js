const listEl = document.getElementById('list');
let filterEl = document.getElementById('filter');
const clearEl = document.getElementById('clear')

function getCurrentSearch() {
    let languageSearchbarItems = document.getElementsByClassName('language-searchbar');
    let searchedItems = [];
    for (let i = 0; i < languageSearchbarItems.length; i++) {
        searchedItems.push(languageSearchbarItems[i].innerHTML);
    }
    return searchedItems;
}


const splitLanguages = arr => {
    if (!arr) {
        return ''
    }

    const splitLang = arr.map(lang => `<div class="language lang cursor" data-languages="${lang}">${lang}</div>`).join('');
    return splitLang
}

function generateListItem(item) {
    const data = {
        company: item.company,
        logo: item.logo,
        new: item.new,
        featured: item.featured,
        position: item.position,
        role: item.role,
        level: item.level,
        time: item.postedAt,
        contract: item.contract,
        location: item.location,
        languages: item.languages,
        tools: item.tools,
        tags: [item.role, item.languages, item.tools]
    }


    let tagsArray = [];

    data.tags.map(item => {
        if (Array.isArray(item)) {
            return tagsArray.push(...item)
        } else {
            return tagsArray.push(item)
        }
    })

    let itemEl =  `
    <div class="item box ${(data.new) ? 'border' : null}">
    <div class="item__logo">
      <img src="${data.logo}" alt="" class="logo__img">
    </div>
    <div class="item__content">

      <ul class="first flex">

        <li class="company">${data.company}</li>
        <li class="new feature ${(data.new) ? 'active' : 'hidden'}">NEW</li>
        <li class="featured feature ${(data.featured) ? 'active' : 'hidden'}">FEATURED</li>

      </ul>

      <ul class="second flex">
        <li class="position cursor">${data.position}</li>
      </ul>

      <ul class="third flex">
        <li class="time">${data.time}</li>
        <li class="bullet">&#x2022;</li>
        <li class="contract">${data.contract}</li>
        <li class="bullet">&#x2022;</li>
        <li class="location">${data.location}</li>
      </ul>

    </div>

    <div class="item__languages">
      <div class="language lang cursor" data-languages="${data.role}">${data.role}</div>
      ${splitLanguages(data.languages)}
      ${splitLanguages(data.tools)}
    </div>
  </div>
    `

    let fds = false; 

    let languageSearchbarItems = document.getElementsByClassName('language-searchbar');
    let searchedItems = [];
    for (let i = 0; i < languageSearchbarItems.length; i++) {
        searchedItems.push(languageSearchbarItems[i].innerHTML);
    }
    

    const getCurrentSearch = searchedItems;

    console.log(getCurrentSearch)

    getCurrentSearch.map(item => {
        if (tagsArray.includes(item)) {
            fds = true;
        }
    })

    if (getCurrentSearch.length === 0) {
        return itemEl
    }
    if (fds === true) {
        return itemEl;
    }

}

function regenerateListItems() {
    generateItemsIDK()
    addEventListenerToTags();
}

function generateItemsIDK() {
    listEl.innerHTML = dataArray.map(i => generateListItem(i)).join('');
}
generateItemsIDK()


function checkIfItemInSearchbox(item) {
    const currentSearchArray = getCurrentSearch();
    if (currentSearchArray.includes(item.innerHTML)) {
        return false
    }
    return true
}

function addEventListenerToTags() {
    const allTagsArray = Array.from(getAllTags());
    for (let i = 0; i < allTagsArray.length; i++) {
        allTagsArray[i].addEventListener('click', event => {
            if (checkIfItemInSearchbox(event.target)) {
                addToSearch(event.target);
            }
        })
    }
}

function getAllTags() {
    const allTagsArray = document.getElementsByClassName('lang');
    return allTagsArray
}

addEventListenerToTags();


function addToSearch(event) {
    filterEl.innerHTML += 
    `
    <div class="filter__el flex data-languagename="${event.innerHTML}">
        <div class="language language-searchbar">${event.innerHTML}</div>
        <div class="delete cursor" id="delete">
            <img src="./images/icon-remove.svg" alt="" class="delete__img" data-remove="remove">
        </div>
    </div>

    `
    regenerateListItems();
}

// delete button

function deleteSearch() {
    filterEl.addEventListener('click', event => {
        if (event.target.dataset.remove) {
            let languageDiv = event.target.parentElement.parentElement  // filter__el
            let filterElChildrenArray = Array.from(filterEl.children)
            let indexOfLanguageDiv = filterElChildrenArray.indexOf(languageDiv)
            let newArray = []
            for (let i = 0; i < filterElChildrenArray.length; i++) {
                if (i !== indexOfLanguageDiv) {
                    newArray.push(filterElChildrenArray[i])
                }
            }
            filterEl.innerHTML = ''
            
            let lst = newArray.map(i => i.children[0]);
            for (let elem of lst) {
                addToSearch(elem)
            }
            regenerateListItems();
    
        }
    })
}

deleteSearch();

// addToSearch();

function clearSearch() {
    filterEl.innerHTML = '';
    regenerateListItems();
}

function addEventListenerToClearButton() {
    clearEl.addEventListener('click', clearSearch)
}

addEventListenerToClearButton();





// clear searches

// const deleteArr = Array.from(document.getElementsByClassName('filter__el'));
// console.log(deleteArr)
// for (let i = 0; i < deleteArr.length; i++) {
//     deleteEl = deleteArr[i].childNodes[3]
//     // console.log(deleteEl)
//     deleteEl.addEventListener('click', hideEl)
// }

// // clearEl.addEventListener('click', e => {
// //     e.target.previousElementSibling.innerHTML = '';
// // })


// remove filter

// const hideEl = e => {
//     // const parentEl = e.target.parentNode;
//     // console.log(parentEl)
//     // parentEl.classList.remove('flex');
//     // parentEl.classList.add('hidden')
//     const parentEL = e.target.parentNode.parentNode.parentNode;
//     const childEl = e.target.parentNode.parentNode;
//     parentEL.remove(childEl);  
//     addAndDeleteFilter();
// }