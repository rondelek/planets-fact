let commentsDiv = document.getElementById('comments');
let repliesDiv = document.getElementById('replies');
const sendBtn = document.getElementById('send-btn');
let commentValue = document.getElementById('comment-value');
const addCommentBox = document.getElementById('add-comment-box');
let editBtnArray = document.getElementsByClassName('edit-btn');
let deleteBtnArray = document.getElementsByClassName('delete-btn');
const mainEl = document.getElementById('main');
const overlayEl = document.getElementById('overlay');

function subtractVote(event) {
    let voteEl = event.parentElement.previousElementSibling;
    console.log(voteEl)
    if (voteEl.value !== voteEl.min) {
        voteEl.value = Number(voteEl.value) - 1;
    }
}


function addEventListenerToVoteMinus() {
    const voteMinusArray = Array.from(document.getElementsByClassName('vote-minus'));
    voteMinusArray.forEach(vote => vote.addEventListener('click', function() {
        subtractVote(event.target);
    }))
}

function incrementVote(event) {
    let voteEl = event.parentElement.nextElementSibling;
    if (voteEl.value !== voteEl.max) {
        voteEl.value = Number(voteEl.value) + 1;
    }
}

function addEventListenerToVotePlus() {
    const votePlusArray = Array.from(document.getElementsByClassName('vote-plus'));
    votePlusArray.forEach(vote => vote.addEventListener('click', function() {
        incrementVote(event.target);
    }))
}

function addEventListenerToVote() {
    addEventListenerToVotePlus();
    addEventListenerToVoteMinus();
}

function generateCommentsItem(item) {
    const data = {
        id: item.id,
        content: item.content,
        createdAt: item.createdAt,
        score: item.score,
        image: item.image,
        username: item.username,
        reply: item.reply
    }

    commentItem = 
    `
    <div class="outer ${(data.reply) ? 'isreply': 'iscomment'}">
    <div class="hr ${(!data.reply) ? 'hidden': 'active'}"><hr></div>
    <div class="comment border-radius">
    <div class="vote border-radius">
        <div class="vote__plus cursor">
          <img src="./images/icon-plus.svg" alt="" class="vote vote-plus"></div>
        <input class="vote__score" value="${data.score}" max="${(data.score + 1)}" min="${(data.score - 1)}" readonly></input>
        <div class="vote__minus cursor">
          <img src="./images/icon-minus.svg" alt="" class="vote vote-minus">
        </div>
    </div>
    <div class="content-box">
      <div class="upper-line">
        <div class="upper-line__image">
            <img src="${data.image}" alt="" class="image__img icon">
        </div>
        <div class="upper-line__username">${data.username}</div>
        <div class="upper-line__createdAt">${data.createdAt}</div>
        <div class="upper-line__reply cursor">
            <img src="./images/icon-reply.svg" alt="" class="icon reply-btn">
            <p class="reply-btn">Reply</p>
        </div>
      </div>
      <div class="content">${data.content}</div>
    </div>

  </div> 
  </div>
    `


    return commentItem;
}


function getCommentsAndRepliesData() {
    commentsDiv.innerHTML = commentsArray.map(item => generateCommentsItem(item)).join('');
    commentsDiv.innerHTML += repliesArray.map(item => generateCommentsItem(item)).join('');
}

getCommentsAndRepliesData();

// ####### reply #######

let replyBtnArray = Array.from(document.getElementsByClassName('reply-btn'));

function closeDeleteOverlay() {
    mainEl.classList.remove('opacity-5');
    overlayEl.classList.replace('flex', 'hidden');
}

function manageDeleteOverlay(event) {
    const closeDeleteBtn = document.getElementById('button-gray');
    const deleteCommentBtn = document.getElementById('button-red');
    
    closeDeleteBtn.addEventListener('click', function() {
       closeDeleteOverlay();
    })

    deleteCommentBtn.addEventListener('click', function() {
        const commentToDelete = event.closest('.outer');
        commentToDelete.remove()
        closeDeleteOverlay();
    })
}

function showDeleteOverlay(event) {
    console.log(deleteBtnArray)
    mainEl.classList.add('opacity-5');
    overlayEl.classList.replace('hidden', 'flex');
    manageDeleteOverlay(event);
}

function addEventListenerToDeleteBtn() {
    Array.from(deleteBtnArray).forEach(btn => btn.addEventListener('click', function() {
        showDeleteOverlay(event.target);
    }))
}


function editComment(event) {
    let contentEl = event.closest('.content-box').lastElementChild;
    contentEl.innerHTML = 
    `
    <textarea class="textarea border-radius" id="update-textarea">${contentEl.innerHTML}</textarea>
    <button class="button-blue border-radius button cursor" id="update-btn">UPDATE</button>
    `
    const updateBtn = document.getElementById('update-btn');
    updateBtn.addEventListener('click', function() {
        contentEl.innerHTML = document.getElementById('update-textarea').value;
    })
}

function addEventListenerToEditBtns() {
    Array.from(editBtnArray).forEach(btn => btn.addEventListener('click', function() {
        editComment(event.target);
    }))
}


