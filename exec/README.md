# 1. 아키텍쳐 구성도

# 2. 프로젝트 배포

1.  bash terminal에 `yarn buil` (yarn 명령어가 없는 경우 `npm install --global yarn`으로 설치)
2.  빌드가 성공되면 `yarn electron-builder --win --x64 -c.extraMetadata.main=build/Main.js` 명령어를 입력
