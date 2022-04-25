package com.ssafy.druid.api.service;

import com.jcraft.jsch.ChannelExec;
import com.jcraft.jsch.JSch;
import com.jcraft.jsch.Session;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class SSHService {
    private static String keyname = "C:\\K6S204T.pem";
    //여기에 EC2 instance 도메인 주소를 적는다.
    private static String publicDNS = "13.124.201.190";
    public void ssh(){
        Session session=null;
        try{

            JSch jsch=new JSch();

            String user = "ubuntu";
            String host = publicDNS;
            int port = 22;
            String privateKey = keyname;

            jsch.addIdentity(privateKey);
            System.out.println("identity added ");

            session = jsch.getSession(user, host, port);
            System.out.println("session created.");

            session.setConfig("StrictHostKeyChecking","no");
            session.setConfig("GSSAPIAuthentication","no");
            session.setServerAliveInterval(120 * 1000);
            session.setServerAliveCountMax(1000);
            session.setConfig("TCPKeepAlive","yes");

            session.connect();

            ChannelExec channel=(ChannelExec)session.openChannel("exec");
        //    channel.setCommand("top");
            channel.setCommand("TERM= top -b -n1 | head -15");

            channel.setErrStream(System.err);

            InputStream in = channel.getInputStream();
            channel.connect(3*1000);

            // read the result from remote server
            byte[] tmp = new byte[1024];
            while (true) {
                while (in.available() > 0) {
                    int i = in.read(tmp, 0, 1024);
                    if (i < 0) break;
                    System.out.print(new String(tmp, 0, i));
                }
                if (channel.isClosed()) {
                    if (in.available() > 0) continue;
                    System.out.println("exit-status: "
                            + channel.getExitStatus());
                    break;
                }
                try {
                    Thread.sleep(1000);
                } catch (Exception ee) {
                }
            }

            channel.disconnect();




        }
        catch(Exception e){
            e.printStackTrace();
        } finally {
            if(session !=null){
                session.disconnect();
            }
        }
    }
    public void shell(){
        Path currentPath = Paths.get("");
        String path = currentPath.toAbsolutePath().toString(); System.out.println("현재 작업 경로: " + path);

        ProcessBuilder processBuilder = new ProcessBuilder();
        processBuilder.command("./src/myscript.bat");

        try {
            // Run script
            Process process = processBuilder.start();

            // Read output
            StringBuilder output = new StringBuilder();
            BufferedReader reader = new BufferedReader(
                    new InputStreamReader(process.getInputStream()));

            String line;
            while ((line = reader.readLine()) != null) {
                output.append(line);
            }

            System.out.println(output.toString());

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
