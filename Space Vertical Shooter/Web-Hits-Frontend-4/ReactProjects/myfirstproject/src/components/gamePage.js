import { Button } from "react-bootstrap";
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import StartPageNav from "./startPageNav";
import '../game.css';
import { createRef } from "react";
import React, { useState, useEffect, Component } from 'react';
import Enumerable from 'linq';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
//main project

let interval;

let battleField = document.getElementsByClassName('game_field');
let MainShip;
let enemies = [];
let shotsOfMainship = [];
let shotsOfEnemy = [];
let coordMainShipX;
let coordMainShipY;
let prevCoordMainShipX;
let prevCoordMainShipY;
let coordEnemyShipX;
let coordEnemyShipY;
let prevCoordEnemyShipX;
let prevCoordEnemyShipY;

let countDeadEnemies = 0;

let bonuses = [];

let mySecondHp = 70;
let secondScores = 0;

let scoresForWin = 2;

let timeBetweenMainshipAttack = 1;

let direction = "";

let up = {
    directionOfButton: "up",
};

let down = {
    directionOfButton: "down",
};

let right = {
    directionOfButton: "right",
};

let left = {
    directionOfButton: "left",
};

let player = "";
let playerScores = 0;

let firstGamer = "Tzar`";
let secondGamer = "Ann";
let thirdGamer = "Boyarin";
let fourthGamer = "Holop";
let fiveGamer = "Vasya";


let firstGamerScores = 0;
let secondGamerScores = 0;
let thirdGamerScores = 0;
let fourthGamerScores = 0;
let fiveGamerScores = 0;


var dict = {};
dict[firstGamer] = firstGamerScores;
dict[secondGamer] = secondGamerScores;
dict[thirdGamer] = thirdGamerScores;
dict[fourthGamer] = fourthGamerScores;
dict[fiveGamer] = fiveGamerScores;


class GamePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            myHP: 70, scores: 0, openModal: false, disable: true, openModalSecond: false, disableSecond: true,
            stateFirstGamer: firstGamer, stateFirstGamerScores: firstGamerScores,
            stateSecondGamer: secondGamer, stateSecondGamerScores: secondGamerScores,
            stateThirdGamer: thirdGamer, stateThirdGamerScores: thirdGamerScores,
            stateFourthGamer: fourthGamer, stateFourthGamerScores: fourthGamerScores,
            stateFiveGamer: fiveGamer, stateFiveGamerScores: fiveGamerScores,
        };

        //this.controlButtonPressed = this.controlButtonPressed.bind(this);   
        this.funcDown = this.controlButtonPressed.bind(down);
        this.funcUp = this.controlButtonPressed.bind(up);
        this.funcRight = this.controlButtonPressed.bind(right);
        this.funcLeft = this.controlButtonPressed.bind(left);
        this.shot = this.shot.bind(this);
        this.createEnemyShot = this.createEnemyShot.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        GamePage.CheckForHitWithEnemy = this.CheckForHitWithEnemy.bind(this);
        GamePage.CheckForHitWithMainship = this.CheckForHitWithMainship.bind(this);
        GamePage.CheckForEndField = this.CheckForEndField.bind(this);
        GamePage.TranslateCoordinatesIntoNumber = this.TranslateCoordinatesIntoNumber.bind(this);
        GamePage.createEnemy = this.createEnemy.bind(this);
        GamePage.MoveShotOfMainship = this.MoveShotOfMainship.bind(this);
        GamePage.createEnemyShot = this.createEnemyShot.bind(this);
        GamePage.MoveShotOfEnemyship = this.MoveShotOfEnemyship.bind(this);
        GamePage.createBonus = this.createBonus.bind(this);
        GamePage.holdBonus = this.holdBonus.bind(this);
        GamePage.CheckForAvailabilityFire = this.CheckForAvailabilityFire.bind(this);
        GamePage.ChangingState = this.ChangingState.bind(this);
        GamePage.DieEnemy = this.DieEnemy.bind(this);
        GamePage.AnimationEnemyMakeShot = this.AnimationEnemyMakeShot.bind(this);
        GamePage.AnimationInjuredMainship = this.AnimationInjuredMainship.bind(this);
        GamePage.End = this.End.bind(this);
        this.makeList = this.makeList.bind(this);
        GamePage.startNewGame = this.startNewGame.bind(this);
        GamePage.startThisGame = this.startThisGame.bind(this);
        GamePage.startThisGameSecond = this.startThisGameSecond.bind(this);
        this.handleChange = this.handleChange.bind(this);
        GamePage.createMainShip = this.createMainShip.bind(this);


        this.refName = React.createRef();
        this.refButton = React.createRef();
    }

    handleKeyPress(e) {
        if (e.keyCode === 37) {
            this.funcLeft();
        }
        else if (e.keyCode === 38) {
            this.funcUp();
        }
        else if (e.keyCode === 39) {
            this.funcRight();
        }
        else if (e.keyCode === 40) {
            this.funcDown();
        }
        else if (e.keyCode === 87) {
            this.funcUp();
        }
        else if (e.keyCode === 65) {
            this.funcLeft();
        }
        else if (e.keyCode === 83) {
            this.funcDown();
        }
        else if (e.keyCode === 68) {
            this.funcRight();
        }
        else if (e.keyCode === 32) {
            this.shot();
        }
    }



    componentDidMount() {
        //document.addEventListener('keydown', this.handleKeyPress);
        this.startThisGameSecond();
    }

    startThisGameSecond() {
        document.addEventListener('keydown', this.handleKeyPress);
        GamePage.startThisGame();
    }

    ChangingState() {
        this.setState({ myHP: mySecondHp, scores: secondScores });
    }


    CheckForAvailabilityFire = (x, y) => {
        if (x == coordMainShipX && y > coordMainShipY) {
            for (let j = y - 1; j > coordMainShipY; j--) {
                if (document.querySelector('[posX="' + x + '"][posY="' + j + '"]').classList.contains('enemy') === true) {
                    return 0;
                }
            }
            return 1;
        }
        return 0;
    }

    MoveShotOfMainship = (x, y, indexation) => {
        let translatedCoordinates = GamePage.TranslateCoordinatesIntoNumber(x, y);
        x = translatedCoordinates[0];
        y = translatedCoordinates[1];
        let ySecond = y;
        let flag = 0;
        for (let i = 0; i < 2; i++) {

            if (ySecond < 10) {
                document.querySelector('[posX="' + x + '"][posY="' + ySecond + '"]').classList.remove('shot');
                ySecond += 1;

                if (document.querySelector('[posX="' + x + '"][posY="' + ySecond + '"]').classList.contains('enemy') === false) {
                    let nextStepOfMainshipShot = document.querySelector('[posX="' + x + '"][posY="' + ySecond + '"]');
                    nextStepOfMainshipShot.classList.add('shot');
                    shotsOfMainship[indexation] = nextStepOfMainshipShot;
                    flag += 1;
                }

                else if (document.querySelector('[posX="' + x + '"][posY="' + ySecond + '"]').classList.contains('enemy') === true) {
                    var result = Enumerable.from(enemies).where(enemy => enemy.getAttribute("posX") == x && enemy.getAttribute("posY") == ySecond).firstOrDefault();
                    enemies = enemies.filter(function (f) { return f !== result });
                    countDeadEnemies += 1;
                    GamePage.DieEnemy(x, ySecond);
                    secondScores += scoresForWin;
                    GamePage.ChangingState.bind(this);
                    return 0;
                }
            }
            else if (ySecond == 10 && document.querySelector('[posX="' + x + '"][posY="' + ySecond + '"]').classList.contains('enemy') === true) {
                var result = Enumerable.from(enemies).where(enemy => enemy.getAttribute("posX") == x && enemy.getAttribute("posY") == ySecond).firstOrDefault();
                enemies = enemies.filter(function (f) { return f !== result });
                countDeadEnemies += 1;
                GamePage.DieEnemy(x, ySecond);
                secondScores += scoresForWin;
                GamePage.ChangingState.bind(this);
                return 0;
            }
        }
        if (flag < 2) {
            document.querySelector('[posX="' + x + '"][posY="' + ySecond + '"]').classList.remove('shot');
            return 0;
        }
        else {
            return 1;
        }
    }

    MoveShotOfEnemyship = (x, y, indexation) => {
        let translatedCoordinates = GamePage.TranslateCoordinatesIntoNumber(x, y);
        x = translatedCoordinates[0];
        y = translatedCoordinates[1];
        let flag = 0;
        let ySecond = y;
        for (let i = 0; i < 2; i++) {
            if (ySecond > 1) {
                document.querySelector('[posX="' + x + '"][posY="' + ySecond + '"]').classList.remove('shotEnemy');
                ySecond -= 1;
                if (document.querySelector('[posX="' + x + '"][posY="' + ySecond + '"]').classList.contains('mainship') === false) {
                    let nextStepOfEnemyShot = document.querySelector('[posX="' + x + '"][posY="' + ySecond + '"]');
                    nextStepOfEnemyShot.classList.add('shotEnemy');
                    shotsOfEnemy[indexation] = nextStepOfEnemyShot;
                    flag += 1;
                }
                else {
                    GamePage.AnimationInjuredMainship();
                    mySecondHp -= 2;
                    GamePage.ChangingState.bind(this);
                    if (mySecondHp <= 0) {
                        document.querySelector('[posX="' + x + '"][posY="' + ySecond + '"]').classList.remove('mainship');
                        GamePage.End();
                        //alert("Ваш корабль убит");
                    }
                    return 0;
                }
            }
        }
        if (flag < 2) {
            document.querySelector('[posX="' + x + '"][posY="' + ySecond + '"]').classList.remove('shotEnemy');
            return 0;
        }
        else {
            return 1;
        }
    }

    createEnemyShot = (x, y) => {
        let translatedCoordinates = GamePage.TranslateCoordinatesIntoNumber(x, y);
        x = translatedCoordinates[0];
        y = translatedCoordinates[1];

        if (x != 1) {
            let shot = document.querySelector('[posX="' + x + '"][posY="' + y + '"]');
            shot.classList.add('shotEnemy');
            shotsOfEnemy.push(shot);
            if (document.querySelector('[posX="' + x + '"][posY="' + y + '"]').classList.contains('mainship') == true) {
                GamePage.AnimationInjuredMainship();
                mySecondHp -= 2;
                GamePage.ChangingState.bind(this);
                if (mySecondHp <= 0) {
                    GamePage.End();
                    //alert("Ваш корабль убит");
                }
                var resultSecond = Enumerable.from(shotsOfEnemy).where(shoting => shoting.getAttribute("posX") == x && shoting.getAttribute("posY") == y).firstOrDefault();
                shotsOfEnemy = shotsOfEnemy.filter(function (f) { return f !== resultSecond });
                resultSecond.classList.remove('shotEnemy');
            }
        }
    }

    shot() {
        GamePage.ChangingState.bind(this);
        if (coordMainShipY != 10 && timeBetweenMainshipAttack == 1) {
            let ySecond = coordMainShipY + 1;
            let shot = document.querySelector('[posX="' + coordMainShipX + '"][posY="' + ySecond + '"]');
            shot.classList.add('shot');
            shotsOfMainship.push(shot);
            timeBetweenMainshipAttack = 0;

            if (document.querySelector('[posX="' + coordMainShipX + '"][posY="' + ySecond + '"]').classList.contains('enemy') == true) {
                var result = Enumerable.from(enemies).where(enemy => enemy.getAttribute("posX") == coordMainShipX && enemy.getAttribute("posY") == ySecond).firstOrDefault();
                enemies = enemies.filter(function (f) { return f !== result });
                countDeadEnemies += 1;
                GamePage.DieEnemy(coordMainShipX, ySecond);
                secondScores += scoresForWin;
                GamePage.ChangingState.bind(this);
                var resultSecond = Enumerable.from(shotsOfMainship).where(shoting => shoting.getAttribute("posX") == coordMainShipX && shoting.getAttribute("posY") == ySecond).firstOrDefault();
                shotsOfMainship = shotsOfMainship.filter(function (f) { return f !== resultSecond });
                resultSecond.classList.remove('shot');
            }
        }
    }


    generateShip() {
        let posX = Math.round(Math.random() * (10 - 1) + 1);
        let posY = Math.round(Math.random() * (3 - 1) + 1);
        return [posX, posY];
    }

    generateEnemyShip() {
        let posX = Math.round(Math.random() * (10 - 1) + 1);
        let posY = 10;
        return [posX, posY];
    }

    CheckForEndField = (x, y) => {
        if (direction === "up") {
            if (y < 11) {
                return 1;
            }
            return 0;
        }
        else if (direction === "down") {
            if (y > 0) {
                return 1;
            }
            return 0;
        }
        else if (direction === "right") {
            if (x < 11) {
                return 1;
            }
            return 0;
        }
        else {
            if (x > 0) {
                return 1;
            }
            return 0;
        }
    }

   /* AnimationMove = () => {

        setTimeout(one);

        function one() {
            battleField[0].classList.add('animationHitMainship');
            setTimeout(two, 300);
        }

        function two() {
            battleField[0].classList.remove('animationHitMainship');
        }


    } */

    AnimationInjuredMainship = () => {
        setTimeout(one);

        function one() {
            battleField[0].classList.add('animationHitMainship');
            setTimeout(two, 300);
        }

        function two() {
            battleField[0].classList.remove('animationHitMainship');
        }
    }

    AnimationEnemyMakeShot = (x, y) => {
        setTimeout(one);

        function one() {
            document.querySelector('[posX="' + x + '"][posY="' + y + '"]').classList.add('animationMakeEnemyShot');
            setTimeout(two, 800);
        }

        function two() {
            document.querySelector('[posX="' + x + '"][posY="' + y + '"]').classList.remove('animationMakeEnemyShot');
            GamePage.createEnemyShot(x, y - 1);
        }
    }

    DieEnemy = (x, y) => {
        setTimeout(one);

        function one() {
            document.querySelector('[posX="' + x + '"][posY="' + y + '"]').classList.add('animationDieEnemy');
            setTimeout(two, 500);
        }

        function two() {
            GamePage.createBonus(x, y);
            document.querySelector('[posX="' + x + '"][posY="' + y + '"]').classList.remove('animationDieEnemy');
            setTimeout(three);
        }

        function three() {
            document.querySelector('[posX="' + x + '"][posY="' + y + '"]').classList.remove('enemy');

        }
    }

    CheckForHitWithEnemy() {
        let element;
        element = document.querySelector('[posX="' + coordMainShipX + '"][posY="' + coordMainShipY + '"]');
        var result = Enumerable.from(enemies).where(enemy => enemy.getAttribute("posX") == coordMainShipX && enemy.getAttribute("posY") == coordMainShipY).firstOrDefault();
        if (element.classList.contains('enemy') === true && result != null) {
            enemies = enemies.filter(function (f) { return f !== result });
            GamePage.DieEnemy(coordMainShipX, coordMainShipY);

            countDeadEnemies += 1;
            mySecondHp -= 5;
            secondScores += scoresForWin * 2;
            GamePage.ChangingState.bind(this);
            if (mySecondHp <= 0) {
                GamePage.End();
                //alert("Ваш корабль уничтожен");
            }
            return 1;
        }
        return 0;
    }

    CheckForHitWithMainship = (x, y) => {
        let element;
        element = document.querySelector('[posX="' + x + '"][posY="' + y + '"]');
        if (element.classList.contains('mainship') === true) {
            GamePage.AnimationInjuredMainship();
            mySecondHp -= 4;
            secondScores += scoresForWin * 2;
            GamePage.ChangingState.bind(this);
            if (mySecondHp <= 0) {
                GamePage.End();
                //alert("Ваш корабль уничтожен");
            }

            if (y <= 10) {
                return 1;
            }

        }
        return 0;
    }

    createBonus = (x, y) => {
        let bonusType = Math.round(Math.random() * 2);

        let bonus = document.querySelector('[posX="' + x + '"][posY="' + y + '"]');
        if (document.querySelector('[posX="' + x + '"][posY="' + y + '"]').classList.contains('bonusHealth')) {
            var result = Enumerable.from(bonuses).where(bon => bon.getAttribute("posX") == x && bon.getAttribute("posY") == y).firstOrDefault();
            document.querySelector('[posX="' + x + '"][posY="' + y + '"]').classList.remove('bonusHealth');
            bonuses = bonuses.filter(function (f) { return f !== result });
        }
        else if (document.querySelector('[posX="' + x + '"][posY="' + y + '"]').classList.contains('bonusPlusToScores')) {
            var result = Enumerable.from(bonuses).where(bon => bon.getAttribute("posX") == x && bon.getAttribute("posY") == y).firstOrDefault();
            document.querySelector('[posX="' + x + '"][posY="' + y + '"]').classList.remove('bonusPlusToScores');
            bonuses = bonuses.filter(function (f) { return f !== result });
        }

        switch (bonusType) {
            case 0:
                // no bonus at all
                break;
            case 1:
                if (bonus.classList.contains('mainship') == true) {
                    bonus.classList.add('bonusHealth');
                    GamePage.holdBonus(x, y);
                }
                else {
                    bonus.classList.add('bonusHealth');
                }
                bonuses.push(bonus);
                bonus.setAttribute("bonustime", 12);
                break;
            case 2:
                if (bonus.classList.contains('mainship') == true) {
                    bonus.classList.add("bonusPlusToScores");
                    GamePage.holdBonus(x, y);
                }
                else {
                    bonus.classList.add("bonusPlusToScores");
                }
                bonuses.push(bonus);
                bonus.setAttribute("bonusPlusToScores", 12);
                break;
        }
    }

    holdBonus = (x, y) => {
        let bonus = document.querySelector('[posX="' + x + '"][posY="' + y + '"]');
        if (bonus.classList.contains('bonusHealth')) {
            mySecondHp += 4;
            if (mySecondHp > 70) {
                mySecondHp = 70;
            }
            GamePage.ChangingState.bind(this);
            var result = Enumerable.from(bonuses).where(bon => bon.getAttribute("posX") == x && bon.getAttribute("posY") == y).firstOrDefault();
            document.querySelector('[posX="' + x + '"][posY="' + y + '"]').classList.remove('bonusHealth');
            bonuses = bonuses.filter(function (f) { return f !== result });
        }
        else if (bonus.classList.contains('bonusPlusToScores')) {
            secondScores += 15;
            var result = Enumerable.from(bonuses).where(bon => bon.getAttribute("posX") == x && bon.getAttribute("posY") == y).firstOrDefault();
            document.querySelector('[posX="' + x + '"][posY="' + y + '"]').classList.remove('bonusPlusToScores');
            bonuses = bonuses.filter(function (f) { return f !== result });
        }
    }

    TranslateCoordinatesIntoNumber = (x, y) => {
        if (x === "1") {
            x = 1;
        }
        else if (x === "2") {
            x = 2;
        }
        else if (x === "3") {
            x = 3;
        }
        else if (x === "4") {
            x = 4;
        }
        else if (x === "5") {
            x = 5;
        }
        else if (x === "6") {
            x = 6;
        }
        else if (x === "7") {
            x = 7;
        }
        else if (x === "8") {
            x = 8;
        }
        else if (x === "9") {
            x = 9;
        }
        else if (x === "10") {
            x = 10;
        }

        if (y === "1") {
            y = 1;
        }
        else if (y === "2") {
            y = 2;
        }
        else if (y === "3") {
            y = 3;
        }
        else if (y === "4") {
            y = 4;
        }
        else if (y === "5") {
            y = 5;
        }
        else if (y === "6") {
            y = 6;
        }
        else if (y === "7") {
            y = 7;
        }
        else if (y === "8") {
            y = 8;
        }
        else if (y === "9") {
            y = 9;
        }
        else if (y === "10") {
            y = 10;
        }

        return [x, y];
    }


    controlButtonPressed() {
        GamePage.ChangingState.bind(this);
        direction = this.directionOfButton;
        coordMainShipX = MainShip.getAttribute("posX");
        coordMainShipY = MainShip.getAttribute("posY");

        let translatedCoordinates = GamePage.TranslateCoordinatesIntoNumber(coordMainShipX, coordMainShipY);
        coordMainShipX = translatedCoordinates[0];
        coordMainShipY = translatedCoordinates[1];
        prevCoordMainShipX = coordMainShipX;
        prevCoordMainShipY = coordMainShipY;

        if (document.querySelector('[posX="' + coordMainShipX + '"][posY="' + coordMainShipY + '"]').classList.contains('bonusHealth') === true ||
            document.querySelector('[posX="' + coordMainShipX + '"][posY="' + coordMainShipY + '"]').classList.contains('bonusPlusToScores') === true) {
            GamePage.holdBonus(coordMainShipX, coordMainShipY);
        }

        if (direction === "right") {
            coordMainShipX += 1;
        }
        else if (direction === "left") {
            coordMainShipX -= 1;
        }
        else if (direction === "down") {
            coordMainShipY -= 1;
        }
        else if (direction === "up") {
            coordMainShipY += 1;
        }

        let CanGoOrNot = GamePage.CheckForEndField(coordMainShipX, coordMainShipY);
        if (CanGoOrNot === 1) {
            let IsItHit = GamePage.CheckForHitWithEnemy();


            if (document.querySelector('[posX="' + coordMainShipX + '"][posY="' + coordMainShipY + '"]').classList.contains('bonusHealth') === true ||
                document.querySelector('[posX="' + coordMainShipX + '"][posY="' + coordMainShipY + '"]').classList.contains('bonusPlusToScores') === true) {
                GamePage.holdBonus(coordMainShipX, coordMainShipY);
            }

            if (document.querySelector('[posX="' + coordMainShipX + '"][posY="' + coordMainShipY + '"]').classList.contains('shotEnemy') === true) {
                GamePage.AnimationInjuredMainship(coordMainShipX, coordMainShipY);
                mySecondHp -= 2;
                GamePage.ChangingState.bind(this);
                if (mySecondHp <= 0) {
                    GamePage.End();
                    //alert("Вы убиты");
                }
                else {
                    document.querySelector('[posX="' + prevCoordMainShipX + '"][posY="' + prevCoordMainShipY + '"]').classList.remove('mainship');
                    MainShip = document.querySelector('[posX="' + coordMainShipX + '"][posY="' + coordMainShipY + '"]');
                    MainShip.classList.add('mainship');
                    direction = "";

                    var result = Enumerable.from(shotsOfEnemy).where(shoting => shoting.getAttribute("posX") == coordMainShipX && shoting.getAttribute("posY") == coordMainShipY).firstOrDefault();
                    document.querySelector('[posX="' + coordMainShipX + '"][posY="' + coordMainShipY + '"]').classList.remove('shotEnemy');
                    shotsOfEnemy = shotsOfEnemy.filter(function (f) { return f !== result });
                }
            }
            document.querySelector('[posX="' + prevCoordMainShipX + '"][posY="' + prevCoordMainShipY + '"]').classList.remove('mainship');
            MainShip = document.querySelector('[posX="' + coordMainShipX + '"][posY="' + coordMainShipY + '"]');
            MainShip.classList.add('mainship');

        }
        else {
            coordMainShipX = prevCoordMainShipX;
            coordMainShipY = prevCoordMainShipY;
        }
    }

    createMainShip() {
        let mainShipCoordinates = this.generateShip();
        MainShip = document.querySelector('[posX="' + mainShipCoordinates[0] + '"][posY="' + mainShipCoordinates[1] + '"]');
        MainShip.classList.add('mainship');
        coordMainShipX = mainShipCoordinates[0];
        coordMainShipY = mainShipCoordinates[1];
    }

    createEnemy() {
        let enemyCoordinates = this.generateEnemyShip();
        let enemy = document.querySelector('[posX="' + enemyCoordinates[0] + '"][posY="' + 10 + '"]');
        while (enemy.classList.contains('mainship') == true || enemy.classList.contains('enemy') == true) {
            enemyCoordinates = this.generateEnemyShip();
            enemy = document.querySelector('[posX="' + enemyCoordinates[0] + '"][posY="' + 10 + '"]');
        }
        enemy.classList.add('enemy');
        enemies.push(enemy);
    }


    Fight() {
        let EnemyShip;
        let enemiesSecond = [];

        let secondBonuses = [];
        for (let i = 0; i < bonuses.length; i++) {
            let time = bonuses[i].getAttribute("bonustime");
            bonuses[i].setAttribute("bonustime", time - 1);
            if (time - 1 != 0) {
                secondBonuses.push(bonuses[i]);
            }
            else if (bonuses[i].classList.contains('bonusHealth')) {
                bonuses[i].classList.remove('bonusHealth');
            }
            else if (bonuses[i].classList.contains('bonusPlusToScores')) {
                bonuses[i].classList.remove('bonusPlusToScores');
            }
        }

        bonuses = secondBonuses.slice();

        let secondShotsOfMainship = [];
        for (let i = 0; i < shotsOfMainship.length; i++) {
            let oneShot = shotsOfMainship[i];
            let ShotIsAlive = GamePage.MoveShotOfMainship(oneShot.getAttribute("posX"), oneShot.getAttribute("posY"), i);
            if (ShotIsAlive === 1) {
                secondShotsOfMainship.push(shotsOfMainship[i]);
            }
        }
        shotsOfMainship = secondShotsOfMainship.slice();

        let secondShotsOfEnemy = [];
        for (let i = 0; i < shotsOfEnemy.length; i++) {
            let oneShot = shotsOfEnemy[i];
            let ShotIsAlive = GamePage.MoveShotOfEnemyship(oneShot.getAttribute("posX"), oneShot.getAttribute("posY"), i);
            if (ShotIsAlive === 1) {
                secondShotsOfEnemy.push(shotsOfEnemy[i]);
            }
        }
        shotsOfEnemy = secondShotsOfEnemy.slice();

        for (let i = 0; i < enemies.length; i++) {
            //console.log(enemies);
            if (enemies[i].getAttribute("posY") > 1) {
                coordEnemyShipX = enemies[i].getAttribute("posX");
                coordEnemyShipY = enemies[i].getAttribute("posY");

                let temporaryArray = GamePage.TranslateCoordinatesIntoNumber(coordEnemyShipX, coordEnemyShipY);
                coordEnemyShipX = temporaryArray[0];
                coordEnemyShipY = temporaryArray[1];
                prevCoordEnemyShipX = coordEnemyShipX;
                prevCoordEnemyShipY = coordEnemyShipY;
                // console.log("start directions", coordEnemyShipX, coordEnemyShipY)
                let WouldEnemyGo = Math.round(Math.random() * (1 - 0) + 0);
                if (WouldEnemyGo === 1) {
                    let directionsArray = [];                                               // 1 - left, 2 - down, 3 - right
                    if (coordEnemyShipX != 1 && document.querySelector('[posX="' + (coordEnemyShipX - 1) + '"][posY="' + coordEnemyShipY + '"]').classList.contains('enemy') !== true) {
                        directionsArray.push(1);
                    }
                    if (coordEnemyShipY != 1 && document.querySelector('[posX="' + coordEnemyShipX + '"][posY="' + (coordEnemyShipY - 1) + '"]').classList.contains('enemy') !== true) {
                        directionsArray.push(2);
                    }
                    if (coordEnemyShipX != 10 && document.querySelector('[posX="' + (coordEnemyShipX + 1) + '"][posY="' + coordEnemyShipY + '"]').classList.contains('enemy') !== true) {
                        directionsArray.push(3);
                    }

                    //console.log("directions", directionsArray)

                    let directionForEnemyGo = Math.round(Math.random() * (directionsArray.length - 0) + 0);
                    if (directionsArray[directionForEnemyGo] == 1) {
                        coordEnemyShipX -= 1;
                    }
                    else if (directionsArray[directionForEnemyGo] == 2) {
                        coordEnemyShipY -= 1;
                    }
                    else if (directionsArray[directionForEnemyGo] == 3) {
                        coordEnemyShipX += 1;
                    }
                    //console.log("choosed direction", directionForEnemyGo);
                    //console.log("coordinates", coordEnemyShipX, coordEnemyShipY)


                    let IsItHit = GamePage.CheckForHitWithMainship(coordEnemyShipX, coordEnemyShipY);
                    if (IsItHit == 0) {
                        EnemyShip = document.querySelector('[posX="' + coordEnemyShipX + '"][posY="' + coordEnemyShipY + '"]');

                        if (document.querySelector('[posX="' + coordEnemyShipX + '"][posY="' + coordEnemyShipY + '"]').classList.contains('shot') === true) {
                            document.querySelector('[posX="' + coordEnemyShipX + '"][posY="' + coordEnemyShipY + '"]').classList.remove('shot');
                            var result = Enumerable.from(shotsOfMainship).where(shoting => shoting.getAttribute("posX") == coordEnemyShipX && shoting.getAttribute("posY") == coordEnemyShipY).firstOrDefault();
                            shotsOfMainship = shotsOfMainship.filter(function (f) { return f !== result });
                            countDeadEnemies += 1;
                            GamePage.DieEnemy(prevCoordEnemyShipX, prevCoordEnemyShipY);
                            secondScores += scoresForWin;
                            GamePage.ChangingState.bind(this);
                        }
                        else {
                            document.querySelector('[posX="' + prevCoordEnemyShipX + '"][posY="' + prevCoordEnemyShipY + '"]').classList.remove('enemy');
                            EnemyShip.classList.add('enemy');
                            enemiesSecond.push(EnemyShip);

                            let CanOpenFireOrNot = GamePage.CheckForAvailabilityFire(coordEnemyShipX, coordEnemyShipY);
                            let randomForOpenFire = Math.round(Math.random());
                            if (coordEnemyShipY != 1 && CanOpenFireOrNot == 1 && randomForOpenFire == 1) {
                                GamePage.AnimationEnemyMakeShot(coordEnemyShipX, coordEnemyShipY);
                            }
                        }
                    }
                    else {
                        countDeadEnemies += 1;
                        GamePage.DieEnemy(prevCoordEnemyShipX, prevCoordEnemyShipY);
                    }

                }

                else {
                    EnemyShip = document.querySelector('[posX="' + coordEnemyShipX + '"][posY="' + coordEnemyShipY + '"]');
                    enemiesSecond.push(EnemyShip);
                }
            }
            else {
                GamePage.End();
                //alert("игра окончена");
            }

        }
        enemies = enemiesSecond.slice();
        enemiesSecond = [];
        if (timeBetweenMainshipAttack < 1) {
            timeBetweenMainshipAttack += 1;
        }
        GamePage.ChangingState();

        var resultOfCountUpY = Enumerable.from(enemies).where(enemchik => enemchik.getAttribute("posY") == 10).toArray();
        console.log("length", resultOfCountUpY.length);
        if (resultOfCountUpY.length < 7) {
            GamePage.createEnemy();
        }


        if (countDeadEnemies >= 20) {
            scoresForWin = 4;
        }
        else if (countDeadEnemies >= 40) {
            scoresForWin = 8;
        }
        else if (countDeadEnemies >= 70) {
            scoresForWin = 16;
        }
        //console.log("deadenemies", countDeadEnemies);
    }

    startThisGame() {
        for (let i = 0; i < 100; i++) {
            let eachExcel = document.createElement('div');
            battleField[0].append(eachExcel);
            eachExcel.classList.add('excel');
        }
        let excel = document.getElementsByClassName('excel');
        let x = 1;
        let y = 10;

        for (let i = 0; i < excel.length; i++) {
            if (x > 10) {
                x = 1;
                y -= 1;
            }
            excel[i].setAttribute("posX", x);
            excel[i].setAttribute("posY", y);
            excel[i].setAttribute("bonustime", 0);
            x += 1;
        }
        this.createMainShip();

        interval = setInterval(this.Fight, 900);
    }


    End = () => {
        this.setState({ openModal: true })
        clearInterval(interval)
    }

    onCloseModal = () => {
        this.setState({ openModal: false })
    }

    onCloseModalSecond = () => {
        this.setState({ openModalSecond: false })
    }

    handleChange = () => {
        if (this.refName.current.value != "" || this.refName.current.value!=" ")
        {
            this.setState({ disable: false });
        }     
    }

    makeList = () => {
        this.setState({ disable: true });
        function sortNumber(a, b) {
            return a - b;
        }
        this.setState({ openModal: false });
        this.setState({ openModalSecond: true });

        player = this.refName.current.value;
        playerScores = this.state.scores;

        dict[player] = playerScores;

        var dictCopy = {};
        var values = Object.values(dict);
        var keys = Object.keys(dict);

        values.sort(function (a, b) {
            return b - a;
        });


        for (let i = 0; i < 5; i++) {
            let valueMeaning = values[i];
            for (let j = 0; j < values.length; j++) {
                if (dict[keys[j]] === valueMeaning) {
                    let temporary = keys[j];
                    keys.splice(j, 1);
                    dictCopy[temporary] = valueMeaning;
                    break;
                }
            }

        }

        values = Object.values(dictCopy);
        keys = Object.keys(dictCopy);

        this.setState({
            stateFirstGamer: keys[0], stateFirstGamerScores: values[0],
            stateSecondGamer: keys[1], stateSecondGamerScores: values[1],
            stateThirdGamer: keys[2], stateThirdGamerScores: values[2],
            stateFourthGamer: keys[3], stateFourthGamerScores: values[3],
            stateFiveGamer: keys[4], stateFiveGamerScores: values[4]
        });
        dict = dictCopy;

    }

    startNewGame = () => {

        this.setState({ openModalSecond: false });
        mySecondHp = 70;
        secondScores = 0;
        countDeadEnemies = 0;
        scoresForWin = 2;
        enemies = [];
        bonuses = [];
        shotsOfEnemy = [];
        shotsOfMainship = [];
        direction = "";

        for (let i = 1; i < 11; i++) {
            for (let j = 1; j < 11; j++) {
                document.querySelector('[posX="' + i + '"][posY="' + j + '"]').classList = "";
                document.querySelector('[posX="' + i + '"][posY="' + j + '"]').classList.add('excel');
                document.querySelector('[posX="' + i + '"][posY="' + j + '"]').setAttribute("bonustime", 0);
            }
        }
        GamePage.createMainShip();
        GamePage.createEnemy();

        interval = setInterval(this.Fight, 700);
    }

    render() {


        //this.showMessage();
        //this.startThisGame();
        //this.startThisGame();

        return (
            <div className="StartPage">
                <StartPageNav hp={this.state.myHP} scores={this.state.scores} />
                <Modal open={this.state.openModal} onClose={this.onCloseModal}>
                    <h1>Game Over</h1>
                    <div>
                        <h3 className="writingFirst">Congratulations!You scored {this.state.scores} points and got to the leaderboard!</h3>
                        <h3 className="writingSecond">Type your name in to continue: </h3>
                        <div className="formPlayer">
                            <input className="input" type="text" id="name" ref={this.refName} onChange={this.handleChange}></input>
                            <button className="continue" disabled={this.state.disable} id="button" ref={this.refButton} onClick={this.makeList}>Continue</button>
                        </div>

                    </div>

                </Modal>
                <Modal open={this.state.openModalSecond} onClose={this.onCloseModalSecond}>
                    <h1 className="writing">LEADERBOARD</h1>
                    <div className="playersandscores">
                        <div className="players">
                            <h2 classsName="sizeLetters">1. {this.state.stateFirstGamer}</h2>
                            <h2 classsName="sizeLetters">2. {this.state.stateSecondGamer} </h2>
                            <h2 classsName="sizeLetters">3. {this.state.stateThirdGamer} </h2>
                            <h2 classsName="sizeLetters">4. {this.state.stateFourthGamer} </h2>
                            <h2 classsName="sizeLetters">5. {this.state.stateFiveGamer} </h2>
                        </div>
                        <div className="scoresSecond">
                            <h2 classsName="sizeLetters"> {this.state.stateFirstGamerScores} scores</h2>
                            <h2 classsName="sizeLetters"> {this.state.stateSecondGamerScores} scores</h2>
                            <h2 classsName="sizeLetters"> {this.state.stateThirdGamerScores} scores</h2>
                            <h2 classsName="sizeLetters"> {this.state.stateFourthGamerScores} scores</h2>
                            <h2 classsName="sizeLetters"> {this.state.stateFiveGamerScores} scores</h2>
                        </div>
                    </div>


                    <Link to="/game">
                        <Button className="startButtonSecond" onClick={this.startNewGame}>
                            <p className="pStart">Play again!</p>
                        </Button>
                    </Link>
                </Modal>

                <div className="row FieldOfGameAndButtons">


                    <div className="col-md-9 col-xs-12" style={{ padding: 0 }}>
                        <div className="game_field"></div>
                    </div>

                    <div className="position-relative col-md-3 col-xs-12 center-block navigation_field">
                        <div class="position-absolute top-50 start-50 translate-middle buttons" >
                            <div className="firstRow">
                                <button className="controlButton buttonUp" onClick={this.funcUp}><img src="../Content/Controls/ArrowUp.png" alt="up" /></button>
                            </div>

                            <div className="secondRow">
                                <button className="controlButton buttonLeft" onClick={this.funcLeft}><img src="../Content/Controls/ArrowLeft.png" alt="left" /></button>
                                <button className="controlButton buttonPush shoot" onClick={this.shot}>SHOOT</button>
                                <button className="controlButton buttonRight" onClick={this.funcRight}><img src="../Content/Controls/ArrowRight.png" alt="right" /></button>
                            </div>

                            <div className="thirdRow">
                                <button className="controlButton buttonDown" onClick={this.funcDown}><img src="../Content/Controls/ArrowDown.png" alt="down" /></button>
                            </div>
                        </div>
                    </div>

                    <div className="SecondButtons">
                        <div className="thirdButtons">
                            <button className="controlButton buttonUp" onClick={this.funcUp}><img src="../Content/Controls/ArrowUp.png" alt="up" /></button>
                            <button className="controlButton buttonLeft" onClick={this.funcLeft}><img src="../Content/Controls/ArrowLeft.png" alt="left" /></button>
                            <button className="controlButton buttonPush shoot" onClick={this.shot}>SHOOT</button>
                            <button className="controlButton buttonRight" onClick={this.funcRight}><img src="../Content/Controls/ArrowRight.png" alt="right" /></button>
                            <button className="controlButton buttonDown" onClick={this.funcDown}><img src="../Content/Controls/ArrowDown.png" alt="down" /></button>
                        </div>

                    </div>

                </div>

            </div>
        );
    }
}

export default GamePage; 