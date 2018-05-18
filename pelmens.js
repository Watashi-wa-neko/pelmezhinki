/*global Phaser*/

var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'pelmens', { preload: preload, create: create, update: update });

function preload() {
  game.load.image('pelmen1', 'pelmen1.png');
  game.load.image('pelmen2', 'pelmen2.png');
  game.load.image('pelmen3', 'pelmen3.png');
  game.load.image('pelmen4', 'pelmen4.png');

  game.load.spritesheet('teacat', 'teacat.png', 200, 200, 3);
  game.load.image('hat', 'hat.png');

  game.load.image('bg', 'bg.jpg');
  game.load.audio('pelmezhinki', 'pelmezhinki.mp3');
}

var keyboard,
    teacat,
    pelmensGroup,
    text,
    teacatGroup,
    hat;

var delay = 0,
    pelmezhinkasCatch = 0;

function create() {
  // game.sound.play('pelmezhinki');
  game.add.sprite(0, 0, 'bg')

  teacatGroup = game.add.group();

  teacat = teacatGroup.create(10, 404, 'teacat');
  teacat.animations.add('walk');

  hat = teacatGroup.create(80, 474, 'hat');

  game.physics.enable(hat, Phaser.Physics.ARCADE);

  pelmensGroup = game.add.physicsGroup();

  for(var i = 0; i < 54; i++){
    createPelmezhinka();
  }

  text = game.add.text(game.world.centerX, game.world.centerY, "Пельмешек в шапочке: 0", {
      font: "16px Arial",
      fill: "#fff",
      align: "left"
  });
  text.anchor.setTo(0.5, 0.5);
  text.position.x = 650;
  text.position.y = 50;

  keyboard = game.input.keyboard.createCursorKeys();
}

function update() {
  game.physics.arcade.collide(hat, pelmensGroup, collisionHandler, processHandler, this);

  if (keyboard.left.isDown){
      teacatGroup.position.x -= 4;
      teacat.animations.play('walk', 14, true);
  }
  else if (keyboard.right.isDown){
      teacatGroup.position.x += 4;
      teacat.animations.play('walk', 14, true);
  }
  else {
    teacat.animations.stop();
  }
}

function createPelmezhinka () {
  var randomX = game.rnd.integerInRange(20, 980);
  var s = pelmensGroup.create(randomX, game.rnd.integerInRange(-20, -580), 'pelmen' + game.rnd.integerInRange(1, 4));
  s.anchor.setTo(0.5, 0.5);
  s.scale.setTo(.1, .1);

  game.add.tween(s).to({ x: randomX-100, y: 700 , angle: 370}, game.rnd.between(4000, 6000), Phaser.Easing.Sinusoidal.InOut, true, delay, 1000, false);
  delay += 200;
}

function processHandler (teacat, pelmezhinka) {
    return true;
}

function collisionHandler (teacat, pelmezhinka) {
  pelmezhinka.kill();

  pelmezhinkasCatch++;
  text.setText("Пельмешек в шапочке: " + pelmezhinkasCatch);
  createPelmezhinka();
}
