# 1. 프로젝트 배포

1. terminal에 `yarn buil` (yarn 명령어가 없는 경우 `npm install --global yarn`으로 설치)
2. 빌드가 성공되면 **build** 폴더가 생성되고 이후 terminal에 `yarn electron-builder --win --x64 -c.extraMetadata.main=build/Main.js` 명령어를 입력
3. 성공적으로 명령어가 실행되면 **dist** 폴더에 **druid6-0.1.0.exe** 파일이 생성

# 2. 프로그램 설치

1. **druid6-0.1.0.exe** 파일 클릭.(관리자 권한 실행 요망)
   ![실행1](https://user-images.githubusercontent.com/20656314/169436529-2f7ab689-ec0e-4ad4-a320-ef7a2b6f5f8a.png)
2. 설치 프로그램이 druid6를 자동으로 설치
   ![실행2](https://user-images.githubusercontent.com/20656314/169436531-92d914d6-8aac-4a7d-8554-ecf5d04c2930.png)
3. 설치가 완료되면 **마침** 버튼을 눌러 실행 가능.
   ![실행3](https://user-images.githubusercontent.com/20656314/169436532-0fe67e62-3b11-4894-860f-efbb23e455db.png)
