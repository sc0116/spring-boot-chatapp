//로그인 시스템 대신 임시 방편
let username = prompt("아이디를 입력하세요.");
let roomNumber = prompt("채팅방 번호를 입력하세요.");

//SSE 연결
const eventSource = new EventSource(`http://localhost:2700/chat/room/${roomNumber}`)

eventSource.onmessage = (e) => {
    const data = JSON.parse(e.data);
    if (data.sender === username) { //로그인한 유저가 보낸 메시지
        //파란박스(오른쪽)
        initSendMessage(data);
    } else {
        //하얀박스(왼쪽)
        initReceiveMessage(data);
    }
}

//파란박스 추가
function getSendMessageBox(data) {
    let time = data.createdDate.substring(11, 16) + " | " + data.createdDate.substring(5, 10);

    return `<div class="sent_msg">
    <p>${data.message}</p>
    <span class="time_date">${time} | ${data.sender}</span>    
    </div>`;
}

//하얀박스 추가
function getReceiveMessageBox(data) {
    let time = data.createdDate.substring(11, 16) + " | " + data.createdDate.substring(5, 10);

    return `<div class="received_withd_msg">
    <p>${data.message}</p>
    <span class="time_date">${time} | ${data.sender}</span>    
    </div>`;
}

//최초 초기화될 때 해당 채팅방에 n건의 메시지가 있다면 n건 다 가져옴.
//addMessage() 함수 호출 시 DB에 insert 되고, 그 데이터가 자동으로 흘러들어옴(SSE)
//파란박스 초기화
function initSendMessage(data) {
    let chatBox = document.querySelector("#chat-box");

    let sentBox = document.createElement("div");
    sentBox.className = 'outgoing_msg';

    sentBox.innerHTML = getSendMessageBox(data);
    chatBox.append(sentBox);
    chatBox.scrollTop(chatBox[0].scrollHeight);
}

//하얀박스 초기화
function initReceiveMessage(data) {
    let chatBox = document.querySelector("#chat-box");

    let receivedBox = document.createElement("div");
    receivedBox.className = 'received_msg';

    receivedBox.innerHTML = getReceiveMessageBox(data);
    chatBox.append(receivedBox);
}

//AJAX 채팅 메시지 전송
async function addMessage() {
    let msgInput = document.querySelector("#chat-outgoing-msg");

    let chat = {
        sender: username,
        roomNumber: roomNumber,
        message: msgInput.value
    }

    await fetch("http://localhost:2700/chat", {
        method: "post", //http post 메소드 (새로운 데이터를 write)
        body: JSON.stringify(chat), //JS -> JSON
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        }
    });

    msgInput.value = "";
}

//버튼 클릭 시 메시지 전송
document.querySelector("#chat-send").addEventListener("click", () => {
    addMessage();
});

//엔터 입력 시 메시지 전송
document.querySelector("#chat-outgoing-msg").addEventListener("keydown", (e) => {
    if (e.keyCode === 13) {
        addMessage();
    }
});