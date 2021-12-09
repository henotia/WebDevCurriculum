# Quest 02. CSS의 기초와 응용

## Introduction
* CSS는 Cascading StyleSheet의 약자입니다. 웹브라우저에 표시되는 HTML 문서의 스타일을 지정하는 (거의) 유일하지만 다루기 쉽지 않은 언어입니다. 이번 퀘스트를 통해 CSS의 기초적인 레이아웃 작성법을 알아볼 예정입니다.

## Topics
* CSS의 기초 문법과 적용 방법
  * Inline, `<style>`, `<link rel="stylesheet" href="...">`
* CSS 규칙의 우선순위
* 박스 모델과 레이아웃 요소
  * 박스 모델: `width`, `height`, `margin`, `padding`, `border`, `box-sizing`
  * `position`, `left`, `top`, `display`
  * CSS Flexbox와 Grid
* CSS 표준의 역사
* 브라우저별 Developer tools

## Resources
* [MDN - CSS](https://developer.mozilla.org/ko/docs/Web/CSS)
* [Centering in CSS: A Complete Guide](https://css-tricks.com/centering-css-complete-guide/)
* [A complete guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
* [그리드 레이아웃과 다른 레이아웃 방법과의 관계](https://developer.mozilla.org/ko/docs/Web/CSS/CSS_Grid_Layout/%EA%B7%B8%EB%A6%AC%EB%93%9C_%EB%A0%88%EC%9D%B4%EC%95%84%EC%9B%83%EA%B3%BC_%EB%8B%A4%EB%A5%B8_%EB%A0%88%EC%9D%B4%EC%95%84%EC%9B%83_%EB%B0%A9%EB%B2%95%EA%B3%BC%EC%9D%98_%EA%B4%80%EA%B3%84)

## Checklist
* CSS를 HTML에 적용하는 세 가지 방법은 무엇일까요?  
  1. Inline Style Sheet
     - HTML 태그의 style 속성에 CSS 코드를 넣는 방법이다.
  2. Internal Style Sheet
     - HTML 문서 안의 <style>과 </style>안에 CSS 코드를 넣는 방법이다.
  3. Liking Style Sheet
     - 별도의 CSS 파일을 만들고 HTML 문서와 연결하는 방법이다.
  * 세 가지 방법 각각의 장단점은 무엇일까요?
  1. 한번 설정된 스타일을 변경하기가 매우 어렵고, 스타일 시트를 사용하는 많은 이점을 잃는다.
  2. HTML 문서 안의 여러 요소를 한번에 꾸밀 수 있다는 장점이 있으나, 또 다른 HTML 문서에는 적용할수 없다.
  3. 스타일을 적용할 웹 페이지의 <head>태그에 <link>태그를 사용하여 외부 스타일 시트를 포함해야만 스타일이 적용된다.
* CSS 규칙의 우선순위는 어떻게 결정될까요?
  1. 인라인 스타일 (HTML 요소 내부에 위치해야함.)
  2. 내부 / 외부 스타일 시트(HTML 문서의 head 요소 내부에 있어야한다.)
  3. 웹 브라우저 본 스타일  
  

* CSS의 박스모델은 무엇일까요? 박스가 화면에서 차지하는 크기는 어떻게 결정될까요?
  * CSS 박스모델은 문서의 레이아웃을 계산할 때, 브라우저의 렌더링 엔진 표현하는 사각형 박스이다. 전체 CSS box Model은 블록 박스에 적용되며, 인라인 박스는 박스 모델에 정의된 일부 동작만 사용한다.  
CSS box Model은 페이지에서 볼 수 있는 박스를 생성하기 위해 박스의 서로 다른 부분인 여백, 테두리, 패딩 및 콘텐츠 등이 어떻게 함께 작동할 것인가를 정의한다.  
몇 가지 복잡성을 추가하기 위해 표준 및 대체 박스 모델이 있다.
  * 표준 box model 에서 box에서 `width`, `height`를 부여하면 content box의 너비와 높이가 정의된다.    
    그런 다음 패딩과 테두리는 박스의 너비와 높이에 추가되어 박스가 점유하는 전체 크기가 정해진다.
* `float` 속성은 왜 좋지 않을까요?
  1. `overflow` 속성이 `visible`인 상태에서는 부모 요소의 크기가 자동으로 늘어나지 않는다.  
  마치 `postion:absolute`와 비슷하게 렌더링 된다. `overflow` 를 다른 값으로 지정하면 크기가 조절되나, 직관적으로 이해하기 어려운 부분이다. 자신의 크기보다 넘친 요소를 관리하는 `overflow`와 요소의 정렬을 다루는 `float`가 상관관계에 있는 것은 좋지않다.
  2. 요소의 높이가 제각각일 때 예를 들어 왼쪽부터 정렬된다고하면, 각각의 요소가 다를 때 자연스레 `pinterest`의 레이아웃처럼 정렬되나?라고 착각할 수 있지만 실제 렌더링 결과는 그렇지 않다.  
  따라서 요소정렬을 위해 사용할 때 요소의 높이가 제 각각이면 정렬이 깨줄 있다. 줄바꿈이 없는 레이아웃이라면 문제가 되지 않지만, 줄바꿈이 있는 레이아웃에서는 문제가 된다.
  3. 속성의 상속의 문제가 있을 수 있다. `float`은 요소의 흐름을 관리하는 속성이기 때문에 속성이 다음 요소로 상속된다. 적절한 위치에서 `clear`해주지 않는다면 원하는 결과를 얻지 못한다. (`clear`는 `left`,`both`,`right`등 의 값을 줄 수 있다.)

`flexbox`나 `display-inline-block`과 `text-align`속성으로 얼마든지 비슷한결과를 낼 수 있고, `display:inline-block`은 text node를 렌더링에 포함해 원하지 않는 결과를 내기도 하지만 그래도 여전히 레이아웃 정렬 측면에서는 `float`보다 나은 선택 입니다. `float`과 `inlin-block`은 중복되지 않으니 주의해야 합니다.

* Flexbox(Flexible box)와 CSS Grid의 차이와 장단점은 무엇일까요?

* CSS의 비슷한 요소들을 어떤 식으로 정리할 수 있을까요?

## Quest
* Quest 01에서 만들었던 HTML을 바탕으로, [이 그림](screen.png)의 레이아웃과 CSS를 최대한 비슷하게 흉내내 보세요. 꼭 완벽히 정확할 필요는 없으나 align 등의 속성은 일치해야 합니다.
* **주의사항: 되도록이면 원래 페이지의 CSS를 참고하지 말고 아무것도 없는 백지에서 시작해 보도록 노력해 보세요!**

## Advanced
* 왜 CSS는 어려울까요?
* CSS의 어려움을 극복하기 위해 어떤 방법들이 제시되고 나왔을까요?
* CSS가 브라우저에 의해 해석되고 적용되기까지 내부적으로 어떤 과정을 거칠까요?
* 웹 폰트의 경우에는 브라우저 엔진 별로 어떤 과정을 통해 렌더링 될까요?
