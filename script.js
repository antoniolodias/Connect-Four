(function() {
    var curPlayer = ".PLAYER-1";
    var lightColor = "lightTomato";

    var slots = $(".slot");
    var column = $(".column");
    var winMessage = $(".winMessage");
    var start = $(".start");
    var startPanel = $(".startPanel");
    var startOver = $(".startOver");
    var startOverButton = $(".startOverButton");
    var reset = $(".reset");
    var header = $(".header");

    start.on("click", function() {
        startPanel.css("left", "100%");
        startOver.css("top", "25px");
        column.on("click", game);
        column.on("mouseenter", mousteE);
        column.on("mouseleave", mouseL);
        $(".slot").removeClass("winnerClass");
    });

    startOverButton.on("click", function() {
        startPanel.css("left", "");
        startOver.css("top", "100%");
        column.off("click", game);
        column.off("mouseenter", mousteE);
        column.off("mouseleave", mouseL);
        $(".slot").removeClass("winnerClass");
        $(".slot").removeClass("PLAYER-1");
        $(".slot").removeClass("PLAYER-2");
        $("input").val("");
    });

    function game(e) {

        var slotsInColumn = $(e.currentTarget).find(".slot");

        for (var i = 5; i >= 0; i--) {
            if (!slotsInColumn.eq(i).hasClass("PLAYER-1")) {
                if (!slotsInColumn.eq(i).hasClass("PLAYER-2")) {
                    break;
                }
            }
        }

        slotsInColumn.eq(i).addClass(curPlayer);

        var slotsInRow = $(".row" + i);

        if (
            checkVictory(slotsInColumn) ||
            checkVictory(slotsInRow) ||
            checkVictoryDiagonal(slots)
        ) {
            if (curPlayer == "PLAYER-1") {
                winMessage.html($(".player1").val() + " WINS");
                header.css("left", 0);
                startOver.css("top", "100%");
                slots.removeClass("lightYellow");
            } else {
                slots.removeClass("lightTomato");
                winMessage.html($(".player2").val() + " WINS");
                header.css("left", 0);
                startOver.css("top", "100%");
            }
        }

        if (curPlayer == "PLAYER-1") {
            curPlayer = "PLAYER-2";
            lightColor = "lightYellow";
        } else {
            curPlayer = "PLAYER-1";
            lightColor = "lightTomato";
        }
    }

    reset.on("click", function() {
        slots.removeClass("PLAYER-1");
        slots.removeClass("PLAYER-2");
        $(".header").css("left", "-100%");
        $(".startPanel").css("left", "");
        $("input").val("");
    });

    function mousteE(e) {
        $(e.currentTarget).addClass(lightColor);
    }
    function mouseL(e) {
        $(e.currentTarget).removeClass("lightTomato");
        $(e.currentTarget).removeClass("lightYellow");
    }


    function checkVictory(slots) {
        var counter = 0;
        for (var i = 0; i < slots.length; i++) {
            if (slots.eq(i).hasClass(curPlayer)) {
                counter++;
                if (counter == 4) {
                    column.removeClass("lightTomato");
                    column.removeClass("lightYellow");
                    column.off("mouseenter");
                    column.off("click");
                    slots.eq(i).addClass("winnerClass");
                    slots.eq(i - 1).addClass("winnerClass");
                    slots.eq(i - 2).addClass("winnerClass");
                    slots.eq(i - 3).addClass("winnerClass");
                    return true;
                }
            } else {
                counter = 0;
            }
        }
    }

    function checkVictoryDiagonal(slots) {
        for (var i = 0; i < slots.length; i++) {
            if (
                slots.eq(i).hasClass(curPlayer) &&
                slots.eq(i + 7).hasClass(curPlayer) &&
                slots.eq(i + 14).hasClass(curPlayer) &&
                slots.eq(i + 21).hasClass(curPlayer)
            ) {
                if (
                    slots
                        .eq(i)
                        .parent()
                        .index() ===
                        slots
                            .eq(i + 7)
                            .parent()
                            .index() -
                            1 &&
                    slots
                        .eq(i)
                        .parent()
                        .index() ===
                        slots
                            .eq(i + 14)
                            .parent()
                            .index() -
                            2 &&
                    slots
                        .eq(i)
                        .parent()
                        .index() ===
                        slots
                            .eq(i + 21)
                            .parent()
                            .index() -
                            3
                ) {
                    column.removeClass("lightTomato");
                    column.removeClass("lightYellow");
                    column.off("mouseenter");
                    column.off("click");
                    slots.eq(i).addClass("winnerClass");
                    slots.eq(i + 7).addClass("winnerClass");
                    slots.eq(i + 14).addClass("winnerClass");
                    slots.eq(i + 21).addClass("winnerClass");
                    return true;
                }
            } else if (
                slots.eq(i).hasClass(curPlayer) &&
                slots.eq(i + 5).hasClass(curPlayer) &&
                slots.eq(i + 10).hasClass(curPlayer) &&
                slots.eq(i + 15).hasClass(curPlayer)
            ) {
                if (
                    slots
                        .eq(i)
                        .parent()
                        .index() ===
                        slots
                            .eq(i + 5)
                            .parent()
                            .index() -
                            1 &&
                    slots
                        .eq(i)
                        .parent()
                        .index() ===
                        slots
                            .eq(i + 10)
                            .parent()
                            .index() -
                            2 &&
                    slots
                        .eq(i)
                        .parent()
                        .index() ===
                        slots
                            .eq(i + 15)
                            .parent()
                            .index() -
                            3
                ) {
                    column.removeClass("lightTomato");
                    column.removeClass("lightYellow");
                    column.off("mouseenter");
                    column.off("click");
                    slots.eq(i).addClass("winnerClass");
                    slots.eq(i + 5).addClass("winnerClass");
                    slots.eq(i + 10).addClass("winnerClass");
                    slots.eq(i + 15).addClass("winnerClass");
                    return true;
                }
            }
        }
    }
})();
