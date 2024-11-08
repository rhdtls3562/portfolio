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
});
