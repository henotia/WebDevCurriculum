# Quest 02. CSS의 기초와 응용

## Introduction

* CSS는 Cascading StyleSheet의 약자입니다. 웹브라우저에 표시되는 HTML 문서의 스타일을 지정하는 (거의) 유일하지만 다루기 쉽지 않은 언어입니다. 이번 퀘스트를 통해 CSS의 기초적인 레이아웃
  작성법을 알아볼 예정입니다.

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
    * 세 가지 방법 각각의 장단점은 무엇일까요?

    1. Inline Style Sheet HTML 태그의 style 속성에 CSS 코드를 넣는 방법이다.
    ```HTML
    <P style="color: blue;">Lorem ipsum dolor.</P>
    ```
  위에서의 `<P>`가 선택자(Selector)가 되고, CSS 코드에는 속성(Property)과 값(Value)만 포함하게 되어 CSS를 활용도 낮아질 수 있고, 재사용이 불가능하다.


    2. Internal Style Sheet  
       Internal Style Sheet는 HTML 문서 안에 스타일 코드를 넣는 방법이다.  
       `<style>`과 `</style>` 안에 CSS 코드를 넣는다.
  ```HTML
    <html>
    <head>
      <style>
        h1 {color: blue;}
      </style>
    </head>
  <body>
  </body>
    </html>
  ```
  `<style>` 태그는 보통 `<head>`와 `</head>` 사이에 넣으나, HTML 문서의 어디에 넣어도 잘 적용된다.  
  HTML 문서 안에 여러 요소를 한번에 꾸밀 수 있다는 장점은 있지만, 다른 HTML 문서에는 적용할수 없다는 단점이 있다.
  
  3. Linking Style Sheet  
  별도의 CSS 파일을 만들고 HTML 문서와 연결하는 방법이다.
       ```CSS
       h1{
        color: red ;}  
       ``` 
     적용을 원하는 HTML 문서와 CSS 파일이 같은 폴더에 있다면
      ```HTML
     <link rel="stylesheet" href="style.css">
      ```
     다른 폴더에 있다면 경로를 추가해서
      ```HTML
      <link rel="stylesheet" href="css/style.css">
      ```
     HTML 문서에 추가 해준다.  
     이 방법의 장점은 여러 HTML문서에 사용할 수 있다는 것인데, style.css를 <link>태그로 연결만 시켜주면 적용이 가능하다.
     
* CSS 규칙의 우선순위는 어떻게 결정될까요?
  1. 기본적으로 후순위 css가 우선순위가 높다.
  2. !important > inline style attribute > id > class, 다른 attribute, 수도클래스 (:first-child 같은 것) > tag element, 수도 엘레멘트(::before같은것) 순으로 우선순위가 높다.
  3. 우선 순위가 같다면 개수가 많은 CSS가 우선순위가 높다.
  
!important 와 inline style attribute은 실무에서 사용을 제한 하는 경우가 많다.  
!important는 css 값 뒤에 붙여진 키워드를 의미하고, 인라인 스타일 속성은 태그에 주어진 style 속성 내용을 가리킨다.  
이 두가지는 되도록 사용을 하지 않는 것이 좋으므로 생각하지 않고 있으면 된다.  

id, class, tag 중에서는 각 1, 2, 3순위를 갖는다. 2순위가 100개 이더라도 1순위가 더 우선순위를 갖는다.  
같은 순위 중에서는 개수로 순위가 정해진다.  
순위도 같고 개수도 같다면 후순위가 우선순위를 갖게 된다. 

* CSS의 박스모델은 무엇일까요? 박스가 화면에서 차지하는 크기는 어떻게 결정될까요?
  box model  모든 HTML 요소는 박스(box)모양으로 구성되는데, 이것을 박스 모델이라고 부른다.
  박스 모델은 hTML 요소를 패딩 (padding), 테두리(border), 마진(margin), 그리고 내용(content)로 구분한다.
  
