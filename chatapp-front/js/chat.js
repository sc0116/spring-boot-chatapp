//테스트 url 설정 (나중에 수정 필요)
const eventSource = new EventSource("http://localhost:2700/sender/보내는사람/receiver/받는사람")

eventSource.onmessage = (e) => {
    const data = JSON.parse(e.data);
    initMessage(data);
}

function getSendMsgBox(msg, time) {
    return `<div class="sent_msg">
    <p>${msg}</p>
    <span class="time_date">${time}</span>    
    </div>`;
}

function initMessage(data) {
    let chatBox = document.querySelector("#chat-box");
    let msgInput = document.querySelector("#chat-outgoing-msg");

    let chatOutgoingBox = document.createElement("div");
    chatOutgoingBox.className = 'outgoing_msg';

    let md = data.createdDate.substring(5, 10);
    let tm = data.createdDate.substring(11, 16);
    let convertTime = tm + " | " + md;

    chatOutgoingBox.innerHTML = getSendMsgBox(data.message, convertTime);
    chatBox.append(chatOutgoingBox);
    msgInput.value = "";
}

function addMessage() {
    let chatBox = document.querySelector("#chat-box");
    let msgInput = document.querySelector("#chat-outgoing-msg");

    let chatOutgoingBox = document.createElement("div");
    chatOutgoingBox.className = 'outgoing_msg';

    let date = new Date();

    let hour = date.getHours();
    if (hour < 10) {
        hour = '0' + hour;
    }

    let minute = date.getMinutes();
    if (minute < 10) {
        minute = '0' + minute;
    }
    let time = hour + ":" + minute + " | " + date.getMonth() + "-" + date.getDate();

    chatOutgoingBox.innerHTML = getSendMsgBox(msgInput.value, time);
    chatBox.append(chatOutgoingBox);
    msgInput.value = "";
}

document.querySelector("#chat-send").addEventListener("click", () => {
    addMessage();
});

document.querySelector("#chat-outgoing-msg").addEventListener("keydown", (e) => {
    if (e.keyCode === 13) {
        addMessage();
    }
});