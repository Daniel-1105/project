namespace SpriteKind {
    export const Player2 = SpriteKind.create()
    export const Asteroid = SpriteKind.create()
    export const MiniRocks = SpriteKind.create()
    export const Secondary = SpriteKind.create()
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (info.score() >= 50) {
        if (game.runtime() >= lastfired + 5000) {
            Secondary = sprites.createProjectileFromSprite(assets.image`Secondary Attack`, FirstShip, 0, -50)
            Secondary.setKind(SpriteKind.Secondary)
            lastfired = game.runtime()
        }
    }
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.MiniRocks, function (sprite, otherSprite) {
    otherSprite.destroy(effects.disintegrate, 100)
    sprite.destroy()
})
sprites.onOverlap(SpriteKind.Secondary, SpriteKind.MiniRocks, function (sprite, otherSprite) {
    otherSprite.destroy(effects.disintegrate, 100)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    ALaser = sprites.createProjectileFromSprite(img`
        ................................
        ................................
        ................................
        ................................
        ................................
        ................................
        ................................
        ................................
        ................................
        ................................
        ...............a................
        ...............a................
        ...............a................
        ................................
        ................................
        ................................
        ................................
        ................................
        ................................
        ................................
        ................................
        ................................
        ................................
        ................................
        ................................
        ................................
        ................................
        ................................
        ................................
        ................................
        ................................
        ................................
        `, FirstShip, 0, -60)
    ALaser.y += 3
    if (info.score() >= 50) {
        pause(200)
    } else {
        pause(500)
    }
})
function Call_MiniRock (x: number, y: number) {
    MiniRock = sprites.createProjectileFromSide(assets.image`MiniAsteriod`, randint(-50, 50), 50)
    MiniRock.setKind(SpriteKind.MiniRocks)
    MiniRock.setPosition(x, y)
    MiniRock.setBounceOnWall(true)
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Asteroid, function (sprite, otherSprite) {
    otherSprite.destroy(effects.disintegrate, 100)
    sprite.destroy()
    y = otherSprite.y
    x = otherSprite.x
    info.changeScoreBy(1)
    if (info.score() >= 35) {
        if (Math.percentChance(20)) {
            Call_MiniRock(x, y)
            Call_MiniRock(x, y)
        }
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.MiniRocks, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    sprite.startEffect(effects.fountain, 500)
    otherSprite.destroy(effects.disintegrate, 100)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Asteroid, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    sprite.startEffect(effects.fountain, 500)
    otherSprite.destroy(effects.disintegrate, 100)
})
sprites.onOverlap(SpriteKind.Secondary, SpriteKind.Asteroid, function (sprite, otherSprite) {
    otherSprite.destroy(effects.disintegrate, 100)
})
sprites.onCreated(SpriteKind.Player, function (sprite) {
    controller.moveSprite(sprite, 100, 100)
})
let Asteroid: Sprite = null
let y = 0
let x = 0
let MiniRock: Sprite = null
let ALaser: Sprite = null
let Secondary: Sprite = null
let FirstShip: Sprite = null
let lastfired = 0
lastfired = game.runtime()
FirstShip = sprites.create(assets.image`spaceship`, SpriteKind.Player)
FirstShip.setStayInScreen(true)
effects.starField.startScreenEffect()
info.setScore(0)
info.setLife(5)
game.onUpdate(function () {
    if (info.score() >= 50) {
        ALaser.setImage(img`
            ................................
            ................................
            ................................
            ................................
            ................................
            ................................
            ................................
            ................................
            ................................
            ................................
            ...........a.......a............
            ...........a.......a............
            ...........a.......a............
            ................................
            ................................
            ................................
            ................................
            ................................
            ................................
            ................................
            ................................
            ................................
            ................................
            ................................
            ................................
            ................................
            ................................
            ................................
            ................................
            ................................
            ................................
            ................................
            `)
    }
    if (info.score() == 50) {
        FirstShip.setImage(assets.image`Secondship`)
        info.changeScoreBy(1)
        info.changeLifeBy(5)
    }
    if (info.score() == 150) {
        FirstShip.setImage(assets.image`FinalShip`)
        info.changeScoreBy(1)
        info.changeLifeBy(5)
    }
})
forever(function () {
    if (info.score() < 400) {
        Asteroid = sprites.createProjectileFromSide(assets.image`Asteroid 1`, 0, randint(20, 50))
        Asteroid.x = randint(10, 150)
        Asteroid.setKind(SpriteKind.Asteroid)
        pause(500)
    } else {
        game.splash("You made it!!!")
        game.splash("Would you like to keep going?", "A - GO! / B - Stop!")
    }
})
