package com.example.chatapp.domain.chat;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Document(collection = "chat")
public class Chat {

    @Id
    private String id;

    private String message;

    private String sender;      //보내는 사람

    private String receiver;    //받는 사람

    private Integer roomNumber; //방 번호

    private LocalDateTime createdDate;

    @Builder
    public Chat(String message, String sender, String receiver, Integer roomNumber, LocalDateTime createdDate) {
        this.message = message;
        this.sender = sender;
        this.receiver = receiver;
        this.roomNumber = roomNumber;
        this.createdDate = createdDate;
    }
}
