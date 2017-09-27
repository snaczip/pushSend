$(function() {
  var client_key = "23c6ca71e412fb921133db2d31e4fc976363621f9048009da765461ddf22be9b";
  if (client_key == '') {
    alert("クライアントキーが入力されていませんので利用できません");
    return false;
  }
  // ニフティクラウド mobile backendを初期化しています
    document.addEventListener("deviceready", function(){
            // デバイストークンを取得してinstallationに登録する
            window.NCMB.monaca.setDeviceToken(
                "2df3deae2bf470672fba2850adf099d1bb13fa399d6011512dac3a67518afb10",
                "23c6ca71e412fb921133db2d31e4fc976363621f9048009da765461ddf22be9b",
                "1059991932227"
            );
        },false);

  // フォームの送信時のイベントを取得しています
  $("form").on("submit", function(e) {
    var message;
    e.preventDefault();
    message = $("#message").val();

    // ここからがプッシュ作成処理になります
    NCMB.Push.send({
      message: message,
      immediateDeliveryFlag: true,
      target: ['android'], // 今回はiOS限定としています。Androidも追加する場合は 'android'を配列の要素に追加します
      searchCondition: {}
    }).then(function(e) {
      // 処理がうまくいった場合はこちら
      $(".message").addClass("alert alert-success").html("作成されました");
      setTimeout(function(e) {
        $(".message").removeClass("alert alert-success").html("");
      }, 3000);
    }, function(e) {
      // エラーだった場合はこちら
      console.error("error", e);
    });
  });
});