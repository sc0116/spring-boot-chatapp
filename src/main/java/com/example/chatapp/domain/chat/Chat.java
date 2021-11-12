package com.example.chatapp.domain.chat;

import lombok.AccessLevel;
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

    private String msg;

    private String sender;      //보내는 사람

    private String receiver;    //받는 사람

    private LocalDateTime createdDate;
}
