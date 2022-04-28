package com.ssafy.druid.api.handler;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

@Slf4j
@Component
public class WebSocketHandler extends TextWebSocketHandler {

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message)throws Exception{
        log.info("payload : {}",message.getPayload());
        TextMessage initMessage = new TextMessage("hello");
        session.sendMessage(initMessage);
    }
}