1. 내용(content) : 텍스트나 이미지가 들어있는 박스의 실질적인 내용 부분이다.
2. 패딩(padding) : 내용과 테두리 사이의 간격이다, 패딩은 눈에 보이지 않는다. 
3. 테두리(border): 내용과 패딩 주변을 감싸는 테두리 이다.
4. 마진(margin)  : 테두리와 이웃하는 요소 사이의 간격이다. 마진은 눈에 보이지 않는다.

CSS에서 height과 width 속성을 설정할 때 그 크기가 가리키는 부분은 내용(content) 부분만을 대상으로 한다.  
HTML요소의 height와 width 속성으로 설정된 높이와 너비에 패딩(padding), 테두리(border), 마진(margin)의 크기는 포함되지 않는다.

* `float` 속성은 왜 좋지 않을까요?
  - `float`은 레이아웃 및 내용의 정렬을 위해 사용이 가능하다. (`float:left`,`float:right`)
  - 단점으로는   
    1. 부모 요소의 크기 :  
    over flow 속성이 visible인 상태에서 부모 요소의 크기가 자동으로 늘어나지 않는다.  
    position:absolute 와 비슷하게 렌더링 되고, overflow를 다른 값으로 지정하면 크기가 조절되나, 직관적으로 이해가 어려운 부분이된다.  
    자신의 크기보다 넘친 요소를 관리하는 overflow와 요소의 정렬을 다루는 float가 상관관계가 있는것도 문제가 될 수 있다.
    
    2. 요소의 높이가 제각각일 때  
       왼쪽부터정령된다고 하면, 각각의 요소가 다를 때 자연스레 pinterest의 레이아웃처럼 정렬되나? 라고 생각할 수 있다.
       
    3. 속성의 상속  
       `float`는 요소의흐름을 관리하는 속성이기 때문에 속성이 다음 요소로 상속된다. 적절한 위치에서 `clear`해주지 않으면 원하는 결과를 얻지 못한다.  (clear는 left, both,right 등 의 값을 줄 수 있다.
       

* Flexbox(Flexible box)와 CSS Grid의 차이와 장단점은 무엇일까요?
  
  - Flexbox는 1차원으로 수평, 수직 영역 중 하나의 방향 으로만 레이아웃을 나눌 수 있다.
  - Grid는 2차원으로 수평 수직을 동시에 영역을 나눌 수 있다.  
  Grid는 2차원으로 수평 수직을 동시에 영역을 나눌 수 있다고 했는데, 이때 grid-template-columns 속성을 이용하여 행을, grid-template-rows속성을 이용하여 열을 바꿀 수 있다. 


* CSS의 비슷한 요소들을 어떤 식으로 정리할 수 있을까요?  
동일한 요소라면 `class`를 이용하여 단일로 만들고 선택자를 이용해 조절 하거나 혹은, 작명 규칙으로써 사용할 수 있다. 혹은 재사용 가능한 블럭 단위로 css를 만드어서 적용시켜준다.

## Quest

* Quest 01에서 만들었던 HTML을 바탕으로, [이 그림](screen.png)의 레이아웃과 CSS를 최대한 비슷하게 흉내내 보세요. 꼭 완벽히 정확할 필요는 없으나 align 등의 속성은 일치해야 합니다.
* **주의사항: 되도록이면 원래 페이지의 CSS를 참고하지 말고 아무것도 없는 백지에서 시작해 보도록 노력해 보세요!**

## Advanced

* 왜 CSS는 어려울까요?
* CSS의 어려움을 극복하기 위해 어떤 방법들이 제시되고 나왔을까요?
* CSS가 브라우저에 의해 해석되고 적용되기까지 내부적으로 어떤 과정을 거칠까요?
* 웹 폰트의 경우에는 브라우저 엔진 별로 어떤 과정을 통해 렌더링 될까요?
