package com.example.chatapp.web.chat.dto;

import com.example.chatapp.domain.chat.Chat;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class SendMessageRequestDto {

    private String message;
    private String sender;
    private String receiver;

    public Chat toEntity() {
        return Chat.builder()
                .message(message)
                .sender(sender)
                .receiver(receiver)
                .createdDate(LocalDateTime.now())
                .build();
    }
}
