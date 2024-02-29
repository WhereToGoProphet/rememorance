namespace SpriteKind {
    export const Hitbox = SpriteKind.create()
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (MainPlayer) {
        if (Jump < 2) {
            Jump += 1
            MainPlayer.vy = -150
        }
    }
})
scene.onHitWall(SpriteKind.Player, function (sprite, location) {
    if (!(MainPlayer.isHittingTile(CollisionDirection.Top))) {
        Jump = 0
    }
    if (MainPlayer.isHittingTile(CollisionDirection.Left) || MainPlayer.isHittingTile(CollisionDirection.Right)) {
        MainPlayer.vy = 0
    }
})
sprites.onOverlap(SpriteKind.Hitbox, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (Facing_Right == false) {
        Swapping += 1
        if (Swapping == 0) {
            CharacterSwapping(0)
        }
        if (Swapping == 1) {
            CharacterSwapping(1)
        }
        if (Swapping == 2) {
            CharacterSwapping(2)
        }
        if (Swapping == 3) {
            CharacterSwapping(3)
        }
        if (Swapping == 4) {
            Swapping = 0
            CharacterSwapping(0)
        }
    }
    if (Facing_Right == true) {
        Swapping += 1
        if (Swapping == 0) {
            CharacterSwapping(4)
        }
        if (Swapping == 1) {
            CharacterSwapping(5)
        }
        if (Swapping == 2) {
            CharacterSwapping(6)
        }
        if (Swapping == 3) {
            CharacterSwapping(7)
        }
        if (Swapping == 4) {
            Swapping = 0
            CharacterSwapping(4)
        }
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (MainPlayer) {
        if (game.runtime() - LastTimeStamp >= 500 && Facing_Right == false) {
            LastTimeStamp = game.runtime()
            RHitBoxSlash = sprites.create(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . 3 3 3 3 3 
                . . . . . . . . 3 3 3 3 . . . 3 
                . . . . . . . 3 3 . . . . . . 3 
                . . . . 3 3 3 . . . . . . . . 3 
                . . 3 3 3 . . . . . . . . . . 3 
                3 3 3 . . . . . . . . . . . . 3 
                3 3 3 3 3 . . . . . . . . . . 3 
                . . 3 3 3 3 3 . . . . . . . . 3 
                . . . . . . . 3 3 . . . . . . 3 
                . . . . . . . . 3 3 3 . . . . 3 
                . . . . . . . . . . 3 3 . . . 3 
                . . . . . . . . . . . . 3 3 3 3 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `, SpriteKind.Hitbox)
        }
        if (game.runtime() - LastTimeStamp >= 500 && Facing_Right == true) {
            LastTimeStamp = game.runtime()
            RHitBoxSlash = sprites.create(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                3 3 3 3 3 3 . . . . . . . . . . 
                3 . . . . 3 3 3 3 3 3 3 . . . . 
                3 . . . . . . 3 3 . 3 3 3 3 . . 
                3 . . . . . . . . . . . . 3 3 3 
                3 . . . . . . . . . . . . . 3 3 
                3 . . . . . . . . . . . . . 3 3 
                3 . . . . . . . . . . 3 3 3 3 3 
                3 . . . . . . . 3 3 3 3 . . . . 
                3 . . . . . . 3 3 . . . . . . . 
                3 . . 3 3 3 3 3 3 . . . . . . . 
                3 . . 3 . . . . . . . . . . . . 
                3 3 3 3 . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `, SpriteKind.Hitbox)
        }
    }
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    if (MainPlayer) {
        if (!(Facing_Right)) {
            MainPlayer.image.flipX()
            Facing_Right = true
        }
    }
})
function CallSpawn (num: number) {
    if (num == 0) {
        tiles.placeOnTile(MainPlayer, tiles.getTileLocation(4, 3))
    }
    if (num == 1) {
        list = [img`
            . . . . . . . . . . . . . . . . 
            . . . . b b b b . . . . . . . . 
            . . . b 3 3 3 3 b b b b . . . . 
            . . b b 3 3 3 3 3 3 1 1 b c c . 
            . . b 3 3 3 3 3 3 1 1 1 3 c c c 
            . . b 1 1 3 3 3 3 3 3 3 3 3 b c 
            . . c 1 1 3 3 3 b c c c c b b f 
            . c c 3 3 3 b b d d d c c c b f 
            c b 3 3 b b d d d d d d b c b f 
            c 3 3 c b d d d d d d d d b c . 
            f 3 c c c d d d d d d c c d c . 
            f b c c c d d c c d d d d d f . 
            f b c c c d d d d d b b b d f . 
            f f b b c f f b d d d d d c . . 
            . f f f f d d b b d d d b f . . 
            . . . . f d d d b c c f f f . . 
            `, img`
            . . . . . . . . . . . . . . . . 
            . . . . c c c c . . . . . . . . 
            . . c c 5 5 5 5 c c . . . . . . 
            . c 5 5 5 5 5 5 5 5 c . . . . . 
            c 5 5 5 5 5 1 f 5 5 5 c . . . . 
            c 5 5 5 5 5 f f 5 5 5 5 c . . . 
            c 5 5 5 5 5 5 5 5 5 5 5 c . . . 
            c c b b 1 b 5 5 5 5 5 5 d c . . 
            c 5 3 3 3 5 5 5 5 5 d d d c . . 
            . b 5 5 5 5 5 5 5 5 d d d c . . 
            . . c b b c 5 5 b d d d d c c . 
            . c b b c 5 5 b b d d d d c d c 
            . c c c c c c d d d d d d d d c 
            . . . c c c c d 5 5 b d d d c . 
            . . c c c c c b 5 5 b c c c . . 
            . . c b b b c d 5 5 b c . . . . 
            `, img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . b 5 5 b . . . 
            . . . . . . b b b b b b . . . . 
            . . . . . b b 5 5 5 5 5 b . . . 
            . b b b b b 5 5 5 5 5 5 5 b . . 
            . b d 5 b 5 5 5 5 5 5 5 5 b . . 
            . . b 5 5 b 5 d 1 f 5 d 4 f . . 
            . . b d 5 5 b 1 f f 5 4 4 c . . 
            b b d b 5 5 5 d f b 4 4 4 4 b . 
            b d d c d 5 5 b 5 4 4 4 4 4 4 b 
            c d d d c c b 5 5 5 5 5 5 5 b . 
            c b d d d d d 5 5 5 5 5 5 5 b . 
            . c d d d d d d 5 5 5 5 5 d b . 
            . . c b d d d d d 5 5 5 b b . . 
            . . . c c c c c c c c b b . . . 
            `]
        CallEnemies(list)
    }
}
function StagePlay () {
    if (Difficulty_Tweak == 0) {
        tiles.setCurrentTilemap(tilemap`level1`)
    }
    if (Difficulty_Tweak == 1) {
        tiles.setCurrentTilemap(tilemap`level1`)
    }
    if (Difficulty_Tweak == 2) {
        tiles.setCurrentTilemap(tilemap`level1`)
    }
}
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    if (MainPlayer) {
        if (Facing_Right) {
            MainPlayer.image.flipX()
            Facing_Right = false
        }
    }
})
function CallMainPlayer () {
    MainPlayer = sprites.create(img`
        . . . . . . f f f f f f . . . . 
        . . . . f f e e e e f 2 f . . . 
        . . . f f e e e e f 2 2 2 f . . 
        . . . f e e e f f e e e e f . . 
        . . . f f f f e e 2 2 2 2 e f . 
        . . . f e 2 2 2 f f f f e 2 f . 
        . . f f f f f f f e e e f f f . 
        . . f f e 4 4 e b f 4 4 e e f . 
        . . f e e 4 d 4 1 f d d e f . . 
        . . . f e e e 4 d d d d f . . . 
        . . . . f f e e 4 4 4 e f . . . 
        . . . . . 4 d d e 2 2 2 f . . . 
        . . . . . e d d e 2 2 2 f . . . 
        . . . . . f e e f 4 5 5 f . . . 
        . . . . . . f f f f f f . . . . 
        . . . . . . . f f f . . . . . . 
        `, SpriteKind.Player)
    MainPlayer.ay = 300
    controller.moveSprite(MainPlayer, 100, 0)
    scene.cameraFollowSprite(MainPlayer)
}
sprites.onCreated(SpriteKind.Hitbox, function (sprite) {
    if (Facing_Right == false) {
        sprite.setPosition(MainPlayer.x + 5, MainPlayer.y)
        pause(100)
        sprites.destroy(sprite)
    }
    if (Facing_Right == true) {
        sprite.setPosition(MainPlayer.x - 5, MainPlayer.y)
        pause(100)
        sprites.destroy(sprite)
    }
})
function TimeStart () {
    LastTimeStamp = game.runtime()
}
function CharacterSwapping (num: number) {
    if (num == 0) {
        MainPlayer.setImage(img`
            . . . . . . f f f f f f . . . . 
            . . . . f f e e e e f 2 f . . . 
            . . . f f e e e e f 2 2 2 f . . 
            . . . f e e e f f e e e e f . . 
            . . . f f f f e e 2 2 2 2 e f . 
            . . . f e 2 2 2 f f f f e 2 f . 
            . . f f f f f f f e e e f f f . 
            . . f f e 4 4 e b f 4 4 e e f . 
            . . f e e 4 d 4 1 f d d e f . . 
            . . . f e e e 4 d d d d f . . . 
            . . . . f f e e 4 4 4 e f . . . 
            . . . . . 4 d d e 2 2 2 f . . . 
            . . . . . e d d e 2 2 2 f . . . 
            . . . . . f e e f 4 5 5 f . . . 
            . . . . . . f f f f f f . . . . 
            . . . . . . . f f f . . . . . . 
            `)
        Facing_Right = false
    }
    if (num == 4) {
        MainPlayer.setImage(img`
            . . . . f f f f f f . . . . . . 
            . . . f 2 f e e e e f f . . . . 
            . . f 2 2 2 f e e e e f f . . . 
            . . f e e e e f f e e e f . . . 
            . f e 2 2 2 2 e e f f f f . . . 
            . f 2 e f f f f 2 2 2 e f . . . 
            . f f f e e e f f f f f f f . . 
            . f e e 4 4 f b e 4 4 e f f . . 
            . . f e d d f 1 4 d 4 e e f . . 
            . . . f d d d d 4 e e e f . . . 
            . . . f e 4 4 4 e e f f . . . . 
            . . . f 2 2 2 e d d 4 . . . . . 
            . . . f 2 2 2 e d d e . . . . . 
            . . . f 5 5 4 f e e f . . . . . 
            . . . . f f f f f f . . . . . . 
            . . . . . . f f f . . . . . . . 
            `)
        Facing_Right = true
    }
    if (num == 1) {
        MainPlayer.setImage(img`
            . . . . . . f f f f 4 4 f . . . 
            . . . . f f b f 5 4 5 5 4 f . . 
            . . . f b 3 3 e 4 5 5 5 5 f . . 
            . . f b 3 3 3 3 e 4 4 4 e f . . 
            . . f 3 3 3 3 3 3 3 3 3 3 f . . 
            . . f 3 3 3 3 e b 3 e e 3 3 f . 
            . . f 3 3 3 3 f f e e e 3 3 f . 
            . . f b b b b f b f e e e 3 f . 
            . . f b b b b e 1 f 4 4 e f . . 
            . f f b b b b f 4 4 4 4 f . . . 
            . f b b b b f f f e e e f . . . 
            . . f b b f 4 4 e d d d f . . . 
            . . . f f e 4 4 e d d d f . . . 
            . . . . f b e e b d b d b f . . 
            . . . . f f d 1 d 1 d 1 f f . . 
            . . . . . . f f b b f f . . . . 
            `)
        Facing_Right = false
    }
    if (num == 5) {
        MainPlayer.setImage(img`
            . . . f 4 4 f f f f . . . . . . 
            . . f 4 5 5 4 5 f b f f . . . . 
            . . f 5 5 5 5 4 e 3 3 b f . . . 
            . . f e 4 4 4 e 3 3 3 3 b f . . 
            . . f 3 3 3 3 3 3 3 3 3 3 f . . 
            . f 3 3 e e 3 b e 3 3 3 3 f . . 
            . f 3 3 e e e f f 3 3 3 3 f . . 
            . f 3 e e e f b f b b b b f . . 
            . . f e 4 4 f 1 e b b b b f . . 
            . . . f 4 4 4 4 f b b b b f f . 
            . . . f e e e f f f b b b b f . 
            . . . f d d d e 4 4 f b b f . . 
            . . . f d d d e 4 4 e f f . . . 
            . . f b d b d b e e b f . . . . 
            . . f f 1 d 1 d 1 d f f . . . . 
            . . . . f f b b f f . . . . . . 
            `)
        Facing_Right = true
    }
    if (num == 2) {
        MainPlayer.setImage(img`
            . f f f . f f f f f . . . . 
            f f f f f c c c c f f . . . 
            f f f f b c c c c c c f . . 
            f f f c 3 c c c c c c f . . 
            . f 3 3 c c c c c c c c f . 
            . f f f c c c c c 4 c c f . 
            . f f f f c c c 4 4 e f f . 
            . f f 4 4 f b f 4 4 e f f . 
            . . f 4 d 4 1 f d d f f . . 
            . . f f f 4 d d d d f . . . 
            . . . f e e 4 4 4 e f . . . 
            . . . 4 d d e 3 3 3 f . . . 
            . . . e d d e 3 3 3 f . . . 
            . . . f e e f 6 6 6 f . . . 
            . . . . f f f f f f . . . . 
            . . . . . f f f . . . . . . 
            `)
        Facing_Right = false
    }
    if (num == 6) {
        MainPlayer.setImage(img`
            . . . . f f f f f . f f f . 
            . . . f f c c c c f f f f f 
            . . f c c c c c c b f f f f 
            . . f c c c c c c 3 c f f f 
            . f c c c c c c c c 3 3 f . 
            . f c c 4 c c c c c f f f . 
            . f f e 4 4 c c c f f f f . 
            . f f e 4 4 f b f 4 4 f f . 
            . . f f d d f 1 4 d 4 f . . 
            . . . f d d d d 4 f f f . . 
            . . . f e 4 4 4 e e f . . . 
            . . . f 3 3 3 e d d 4 . . . 
            . . . f 3 3 3 e d d e . . . 
            . . . f 6 6 6 f e e f . . . 
            . . . . f f f f f f . . . . 
            . . . . . . f f f . . . . . 
            `)
        Facing_Right = true
    }
    if (num == 3) {
        MainPlayer.setImage(img`
            . . . f f f f f . . . . . 
            . f f f f f f f f f . . . 
            . f f f f f f c f f f . . 
            f f f f c f f f c f f . . 
            f c f f c c f f f c c f f 
            f c c f f f f e f f f f f 
            f f f f f f f e e f f f . 
            f f e e f b f e e f f . . 
            . f e 4 e 1 f 4 4 f . . . 
            . f f f e 4 4 4 4 f . . . 
            . . f e e e e e f f . . . 
            . . e 4 4 e 7 7 7 f . . . 
            . . e 4 4 e 7 7 7 f . . . 
            . . f e e f 6 6 6 f . . . 
            . . . f f f f f f . . . . 
            . . . . f f f . . . . . . 
            `)
        Facing_Right = false
    }
    if (num == 7) {
        MainPlayer.setImage(img`
            . . . . . f f f f f . . . 
            . . . f f f f f f f f f . 
            . . f f f c f f f f f f . 
            . . f f c f f f c f f f f 
            f f c c f f f c c f f c f 
            f f f f f e f f f f c c f 
            . f f f e e f f f f f f f 
            . . f f e e f b f e e f f 
            . . . f 4 4 f 1 e 4 e f . 
            . . . f 4 4 4 4 e f f f . 
            . . . f f e e e e e f . . 
            . . . f 7 7 7 e 4 4 e . . 
            . . . f 7 7 7 e 4 4 e . . 
            . . . f 6 6 6 f e e f . . 
            . . . . f f f f f f . . . 
            . . . . . . f f f . . . . 
            `)
        Facing_Right = true
    }
}
function Difficulty_Men (num: number) {
    if (num == 0) {
        Difficulty_Menu = miniMenu.createMenu(
        miniMenu.createMenuItem("Pleasant Dream"),
        miniMenu.createMenuItem("Memories"),
        miniMenu.createMenuItem("Purgatory")
        )
        Difficulty_Menu.setFrame(img`
            f f 1 1 1 1 1 1 1 1 1 1 1 f f 
            f 1 1 1 1 1 1 1 1 1 1 1 1 1 f 
            1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
            1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
            1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
            1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
            1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
            1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
            1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
            1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
            1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
            1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
            1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
            f 1 1 1 1 1 1 1 1 1 1 1 1 1 f 
            f f 1 1 1 1 1 1 1 1 1 1 1 f f 
            `)
        Difficulty_Menu.setMenuStyleProperty(miniMenu.MenuStyleProperty.Width, 100)
        Difficulty_Menu.onButtonPressed(controller.A, function (selection, selectedIndex) {
            Difficulty_Menu.close()
            if (selectedIndex == 0) {
                Difficulty_Tweak = 0
                StagePlay()
                CallMainPlayer()
                CallSpawn(0)
                CallSpawn(1)
            }
            if (selectedIndex == 1) {
                StagePlay()
                CallMainPlayer()
                CallSpawn(0)
                CallSpawn(1)
            }
            if (selectedIndex == 2) {
                StagePlay()
                CallMainPlayer()
                CallSpawn(0)
                CallSpawn(1)
            }
        })
    }
    Swapping = 0
}
function CallEnemies (list: Image[]) {
    for (let value of tiles.getTilesByType(sprites.swamp.swampTile0)) {
        Enemies = sprites.create(list._pickRandom(), SpriteKind.Enemy)
        tiles.placeOnTile(Enemies, value)
        if (Enemies.image.equals(img`
            . . . . . . . . . . . . . . . . 
            . . . . b b b b . . . . . . . . 
            . . . b 3 3 3 3 b b b b . . . . 
            . . b b 3 3 3 3 3 3 1 1 b c c . 
            . . b 3 3 3 3 3 3 1 1 1 3 c c c 
            . . b 1 1 3 3 3 3 3 3 3 3 3 b c 
            . . c 1 1 3 3 3 b c c c c b b f 
            . c c 3 3 3 b b d d d c c c b f 
            c b 3 3 b b d d d d d d b c b f 
            c 3 3 c b d d d d d d d d b c . 
            f 3 c c c d d d d d d c c d c . 
            f b c c c d d c c d d d d d f . 
            f b c c c d d d d d b b b d f . 
            f f b b c f f b d d d d d c . . 
            . f f f f d d b b d d d b f . . 
            . . . . f d d d b c c f f f . . 
            `)) {
            Enemies.setVelocity(15, 0)
        }
        if (Enemies.image.equals(img`
            . . . . . . . . . . . . . . . . 
            . . . . c c c c . . . . . . . . 
            . . c c 5 5 5 5 c c . . . . . . 
            . c 5 5 5 5 5 5 5 5 c . . . . . 
            c 5 5 5 5 5 1 f 5 5 5 c . . . . 
            c 5 5 5 5 5 f f 5 5 5 5 c . . . 
            c 5 5 5 5 5 5 5 5 5 5 5 c . . . 
            c c b b 1 b 5 5 5 5 5 5 d c . . 
            c 5 3 3 3 5 5 5 5 5 d d d c . . 
            . b 5 5 5 5 5 5 5 5 d d d c . . 
            . . c b b c 5 5 b d d d d c c . 
            . c b b c 5 5 b b d d d d c d c 
            . c c c c c c d d d d d d d d c 
            . . . c c c c d 5 5 b d d d c . 
            . . c c c c c b 5 5 b c c c . . 
            . . c b b b c d 5 5 b c . . . . 
            `)) {
            Enemies.setVelocity(20, 0)
        }
        if (Enemies.image.equals(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . b 5 5 b . . . 
            . . . . . . b b b b b b . . . . 
            . . . . . b b 5 5 5 5 5 b . . . 
            . b b b b b 5 5 5 5 5 5 5 b . . 
            . b d 5 b 5 5 5 5 5 5 5 5 b . . 
            . . b 5 5 b 5 d 1 f 5 d 4 f . . 
            . . b d 5 5 b 1 f f 5 4 4 c . . 
            b b d b 5 5 5 d f b 4 4 4 4 b . 
            b d d c d 5 5 b 5 4 4 4 4 4 4 b 
            c d d d c c b 5 5 5 5 5 5 5 b . 
            c b d d d d d 5 5 5 5 5 5 5 b . 
            . c d d d d d d 5 5 5 5 5 d b . 
            . . c b d d d d d 5 5 5 b b . . 
            . . . c c c c c c c c b b . . . 
            `)) {
            Enemies.setVelocity(30, 0)
        }
    }
}
let Enemies: Sprite = null
let Difficulty_Menu: miniMenu.MenuSprite = null
let Difficulty_Tweak = 0
let list: Image[] = []
let RHitBoxSlash: Sprite = null
let LastTimeStamp = 0
let Facing_Right = false
let MainPlayer: Sprite = null
let Jump = 0
let Swapping = 0
scene.setBackgroundImage(img`
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ff111111111fff111111111f111f111fffffff111f111111111f111fffffff111fff1111111fff1111111111ffff1111111fff111ffffff111ff11111111f111111111ffffffffffffffffffffffffff
    ff111111111fff111111111f111f1111fffff1111f111111111f1111fffff1111ff111111111ff1111111111fff111111111ff1111fffff111f111111111f111111111ffffffffffffffffffffffffff
    ff1111111111ff111111111f111f11111fff11111f111111111f11111fff11111f11111111111f11111111111f11111111111f11111ffff111f111111111f111111111ffffffffffffffffffffffffff
    ff111ffff111ff111fffffffffff111111f111111f111fffffff111111f111111f1111fff1111f111fffff111f1111fff1111f111111fff111f1111ffffff111ffffffffffffffffffffffffffffffff
    ff111ffff111ff111fffffffffff1111111111111f111fffffff1111111111111f111fffff111f111fffff111f111fffff111f1111111ff111f111fffffff111ffffffffffffffffffffffffffffffff
    ff111ffff111ff11111111ffffff1111111111111f1111111fff1111111111111f111fffff111f111fffff111f111fffff111f11111111f111f111fffffff1111111ffffffffffffffffffffffffffff
    ff1111111111ff11111111ffffff111f11111f111f1111111fff111f11111f111f111fffff111f11111111111f111fffff111f111f11111111f111fffffff1111111ffffffffffffffffffffffffffff
    ff111111111fff11111111ffffff111ff111ff111f1111111fff111ff111ff111f111fffff111f11111111111f11111111111f111ff1111111f111fffffff1111111ffffffffffffffffffffffffffff
    ff1111111111ff111fffffffffff111fffffff111f111fffffff111fffffff111f111fffff111f1111111111ff11111111111f111fff111111f111fffffff111ffffffffffffffffffffffffffffffff
    ff111ff11111ff111fffffffffff111fffffff111f111fffffff111fffffff111f1111fff1111f111ff111111f111fffff111f111ffff11111f1111ffffff111ffffffffffffffffffffffffffffffff
    ff111ffff111ff111111111f111f111fffffff111f111111111f111fffffff111f11111111111f111fffff111f111fffff111f111fffff1111f111111111f111111111ffffffffffffffffffffffffff
    ff111ffff111ff111111111f111f111fffffff111f111111111f111fffffff111ff111111111ff111fffff111f111fffff111f111ffffff111f111111111f111111111ffffffffffffffffffffffffff
    ff111ffff111ff111111111f111f111fffffff111f111111111f111fffffff111fff1111111fff111fffff111f111fffff111f111ffffff111ff11111111f111111111ffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    `)
