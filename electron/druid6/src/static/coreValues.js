const coreValues = [
  {
    value: "FCP",
    valueTitle: "First Contentful Paint",
    valueDescription:
      "최초 콘텐츠풀 페인트(FCP)는 사용자가 화면에서 콘텐츠를 볼 수 있는 페이지 로드 타임라인의 첫 번째 지점을 표시하기 때문에 사용자가 감지하는 로드 속도를 측정할 수 있는 중요한 사용자 중심 메트릭입니다. FCP가 빠르면 사용자가 페이지에서 뭔가가 진행되고 있음을 인지해 안심할 수 있습니다.",
  },
  {
    value: "TTI",
    valueTitle: "Time to Interactive",
    valueDescription:
      "TTI는 페이지가 완전히 상호 작용 가능하게 되는 데 걸리는 시간을 측정합니다. 다음과 같은 경우에 페이지가 완전한 상호 작용 가능한 것으로 간주됩니다.\n페이지에 첫 번째 콘텐츠풀 페인트에 의해 측정되는 유용한 콘텐츠가 표시됩니다.\n가장 많이 보이는 페이지 요소에 이벤트 핸들러가 등록됩니다.\n페이지가 50밀리초 이내에 사용자 상호 작용에 응답합니다.",
  },
  {
    value: "SI",
    valueTitle: "First Contentful Paint",
    valueDescription:
      "속도 색인(Speed Index)는 사용자가 볼 수 있는 컨텐츠를 렌더링하는데 걸리는 속도입니다. 페이지 로드 중에 콘텐츠가 시각적으로 표시되는 속도를 측정합니다.",
  },
  {
    value: "TBT",
    valueTitle: "First Contentful Paint",
    valueDescription:
      "TBT는 마우스 클릭, 화면 탭 또는 키보드 누름과 같은 사용자 입력으로부터 페이지가 응답하지 못하도록 차단된 총 시간을 측정합니다. 합계는 최초 콘텐츠풀 페인트와 상호 작용까지의 시간 사이의 모든 긴 작업의 차단 부분을 더하여 계산합니다. 50ms 이상 실행되는 모든 작업은 긴 작업입니다. 50ms 이후의 시간이 차단 부분입니다. 예를 들어 Lighthouse가 70ms 길이의 작업을 감지하면 차단 부분은 20ms가 됩니다.",
  },
  {
    value: "LCP",
    valueTitle: "First Contentful Paint",
    valueDescription:
      "최대 콘텐츠풀 페인트(LCP)는 페이지의 메인 콘텐츠가 로드되었을 가능성이 있을 때 페이지 로드 타임라인에 해당 시점을 표시하므로 사용자가 감지하는 로드 속도를 측정할 수 있는 중요한 사용자 중심 메트릭입니다. LCP가 빠르면 사용자가 해당 페이지를 사용할 수 있다고 인지하는 데 도움이 됩니다.",
  },
  {
    value: "CLS",
    valueTitle: "First Contentful Paint",
    valueDescription:
      "누적 레이아웃 이동(CLS)은 사용자가 예상치 못한 레이아웃 이동을 경험하는 빈도를 수량화하므로 시각적 안정성을 측정할 때 중요한 사용자 중심 메트릭입니다. CLS가 낮으면 우수한 사용자 경험을 보장하는 데 도움이 됩니다.",
  },
];

export default coreValues;