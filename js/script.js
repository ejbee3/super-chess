var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

var game = new Phaser.Game(config);

function preload() {
  // board squares
  this.load.svg("dark brown square", "assets/squares/dark_brown.svg", {
    width: 64,
    height: 64,
  });
  this.load.svg("light brown square", "assets/squares/light_brown.svg", {
    width: 64,
    height: 64,
  });

  // white pieces
  this.load.svg("white pawn", "assets/pieces/w_pawn.svg", {
    width: 48,
    height: 48,
  });
  this.load.svg("white rook", "assets/pieces/w_rook.svg", {
    width: 52,
    height: 52,
  });
  this.load.svg("white bishop", "assets/pieces/w_bishop.svg", {
    width: 52,
    height: 52,
  });
  this.load.svg("white horse", "assets/pieces/w_knight.svg", {
    width: 52,
    height: 52,
  });
  this.load.svg("white queen", "assets/pieces/w_queen.svg", {
    width: 52,
    height: 52,
  });
  this.load.svg("white king", "assets/pieces/w_king.svg", {
    width: 52,
    height: 52,
  });

  // black pieces
  this.load.svg("black pawn", "assets/pieces/b_pawn.svg", {
    width: 48,
    height: 48,
  });
  this.load.svg("black rook", "assets/pieces/b_rook.svg", {
    width: 52,
    height: 52,
  });
  this.load.svg("black horse", "assets/pieces/b_knight.svg", {
    width: 52,
    height: 52,
  });
  this.load.svg("black bishop", "assets/pieces/b_bishop.svg", {
    width: 52,
    height: 52,
  });
  this.load.svg("black queen", "assets/pieces/b_queen.svg", {
    width: 52,
    height: 52,
  });
  this.load.svg("black king", "assets/pieces/b_king.svg", {
    width: 52,
    height: 52,
  });
}

function create() {
  // square coordinates
  let dbx = 64;
  let lbx = 0;
  let dby = 0;
  let lby = 0;

  // pieces

  let white_pieces = [{ p: [] }, { r: [] }, { h: [] }, { b: [] }];
  let black_pieces = [{ p: [] }, { r: [] }, { h: [] }, { b: [] }];

  // white side
  let wpx = 8;
  let wpy = 392;

  let wrx = 6;
  let wry = 454;

  let whx = 70;
  let why = 454;

  let wbx = 134;
  let wby = 454;

  let wqx = 198;
  let wqy = 454;

  let wkx = 262;
  let wky = 454;

  // black side
  let bpx = 8;
  let bpy = 72;

  let brx = 8;
  let bry = 6;

  let bhx = 72;
  let bhy = 6;

  let bbx = 136;
  let bby = 6;

  let bqx = 200;
  let bqy = 6;

  let bkx = 264;
  let bky = 6;

  // making board
  let offset = false;
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 4; j++) {
      this.add.image(dbx, dby, "dark brown square").setOrigin(0, 0);
      this.add.image(lbx, lby, "light brown square").setOrigin(0, 0);
      dbx += 128;
      lbx += 128;
    }
    dby += 64;
    lby += 64;
    offset = !offset;
    if (offset) {
      dbx = 0;
      lbx = 64;
    } else {
      dbx = 64;
      lbx = 0;
    }
  }

  // putting pieces on board
  for (let i = 0; i < 2; i++) {
    let obj = {};
    obj["r" + (i + 1)] = this.add
      .image(brx, bry, "black rook")
      .setOrigin(0, 0)
      .setInteractive();
    black_pieces[1].r.push(obj);
    obj = {};
    obj["b" + (i + 1)] = this.add
      .image(bbx, bby, "black bishop")
      .setOrigin(0, 0)
      .setInteractive();
    black_pieces[3].b.push(obj);
    obj = {};
    obj["h" + (i + 1)] = this.add
      .image(bhx, bhy, "black horse")
      .setOrigin(0, 0)
      .setInteractive();
    black_pieces[2].h.push(obj);
    obj = {};
    obj["h" + (i + 1)] = this.add
      .image(whx, why, "white horse")
      .setOrigin(0, 0)
      .setInteractive();
    white_pieces[2].h.push(obj);
    obj = {};
    obj["r" + (i + 1)] = this.add
      .image(wrx, wry, "white rook")
      .setOrigin(0, 0)
      .setInteractive();
    white_pieces[1].r.push(obj);
    obj = {};
    obj["b" + (i + 1)] = this.add
      .image(wbx, wby, "white bishop")
      .setOrigin(0, 0)
      .setInteractive();
    white_pieces[3].b.push(obj);
    obj = {};

    brx += 448;
    bhx += 320;
    bbx += 192;

    whx += 320;
    wrx += 448;
    wbx += 192;
  }

  for (let i = 0; i < 8; i++) {
    let obj = {};
    obj["p" + (i + 1)] = this.add
      .image(bpx, bpy, "black pawn")
      .setOrigin(0, 0)
      .setInteractive();
    black_pieces[0].p.push(obj);
    obj = {};
    obj["p" + (i + 1)] = this.add
      .image(wpx, wpy, "white pawn")
      .setOrigin(0, 0)
      .setInteractive();
    white_pieces[0].p.push(obj);
    obj = {};

    bpx += 64;
    wpx += 64;
  }

  black_pieces.push({
    q: this.add.image(bqx, bqy, "black queen").setOrigin(0, 0).setInteractive(),
  });
  black_pieces.push({
    k: this.add.image(bkx, bky, "black king").setOrigin(0, 0).setInteractive(),
  });

  white_pieces.push({
    q: this.add.image(wqx, wqy, "white queen").setOrigin(0, 0).setInteractive(),
  });
  white_pieces.push({
    k: this.add.image(wkx, wky, "white king").setOrigin(0, 0).setInteractive(),
  });

  console.log(white_pieces[2]);
}

function update() {}