Swapping = 0
Jump = 0
let MainMenu = miniMenu.createMenu(
miniMenu.createMenuItem("Play"),
miniMenu.createMenuItem("Tutorial")
)
MainMenu.setFrame(img`
    f f 1 1 1 1 1 1 1 1 1 1 1 f f 
    f 1 1 1 1 1 1 1 1 1 1 1 1 1 f 
    1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
    1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
    1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
    1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
    1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
    1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
    1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
    1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
    1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
    1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
    1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
    f 1 1 1 1 1 1 1 1 1 1 1 1 1 f 
    f f 1 1 1 1 1 1 1 1 1 1 1 f f 
    `)
MainMenu.setMenuStyleProperty(miniMenu.MenuStyleProperty.Width, 100)
MainMenu.onButtonPressed(controller.A, function (selection, selectedIndex) {
    MainMenu.close()
    if (selectedIndex == 0) {
        Difficulty_Men(0)
    }
    if (selectedIndex == 1) {
        StagePlay()
        CallMainPlayer()
        CallSpawn(0)
        CallSpawn(1)
        tiles.placeOnTile(MainPlayer, tiles.getTileLocation(4, 3))
    }
})
game.onUpdate(function () {
    for (let value of sprites.allOfKind(SpriteKind.Enemy)) {
        if (value.isHittingTile(CollisionDirection.Bottom)) {
            if (value.vx < 0 && value.tileKindAt(TileDirection.Left, assets.tile`transparency16`)) {
                value.vy = 150
            } else if (value.vx > 0 && value.tileKindAt(TileDirection.Right, assets.tile`transparency16`)) {
                value.vy = 150
            }
        } else if (value.isHittingTile(CollisionDirection.Left)) {
            value.vx = 30
        } else if (value.isHittingTile(CollisionDirection.Right)) {
            value.vx = -30
        }
        if (!(value.isHittingTile(CollisionDirection.Bottom))) {
            if (value.vx < 0 && value.tileKindAt(TileDirection.Left, assets.tile`transparency16`)) {
                value.vy = 150
            } else if (value.vx > 0 && value.tileKindAt(TileDirection.Right, assets.tile`transparency16`)) {
                value.vy = 150
            }
        }
    }
})
