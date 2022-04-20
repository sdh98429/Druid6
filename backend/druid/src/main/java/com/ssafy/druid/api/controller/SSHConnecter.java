package com.ssafy.druid.api.controller;

import com.ssafy.druid.api.service.SSHService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class SSHConnecter {
    private final SSHService sshService;

    @GetMapping("/ssh")
    public void sshTest(){
        sshService.shell();
    }
}