function checkIfNextDivIsReply(event) {
    let replyBox = document.getElementById('reply-box')
    let replyContentTxt = event.previousSibling.previousSibling.children[0].value;
    let nextDiv = event.closest('.outer').nextElementSibling;
    let replyEl =  `
    <div class="outer isreply">
    <div class="hr active"><hr></div>
    <div class="comment border-radius">
    <div class="vote border-radius">
        <div class="vote__plus cursor">
          <img src="./images/icon-plus.svg" alt="" class="vote vote-plus"></div>
        <div class="vote__score">0</div>
        <div class="vote__minus cursor">
          <img src="./images/icon-minus.svg" alt="" class="vote vote-minus">
        </div>
    </div>
    <div class="content-box">
      <div class="upper-line">
        <div class="upper-line__image">
            <img src="./images/avatars/image-juliusomo.png" alt="" class="image__img icon">
        </div>
        <div class="upper-line__username">juliusomo</div>
        <div class="upper-line__you">you</div>
        <div class="upper-line__createdAt">created at </div>
        <div class="upper-line__buttons">
          <div class="upper-line__buttons__delete box-btn cursor">
            <img src="./images/icon-delete.svg" alt="" class="icon delete-btn">
            <p class="delete-btn">Delete</p>
        </div>
        <div class="upper-line__buttons__edit box-btn cursor">
          <img src="./images/icon-edit.svg" alt="" class="icon edit-btn">
          <p class="edit-btn">Edit</p>
        </div>
        </div>
        
      </div>
      <div class="content">${replyContentTxt}</div>
    </div>

    `

    const checkIfReply = nextDiv => {
        if (!nextDiv) {
            commentsDiv.insertAdjacentHTML('afterend', replyEl);
            replyBox.remove()
        } else if (nextDiv.classList.contains('isreply')) {
            nextDiv = nextDiv.nextElementSibling;
            checkIfReply(nextDiv)
        } else {
            nextDiv.insertAdjacentHTML('beforebegin', replyEl)
            replyBox.remove()
        }
    }

    checkIfReply(nextDiv);
    addEventListenerToEditBtns();
    addEventListenerToDeleteBtn();
}

function addEventListenerToAddReply() {
    let addReplyBtnArray = Array.from(document.getElementsByClassName('add-reply-btn'));
    addReplyBtnArray.forEach(btn => btn.addEventListener('click', function() {
        checkIfNextDivIsReply(event.target);
    }))
}

function showReplyBox(event) {
    const currentCommentEl = event.closest('.outer');
    const currentUserCommentEl = event.parentElement.previousSibling.previousSibling.previousSibling.previousSibling.innerHTML;
    const replyBoxInnerHTML = `
    <div class="outer" id="reply-box">
    <div class="add-reply">
    <div class="hr active"><hr></div>
    <div class="add-comment border-radius">
    <div class="add-comment__image">
      <img src="./images/avatars/image-juliusomo.png" alt="" class="add-comment__image__img icon">
    </div>
    <div class="add-comment__content">
      <textarea class="border-radius">@${currentUserCommentEl}, </textarea>
    </div>
    <button class="add-comment__button border-radius cursor add-reply-btn button-blue button">REPLY</button>
  </div>
  </div>
  </div>

    `
    currentCommentEl.insertAdjacentHTML("afterend",replyBoxInnerHTML);
    addEventListenerToAddReply();
}


function addEventListenerToReplyBtn() {
    replyBtnArray.forEach(btn => {
        btn.addEventListener('click', function() {
            showReplyBox(event.target);
        })
    })
}

function sendComment() {
    let commentEl = 
    `
    <div class="outer isreply">
    <div class="comment border-radius">
    <div class="vote border-radius">
        <div class="vote__plus cursor">
          <img src="./images/icon-plus.svg" alt="" class="vote"></div>
        <div class="vote__score">0</div>
        <div class="vote__minus cursor">
          <img src="./images/icon-minus.svg" alt="" class="vote">
        </div>
    </div>
    <div class="content-box">
      <div class="upper-line">
        <div class="upper-line__image">
            <img src="./images/avatars/image-juliusomo.png" alt="" class="image__img icon">
        </div>
        <div class="upper-line__username">juliusomo</div>
        <div class="upper-line__you">you</div>
        <div class="upper-line__createdAt">created at </div>
        <div class="upper-line__buttons">
          <div class="upper-line__buttons__delete box-btn cursor">
            <img src="./images/icon-delete.svg" alt="" class="icon delete-btn">
            <p class="delete-btn">Delete</p>
        </div>
        <div class="upper-line__buttons__edit box-btn cursor">
          <img src="./images/icon-edit.svg" alt="" class="icon edit-btn">
          <p class="edit-btn">Edit</p>
        </div>
        </div>
        
      </div>
      <div class="content">${commentValue.value}</div>
    </div>
    `
    addCommentBox.insertAdjacentHTML('beforebegin', commentEl)
    commentValue.value = '';
    addEventListenerToEditBtns();
    addEventListenerToDeleteBtn();
}

function addEventListenerToSendBtn() {
    sendBtn.addEventListener('click', function() {
        sendComment();
    })
}


addEventListenerToReplyBtn();
addEventListenerToSendBtn();
addEventListenerToVote();