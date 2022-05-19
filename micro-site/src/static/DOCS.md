# 마이크로사이트 DOCS

담당자: 윤기 오, 서형준
상태: 회의 중

## 오픈소스 컨트리뷰트 가이드

---

### **개발 서버 실행하기**

1. `yarn install` 명령어를 사용하여 node_modules를 다운받습니다.
2. `yarn electron:serve` 명령어를 사용하여 hot-reloading 일렉트론 개발 서버를 시작합니다.

## **기여방법**

### **가이드라인**

이 문서는 목적이 다른 여러 섹션으로 나뉘게 됩니다. 문장을 추가할 계획이라면, 적절한 섹션에 대한 [가이드라인](https://github.com/reactjs/reactjs.org/blob/main/CONTRIBUTING.md#guidelines-for-text)을 숙지하는 것이 도움이 될 것입니다.

### **브랜치(branch) 만들기**

1. `reactjs.org` 로컬 저장소에서 `git checkout master`를 실행합니다.
2. `git pull origin master`를 실행하여 최신 원본 코드를 보장할 수 있습니다.
3. `git checkout -c the-name-of-my-branch` (`the-name-of-my-branch` 를 적절한 이름으로 교체)를 실행하여 브랜치를 만들고 그 브랜치로 이동합니다.

### **수정하기**

1. "개발 서버 실행하기" 부분을 따릅니다.
2. 파일을 저장하고 일렉트론 앱에서 확인합니다. 
1.`src`안에 있는 React 컴포넌트가 수정될 경우 hot-reload가 적용됩니다.
    1. `content`안에 있는 마크다운 파일이 수정될 경우 hot-reload가 적용됩니다.
    2. 플러그인을 사용하는 경우, `.cache` 디렉토리를 제거한 후 서버를 재시작해야 합니다.

### **수정사항 체크하기**

1. 가능하다면, 변경한 부분에 대해서 많이 사용하는 브라우저의 최신 버전에서 시각적으로 제대로 적용되었는지 확인해주세요. (데스크탑과 모바일 모두)
2. 프로젝트 루트에서 `yarn check-all`를 실행합니다. (이 명령어는 Prettier, ESLint, 그리고 Flow를 실행합니다.)

### **Push 하기**

1. `git add -A && git commit -m "My message"` (`My message` 부분을 `Fix header logo` 같은 커밋 메시지로 교체)를 실행하여 변경한 파일들을 commit 해주세요.
2. [reactjs.org repo](https://github.com/reactjs/reactjs.org)에서 최근에 푸시된 브랜치를 볼 수 있습니다.
3. Github 지침을 따라주세요.
4. 가능하다면 시각적으로 변화된 부분의 스크린샷을 첨부해주세요. PR을 만들고 다른사람들이 수정사항을 볼 수 있게되면 자동으로 빌드할 것입니다.

## 무엇을 할 수 있나요?

---

druid6는 정적 및 동적 자원 애플리케이션의 시나리오 시뮬레이션 하는 데 사용할 수 있습니다.

서버의 CPU, Memory, 네트워크등 다양한 정보를 실시간으로 모니터링할 수 있습니다. 

(웹퍼포먼스 체크 적어주세요)

## Get it started

**Druid6는 브라우저가 아닙니다.**

Desktop Application입니다.

다운로드하시려면 [이 곳](https://www.notion.so/1502ff515ea749879beb858d157a836b)을 클릭하세요.

## Tutorials

- 설치하기
    - 해당 [주소](http://naver/com) 로 접속해 프로젝트를 다운받는다
    - `npm install` 또는 `yarn install` 을 이용해 프로젝트 node module들을 설치
    - `npm run electron:serve` 또는 `yarn electron:serve` 를 이용해 프로젝트를 실행할 수 있습니다.
- 시작하기
    - 서버 ip(또는 서버 url), 서버명, pem 파일을 업로드하고 접속 버튼을 클릭
    - 접속을 눌렀을 때 vnstat이 해당 서버에 없으면 설치하겠습니까 라는 메세지 출력
    - 예를 누르면 vnstat 설치되고 네트워크 모니터링도 동작함.
    - 아니오를 누르면 네트워크 모니터링은 이용 불가
- 서버 모니터링
    - 상단박스에서 주요 서버 정보 확인 가능
    - 하단 박스에서 실시간 CPU, RAM, DISK 사용량 확인가능
- 네트워크 모니터링
    - 해당 서버의 transmit, recieve 트래픽을 실시간으로 원형 그래프와 막대 그래프를 통해 확인 가능합니다.
    - 아래 박스에서는 일별 트래픽을 막대 그래프에서 확인 가능합니다.
- 시나리오 테스트
    - 현재는 `GET` , `POST` 메소드만 이용해서 시나리오를 작성할 수 있습니다.
    - `query parameter` 방식과 `path variable` 방식은 url에 직접 입력해야합니다.
- 웹퍼포먼스 테스트

## 더 알아보기

---

****Q/A and Bug tracker****

버그를 찾으셨나요? 향상시킬 아이디어가 떠오르셨나요?

 [GitHub](https://github.com)에 issue를 만들어주세요

Druid 팀에 메일도 보낼 수 있습니다.

- 메일 주소

****Copyright and license****

```html
Copyright (c) Druid6 contributors
Copyright (c) 2013-2020 GitHub Inc.

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```