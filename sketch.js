var gameState = "wait"
var splash;
var playbutton
var aboutbutton
var bg1;
var player, player_img;
var heart;
var heart1_img, heart2_img, heart3_img, heart4_img, heart5_img;
var heartGroup;
var arrow, arrow_img;
var score = 0;

function preload() {
    splash = loadImage("assets/splash3.gif")
    bg1 = loadImage("assets/bg2.jpg")
    player_img = loadImage("assets/cupid.png")
    heart1_img = loadImage("assets/evil_heart2.png")
    heart2_img = loadImage("assets/red_heart.png")
    heart3_img = loadImage("assets/darkblue_heart.png")
    heart4_img = loadImage("assets/pink_heart.png")
    heart5_img = loadImage("assets/yellow_heart.png")
    arrow_img = loadImage("assets/red_arrow2.png")
}

function setup() {
    createCanvas(windowWidth, windowHeight)

    playbutton = createImg("assets/playButton.png")
    playbutton.position(840, 523)
    playbutton.size(200, 90)
    playbutton.hide()

    aboutbutton = createImg("assets/aboutButton.png")
    aboutbutton.position(580, 520)
    aboutbutton.size(200, 95)
    aboutbutton.hide()

    player = createSprite(130, 400)
    player.addImage("main", player_img)
    player.visible = false;
    player.scale = 0.6

    heartGroup = new Group()
}

function draw() {
    if (gameState === "wait") {


        background(splash)
        playbutton.show()
        aboutbutton.show()
        //background_music.play();
    }

    aboutbutton.mousePressed(() => {
        playbutton.hide();
        aboutbutton.hide();
        gameState = "about";
    })

    if (gameState == "about") {
        aboutgame();
    }

    playbutton.mousePressed(() => {
        playbutton.hide();
        aboutbutton.hide();
        gameState = "play";
    })

    if (gameState == "play") {
        //background_music.stop();

        background(bg1);

        player.visible = true;
        spawnHearts();
        spawnBlackHearts();
        movement();
    }

    drawSprites();

    if (gameState == "play" || gameState == "level2") {
        fill(255);
        textSize(25);
        text("SCORE: " + score, 50, 50);

    }
}

function aboutgame() {

    swal({
        title: "About Game === How to Play!!",
        text: "Shoot the hearts and escape from the black hearts!\nUse Arrow Keys to move up and down and Space Bar to release the Arrows",
        textAlign: "center",
        imageUrl: "assets/logo.gif",
        imageSize: "200x200",
        confirmButtonText: "Let's fly!",
        confirmButtonColor: "purple",
    },

        function () {
            gameState = "wait"
        }
    )

}


function spawnArrows() {

    arrow = createSprite(player.x + 15, player.y + 15, 20, 20);
    arrow.addImage(arrow_img);
    arrow.scale = 0.4;
    arrow.velocityX = 10;
   
    arrow.depth = player.depth;
    player.depth = player.depth + 1;

    arrowGroup.add(arrow);


}

function keyReleased() {
    if (keyCode === 32) {
        //shootSound.play();
        spawnArrows();

    }
}

function movement() {

    if (player.y <= 80) {
        player.y = 80
    }

    if (player.y >= 525) {
        player.y = 525
    }

    if (keyDown("UP_ARROW")) {
        player.y = player.y - 5;
    }

    if (keyDown("DOWN_ARROW")) {
        player.y = player.y + 5;
    }

}

function spawnHearts() {

    if (frameCount % 50 == 0) {

        var randy = Math.round(random(80, 600))
        heart = createSprite(width, randy);
        heart.scale = 0.5
        heart.velocityX = -8;

        var randimg = Math.round(random(2, 5))
        switch (randimg) {

            case 1:
                heart.addImage(heart1_img)
                heart.scale = 0.5;
                //heart.velocityX = -15;
                heart.setCollider("rectangle", 0, 0, 250, 300)
                break;

            case 2:
                heart.addImage(heart2_img)
                heart.scale = 0.6
                heart.setCollider("rectangle", 0, 0, heart.width, heart.height)
                break;

            case 3:
                heart.addImage(heart3_img)
                heart.scale = 0.4
                heart.setCollider("rectangle", 0, 0, 250, 300)
                break;

            case 4:
                heart.addImage(heart4_img)
                heart.scale = 0.4
                heart.setCollider("rectangle", 0, 0, 250, 300)
                break;

            case 5:
                heart.addImage(heart5_img)
                heart.scale = 0.15
                heart.setCollider("rectangle", 0, 0, 250, 300)
                break;

            default: break;

        }

        heart.depth = player.depth;
        player.depth = player.depth + 1;

        heartGroup.add(heart);

    }

}

function spawnBlackHearts() {

    if (frameCount % 100 == 0) {

        var randy = Math.round(random(80, 590))
        heart = createSprite(width, randy);
        heart.scale = 0.5
        heart.velocityX = -10;
        heart.addImage(heart1_img)
        heart.setCollider("rectangle", 0, 0, 250, 300)

        heart.depth = player.depth;
        player.depth = player.depth + 1;

        heartGroup.add(heart);

    }

}