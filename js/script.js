class SuperChess extends Phaser.Scene {
  board;
  outline;

  preload() {
    // chess board
    this.load.tilemapTiledJSON("board", "assets/board/chess-board.json");
    this.load.image("dark gray square", "assets/board/dark_gray_square.png");
    this.load.image("light gray square", "assets/board/light_gray_square.png");

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

  create() {
    //make board
    this.board = this.make.tilemap({
      key: "board",
    });
    const dgs = this.board.addTilesetImage(
      "dark gray square",
      null,
      64,
      64,
      0,
      0,
      13
    );
    const lgs = this.board.addTilesetImage(
      "light gray square",
      null,
      64,
      64,
      0,
      0,
      9
    );
    const layer = this.board.createDynamicLayer(
      "Tile Layer 1",
      [lgs, dgs],
      0,
      0
    );

    this.outline = this.add.graphics({
      lineStyle: { width: 4, color: 0xffffff, alpha: 1 },
    });
    this.outline.strokeRect(0, 0, this.board.tileWidth, this.board.tileHeight);

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
      q: this.add
        .image(bqx, bqy, "black queen")
        .setOrigin(0, 0)
        .setInteractive(),
    });
    black_pieces.push({
      k: this.add
        .image(bkx, bky, "black king")
        .setOrigin(0, 0)
        .setInteractive(),
    });

    white_pieces.push({
      q: this.add
        .image(wqx, wqy, "white queen")
        .setOrigin(0, 0)
        .setInteractive(),
    });
    white_pieces.push({
      k: this.add
        .image(wkx, wky, "white king")
        .setOrigin(0, 0)
        .setInteractive(),
    });

    // const tile = layer.getTileAtWorldXY(
    //   white_pieces[4].q.x,
    //   white_pieces[4].q.y,
    //   true
    // );

    let draggables = [];
    let piece_indices = {};
    let offset = 0;

    for (let j = 0; j < black_pieces[0].p.length; j++) {
      draggables.push(black_pieces[0].p[j]["p" + (j + 1)]);
      piece_indices["bp" + (j + 1)] = 13 + j + offset;

      draggables.push(white_pieces[0].p[j]["p" + (j + 1)]);
      piece_indices["wp" + (j + 1)] = 14 + j + offset;
      offset += 1;
    }

    offset = 0;

    for (let i = 0; i < black_pieces[1].r.length; i++) {
      draggables.push(black_pieces[1].r[i]["r" + (i + 1)]);
      piece_indices["br" + (i + 1)] = 1 + offset;
      draggables.push(black_pieces[2].h[i]["h" + (i + 1)]);
      piece_indices["bh" + (i + 1)] = 3 + offset;
      draggables.push(black_pieces[3].b[i]["b" + (i + 1)]);
      piece_indices["bb" + (i + 1)] = 2 + offset;

      draggables.push(white_pieces[1].r[i]["r" + (i + 1)]);
      piece_indices["wr" + (i + 1)] = 5 + offset;
      draggables.push(white_pieces[2].h[i]["h" + (i + 1)]);
      piece_indices["wh" + (i + 1)] = 4 + offset;
      draggables.push(white_pieces[3].b[i]["b" + (i + 1)]);
      piece_indices["wb" + (i + 1)] = 6 + offset;

      offset += 6;
    }

    draggables.push(black_pieces[4].q);
    piece_indices.bq = 29;
    draggables.push(black_pieces[5].k);
    piece_indices.bk = 30;

    draggables.push(white_pieces[4].q);
    piece_indices.wq = 31;
    draggables.push(white_pieces[5].k);
    piece_indices.wk = 32;

    this.input.setDraggable(draggables);

    let index;

    this.input.on("dragstart", (pointer, gameObject) => {
      index = this.children.getIndex(gameObject);
      this.children.bringToTop(gameObject);
    });

    this.input.on("drag", (pointer, gameObject, dragX, dragY) => {
      gameObject.x = dragX;
      gameObject.y = dragY;
    });

    this.input.on("dragend", (pointer, gameObject) => {
      this.children.moveTo(gameObject, index);

      // const tile = layer.getTileAtWorldXY(
      //   draggables[index].x,
      //   draggables[index].y,
      //   true
      // );

      // console.log(tile);
    });
  }

  update() {
    let outlineStartX = this.board.worldToTileX(this.input.activePointer.x);
    let outlineStartY = this.board.worldToTileY(this.input.activePointer.y);
    this.outline.x = this.board.tileToWorldX(outlineStartX);
    this.outline.y = this.board.tileToWorldY(outlineStartY);
  }
}

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 800,
  backgroundColor: "#ffc99d",
  scene: SuperChess,
};

const game = new Phaser.Game(config);
