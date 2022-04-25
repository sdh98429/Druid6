package com.ssafy.druid.api.controller;

import com.fasterxml.jackson.databind.util.JSONPObject;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONObject;
import org.springframework.web.bind.annotation.*;
import org.yaml.snakeyaml.Yaml;

import java.io.FileWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class ConvertController {
    @PostMapping("/yaml")
    public void sshTest(@RequestBody Map<String,Object> param) throws Exception{
        JSONObject jsonObject=new JSONObject(param);
        Yaml yaml =new Yaml();
        FileWriter writer2 = new FileWriter("./file.yaml");
        yaml.dump(param, writer2);
        FileWriter writer = new FileWriter("./file.json");
        writer.write(jsonObject.toJSONString());
        writer.flush();
        writer.close();
    }
}
