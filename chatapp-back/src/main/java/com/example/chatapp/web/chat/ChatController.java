package com.example.chatapp.web.chat;

import com.example.chatapp.domain.chat.Chat;
import com.example.chatapp.service.ChatService;
import com.example.chatapp.web.chat.dto.SendMessageRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RequiredArgsConstructor
@RestController
public class ChatController {

    private final ChatService chatService;

    @CrossOrigin
    @GetMapping(value = "/sender/{sender}/receiver/{receiver}", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<Chat> receiveMessage(@PathVariable String sender, @PathVariable String receiver) {
        return chatService.receiveMessage(sender, receiver);
    }

    @CrossOrigin
    @PostMapping("/chat")
    public Mono<Chat> sendMessage(@RequestBody SendMessageRequestDto sendMessageRequestDto) {
        return chatService.sendMessage(sendMessageRequestDto);
    }
}
