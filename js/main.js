$(function () {
  // 페이지가 로드될 때 초기 위치 설정
  $(window).on("load", function () {
    $("html, body").scrollTop(0); // 페이지가 로드되면 상단으로 스크롤 이동
  });

  // 초기 숨기기
  $(".wrap, .menu").hide();
  $(".kwon_text")
    .hide()
    .fadeIn(3000, function () {
      setTimeout(function () {
        $(".kwon_text, .kwon").fadeOut(1000, function () {
          $(".wrap, .menu").fadeIn(1000, function () {
            $(".visual_bottom li:nth-child(1)")
              .css("transform", "translateX(0)")
              .on("transitionend", function () {
                $(".visual_bottom li div").each(function (index) {
                  $(this)
                    .delay(index * 200)
                    .queue(function (next) {
                      $(this).css({
                        transform: "translateX(0)",
                        opacity: 1,
                      });
                      next();
                    });
                });
                $(".visual_bottom li:nth-child(2)").css(
                  "transform",
                  "translateX(0)"
                );
              });
            setInterval(function () {
              $(".scroll_top")
                .stop()
                .animate({ "margin-top": "-5.5vw" }, 500, function () {
                  $(".scroll_top li:first-child").appendTo(".scroll_top");
                  $(".scroll_top").css({ "margin-top": "0" });
                });
            }, 2000);
          });
        });
      }, 1000); // .kwon_text 종료 후 1초 대기
    });

  // 메뉴 클릭 시 부드러운 스크롤
  $(".menu li").on("click", function (event) {
    event.preventDefault(); // 기본 클릭 동작 방지
    let i = $(this).index(); // 클릭한 메뉴 항목의 인덱스
    // 스크롤을 원하는 섹션으로 부드럽게 이동
    $("html, body")
      .stop()
      .animate(
        { scrollTop: i * $(window).height() }, // 각 섹션의 높이에 따라 스크롤
        800
      );
  });

  // con1 요소들이 화면에 나타날 때 애니메이션을 추가
  const elements = $(
    ".con1_wrap, .line_1, .line_2, .line_3, .line_4, .con1_txt2, .keyword li"
  );

  $(window).on("scroll", function () {
    const scrollTop = $(window).scrollTop();
    const windowHeight = $(window).height();

    elements.each(function () {
      const elementTop = $(this).offset().top;

      // 요소가 화면에 나타날 때 active 클래스 추가
      if (scrollTop + windowHeight >= elementTop + 50) {
        $(this).addClass("active").removeClass("inactive");

        // line 요소들에 대한 애니메이션 처리 (왼쪽에서 오른쪽으로 차오르듯)
        if (
          $(this).hasClass("line_1") ||
          $(this).hasClass("line_2") ||
          $(this).hasClass("line_3") ||
          $(this).hasClass("line_4")
        ) {
          $(this).addClass("line-active");
        }

        // .keyword li 요소들에 대한 애니메이션
        if ($(this).hasClass("keyword")) {
          $(this)
            .children("li")
            .each(function (index) {
              $(this)
                .delay(index * 200) // 각 항목마다 애니메이션 딜레이 추가
                .queue(function (next) {
                  $(this).addClass("show"); // show 클래스를 추가하여 애니메이션 실행
                  next();
                });
            });
        }

        // 점선 효과가 있는 line 요소들에 대해 처리
        if (
          $(this).hasClass("line_1") ||
          $(this).hasClass("line_2") ||
          $(this).hasClass("line_3") ||
          $(this).hasClass("line_4")
        ) {
          if (scrollTop > $(this).offset().top - windowHeight / 1.2) {
            $(this).addClass("line-dotted-active");
          }
        }
      }
    });

    // Intersection Observer 설정
    const options = {
      root: null, // 뷰포트(브라우저 창) 기준으로 감지
      rootMargin: "0px", // 뷰포트와 요소 간의 여백
      threshold: 0.1, // 요소가 10%만 보이면 트리거
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        // 요소가 화면에 들어오면
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target); // 애니메이션 후 다시 관찰하지 않도록 설정
        }
      });
    }, options);

    // 각 `li` 요소에 대해 observer 적용
    const keywordItems = document.querySelectorAll(".keyword > li");

    keywordItems.forEach((item, index) => {
      // 첫 번째, 세 번째, 네 번째 항목에는 왼쪽에서 들어오는 클래스 추가
      if (index % 2 === 0) {
        item.classList.add("left");
      } else {
        // 두 번째, 네 번째 항목에는 오른쪽에서 들어오는 클래스 추가
        item.classList.add("right");
      }
      observer.observe(item); // 각각의 요소를 감지
    });
  });

  $(document).ready(function () {
    // 첫 번째 기능: 자동으로 hover 효과를 트리거
    setInterval(function () {
      $(".con1_wrap h2 a").each(function () {
        var $this = $(this);

        // 자동으로 hover 효과를 트리거하기 위해 클래스 추가
        $this.addClass("hover-effect");

        // 1초 후에 hover 효과를 제거
        setTimeout(function () {
          $this.removeClass("hover-effect");
        }, 1000); // 1초 후 hover 효과 제거
      });
    }, 5000); // 2.5초마다 반복

    // 두 번째 기능: 이미지 hover 효과 트리거
    var images = $(".img_1, .img_2, .img_3, .img_4"); // 이미지를 선택
    var index = 0;

    function triggerHoverEffect() {
      // 현재 이미지를 선택하여 hover 효과를 강제로 트리거
      $(images[index]).addClass("hover-trigger");

      // 다른 이미지들은 hover 효과를 제거
      $(images).not(images[index]).removeClass("hover-trigger");

      // 다음 이미지로 넘어가기
      index = (index + 1) % images.length;
    }

    setInterval(triggerHoverEffect, 2000); // 2초마다 효과 반복

    // 이미지 클릭 시 확인 창 띄우기
    $(".txt2_2 li img").on("click", function (event) {
      var confirmation = confirm("해당 페이지로 이동하시겠습니까?");

      if (confirmation) {
        // 각 이미지에 따른 이동할 컨텐츠 지정
        var targetCon;
        if ($(this).parent().hasClass("img_1")) {
          targetCon = $("#con2");
        } else if ($(this).parent().hasClass("img_2")) {
          targetCon = $("#con3");
        } else if ($(this).parent().hasClass("img_3")) {
          targetCon = $("#con4");
        } else if ($(this).parent().hasClass("img_4")) {
          targetCon = $("#con5");
        }

        // 해당 섹션으로 부드럽게 스크롤 이동
        if (targetCon) {
          $("html, body")
            .stop()
            .animate({ scrollTop: targetCon.offset().top }, 800);
        }
      }
    });
  });

  $(document).ready(function () {
    function handleScroll() {
      const scrollTop = $(window).scrollTop();
      const windowHeight = $(window).height();

      // 1. .keyword_2 li - 순차적 등장
      $(".keyword_2 li").each(function (index) {
        const elementTop = $(this).offset().top;
        if (scrollTop + windowHeight >= elementTop + 50) {
          setTimeout(() => {
            $(this).addClass("show");
          }, index * 300);
        }
      });

      // 2. .color - 너비 증가
      $(".color").each(function () {
        const elementTop = $(this).offset().top;
        if (scrollTop + windowHeight >= elementTop + 50) {
          $(this).css("width", "100%");
        }
      });

      // 3. .color_balance p, .logo_design p - 타이핑 효과
      $(".color_balance p, .logo_design p").each(function () {
        const elementTop = $(this).offset().top;
        if (
          scrollTop + windowHeight >= elementTop + 50 &&
          !$(this).hasClass("typed")
        ) {
          $(this).addClass("typed");
          smoothTypingEffect($(this));
        }
      });

      // 4. .logo_wrap li img - 페이드인 효과
      $(".logo_wrap li img").each(function () {
        const elementTop = $(this).offset().top;
        if (scrollTop + windowHeight >= elementTop + 50) {
          $(this).addClass("fadeIn");
        }
      });
    }

    // 부드러운 타이핑 애니메이션 함수
    function smoothTypingEffect(element) {
      const text = element.text();
      element.text("");
      let index = 0;

      function typeNextChar() {
        if (index < text.length) {
          element.append(text[index]);
          index++;
          setTimeout(typeNextChar, 25); // 25ms 간격
        }
      }

      typeNextChar();
    }

    // 초기 애니메이션 강제 트리거
    function triggerInitialAnimations() {
      $(window).scrollTop(1); // 강제로 스크롤 이동
      $(window).scrollTop(0); // 원위치
      handleScroll(); // 초기 애니메이션 확인
    }

    // 이벤트 등록
    $(window).on("scroll", handleScroll);

    // 페이지 로드 시 강제 스크롤 트리거
    $(window).on("load", function () {
      triggerInitialAnimations();
    });

    // DOMContentLoaded 시 강제 초기화
    document.addEventListener("DOMContentLoaded", function () {
      setTimeout(() => {
        triggerInitialAnimations();
      }, 150); // 약간의 딜레이 추가
    });
  });

  // Intersection Observer를 사용하여 스크롤 시 요소가 화면에 보일 때 'visible' 클래스 추가
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target); // 이미 보이면 다시 감시하지 않음
        }
      });
    },
    { threshold: 0.1 }
  ); // 화면에 10% 이상 보일 때 트리거

  // fade-in 클래스를 가진 모든 요소에 대해 observer 설정
  const fadeInElements = document.querySelectorAll(".fade-in");
  fadeInElements.forEach((element) => {
    element.classList.add(".visible"); // 해당 요소에 fade-in 클래스 추가
    observer.observe(element); // IntersectionObserver로 감시 시작
  });
  $(document).ready(function () {
    var typingInterval; // 타이핑 효과를 위한 interval 변수

    // 프로필 이미지 클릭 시 모달 열기
    $(".profile_img").on("click", function () {
      $("#myModal").show(); // 모달 창 열기
      startTyping(); // 타이핑 시작
    });

    // 전문보기 버튼 클릭 시 타이핑 효과 건너뛰고 전체 텍스트 보이기
    $(".view-more").on("click", function () {
      stopTyping(); // 타이핑 중지
      $("#typing-effect").hide(); // 타이핑 텍스트 숨기기
      $("#full-text").show(); // 전체 텍스트 보이기
      $(".view-more").hide(); // 전문보기 버튼 숨기기
    });

    // 모달 창을 닫기 위한 X 버튼 클릭 시
    $("#closeModal").on("click", function () {
      $("#myModal").hide(); // 모달 창 닫기
      stopTyping(); // 타이핑 중지
    });

    // 모달 창 밖을 클릭했을 때 닫기
    $(window).on("click", function (event) {
      if (event.target == $("#myModal")[0]) {
        $("#myModal").hide(); // 모달 창 닫기
        stopTyping(); // 타이핑 중지
      }
    });
  });

  // 타이핑 효과 함수
  function startTyping() {
    var speed = 50; // 타이핑 속도 (밀리초 단위)
    var text =
      "안녕하세요. 우선 저의 포트폴리오를 봐주시는 모든 분들께 감사드립니다. 저는 아직 살아온 세월이 많지 않지만, 그동안 다양한 경험을 통해 조금씩 성장해왔습니다. 어린 시절, 8살 무렵 우연히 참가한 미술 대회에서 대상을 수상하면서 제 안에 잠재된 미술적 재능을 발견한 부모님 덕분에, 10살부터 본격적으로 미술을 배우기 시작했습니다. 이후 예술중학교에 입학하여 다양한 미술기법을 익히며 예술적 감각을 키워왔습니다. 중학교 시절, 입시미술뿐만 아니라 도예, 아크릴화 등 다양한 분야를 경험하며 제 미술 세계를 넓혔고, 고등학교에서는 실기 수석으로 원하는 예술고등학교에 진학하게 되었습니다. 하지만 점차 전통적인 입시미술보다는 디지털 미디어를 활용한 창작에 더 큰 흥미를 느끼게 되었고, 그로 인해 고등학교 3학년 때는 과감히 자퇴를 결심했습니다. 이후 뉴질랜드로 떠나 새로운 도전에 나섰고, 2년 반 동안 다양한 예술 분야를 경험하며 디지털 예술에 대한 관심을 더욱 확고히 다지게 되었습니다. 학교에서 특수 분장, 조형디자인, 바디 페인팅 등 다양한 디자인 분야를 경험하며 창작의 폭을 넓혔고, 아이엘츠 시험에서 6.0을 얻어 원하는 학교에 입학할 수 있었습니다. 수료 후 한국으로 돌아와 전주에서 옥외 광고 디자인을 시작으로 수도권에서 본격적인 디자인 경력을 쌓았습니다. 처음에는 낯선 환경에서의 도전이 쉽지 않았지만, 팀리더로서 프로젝트를 이끌며 후배들에게 배운 것을 나누고 함께 성장하는 경험을 쌓았습니다. 그 결과, 웹디자이너로서 6년간 꾸준히 경력을 쌓고, 대리 직함을 얻게 되었습니다. 저는 항상 긍정적인 마음으로 배우고 성장해왔으며, 주어진 도전과 기회를 소중히 여기고 있습니다. 제 좌우명은 '세상에 안 되는 일은 없다'입니다. 과거의 경험을 통해, 어떤 어려움이든 결국 극복할 수 있다는 믿음을 갖게 되었습니다. 앞으로도 더 많은 경험을 통해 제 디자인 철학과 기술을 발전시키고, 새로운 도전에도 두려움 없이 맞서고자 합니다. 항상 겸손한 자세로 배우며, 맡은 일에 최선을 다하는 사람이 되겠습니다. 읽어주셔서 감사합니다. '권새롬 드림"; // 텍스트 내용
    var element = $("#typing-effect"); // 타이핑 효과를 적용할 요소
    var i = 0;

    // 기존 타이핑을 멈추고 새로 타이핑을 시작하도록 리셋
    element.text("");

    // setInterval로 타이핑 효과 구현
    typingInterval = setInterval(function () {
      if (i < text.length) {
        element.append(text.charAt(i)); // 한 글자씩 추가
        i++;
      }
    }, speed);
  }

  // 타이핑 효과 중지 함수 (전문보기 시 전체 텍스트 보이도록)
  function stopTyping() {
    var fullText = $("#full-text");
    fullText.show(); // 전체 텍스트 보이게 함
    var typingEffect = $("#typing-effect");
    typingEffect.hide(); // 타이핑 중인 텍스트는 숨김
  }
});
$(window).on("scroll", function () {
  var scrollPosition = $(window).scrollTop(); // 현재 스크롤 위치
  var maxScroll = $(document).height() - $(window).height(); // 전체 페이지 길이
  var scrollPercentage = scrollPosition / maxScroll; // 스크롤 비율 계산 (0 ~ 1 사이)

  // 각 .blue 요소에 대해 설정된 padding 값 (기존 padding값을 그대로 사용)
  $(window).on("scroll", function () {
    $(".blue").each(function () {
      var elementTop = $(this).offset().top; // 요소의 상단 위치
      var windowBottom = $(window).scrollTop() + $(window).height(); // 현재 스크롤 위치 + 화면 높이

      // 요소가 화면에 보이면 애니메이션을 시작하도록 클래스를 추가
      if (windowBottom > elementTop) {
        $(this).addClass("start-animation");
      }
    });
  });
  const h2Element = document.querySelector(".website h2");
  const chars = document.querySelectorAll(".website h2 a .char");

  // IntersectionObserver - 화면에 h2가 보일 때 자동으로 hover 효과 트리거
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // 자동으로 hover 상태 추가
          h2Element.classList.add("auto-hover");

          // 애니메이션이 끝난 후 hover 상태 제거
          setTimeout(() => {
            h2Element.classList.remove("auto-hover");
          }, 2000); // 애니메이션이 끝난 후 원상복구

          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  observer.observe(h2Element);
  // 스크롤 방향에 따라 클래스를 추가하거나 제거
  let prevScroll = 0;
  $(window).on("scroll", function () {
    let nowScroll = $(window).scrollTop();
    if (nowScroll > prevScroll) {
      $(".website h2").addClass("on");
    } else {
      $(".website h2").removeClass("on");
    }
    prevScroll = nowScroll;
  });
  $(document).ready(function () {
    const $con4Back = $(".con4_back"); // 배경 이미지
    const $con4 = $(".con4"); // con4 섹션

    $(window).on("scroll", function () {
      const con4Top = $con4.offset().top - $(window).scrollTop(); // con4 섹션의 상단 위치 계산
      const windowHeight = $(window).height();

      // con4 섹션이 화면에 들어올 때 배경 이미지가 서서히 사라짐
      if (con4Top < windowHeight && con4Top > 0) {
        // 배경 이미지가 화면에 도달하면 opacity를 서서히 0으로 설정
        $con4Back.css("opacity", 0); // opacity가 0으로 변하면 서서히 사라짐
        setTimeout(function () {
          // opacity가 완전히 0이 되면 display: none으로 변경
          $con4Back.css("display", "none");
        }, 3000);
      }
    });
  });
  $(document).ready(function () {
    // 첫 번째 기능: 자동으로 hover 효과를 트리거
    setInterval(function () {
      $(".h51 a").each(function () {
        var $this = $(this);

        // 자동으로 hover 효과를 트리거하기 위해 클래스 추가
        $this.addClass("hover-effect");

        // 1초 후에 hover 효과를 제거
        setTimeout(function () {
          $this.removeClass("hover-effect");
        }, 1000); // 1초 후 hover 효과 제거
      });
    }, 3000); // 3초마다 반복
  });
  $(document).ready(function () {
    // 스크롤 이벤트 감지
    $(window).on("scroll", function () {
      // 화면에 나타난 요소를 찾기
      $(".h51 a, .h52 a, .h53 a, .h54 a").each(function () {
        var $this = $(this);

        // 요소가 화면에 보이는지 확인
        var elementTop = $this.offset().top;
        var elementBottom = elementTop + $this.outerHeight();
        var viewportTop = $(window).scrollTop();
        var viewportBottom = viewportTop + $(window).height();

        if (elementBottom > viewportTop && elementTop < viewportBottom) {
          // 화면에 보이면 hover 효과 클래스 추가
          $this.find(".char").addClass("hover-effect");

          // 1초 후 클래스 제거
          setTimeout(function () {
            $this.find(".char").removeClass("hover-effect");
          }, 1000); // hover 효과 유지 시간
        }
      });
    });
  });
  const boldElements = document.querySelectorAll(".bold");

  const observers = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          console.log("Active class added to", entry.target);

          // 애니메이션이 끝난 후 active 클래스를 제거
          setTimeout(() => {
            entry.target.classList.remove("active");
            console.log("Active class removed from", entry.target);
          }, 2000); // 애니메이션 시간(3000ms) 후 제거

          observers.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  boldElements.forEach((el) => {
    observers.observe(el);
  });
  // IntersectionObserver를 사용하여 #con6을 감지
  let observerCon6 = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          let thankyouLine = document.querySelector(".thankyou_line");

          // 애니메이션 시작
          thankyouLine.style.animation = "slideIn2 3s ease-out forwards";

          // 한 번 실행 후 다시 감지하지 않도록 observer 해제
          observerCon6.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 } // 50% 이상 보일 때 트리거
  );

  // #con6 감시
  let con6 = document.querySelector("#con6");
  if (con6) {
    observerCon6.observe(con6);
  }
  // 페이지 진입 시 효과 실행
  function initparticles() {
    bubbles();
  }

  // 버블 효과 생성
  function bubbles() {
    $.each($(".particletext.bubbles"), function () {
      // 고정된 버블 개수 설정
      var bubblecount = 30; // 생성할 버블의 개수를 30개로 고정

      // 기존에 생성된 버블이 있을 경우 중복 생성되지 않도록 방지
      if ($(this).find(".particle").length === 0) {
        // 버블 개수만큼 생성
        for (var i = 0; i < bubblecount; i++) {
          var size = $.rnd(20, 60) / 1; // 버블 크기 축소
          $(this).append(
            '<span class="particle" style="top:' +
              $.rnd(20, 80) +
              "%; left:" +
              $.rnd(0, 95) +
              "%; width:" +
              size +
              "px; height:" +
              size +
              "px; animation-delay: " +
              $.rnd(0, 30) / 10 +
              's;"></span>'
          );
        }
      }
    });
  }

  // 랜덤 숫자 생성 함수
  jQuery.rnd = function (m, n) {
    m = parseInt(m);
    n = parseInt(n);
    return Math.floor(Math.random() * (n - m + 1)) + m;
  };

  // Intersection Observer로 특정 섹션에서만 효과 실행
  const bubbleObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          initparticles();
          bubbleObserver.disconnect(); // 중복 실행 방지
        }
      });
    },
    { threshold: 0.5 } // 섹션이 50% 보일 때 실행
  );

  // .particletext.bubbles 요소 관찰
  bubbleObserver.observe(document.querySelector(".particletext.bubbles"));
  // num 클릭 이벤트를 확장
  document.querySelectorAll(".images > div").forEach((num) => {
    num.addEventListener("click", function () {
      // 기존 num 동작 처리 (이미 구현된 것 유지)

      // num의 ID 또는 클래스에서 숫자 추출
      const targetNum = this.className.match(/num(\d+)/)[1]; // 예: num1 -> "1"

      // 상단 txt 요소와 매칭하여 활성화
      document.querySelectorAll(".con5wrap div").forEach((txt) => {
        txt.classList.remove("active"); // 기존 활성화 상태 초기화
        if (txt.className.includes(`txt${targetNum}`)) {
          txt.classList.add("active"); // 매칭된 txt 활성화
        }
      });
    });
  });
  // .con5 h3 요소 선택
  const con5H3 = document.querySelector(".con5 h3");

  // IntersectionObserver 설정: #con5가 화면에 50% 이상 보일 때 동작
  let observer3 = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // #con5가 화면에 나타났을 때
          setTimeout(() => {
            con5H3.style.transition = "opacity 1s ease"; // 부드럽게 사라지도록 설정
            con5H3.style.opacity = 0; // opacity를 0으로 설정하여 부드럽게 사라짐

            // opacity가 0이 된 후 display를 none으로 설정
            setTimeout(() => {
              con5H3.style.display = "none";
            }, 1000); // opacity가 0이 된 후 1초 뒤에 display: none으로 변경
          }, 2500); // 3초 뒤에 사라지게 설정
        }
      });
    },
    { threshold: 0.5 }
  ); // 50%가 보일 때 트리거

  // #con5를 감시 대상으로 설정
  let con5 = document.querySelector("#con5");
  if (con5) {
    observer3.observe(con5);
  }

  Splitting();
});
