$(function () {
  $(".menu li").on("click", function (event) {
    event.preventDefault(); // 기본 클릭 동작 방지
    let i = $(this).index(); // 클릭한 메뉴 항목의 인덱스

    // 스크롤을 원하는 섹션으로 부드럽게 이동
    $("html, body")
      .stop()
      .animate(
        { scrollTop: i * $(window).height() }, // 각 섹션의 높이에 따라 스크롤
        800,
        function () {
          // con6로 이동한 경우 추가 동작이 필요할 경우
          if (i === 5) {
            // 추가 동작이 필요 없다면 이 부분 삭제 가능
          }
        }
      );
  });

  $(window).on("load", function () {
    // 페이지가 로드될 때 초기 위치 설정
    $("html, body").scrollTop(0);
  });

  $(document).ready(function () {
    $(".wrap, .menu").hide(); // 처음에 숨기기
    $(".kwon_text")
      .hide()
      .fadeIn(5500, function () {
        // kwon_text가 나타날 때까지 기다림
        setTimeout(function () {
          $(".wrap, .menu").fadeIn(1000); // .kwon_text가 끝난 후 20초 동안 .wrap과 .menu를 나타내기
          $(".kwon_text, .kwon").fadeOut(1000); // .wrap과 .menu가 나타난 후 1초 후에 kwon_text 숨기기
        }, 2000); // .kwon_text가 끝난 후 1초 뒤에 실행
      });
  });
});
