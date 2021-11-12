package com.example.chatapp.service;

import com.example.chatapp.domain.chat.Chat;
import com.example.chatapp.domain.chat.ChatRepository;
import com.example.chatapp.web.chat.dto.SendMessageRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;

@RequiredArgsConstructor
@Service
public class ChatService {

    private final ChatRepository chatRepository;

    public Flux<Chat> receiveMessage(String sender, String receiver) {
        return chatRepository.mFindBySender(sender, receiver)
                .subscribeOn(Schedulers.boundedElastic());
    }

    public Mono<Chat> sendMessage(SendMessageRequestDto sendMessageRequestDto) {
        return chatRepository.save(sendMessageRequestDto.toEntity());
    }
}
